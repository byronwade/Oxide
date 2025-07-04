import { cache } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { Star, TrendingUp, Play, Sparkles, Clock, Heart, Sword, Target, Ghost, Compass, ArrowRight } from "lucide-react";
import { Puzzle as PuzzleIcon, Zap } from "lucide-react";
import { GameImage } from "@/components/GameImage";
import { Game } from "@/types/game";

import gamesData from "@/data/complete-games.json";

// Type definitions
interface GameCategory {
	id: string;
	name: string;
	icon: React.ReactNode;
	count: number;
	image: string;
	iconType?: string;
}

// Data fetching functions
const getFeaturedGames = cache(async (): Promise<Game[]> => {
	const allGames = gamesData.data as unknown as Game[];
	return allGames.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 3);
});

const getGameCollections = cache(async () => {
	const allGames = gamesData.data as unknown as Game[];
	return {
		trending: allGames.filter((g) => g.isHot).slice(0, 8),
		newReleases: allGames.filter((g) => g.isNew).slice(0, 8),
		aiRecommended: allGames.filter((g) => g.isAiRecommended).slice(0, 8),
	};
});

const getGameCategories = cache(async (): Promise<GameCategory[]> => {
	return [
		{ id: "action", name: "Action", icon: <Zap className="w-4 h-4" />, count: 2847, image: "/api/placeholder/400/300" },
		{ id: "adventure", name: "Adventure", icon: <Compass className="w-4 h-4" />, count: 1923, image: "/api/placeholder/400/300" },
		{ id: "rpg", name: "RPG", icon: <Sword className="w-4 h-4" />, count: 1456, image: "/api/placeholder/400/300" },
		{ id: "strategy", name: "Strategy", icon: <Target className="w-4 h-4" />, count: 1134, image: "/api/placeholder/400/300" },
		{ id: "puzzle", name: "Puzzle", icon: <PuzzleIcon className="w-4 h-4" />, count: 2156, image: "/api/placeholder/400/300" },
		{ id: "horror", name: "Horror", icon: <Ghost className="w-4 h-4" />, count: 856, image: "/api/placeholder/400/300" },
	];
});

// Clean, Vercel-style GameCard component
function GameCard({ game }: { game: Game }) {
	if (!game || !game.slug) {
		return null;
	}

	const { title = "Untitled Game", media, price = 0, rating = 0, developer } = game;
	const coverImage = media?.coverImage || game.coverImage || "/api/placeholder/400/533";

	return (
		<Link href={`/games/${game.slug}`} className="group bg-gray-950/50 border border-gray-800/50 rounded-lg overflow-hidden hover:border-gray-700/50 transition-all duration-200 hover:scale-[1.02]">
			<div className="relative w-full aspect-[2/3] overflow-hidden rounded-t-lg">
				<GameImage src={coverImage} alt={title} width={400} height={533} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>

			<div className="p-4 space-y-2">
				<h3 className="font-medium text-white text-sm overflow-hidden display-webkit-box webkit-box-orient-vertical webkit-line-clamp-2 group-hover:text-rust-400 transition-colors">{title}</h3>

				{developer?.name && <p className="text-xs text-gray-500 overflow-hidden display-webkit-box webkit-box-orient-vertical webkit-line-clamp-1">{developer.name}</p>}

				<div className="flex items-center justify-between">
					{price > 0 ? (
						<span className="text-sm font-medium text-white">${(price / 100).toFixed(2)}</span>
					) : (
						<Badge variant="secondary" className="text-xs">
							Free
						</Badge>
					)}

					<div className="flex items-center space-x-1">
						<Star className="w-3 h-3 text-rust-400 fill-rust-400" />
						<span className="text-xs text-gray-400">{rating.toFixed(1)}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

// Clean section component
function GameSection({ title, games, icon, viewAllHref = "/store" }: { title: string; games: Game[]; icon?: React.ReactNode; viewAllHref?: string }) {
	if (!games || games.length === 0) return null;

	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-3">
					{icon}
					<h2 className="text-xl font-semibold text-white">{title}</h2>
				</div>
				<Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white">
					<Link href={viewAllHref}>
						View all
						<ArrowRight className="w-4 h-4 ml-1" />
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
				{games.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</div>
		</section>
	);
}

// Vercel-style hero section
function HeroSection({ featuredGame }: { featuredGame: Game }) {
	return (
		<section className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-950/50 border border-gray-800/50 backdrop-blur-sm">
			<Image src={featuredGame.media?.coverImage || "/api/placeholder/1600/900"} alt={featuredGame.title || ""} fill className="object-cover" priority />
			<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

			<div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
				<div className="max-w-2xl space-y-4">
					<Badge className="bg-rust-500/10 border border-rust-500/20 text-rust-300 backdrop-blur-sm w-fit">Featured Game</Badge>
					<h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{featuredGame.title}</h1>
					<p className="text-gray-300 leading-relaxed">Discover amazing indie games created by talented developers from around the world. Experience unique stories, innovative gameplay, and artistic vision.</p>
					<div className="flex items-center space-x-3 pt-2">
						<Button className="bg-rust-600 hover:bg-rust-700 text-white border-rust-600 hover:border-rust-700 transition-colors duration-200">
							<Play className="w-4 h-4 mr-2" />
							Play Now
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

// Clean categories sidebar
function CategoriesSidebar({ categories }: { categories: GameCategory[] }) {
	return (
		<aside className="space-y-6">
			<div className="bg-gray-950/50 border border-gray-800/50 rounded-lg backdrop-blur-sm p-6">
				<h3 className="text-lg font-semibold text-white mb-4">Browse by Category</h3>
				<div className="space-y-2">
					{categories.map((category) => (
						<Link href={`/store/category/${category.id}`} key={category.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-900/50 transition-colors group">
							<div className="flex items-center space-x-3">
								<div className="text-gray-400 group-hover:text-rust-400 transition-colors">{category.icon}</div>
								<span className="text-sm text-gray-300 group-hover:text-white transition-colors">{category.name}</span>
							</div>
							<span className="text-xs text-gray-500 font-mono">{category.count.toLocaleString()}</span>
						</Link>
					))}
				</div>
			</div>

			<div className="bg-gray-950/50 border border-gray-800/50 rounded-lg backdrop-blur-sm p-6">
				<h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
				<div className="flex flex-wrap gap-2">
					{["Indie", "Pixel Art", "Story Rich", "Puzzle", "Adventure", "Cozy"].map((tag) => (
						<Badge key={tag} variant="secondary" className="text-xs hover:bg-gray-700 cursor-pointer transition-colors">
							{tag}
						</Badge>
					))}
				</div>
			</div>
		</aside>
	);
}

// Main homepage component with Vercel design
export default async function HomePage() {
	const [featuredGames, gameCollections, gameCategories] = await Promise.all([getFeaturedGames(), getGameCollections(), getGameCategories()]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
			{/* Hero Section */}
			{featuredGames.length > 0 && <HeroSection featuredGame={featuredGames[0]} />}

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-3 space-y-12">
					<GameSection title="Trending Now" games={gameCollections.trending} icon={<TrendingUp className="w-5 h-5 text-rust-500" />} viewAllHref="/store?filter=trending" />

					<GameSection title="New Releases" games={gameCollections.newReleases} icon={<Clock className="w-5 h-5 text-blue-400" />} viewAllHref="/store?filter=new" />

					<GameSection title="AI Recommended" games={gameCollections.aiRecommended} icon={<Sparkles className="w-5 h-5 text-purple-400" />} viewAllHref="/store?filter=ai-recommended" />
				</div>

				{/* Sidebar */}
				<CategoriesSidebar categories={gameCategories} />
			</div>

			{/* Call to Action Section */}
			<section className="bg-gray-950/50 border border-gray-800/50 rounded-lg backdrop-blur-sm p-8 lg:p-12 text-center">
				<div className="max-w-2xl mx-auto space-y-4">
					<h2 className="text-2xl lg:text-3xl font-bold text-white">Ready to discover your next favorite game?</h2>
					<p className="text-gray-400 leading-relaxed">Join thousands of players exploring innovative indie games. Support independent developers and experience gaming like never before.</p>
					<div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
						<Button size="lg" className="bg-rust-600 hover:bg-rust-700 text-white border-rust-600 hover:border-rust-700 transition-colors duration-200">
							Browse All Games
						</Button>
						<Button variant="outline" size="lg" className="border-gray-600 hover:border-gray-500">
							Learn More
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
