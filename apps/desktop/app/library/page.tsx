"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Search, Filter, Grid, List, Star, Heart, Play, Download, Gamepad2, TrendingUp, Zap, Bookmark, Settings, ChevronDown, X, Tag, Users, Clock, FolderOpen, MoreHorizontal, ExternalLink, Trash2, Edit, Info, Cloud, HardDrive, Wifi, WifiOff, Pause, XCircle, CheckCircle, AlertCircle } from "lucide-react";

// Mock data
const installedGames = [
	{
		id: "1",
		title: "Cybernetic Horizon",
		image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
		status: "installed",
		lastPlayed: "2 hours ago",
		playTime: "45.2 hours",
		size: "12.4 GB",
		version: "1.2.4",
		platform: "local",
		updateAvailable: false,
		cloudSync: true,
	},
	{
		id: "2",
		title: "Neural Networks",
		image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
		status: "downloading",
		lastPlayed: "1 day ago",
		playTime: "23.7 hours",
		size: "8.1 GB",
		version: "1.1.2",
		platform: "local",
		updateAvailable: true,
		cloudSync: true,
		downloadProgress: 67,
	},
	{
		id: "3",
		title: "Quantum Realms",
		image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
		status: "cloud",
		lastPlayed: "3 days ago",
		playTime: "12.8 hours",
		size: "15.2 GB",
		version: "1.3.1",
		platform: "cloud",
		updateAvailable: false,
		cloudSync: true,
	},
	{
		id: "4",
		title: "Echoes of Tomorrow",
		image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
		status: "needs-update",
		lastPlayed: "1 week ago",
		playTime: "8.5 hours",
		size: "6.7 GB",
		version: "1.0.8",
		platform: "local",
		updateAvailable: true,
		cloudSync: false,
	},
	{
		id: "5",
		title: "Stellar Odyssey",
		image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
		status: "installed",
		lastPlayed: "5 days ago",
		playTime: "67.3 hours",
		size: "22.1 GB",
		version: "2.0.1",
		platform: "local",
		updateAvailable: false,
		cloudSync: true,
	},
	{
		id: "6",
		title: "Mystic Legends",
		image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
		status: "installed",
		lastPlayed: "2 weeks ago",
		playTime: "34.9 hours",
		size: "18.6 GB",
		version: "1.5.3",
		platform: "local",
		updateAvailable: false,
		cloudSync: true,
	},
];

const downloadQueue = [
	{
		id: "2",
		title: "Neural Networks",
		progress: 67,
		speed: "2.4 MB/s",
		remaining: "2.7 GB",
		eta: "18 min",
		status: "downloading",
	},
	{
		id: "7",
		title: "Digital Dreams",
		progress: 0,
		speed: "0 MB/s",
		remaining: "5.2 GB",
		eta: "Queued",
		status: "queued",
	},
];

const categories = [
	{ id: "all", name: "All Games", count: installedGames.length },
	{ id: "installed", name: "Installed", count: installedGames.filter((g) => g.status === "installed").length },
	{ id: "downloading", name: "Downloading", count: installedGames.filter((g) => g.status === "downloading").length },
	{ id: "cloud", name: "Cloud Games", count: installedGames.filter((g) => g.status === "cloud").length },
	{ id: "needs-update", name: "Needs Update", count: installedGames.filter((g) => g.updateAvailable).length },
];

export default function Library() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [sortBy, setSortBy] = useState("recent");

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "installed":
				return <CheckCircle className="w-4 h-4 text-[#80FF00]" />;
			case "downloading":
				return <Download className="w-4 h-4 text-[#00FFC6] animate-pulse" />;
			case "cloud":
				return <Cloud className="w-4 h-4 text-[#00FFC6]" />;
			case "needs-update":
				return <AlertCircle className="w-4 h-4 text-[#FF3B3B]" />;
			default:
				return <Clock className="w-4 h-4 text-[#AAAAAA]" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "installed":
				return "text-[#80FF00]";
			case "downloading":
				return "text-[#00FFC6]";
			case "cloud":
				return "text-[#00FFC6]";
			case "needs-update":
				return "text-[#FF3B3B]";
			default:
				return "text-[#AAAAAA]";
		}
	};

	return (
		<div className="space-y-6 max-w-none">
			{/* Header */}
			<section className="native-panel p-4">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold font-oxanium text-[#F2F2F2]">Library</h1>
					<div className="flex items-center gap-3">
						<Button variant="outline" className="native-button">
							<FolderOpen className="w-4 h-4 mr-2" />
							Add Game
						</Button>
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
						<Input placeholder="Search your games..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="native-input pl-10" />
					</div>

					<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="native-input w-40">
						<option value="recent">Recently Played</option>
						<option value="name">Name</option>
						<option value="size">Size</option>
						<option value="playtime">Play Time</option>
					</select>
				</div>
			</section>

			{/* Download Queue */}
			{downloadQueue.length > 0 && (
				<section className="native-spacing">
					<div className="flex items-center gap-2 mb-4">
						<Download className="w-5 h-5 text-[#00FFC6]" />
						<h2 className="text-lg font-semibold text-[#F2F2F2]">Downloads</h2>
					</div>

					<div className="space-y-3">
						{downloadQueue.map((download) => (
							<div key={download.id} className="native-panel p-4">
								<div className="flex items-center justify-between mb-3">
									<div className="flex items-center gap-3">
										{download.status === "downloading" ? <Download className="w-5 h-5 text-[#00FFC6] animate-pulse" /> : <Clock className="w-5 h-5 text-[#AAAAAA]" />}
										<div>
											<h3 className="font-medium text-[#F2F2F2]">{download.title}</h3>
											<div className="flex items-center gap-4 text-sm text-[#AAAAAA]">
												<span>{download.speed}</span>
												<span>{download.remaining} remaining</span>
												<span>ETA: {download.eta}</span>
											</div>
										</div>
									</div>

									<div className="flex items-center gap-2">
										<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
											<Pause className="w-4 h-4" />
										</Button>
										<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
											<XCircle className="w-4 h-4" />
										</Button>
									</div>
								</div>

								<div className="w-full bg-[#2B2B2B] rounded-sm h-2 overflow-hidden">
									<div className="h-full bg-[#00FFC6] transition-all duration-300" style={{ width: `${download.progress}%` }} />
								</div>
							</div>
						))}
					</div>
				</section>
			)}

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
						<span className="text-sm text-[#AAAAAA]">({installedGames.length} games)</span>
					</div>
				</div>

				{viewMode === "grid" ? (
					<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
						{installedGames.map((game) => (
							<div key={game.id} className="game-card-native-interactive group">
								<div className="relative aspect-video overflow-hidden">
									<Image src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
									<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />

									{/* Status Badge */}
									<div className="absolute top-2 left-2 flex items-center gap-1">
										{getStatusIcon(game.status)}
										<span className={`text-xs font-medium ${getStatusColor(game.status)}`}>{game.status === "installed" ? "Ready" : game.status === "downloading" ? "Downloading" : game.status === "cloud" ? "Cloud" : "Update"}</span>
									</div>

									{/* Platform Icon */}
									<div className="absolute top-2 right-2">{game.platform === "cloud" ? <Cloud className="w-4 h-4 text-[#00FFC6]" /> : <HardDrive className="w-4 h-4 text-[#F2F2F2]" />}</div>

									{/* Quick Actions */}
									<div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<Button size="sm" className="h-6 w-6 p-0 bg-[#00FFC6] text-[#0A0A0A]">
											<Play className="w-3 h-3" />
										</Button>
									</div>
								</div>

								<div className="p-3">
									<h3 className="font-medium text-[#F2F2F2] text-sm mb-1 truncate">{game.title}</h3>

									{/* Game Info */}
									<div className="space-y-1 mb-3">
										<div className="flex items-center justify-between text-xs">
											<span className="text-[#AAAAAA]">Last played:</span>
											<span className="text-[#F2F2F2]">{game.lastPlayed}</span>
										</div>
										<div className="flex items-center justify-between text-xs">
											<span className="text-[#AAAAAA]">Play time:</span>
											<span className="text-[#F2F2F2]">{game.playTime}</span>
										</div>
										<div className="flex items-center justify-between text-xs">
											<span className="text-[#AAAAAA]">Size:</span>
											<span className="text-[#F2F2F2]">{game.size}</span>
										</div>
									</div>

									{/* Actions */}
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-1">
											{game.cloudSync && <Wifi className="w-3 h-3 text-[#00FFC6]" />}
											<span className="text-xs text-[#AAAAAA]">v{game.version}</span>
										</div>

										<div className="flex items-center gap-1">
											<Button variant="ghost" size="sm" className="h-6 w-6 p-0">
												<MoreHorizontal className="w-3 h-3" />
											</Button>
											<Button size="sm" className="h-6 px-2 bg-[#00FFC6] text-[#0A0A0A] text-xs">
												<Play className="w-3 h-3 mr-1" />
												Play
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="space-y-3">
						{installedGames.map((game) => (
							<div key={game.id} className="native-panel p-4">
								<div className="flex gap-4">
									<div className="relative w-32 h-20 flex-shrink-0">
										<Image src={game.image} alt={game.title} fill className="object-cover rounded-sm" />
										<div className="absolute top-1 left-1">{getStatusIcon(game.status)}</div>
									</div>

									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between mb-2">
											<div>
												<h3 className="font-medium text-[#F2F2F2] text-base mb-1">{game.title}</h3>
												<div className="flex items-center gap-4 text-sm text-[#AAAAAA]">
													<span>Last played: {game.lastPlayed}</span>
													<span>Play time: {game.playTime}</span>
													<span>Size: {game.size}</span>
												</div>
											</div>
											<div className="flex items-center gap-2">
												{game.cloudSync && <Wifi className="w-4 h-4 text-[#00FFC6]" />}
												<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</div>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4">
												<span className={`text-sm font-medium ${getStatusColor(game.status)}`}>{game.status === "installed" ? "Ready to Play" : game.status === "downloading" ? "Downloading..." : game.status === "cloud" ? "Cloud Game" : "Update Available"}</span>
												<span className="text-sm text-[#AAAAAA]">v{game.version}</span>
											</div>

											<div className="flex items-center gap-2">
												{game.updateAvailable && (
													<Button variant="outline" className="native-button h-8">
														<Download className="w-4 h-4 mr-2" />
														Update
													</Button>
												)}
												<Button className="native-button-primary h-8">
													<Play className="w-4 h-4 mr-2" />
													Play Now
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
