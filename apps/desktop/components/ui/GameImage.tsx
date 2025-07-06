"use client";

import { cn } from "@/lib/utils";

interface GameImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
}

// Simple color mapping for games
const gameColors: Record<string, string> = {
	"pizza-tower": "#FF6B35",
	"a-dark-room": "#2D2D2D",
	dredge: "#1E3A5F",
	"cassette-beasts": "#8B5A2B",
	celeste: "#FF6B9D",
	"katana-zero": "#FF0066",
	"outer-wilds": "#FF8C42",
	superhot: "#FF2E00",
	hades: "#8B0000",
	"among-us": "#FF0000",
	"fall-guys": "#FFB6C1",
	cuphead: "#FF6B35",
	"hollow-knight": "#2D2D2D",
	"stardew-valley": "#8FBC8F",
	"the-binding-of-isaac": "#8B4513",
};

const gameEmojis: Record<string, string> = {
	"pizza-tower": "🍕",
	"a-dark-room": "🕯️",
	dredge: "🎣",
	"cassette-beasts": "📻",
	celeste: "🏔️",
	"katana-zero": "⚔️",
	"outer-wilds": "🚀",
	superhot: "🔥",
	hades: "🔱",
	"among-us": "👨‍🚀",
	"fall-guys": "🍭",
	cuphead: "☕",
	"hollow-knight": "🗡️",
	"stardew-valley": "🌾",
	"the-binding-of-isaac": "👁️",
};

export function GameImage({ src, alt, width = 315, height = 250, className }: GameImageProps) {
	// Extract game slug from src path
	const gameSlug = src.split("/").pop()?.replace(".svg", "") || "default";
	const color = gameColors[gameSlug] || "#3D4852";
	const emoji = gameEmojis[gameSlug] || "🎮";

	return (
		<div
			className={cn("flex items-center justify-center flex-col", className)}
			style={{
				backgroundColor: color,
				width: width,
				height: height,
				borderRadius: "8px",
			}}
		>
			<div className="text-4xl mb-2">{emoji}</div>
			<div className="text-white text-sm text-center px-2 opacity-80 font-medium">{alt}</div>
		</div>
	);
}
