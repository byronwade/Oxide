"use client";

import { memo } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Play, Pause, Settings, FolderOpen, Star, Clock, HardDrive, Trophy, Heart, MoreHorizontal, Download, CheckCircle, AlertCircle, RefreshCw, Trash2, Share, Cloud, Gamepad2 } from "lucide-react";

interface LibraryGame {
	id: string;
	title: string;
	developer: string;
	coverImage: string;
	status: "installed" | "downloading" | "queued" | "paused" | "error" | "not-installed";
	lastPlayed?: string;
	playtime: number;
	achievements: {
		unlocked: number;
		total: number;
	};
	size: number;
	installLocation: string;
	version: string;
	rating?: number;
	progress?: number;
	downloadSpeed?: number;
	category: "games" | "dlc" | "tools" | "demos";
	tags: string[];
	hasCloudSave: boolean;
	autoUpdate: boolean;
	favorited: boolean;
}

interface LibraryGameCardProps {
	game: LibraryGame;
	viewMode?: "grid" | "list";
	className?: string;
	onGameAction?: (gameId: string, action: string) => void;
}

export const LibraryGameCard = memo(function LibraryGameCard({ game, viewMode = "grid", className = "", onGameAction }: LibraryGameCardProps) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "installed":
				return "bg-green-500/20 text-green-400";
			case "downloading":
				return "bg-blue-500/20 text-blue-400";
			case "paused":
				return "bg-yellow-500/20 text-yellow-400";
			case "error":
				return "bg-red-500/20 text-red-400";
			default:
				return "bg-gray-500/20 text-gray-400";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "installed":
				return <CheckCircle className="w-4 h-4" />;
			case "downloading":
				return <Download className="w-4 h-4" />;
			case "paused":
				return <Pause className="w-4 h-4" />;
			case "error":
				return <AlertCircle className="w-4 h-4" />;
			default:
				return <RefreshCw className="w-4 h-4" />;
		}
	};

	const formatPlaytime = (hours: number) => {
		if (hours < 1) return `${Math.round(hours * 60)}m`;
		if (hours < 100) return `${hours.toFixed(1)}h`;
		return `${Math.round(hours)}h`;
	};

	const formatFileSize = (gb: number) => {
		if (gb < 1) return `${Math.round(gb * 1024)}MB`;
		return `${gb.toFixed(1)}GB`;
	};

	const formatLastPlayed = (dateString?: string) => {
		if (!dateString) return "Never";
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 1) return "Yesterday";
		if (diffDays < 7) return `${diffDays} days ago`;
		if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
		return date.toLocaleDateString();
	};

	if (viewMode === "list") {
		return (
			<Card className={`bg-[#1C1C1C] border-[#2B2B2B] hover:border-[#00FFC6]/50 transition-colors ${className}`}>
				<CardContent className="p-4">
					<div className="flex items-center gap-4">
						{/* Game Cover */}
						<div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#2B2B2B] flex-shrink-0">
							<img
								src={game.coverImage}
								alt={game.title}
								className="w-full h-full object-cover"
								onError={(e) => {
									const img = e.target as HTMLImageElement;
									img.style.display = "none";
									img.parentElement?.appendChild(
										Object.assign(document.createElement("div"), {
											className: "w-full h-full bg-[#2B2B2B] flex items-center justify-center",
											innerHTML: '<svg class="w-8 h-8 text-[#3D3D3D]"><use href="#gamepad-icon"></use></svg>',
										})
									);
								}}
							/>
							<div className="absolute top-1 right-1">
								<Badge className={`text-xs px-1 py-0.5 ${getStatusColor(game.status)}`}>{getStatusIcon(game.status)}</Badge>
							</div>
						</div>

						{/* Game Info */}
						<div className="flex-1 min-w-0">
							<div className="flex items-start justify-between">
								<div className="flex-1 min-w-0">
									<h3 className="font-semibold text-[#F2F2F2] text-lg mb-1 truncate">{game.title}</h3>
									<p className="text-[#AAAAAA] text-sm mb-2">{game.developer}</p>

									<div className="flex items-center gap-4 text-sm text-[#AAAAAA] mb-2">
										<span className="flex items-center gap-1">
											<Clock className="w-3 h-3" />
											{formatPlaytime(game.playtime)}
										</span>
										<span className="flex items-center gap-1">
											<HardDrive className="w-3 h-3" />
											{formatFileSize(game.size)}
										</span>
										{game.rating && (
											<span className="flex items-center gap-1">
												<Star className="w-3 h-3 text-yellow-400" />
												{game.rating.toFixed(1)}
											</span>
										)}
										<span>Last played: {formatLastPlayed(game.lastPlayed)}</span>
									</div>

									{/* Progress Bar for Downloads */}
									{game.status === "downloading" && game.progress !== undefined && (
										<div className="mb-2">
											<div className="flex items-center justify-between mb-1">
												<span className="text-xs text-[#AAAAAA]">Downloading... {game.downloadSpeed}MB/s</span>
												<span className="text-xs text-[#00FFC6]">{game.progress}%</span>
											</div>
											<Progress value={game.progress} className="h-1" />
										</div>
									)}

									{/* Achievement Progress */}
									{game.achievements.total > 0 && (
										<div className="flex items-center gap-2 text-xs text-[#AAAAAA]">
											<Trophy className="w-3 h-3" />
											<span>
												{game.achievements.unlocked}/{game.achievements.total} achievements
											</span>
											<span className="text-[#00FFC6]">({Math.round((game.achievements.unlocked / game.achievements.total) * 100)}%)</span>
										</div>
									)}
								</div>

								{/* Actions */}
								<div className="flex items-center gap-2 ml-4">
									{game.favorited && <Heart className="w-4 h-4 text-[#00FFC6] fill-current" />}
									{game.hasCloudSave && <Cloud className="w-4 h-4 text-blue-400" />}

									{game.status === "installed" ? (
										<Button size="sm" onClick={() => onGameAction?.(game.id, "play")} className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
											<Play className="w-4 h-4 mr-1" />
											Play
										</Button>
									) : game.status === "downloading" ? (
										<Button variant="outline" size="sm" onClick={() => onGameAction?.(game.id, "pause")} className="border-[#3D3D3D]">
											<Pause className="w-4 h-4" />
										</Button>
									) : (
										<Button variant="outline" size="sm" onClick={() => onGameAction?.(game.id, "install")} className="border-[#3D3D3D]">
											<Download className="w-4 h-4 mr-1" />
											Install
										</Button>
									)}

									<Button variant="ghost" size="sm" className="text-[#AAAAAA]">
										<MoreHorizontal className="w-4 h-4" />
									</Button>
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
		<Card className={`bg-[#1C1C1C] border-[#2B2B2B] hover:border-[#00FFC6]/50 transition-colors group ${className}`}>
			<CardContent className="p-0">
				{/* Game Cover */}
				<div className="relative aspect-[4/5] rounded-t-lg overflow-hidden bg-[#2B2B2B]">
					<img
						src={game.coverImage}
						alt={game.title}
						className="w-full h-full object-cover"
						onError={(e) => {
							const img = e.target as HTMLImageElement;
							img.style.display = "none";
							const placeholder = document.createElement("div");
							placeholder.className = "w-full h-full bg-[#2B2B2B] flex items-center justify-center";
							placeholder.innerHTML = '<div class="w-16 h-16 text-[#3D3D3D] flex items-center justify-center"><svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M7 6v12l10-6z"/></svg></div>';
							img.parentElement?.appendChild(placeholder);
						}}
					/>

					{/* Status Badge */}
					<div className="absolute top-3 left-3">
						<Badge className={`text-xs px-2 py-1 ${getStatusColor(game.status)}`}>
							{getStatusIcon(game.status)}
							<span className="ml-1 capitalize">{game.status}</span>
						</Badge>
					</div>

					{/* Favorite & Cloud Save Icons */}
					<div className="absolute top-3 right-3 flex gap-2">
						{game.favorited && (
							<div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
								<Heart className="w-3 h-3 text-[#00FFC6] fill-current" />
							</div>
						)}
						{game.hasCloudSave && (
							<div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
								<Cloud className="w-3 h-3 text-blue-400" />
							</div>
						)}
					</div>

					{/* Download Progress Overlay */}
					{game.status === "downloading" && game.progress !== undefined && (
						<div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs text-[#F2F2F2]">Downloading...</span>
								<span className="text-xs text-[#00FFC6]">{game.progress}%</span>
							</div>
							<Progress value={game.progress} className="h-1" />
						</div>
					)}
				</div>

				{/* Game Info */}
				<div className="p-4">
					<div className="flex items-start justify-between mb-2">
						<h3 className="font-semibold text-[#F2F2F2] text-lg leading-tight line-clamp-1">{game.title}</h3>
						<Button variant="ghost" size="sm" className="p-1 text-[#AAAAAA]">
							<MoreHorizontal className="w-4 h-4" />
						</Button>
					</div>

					<p className="text-[#AAAAAA] text-sm mb-3">{game.developer}</p>

					{/* Stats */}
					<div className="space-y-2 mb-4">
						<div className="flex items-center justify-between text-sm">
							<span className="text-[#AAAAAA]">Playtime</span>
							<span className="text-[#F2F2F2]">{formatPlaytime(game.playtime)}</span>
						</div>
						<div className="flex items-center justify-between text-sm">
							<span className="text-[#AAAAAA]">Size</span>
							<span className="text-[#F2F2F2]">{formatFileSize(game.size)}</span>
						</div>
						{game.rating && (
							<div className="flex items-center justify-between text-sm">
								<span className="text-[#AAAAAA]">Rating</span>
								<div className="flex items-center gap-1">
									<Star className="w-3 h-3 text-yellow-400" />
									<span className="text-[#F2F2F2]">{game.rating.toFixed(1)}</span>
								</div>
							</div>
						)}
						{game.achievements.total > 0 && (
							<div className="flex items-center justify-between text-sm">
								<span className="text-[#AAAAAA]">Achievements</span>
								<span className="text-[#F2F2F2]">
									{game.achievements.unlocked}/{game.achievements.total}
								</span>
							</div>
						)}
					</div>

					<div className="text-xs text-[#AAAAAA] mb-4">Last played: {formatLastPlayed(game.lastPlayed)}</div>

					{/* Actions */}
					<div className="flex gap-2">
						{game.status === "installed" ? (
							<Button className="flex-1 bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]" onClick={() => onGameAction?.(game.id, "play")}>
								<Play className="w-4 h-4 mr-2" />
								Play
							</Button>
						) : game.status === "downloading" ? (
							<Button variant="outline" className="flex-1 border-[#3D3D3D]" onClick={() => onGameAction?.(game.id, "pause")}>
								<Pause className="w-4 h-4 mr-2" />
								Pause
							</Button>
						) : (
							<Button variant="outline" className="flex-1 border-[#3D3D3D]" onClick={() => onGameAction?.(game.id, "install")}>
								<Download className="w-4 h-4 mr-2" />
								Install
							</Button>
						)}

						<Button variant="outline" size="sm" className="border-[#3D3D3D]">
							<Settings className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
});

export default LibraryGameCard;
