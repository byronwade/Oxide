import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp, Crown, DollarSign, Heart, ShoppingCart, SortAsc, Tag, Gamepad, ArrowRight } from "lucide-react";

import gamesData from "@/data/games.json";
import { GameImage } from "@/components/GameImage";
import { PaginatedGameGrid } from "@/components/store/PaginatedGameGrid";
import { GameCard } from "@/components/store/GameCard";

// --- Data Types ---
interface GameFromFile {
	id: string;
	title: string;
	slug: string;
	shortDescription: string;
	media: {
		coverImage: string;
	};
	pricing: {
		basePrice: number;
		currentPrice: number;
	};
	metrics: {
		rating: number;
		downloadCount: number;
		reviewCount: number;
	};
	details: {
		tags: string[];
		platforms: string[];
	};
}

interface GamesData {
	data: GameFromFile[];
}

type Game = GameFromFile & { discountPercent: number };

const typedGamesData = gamesData as GamesData;

// --- Data Fetching and Preparation ---

const withDiscount = (game: GameFromFile): Game => ({
	...game,
	discountPercent: game.pricing.basePrice > game.pricing.currentPrice ? Math.round(((game.pricing.basePrice - game.pricing.currentPrice) / game.pricing.basePrice) * 100) : 0,
});

const allGames: Game[] = (typedGamesData.data || []).map(withDiscount);
const popularTags = ["Story Rich", "Great Soundtrack", "Atmospheric", "Open World", "Multiplayer", "Co-op", "Survival", "Difficult"];

// Pre-calculate static data to avoid hydration mismatches
const featuredGames =
	allGames
		?.filter((g) => g.metrics.rating >= 4.5 && g.metrics.downloadCount > 100000)
		.sort((a, b) => b.metrics.rating - a.metrics.rating)
		.slice(0, 4) || [];

const topSellers = allGames?.sort((a, b) => b.metrics.downloadCount - a.metrics.downloadCount).slice(0, 12) || [];

const communityFavorites = allGames?.sort((a, b) => b.metrics.reviewCount - a.metrics.reviewCount).slice(0, 12) || [];

const storyRichGames = allGames?.filter((g) => g.details.tags.includes("Story Rich")).slice(0, 12) || [];

const onSaleGames =
	allGames
		?.filter((g) => g.discountPercent > 0)
		.sort((a, b) => b.discountPercent - a.discountPercent)
		.slice(0, 12) || [];

// --- Vercel-style Components ---

function SectionHeader({ icon, title, href, showViewAll = true }: { icon: React.ReactNode; title: string; href?: string; showViewAll?: boolean }) {
	return (
		<div className="flex items-center justify-between mb-6">
			<div className="flex items-center space-x-3">
				{icon}
				<h2 className="text-xl font-semibold text-white">{title}</h2>
			</div>
			{showViewAll && href && (
				<Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white">
					<Link href={href}>
						View all
						<ArrowRight className="w-4 h-4 ml-1" />
					</Link>
				</Button>
			)}
		</div>
	);
}

function HeroSection({ featuredGame }: { featuredGame: Game }) {
	return (
		<section className="relative h-[500px] rounded-xl overflow-hidden bg-gray-950/50 border border-gray-800/50 backdrop-blur-sm">
			<GameImage src={featuredGame.media.coverImage || "/api/placeholder/1920/1080"} alt={featuredGame.title} width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
			<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

			<div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
				<div className="max-w-2xl space-y-4">
					<Badge className="bg-rust-500/10 border border-rust-500/20 text-rust-300 backdrop-blur-sm w-fit">
						<Crown className="w-3 h-3 mr-1" />
						Featured
					</Badge>
					<h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{featuredGame.title}</h1>
					<p className="text-gray-300 leading-relaxed">{featuredGame.shortDescription}</p>
					<div className="flex items-center space-x-3 pt-2">
						<Button className="bg-rust-600 hover:bg-rust-700 text-white border-rust-600 hover:border-rust-700 transition-colors duration-200">
							<ShoppingCart className="w-4 h-4 mr-2" />${(featuredGame.pricing.currentPrice / 100).toFixed(2)}
						</Button>
						<Button variant="outline" className="border-gray-600 hover:border-gray-500">
							<Heart className="w-4 h-4 mr-2" />
							Wishlist
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

function SearchAndFilters() {
	return (
		<section className="bg-gray-950/50 border border-gray-800/50 rounded-lg backdrop-blur-sm p-6">
			<div className="flex flex-col lg:flex-row items-center gap-4">
				<div className="relative flex-1 w-full">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
					<Input type="text" placeholder={`Search ${allGames.length.toLocaleString()} games...`} className="pl-10 bg-gray-950/50 border-gray-800 focus:border-gray-600" />
				</div>
				<div className="flex items-center gap-3">
					<Select defaultValue="popularity">
						<SelectTrigger className="w-[160px] bg-gray-950/50 border-gray-800">
							<SortAsc className="w-4 h-4 mr-2" />
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="popularity">Popular</SelectItem>
							<SelectItem value="release-date">New</SelectItem>
							<SelectItem value="rating">Top Rated</SelectItem>
							<SelectItem value="price-asc">Price ↑</SelectItem>
							<SelectItem value="price-desc">Price ↓</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" className="border-gray-800 hover:border-gray-700">
						<Filter className="w-4 h-4 mr-2" />
						Filters
					</Button>
				</div>
			</div>
		</section>
	);
}

function GameSection({ title, games, icon, href, size }: { title: string; games: Game[]; icon: React.ReactNode; href?: string; size?: "large" }) {
	if (!games || games.length === 0) return null;

	const gridCols = size === "large" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

	return (
		<section className="space-y-6">
			<SectionHeader icon={icon} title={title} href={href} />
			<div className={`grid ${gridCols} gap-4`}>
				{games.map((game) => (
					<GameCard key={game.id} game={game} size={size} />
				))}
			</div>
		</section>
	);
}

// --- Main Store Page Component ---

export default function StorePage() {
	return (
		<div className="min-h-screen bg-black">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
				{/* Hero Section */}
				{featuredGames.length > 0 && <HeroSection featuredGame={featuredGames[0]} />}

				{/* Search and Filters */}
				<SearchAndFilters />

				{/* Game Sections */}
				<div className="space-y-12">
					<GameSection title="Featured Games" games={featuredGames} icon={<Crown className="w-5 h-5 text-yellow-400" />} href="/store/featured" size="large" />

					<GameSection title="Special Offers" games={onSaleGames} icon={<DollarSign className="w-5 h-5 text-green-400" />} href="/store/sale" />

					<GameSection title="Top Sellers" games={topSellers} icon={<TrendingUp className="w-5 h-5 text-rust-500" />} href="/store/top-sellers" />

					<GameSection title="Community Favorites" games={communityFavorites} icon={<Heart className="w-5 h-5 text-pink-400" />} href="/store/community-favorites" />

					<GameSection title="Story Rich Games" games={storyRichGames} icon={<Tag className="w-5 h-5 text-blue-400" />} href="/store/category/story-rich" />

					{/* Popular Tags */}
					<section className="space-y-6">
						<SectionHeader icon={<Tag className="w-5 h-5 text-purple-400" />} title="Popular Tags" href="/tags" />
						<div className="flex flex-wrap gap-2">
							{popularTags.map((tag) => (
								<Badge key={tag} variant="secondary" className="hover:bg-gray-700 cursor-pointer transition-colors">
									{tag}
								</Badge>
							))}
						</div>
					</section>

					{/* Browse All Games */}
					<section className="space-y-6">
						<SectionHeader icon={<Gamepad className="w-5 h-5 text-rust-500" />} title="All Games" showViewAll={false} />
						<PaginatedGameGrid games={allGames} />
					</section>
				</div>
			</div>
		</div>
	);
}
