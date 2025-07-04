import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid3X3, List, Star, Download, Heart, ShoppingCart, ChevronLeft } from "lucide-react";
import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";
import { GameImage } from "@/components/GameImage";

interface CategoryPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
	const { slug } = await params;
	const category = categoriesData.data.find((c) => c.slug === slug);

	if (!category) {
		return {
			title: "Category Not Found | LaunchBeacon",
			description: "The requested game category could not be found.",
		};
	}

	return {
		title: `${category.name} Games | LaunchBeacon Store`,
		description: `Discover amazing ${category.name.toLowerCase()} games on LaunchBeacon. ${category.description}`,
		keywords: [category.name, "games", "indie games", "pc games", category.slug].join(", "),
	};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = await params;
	const category = categoriesData.data.find((c) => c.slug === slug);

	if (!category) {
		notFound();
	}

	// Filter games by category
	const categoryGames = gamesData.data.filter((game) => game.details.genres.some((genre) => genre.toLowerCase().includes(category.name.toLowerCase()) || category.name.toLowerCase().includes(genre.toLowerCase())) || game.details.tags.some((tag) => tag.toLowerCase().includes(category.name.toLowerCase())));

	// Sort by popularity (download count) by default
	const sortedGames = categoryGames.sort((a, b) => b.metrics.downloadCount - a.metrics.downloadCount);

	return (
		<div className="min-h-screen bg-black text-white">
			{/* Category Header */}
			<div className="relative py-16 overflow-hidden">
				<div className="absolute inset-0">
					<GameImage src={category.image} alt={category.name} width={400} height={300} className="w-full h-full object-cover" />
					<div className="absolute inset-0 bg-black/70" />
				</div>

				<div className="max-w-7xl mx-auto px-8 relative">
					{/* Breadcrumb */}
					<div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
						<Link href="/store" className="hover:text-rust-400 transition-colors">
							Store
						</Link>
						<span>/</span>
						<span className="text-white">{category.name}</span>
					</div>

					<div className="space-y-6">
						<div className="flex items-center space-x-4">
							<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0" asChild>
								<Link href="/store">
									<ChevronLeft className="w-4 h-4 mr-1" />
									Back to Store
								</Link>
							</Button>
						</div>

						<div className="space-y-4">
							<h1 className="text-4xl lg:text-6xl font-bold">{category.name} Games</h1>
							<p className="text-xl text-gray-300 max-w-3xl">{category.description}</p>

							<div className="flex items-center space-x-6">
								<div className="flex items-center space-x-2 text-gray-400">
									<span>{sortedGames.length} games found</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-400">
									<Download className="w-4 h-4" />
									<span>{sortedGames.reduce((acc, game) => acc + game.metrics.downloadCount, 0).toLocaleString()} total downloads</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-8 py-12">
				{/* Filters & Controls */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
					<div className="flex items-center space-x-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input type="text" placeholder={`Search ${category.name.toLowerCase()} games...`} className="w-64 pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" />
						</div>
						<Select>
							<SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
								<SelectValue placeholder="Price Range" />
							</SelectTrigger>
							<SelectContent className="bg-gray-900 border-gray-700">
								<SelectItem value="all">All Prices</SelectItem>
								<SelectItem value="free">Free</SelectItem>
								<SelectItem value="under10">Under $10</SelectItem>
								<SelectItem value="under25">Under $25</SelectItem>
								<SelectItem value="under50">Under $50</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
							<Filter className="w-4 h-4 mr-2" />
							More Filters
						</Button>
					</div>

					<div className="flex items-center space-x-3">
						<span className="text-sm text-gray-400">Sort by:</span>
						<Select>
							<SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
								<SelectValue placeholder="Popularity" />
							</SelectTrigger>
							<SelectContent className="bg-gray-900 border-gray-700">
								<SelectItem value="popularity">Popularity</SelectItem>
								<SelectItem value="rating">Top Rated</SelectItem>
								<SelectItem value="newest">Newest</SelectItem>
								<SelectItem value="price-low">Price: Low to High</SelectItem>
								<SelectItem value="price-high">Price: High to Low</SelectItem>
								<SelectItem value="name">Name A-Z</SelectItem>
							</SelectContent>
						</Select>
						<div className="flex border border-gray-700 rounded">
							<Button variant="ghost" size="sm" className="border-0 text-gray-400 hover:text-white hover:bg-gray-800">
								<Grid3X3 className="w-4 h-4" />
							</Button>
							<Button variant="ghost" size="sm" className="border-0 text-gray-400 hover:text-white hover:bg-gray-800">
								<List className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Games Grid */}
				{sortedGames.length > 0 ? (
					<div className="space-y-8">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
							{sortedGames.map((game) => (
								<GameCard key={game.id} game={game} />
							))}
						</div>

						{/* Pagination */}
						<div className="flex items-center justify-center space-x-4">
							<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
								Previous
							</Button>
							<div className="flex items-center space-x-2">
								{[1, 2, 3, 4, 5].map((page) => (
									<Button key={page} variant={page === 1 ? "default" : "ghost"} size="sm" className={page === 1 ? "bg-rust-600 hover:bg-rust-700 text-white" : "text-gray-400 hover:text-white"}>
										{page}
									</Button>
								))}
							</div>
							<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
								Next
							</Button>
						</div>
					</div>
				) : (
					<div className="text-center py-16">
						<div className="space-y-4">
							<div className="text-6xl text-gray-600">🎮</div>
							<h3 className="text-2xl font-bold text-gray-400">No games found</h3>
							<p className="text-gray-500">Try adjusting your filters or search terms</p>
							<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
								<ChevronLeft className="w-4 h-4 mr-2" />
								Back to Store
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

// Game Card Component
interface GameCardProps {
	game: (typeof gamesData.data)[0];
}

function GameCard({ game }: GameCardProps) {
	const isOnSale = game.pricing.currentPrice < game.pricing.basePrice;
	const discountPercent = isOnSale ? Math.round(((game.pricing.basePrice - game.pricing.currentPrice) / game.pricing.basePrice) * 100) : 0;

	return (
		<Link href={`/games/${game.id}`} className="group">
			<Card className="bg-gray-900/50 border-gray-800 hover:border-rust-500 transition-colors overflow-hidden">
				<CardContent className="p-0">
					<div className="relative aspect-[3/4]">
						<GameImage src={game.media.coverImage} alt={game.title} width={400} height={533} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

						{/* Badges */}
						<div className="absolute top-2 left-2 space-y-1">
							{isOnSale && <Badge className="bg-red-600 text-white text-xs">-{discountPercent}%</Badge>}
							{game.pricing.isDrmFree && <Badge className="bg-green-600 text-white text-xs">DRM-Free</Badge>}
						</div>

						{/* Hover Actions */}
						<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
							<div className="space-y-2 px-4">
								<Button size="sm" className="bg-rust-600 hover:bg-rust-700 text-white w-full">
									<ShoppingCart className="w-3 h-3 mr-1" />
									Add to Cart
								</Button>
								<Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-800 w-full">
									<Heart className="w-3 h-3 mr-1" />
									Wishlist
								</Button>
							</div>
						</div>
					</div>

					<div className="p-3 space-y-2">
						<h3 className="font-semibold text-white group-hover:text-rust-400 transition-colors line-clamp-2 text-sm">{game.title}</h3>

						<div className="flex items-center space-x-1 text-xs">
							<Star className="w-3 h-3 text-yellow-400 fill-current" />
							<span className="text-gray-400">{game.metrics.rating.toFixed(1)}</span>
							<span className="text-gray-600">({game.metrics.reviewCount})</span>
						</div>

						<div className="flex items-center justify-between">
							<div className="text-sm font-bold">
								{isOnSale ? (
									<div className="space-x-1">
										<span className="text-green-400">${(game.pricing.currentPrice / 100).toFixed(2)}</span>
										<span className="text-gray-400 line-through text-xs">${(game.pricing.basePrice / 100).toFixed(2)}</span>
									</div>
								) : (
									<span className={game.pricing.basePrice === 0 ? "text-green-400" : "text-white"}>{game.pricing.basePrice === 0 ? "Free" : `$${(game.pricing.basePrice / 100).toFixed(2)}`}</span>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

// Generate static params for all categories
export async function generateStaticParams() {
	return categoriesData.data.map((category) => ({
		slug: category.slug,
	}));
}
