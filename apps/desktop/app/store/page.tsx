"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Search, Filter, Grid, List, Star, Heart, Play, Download, Gamepad2, TrendingUp, Zap, Bookmark, Settings, ChevronDown, X, Tag, Users, Clock } from "lucide-react";

// Mock data
const categories = [
	{ id: "all", name: "All Games", count: 1247 },
	{ id: "action", name: "Action", count: 234 },
	{ id: "adventure", name: "Adventure", count: 189 },
	{ id: "rpg", name: "RPG", count: 156 },
	{ id: "strategy", name: "Strategy", count: 98 },
	{ id: "sports", name: "Sports", count: 67 },
	{ id: "puzzle", name: "Puzzle", count: 89 },
	{ id: "indie", name: "Indie", count: 445 },
];

const games = [
	{
		id: "1",
		title: "Cybernetic Horizon",
		image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
		price: "$29.99",
		originalPrice: "$39.99",
		rating: 4.8,
		reviews: 1247,
		genre: "RPG",
		tags: ["Story Rich", "AI-Powered", "Open World"],
		status: "new",
		aiScore: 95,
	},
	{
		id: "2",
		title: "Neural Networks",
		image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
		price: "$19.99",
		originalPrice: null,
		rating: 4.6,
		reviews: 856,
		genre: "Puzzle",
		tags: ["Puzzle", "AI-Generated", "Mind-Bending"],
		status: "trending",
		aiScore: 92,
	},
	{
		id: "3",
		title: "Quantum Realms",
		image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
		price: "$24.99",
		originalPrice: "$34.99",
		rating: 4.7,
		reviews: 932,
		genre: "Adventure",
		tags: ["Adventure", "Sci-Fi", "Physics"],
		status: "popular",
		aiScore: 88,
	},
	{
		id: "4",
		title: "Echoes of Tomorrow",
		image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
		price: "$14.99",
		originalPrice: null,
		rating: 4.5,
		reviews: 567,
		genre: "Action",
		tags: ["Action", "Fast-Paced", "Multiplayer"],
		status: "new",
		aiScore: 87,
	},
	{
		id: "5",
		title: "Stellar Odyssey",
		image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
		price: "$39.99",
		originalPrice: "$49.99",
		rating: 4.9,
		reviews: 2156,
		genre: "Strategy",
		tags: ["Strategy", "Space", "4X"],
		status: "trending",
		aiScore: 91,
	},
	{
		id: "6",
		title: "Mystic Legends",
		image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
		price: "$34.99",
		originalPrice: null,
		rating: 4.4,
		reviews: 789,
		genre: "RPG",
		tags: ["RPG", "Fantasy", "Story Rich"],
		status: "popular",
		aiScore: 85,
	},
];

export default function Store() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [sortBy, setSortBy] = useState("relevance");

	return (
		<div className="space-y-6 max-w-none">
			{/* Header */}
			<section className="native-panel p-4">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold font-oxanium text-[#F2F2F2]">Store</h1>
					<div className="flex items-center gap-3">
						<div className="flex border border-[#2B2B2B] rounded-sm overflow-hidden">
							<Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className={`h-8 px-3 rounded-none border-r border-[#2B2B2B] ${viewMode === "grid" ? "bg-[#00FFC6] text-[#0A0A0A]" : "text-[#F2F2F2] hover:bg-[#2B2B2B]"}`}>
								<Grid className="w-4 h-4" />
							</Button>
							<Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className={`h-8 px-3 rounded-none ${viewMode === "list" ? "bg-[#00FFC6] text-[#0A0A0A]" : "text-[#F2F2F2] hover:bg-[#2B2B2B]"}`}>
								<List className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="flex items-center gap-3">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
						<Input placeholder="Search games, developers, or tags..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="native-input pl-10" />
					</div>

					<Button variant="outline" className="native-button">
						<Filter className="w-4 h-4 mr-2" />
						Filters
					</Button>

					<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="native-input w-40">
						<option value="relevance">Relevance</option>
						<option value="newest">Newest</option>
						<option value="rating">Highest Rated</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
					</select>
				</div>
			</section>

			{/* Categories */}
			<section className="native-spacing">
				<div className="flex items-center gap-2 mb-4">
					<Tag className="w-5 h-5 text-[#00FFC6]" />
					<h2 className="text-lg font-semibold text-[#F2F2F2]">Categories</h2>
				</div>

				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} onClick={() => setSelectedCategory(category.id)} className={`h-8 px-3 text-sm ${selectedCategory === category.id ? "bg-[#00FFC6] text-[#0A0A0A] hover:bg-[#00FFC6]/90" : "border-[#2B2B2B] text-[#F2F2F2] hover:bg-[#2B2B2B]"}`}>
							{category.name}
							<span className="ml-2 text-xs opacity-70">({category.count})</span>
						</Button>
					))}
				</div>
			</section>

			{/* Games Grid */}
			<section className="native-spacing">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<Gamepad2 className="w-5 h-5 text-[#00FFC6]" />
						<h2 className="text-lg font-semibold text-[#F2F2F2]">{selectedCategory === "all" ? "All Games" : categories.find((c) => c.id === selectedCategory)?.name}</h2>
						<span className="text-sm text-[#AAAAAA]">({games.length} games)</span>
					</div>
				</div>

				{viewMode === "grid" ? (
					<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
						{games.map((game) => (
							<div key={game.id} className="game-card-native-interactive group">
								<div className="relative aspect-video overflow-hidden">
									<Image src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
									<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />

									{/* Status Badge */}
									{game.status === "new" && <Badge className="absolute top-2 left-2 bg-[#00FFC6] text-[#0A0A0A] text-xs">NEW</Badge>}
									{game.status === "trending" && <Badge className="absolute top-2 left-2 bg-[#FF3B3B] text-white text-xs">TRENDING</Badge>}
									{game.status === "popular" && <Badge className="absolute top-2 left-2 bg-[#80FF00] text-[#0A0A0A] text-xs">POPULAR</Badge>}

									{/* AI Score */}
									<div className="absolute top-2 right-2 bg-[#0A0A0A]/80 rounded-sm px-2 py-1">
										<span className="text-xs font-bold text-[#00FFC6]">{game.aiScore}</span>
									</div>

									{/* Quick Actions */}
									<div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<Button size="sm" className="h-6 w-6 p-0 bg-[#00FFC6] text-[#0A0A0A]">
											<Play className="w-3 h-3" />
										</Button>
									</div>
								</div>

								<div className="p-3">
									<h3 className="font-medium text-[#F2F2F2] text-sm mb-1 truncate">{game.title}</h3>
									<p className="text-xs text-[#AAAAAA] mb-2">{game.genre}</p>

									{/* Tags */}
									<div className="flex flex-wrap gap-1 mb-2">
										{game.tags.slice(0, 2).map((tag) => (
											<span key={tag} className="text-xs text-[#AAAAAA] bg-[#2B2B2B] px-1 py-0.5 rounded-sm">
												{tag}
											</span>
										))}
									</div>

									{/* Rating */}
									<div className="flex items-center gap-1 mb-2">
										<Star className="w-3 h-3 text-[#80FF00] fill-current" />
										<span className="text-xs text-[#F2F2F2]">{game.rating}</span>
										<span className="text-xs text-[#AAAAAA]">({game.reviews})</span>
									</div>

									{/* Price and Actions */}
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<span className="text-sm font-bold text-[#F2F2F2]">{game.price}</span>
											{game.originalPrice && <span className="text-xs text-[#AAAAAA] line-through">{game.originalPrice}</span>}
										</div>
										<div className="flex items-center gap-1">
											<Button variant="ghost" size="sm" className="h-6 w-6 p-0">
												<Heart className="w-3 h-3" />
											</Button>
											<Button size="sm" className="h-6 px-2 bg-[#00FFC6] text-[#0A0A0A] text-xs">
												<Download className="w-3 h-3 mr-1" />
												Buy
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="space-y-3">
						{games.map((game) => (
							<div key={game.id} className="native-panel p-4">
								<div className="flex gap-4">
									<div className="relative w-32 h-20 flex-shrink-0">
										<Image src={game.image} alt={game.title} fill className="object-cover rounded-sm" />
										{game.status === "new" && <Badge className="absolute top-1 left-1 bg-[#00FFC6] text-[#0A0A0A] text-xs">NEW</Badge>}
									</div>

									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between mb-2">
											<div>
												<h3 className="font-medium text-[#F2F2F2] text-base mb-1">{game.title}</h3>
												<p className="text-sm text-[#AAAAAA]">{game.genre}</p>
											</div>
											<div className="flex items-center gap-2">
												<div className="bg-[#0A0A0A]/80 rounded-sm px-2 py-1">
													<span className="text-xs font-bold text-[#00FFC6]">AI {game.aiScore}</span>
												</div>
												<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
													<Heart className="w-4 h-4" />
												</Button>
											</div>
										</div>

										<div className="flex flex-wrap gap-1 mb-2">
											{game.tags.map((tag) => (
												<span key={tag} className="text-xs text-[#AAAAAA] bg-[#2B2B2B] px-2 py-1 rounded-sm">
													{tag}
												</span>
											))}
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4">
												<div className="flex items-center gap-1">
													<Star className="w-4 h-4 text-[#80FF00] fill-current" />
													<span className="text-sm text-[#F2F2F2]">{game.rating}</span>
													<span className="text-sm text-[#AAAAAA]">({game.reviews})</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-base font-bold text-[#F2F2F2]">{game.price}</span>
													{game.originalPrice && <span className="text-sm text-[#AAAAAA] line-through">{game.originalPrice}</span>}
												</div>
											</div>

											<div className="flex items-center gap-2">
												<Button variant="outline" className="native-button h-8">
													<Play className="w-4 h-4 mr-2" />
													Demo
												</Button>
												<Button className="native-button-primary h-8">
													<Download className="w-4 h-4 mr-2" />
													Buy Now
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	);
}
