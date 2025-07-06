"use client";

import { useState, memo } from "react";
import { useRenderPerformance } from "../../hooks/use-performance.tsx";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Star, Heart, ShoppingCart, Play, Clock, Users, Download, Eye, Gift, Zap, Crown, Sparkles, ChevronRight, Calendar, Tag, Gamepad2 } from "lucide-react";

interface Game {
	id: string;
	title: string;
	price: number;
	originalPrice?: number;
	developer: string;
	coverImage: string;
	screenshots: string[];
	rating: number;
	tags: string[];
	genre: string;
	releaseDate: string;
	description: string;
	features: string[];
	systemRequirements: {
		minimum: string;
		recommended: string;
	};
	playtime: string;
	playerCount: number;
	discount?: number;
	isNew?: boolean;
	isTrending?: boolean;
	isWishlisted?: boolean;
	hasDemo?: boolean;
	isEarlyAccess?: boolean;
}

interface GameCardProps {
	game: Game;
	viewMode?: "grid" | "list";
	className?: string;
	showQuickActions?: boolean;
	onGameClick?: (game: Game) => void;
	onAddToWishlist?: (gameId: string) => void;
	onAddToCart?: (gameId: string) => void;
	onPlayDemo?: (gameId: string) => void;
}

export const GameCard = memo(function GameCard({ game, viewMode = "grid", className = "", showQuickActions = true, onGameClick, onAddToWishlist, onAddToCart, onPlayDemo }: GameCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);
	const renderPerf = useRenderPerformance(`GameCard-${game.id}`);

	const handleGameClick = () => {
		onGameClick?.(game);
	};

	const handleAddToWishlist = (e: React.MouseEvent) => {
		e.stopPropagation();
		onAddToWishlist?.(game.id);
	};

	const handleAddToCart = (e: React.MouseEvent) => {
		e.stopPropagation();
		onAddToCart?.(game.id);
	};

	const handlePlayDemo = (e: React.MouseEvent) => {
		e.stopPropagation();
		onPlayDemo?.(game.id);
	};

	const discountPercentage = game.discount || 0;
	const finalPrice = game.price - (game.price * discountPercentage) / 100;

	if (viewMode === "list") {
		return (
			<Card className={`bg-[#1C1C1C] border-[#2B2B2B] hover:border-[#00FFC6]/50 transition-all duration-200 cursor-pointer ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleGameClick}>
				<CardContent className="p-4">
					<div className="flex gap-4">
						{/* Game Cover */}
						<div className="relative w-32 h-20 rounded-lg overflow-hidden bg-[#2B2B2B] flex-shrink-0">
							{!imageError ? (
								<img src={game.coverImage} alt={game.title} className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} />
							) : (
								<div className="w-full h-full bg-[#2B2B2B] flex items-center justify-center">
									<Gamepad2 className="w-8 h-8 text-[#3D3D3D]" />
								</div>
							)}

							{/* Overlay badges */}
							<div className="absolute top-2 left-2 flex gap-1">
								{game.isNew && (
									<Badge className="bg-[#00FFC6] text-[#0A0A0A] text-xs px-2 py-1">
										<Sparkles className="w-3 h-3 mr-1" />
										New
									</Badge>
								)}
								{game.isTrending && (
									<Badge className="bg-red-500 text-white text-xs px-2 py-1">
										<Zap className="w-3 h-3 mr-1" />
										Trending
									</Badge>
								)}
								{discountPercentage > 0 && <Badge className="bg-orange-500 text-white text-xs px-2 py-1">-{discountPercentage}%</Badge>}
							</div>
						</div>

						{/* Game Info */}
						<div className="flex-1 min-w-0">
							<div className="flex items-start justify-between">
								<div className="flex-1 min-w-0">
									<h3 className="font-semibold text-[#F2F2F2] text-lg mb-1 truncate">{game.title}</h3>
									<p className="text-[#AAAAAA] text-sm mb-2">{game.developer}</p>

									{/* Rating and Tags */}
									<div className="flex items-center gap-4 mb-2">
										<div className="flex items-center gap-1">
											<Star className="w-4 h-4 text-yellow-400 fill-current" />
											<span className="text-sm text-[#F2F2F2]">{game.rating}</span>
										</div>
										<div className="flex items-center gap-1">
											<Users className="w-4 h-4 text-[#AAAAAA]" />
											<span className="text-sm text-[#AAAAAA]">{game.playerCount.toLocaleString()}</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock className="w-4 h-4 text-[#AAAAAA]" />
											<span className="text-sm text-[#AAAAAA]">{game.playtime}</span>
										</div>
									</div>

									{/* Tags */}
									<div className="flex flex-wrap gap-1 mb-2">
										{game.tags.slice(0, 3).map((tag) => (
											<Badge key={tag} variant="secondary" className="bg-[#2B2B2B] text-[#AAAAAA] text-xs px-2 py-1">
												{tag}
											</Badge>
										))}
									</div>

									{/* Description */}
									<p className="text-[#AAAAAA] text-sm line-clamp-2">{game.description}</p>
								</div>

								{/* Price and Actions */}
								<div className="flex flex-col items-end gap-2 ml-4">
									<div className="text-right">
										{game.price === 0 ? (
											<span className="text-[#00FFC6] font-semibold">Free</span>
										) : (
											<div className="flex items-center gap-2">
												{discountPercentage > 0 && <span className="text-[#AAAAAA] line-through text-sm">${game.price.toFixed(2)}</span>}
												<span className="text-[#00FFC6] font-semibold text-lg">${finalPrice.toFixed(2)}</span>
											</div>
										)}
									</div>

									{/* Quick Actions */}
									{showQuickActions && (
										<div className="flex gap-2">
											<Button variant="outline" size="sm" onClick={handleAddToWishlist} className={`border-[#3D3D3D] hover:border-[#00FFC6] ${game.isWishlisted ? "bg-[#00FFC6]/20 border-[#00FFC6]" : ""}`}>
												<Heart className={`w-4 h-4 ${game.isWishlisted ? "fill-current text-[#00FFC6]" : ""}`} />
											</Button>
											{game.hasDemo && (
												<Button variant="outline" size="sm" onClick={handlePlayDemo} className="border-[#3D3D3D] hover:border-[#00FFC6]">
													<Play className="w-4 h-4" />
												</Button>
											)}
											<Button size="sm" onClick={handleAddToCart} className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
												<ShoppingCart className="w-4 h-4 mr-1" />
												{game.price === 0 ? "Get" : "Buy"}
											</Button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	// Grid view
	return (
		<Card className={`bg-[#1C1C1C] border-[#2B2B2B] hover:border-[#00FFC6]/50 transition-all duration-200 cursor-pointer group ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleGameClick}>
			<CardContent className="p-0">
				{/* Game Cover */}
				<div className="relative aspect-[16/9] rounded-t-lg overflow-hidden bg-[#2B2B2B]">
					{!imageError ? (
						<img src={game.coverImage} alt={game.title} className={`w-full h-full object-cover transition-all duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"} ${isHovered ? "scale-105" : "scale-100"}`} onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} />
					) : (
						<div className="w-full h-full bg-[#2B2B2B] flex items-center justify-center">
							<Gamepad2 className="w-16 h-16 text-[#3D3D3D]" />
						</div>
					)}

					{/* Overlay badges */}
					<div className="absolute top-3 left-3 flex flex-col gap-1">
						{game.isNew && (
							<Badge className="bg-[#00FFC6] text-[#0A0A0A] text-xs px-2 py-1">
								<Sparkles className="w-3 h-3 mr-1" />
								New
							</Badge>
						)}
						{game.isTrending && (
							<Badge className="bg-red-500 text-white text-xs px-2 py-1">
								<Zap className="w-3 h-3 mr-1" />
								Trending
							</Badge>
						)}
						{game.isEarlyAccess && (
							<Badge className="bg-purple-500 text-white text-xs px-2 py-1">
								<Crown className="w-3 h-3 mr-1" />
								Early Access
							</Badge>
						)}
					</div>

					{/* Discount badge */}
					{discountPercentage > 0 && (
						<div className="absolute top-3 right-3">
							<Badge className="bg-orange-500 text-white text-sm px-2 py-1">-{discountPercentage}%</Badge>
						</div>
					)}

					{/* Hover overlay */}
					{isHovered && (
						<div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							<div className="flex gap-2">
								{game.hasDemo && (
									<Button variant="outline" size="sm" onClick={handlePlayDemo} className="border-white/20 bg-black/20 backdrop-blur-sm hover:bg-white/10">
										<Play className="w-4 h-4 mr-1" />
										Demo
									</Button>
								)}
								<Button size="sm" onClick={handleAddToCart} className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
									<Eye className="w-4 h-4 mr-1" />
									View
								</Button>
							</div>
						</div>
					)}
				</div>

				{/* Game Info */}
				<div className="p-4">
					<div className="flex items-start justify-between mb-2">
						<h3 className="font-semibold text-[#F2F2F2] text-lg leading-tight line-clamp-1">{game.title}</h3>
						<Button variant="ghost" size="sm" onClick={handleAddToWishlist} className={`p-1 ${game.isWishlisted ? "text-[#00FFC6]" : "text-[#AAAAAA]"}`}>
							<Heart className={`w-4 h-4 ${game.isWishlisted ? "fill-current" : ""}`} />
						</Button>
					</div>

					<p className="text-[#AAAAAA] text-sm mb-3">{game.developer}</p>

					{/* Rating and Stats */}
					<div className="flex items-center gap-4 mb-3">
						<div className="flex items-center gap-1">
							<Star className="w-4 h-4 text-yellow-400 fill-current" />
							<span className="text-sm text-[#F2F2F2]">{game.rating}</span>
						</div>
						<div className="flex items-center gap-1">
							<Users className="w-4 h-4 text-[#AAAAAA]" />
							<span className="text-sm text-[#AAAAAA]">{game.playerCount.toLocaleString()}</span>
						</div>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-1 mb-4">
						{game.tags.slice(0, 3).map((tag) => (
							<Badge key={tag} variant="secondary" className="bg-[#2B2B2B] text-[#AAAAAA] text-xs px-2 py-1">
								{tag}
							</Badge>
						))}
					</div>

					{/* Price and Action */}
					<div className="flex items-center justify-between">
						<div>
							{game.price === 0 ? (
								<span className="text-[#00FFC6] font-semibold">Free</span>
							) : (
								<div className="flex items-center gap-2">
									{discountPercentage > 0 && <span className="text-[#AAAAAA] line-through text-sm">${game.price.toFixed(2)}</span>}
									<span className="text-[#00FFC6] font-semibold">${finalPrice.toFixed(2)}</span>
								</div>
							)}
						</div>

						<Button size="sm" onClick={handleAddToCart} className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
							<ShoppingCart className="w-4 h-4 mr-1" />
							{game.price === 0 ? "Get" : "Buy"}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
});

export default GameCard;
