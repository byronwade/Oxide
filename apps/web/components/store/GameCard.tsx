"use client";

import { SVGProps } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Cpu } from "lucide-react";
import { GameImage } from "@/components/GameImage";

interface Game {
	id: string;
	title: string;
	slug: string;
	media: {
		coverImage: string;
	};
	pricing: {
		basePrice: number;
		currentPrice: number;
	};
	details: {
		platforms: string[];
	};
	discountPercent: number;
}

interface GameCardProps {
	game: Game;
	size?: "small" | "large";
}

export function GameCard({ game, size = "small" }: GameCardProps) {
	if (!game) {
		return null;
	}
	const isLarge = size === "large";

	const handleButtonClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		// In a real app, you'd dispatch an action here
		console.log(`Action for game: ${game.title}`);
	};

	return (
		<Link href={`/games/${game.slug}`} className="group relative block overflow-hidden rounded-lg border border-gray-800 bg-black transition-all duration-300 hover:border-rust-500/80 hover:shadow-2xl hover:shadow-rust-500/10">
			<GameImage src={game.media.coverImage} alt={game.title} width={400} height={533} className={`w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 ${isLarge ? "aspect-[2/3]" : "aspect-[2/3]"}`} />

			{game.discountPercent > 0 && <Badge className="absolute right-3 top-3 border border-transparent bg-rust-600 font-bold text-white shadow-lg">-{game.discountPercent}%</Badge>}

			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/70 to-transparent p-4">
				<div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-[68px]">
					<h3 className="truncate text-xl font-bold text-white">{game.title}</h3>
					<div className="mt-2 flex items-center justify-between">
						<p className="font-bold text-white text-lg">{game.pricing.currentPrice > 0 ? `$${(game.pricing.currentPrice / 100).toFixed(2)}` : "Free"}</p>
						{game.pricing.basePrice > game.pricing.currentPrice && <p className="text-sm text-gray-400 line-through">${(game.pricing.basePrice / 100).toFixed(2)}</p>}
					</div>
				</div>

				<div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
					<div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
						{game.details.platforms.includes("windows") && <Cpu className="h-4 w-4" />}
						{game.details.platforms.includes("mac") && <AppleIcon className="h-4 w-4" />}
						{game.details.platforms.includes("linux") && <LinuxIcon className="h-4 w-4" />}
					</div>
					<div className="flex gap-2">
						<Button size="sm" className="flex-1 bg-rust-600 font-semibold text-white hover:bg-rust-700" onClick={handleButtonClick}>
							<ShoppingCart className="mr-2 h-4 w-4" />
							Add to Cart
						</Button>
						<Button size="sm" variant="outline" className="border-gray-700 bg-gray-800/80 hover:border-rust-600 hover:bg-gray-700/80" onClick={handleButtonClick}>
							<Heart className="h-4 w-4 text-gray-300" />
						</Button>
					</div>
				</div>
			</div>
		</Link>
	);
}

// Platform Icon Components
const AppleIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} viewBox="0 0 24 24" fill="currentColor">
		<path d="M15.59,16.82C15.5,17.06 15.3,17.48 15,17.82C14.65,18.23 14.23,18.7 13.73,19.04C13.24,19.38 12.7,19.62 12.13,19.62C11.59,19.62 11.13,19.46 10.74,19.16C10.35,18.86 10.03,18.47 9.77,18C9.51,17.53 9.32,17.03 9.2,16.5C9.08,15.97 9.02,15.43 9.02,14.88C9.02,14.15 9.17,13.5 9.47,12.93C9.77,12.36 10.19,11.92 10.73,11.6C11.27,11.28 11.87,11.12 12.53,11.12C13.11,11.12 13.62,11.27 14.06,11.57C14.5,11.87 14.83,12.24 15.05,12.68C14.43,13.03 14.12,13.52 14.12,14.14C14.12,14.82 14.36,15.37 14.84,15.78C15.04,15.93 15.28,16.04 15.54,16.1C15.5,16.1 15.5,16.1 15.5,16.13M15.3,4.63C15.3,5.6 15.04,6.4 14.5,7.03C13.96,7.66 13.26,8 12.4,8C12.38,8 12.35,8 12.33,8C11.43,8 10.7,7.69 10.14,7.07C9.58,6.45 9.3,5.61 9.3,4.63C9.3,3.65 9.58,2.83 10.14,2.21C10.7,1.59 11.43,1.28 12.33,1.28C12.35,1.28 12.38,1.28 12.4,1.28C13.26,1.28 13.96,1.6 14.5,2.23C15.04,2.86 15.3,3.65 15.3,4.63Z"></path>
	</svg>
);

const LinuxIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} viewBox="0 0 24 24" fill="currentColor">
		<path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10.43,15.54L9.04,14.15L10.43,12.76L12,14.33L13.57,12.76L14.96,14.15L13.39,15.72L14.96,17.29L13.57,18.68L12,17.11L10.43,18.68L9.04,17.29L10.59,15.72L10.43,15.54M15.5,10.5A1.5,1.5 0 0,1 14,12A1.5,1.5 0 0,1 12.5,10.5A1.5,1.5 0 0,1 14,9A1.5,1.5 0 0,1 15.5,10.5M8.5,10.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 5.5,10.5A1.5,1.5 0 0,1 7,9A1.5,1.5 0 0,1 8.5,10.5Z"></path>
	</svg>
);
