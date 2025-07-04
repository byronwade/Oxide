import React, { useState, useMemo } from "react";
import type { Game } from "@/../../packages/shared/types/game-data";

interface LibraryGame extends Game {
	playtime: number;
	lastPlayed: string;
}

const mockGames: LibraryGame[] = [
	{ id: "1", title: "Cyberpunk 2077", developerId: "CD Projekt Red", playtime: 45.5, lastPlayed: "2 hours ago", price: 5999, tags: [], coverImage: "", rating: 4.5, createdAt: "", updatedAt: "" },
	{ id: "2", title: "The Witcher 3", developerId: "CD Projekt Red", playtime: 127.2, lastPlayed: "Yesterday", price: 4999, tags: [], coverImage: "", rating: 4.8, createdAt: "", updatedAt: "" },
	{ id: "3", title: "Elden Ring", developerId: "FromSoftware", playtime: 89.1, lastPlayed: "3 days ago", price: 5999, tags: [], coverImage: "", rating: 4.9, createdAt: "", updatedAt: "" },
	{ id: "4", title: "Baldur's Gate 3", developerId: "Larian Studios", playtime: 156.7, lastPlayed: "1 week ago", price: 5999, tags: [], coverImage: "", rating: 4.7, createdAt: "", updatedAt: "" },
	{ id: "5", title: "Red Dead Redemption 2", developerId: "Rockstar Games", playtime: 78.3, lastPlayed: "2 weeks ago", price: 5999, tags: [], coverImage: "", rating: 4.6, createdAt: "", updatedAt: "" },
	{ id: "6", title: "God of War", developerId: "Santa Monica Studio", playtime: 34.2, lastPlayed: "3 weeks ago", price: 5999, tags: [], coverImage: "", rating: 4.7, createdAt: "", updatedAt: "" },
	{ id: "7", title: "Horizon Zero Dawn", developerId: "Guerrilla Games", playtime: 67.8, lastPlayed: "1 month ago", price: 5999, tags: [], coverImage: "", rating: 4.5, createdAt: "", updatedAt: "" },
	{ id: "8", title: "Death Stranding", developerId: "Kojima Productions", playtime: 23.4, lastPlayed: "2 months ago", price: 5999, tags: [], coverImage: "", rating: 4.4, createdAt: "", updatedAt: "" },
];

const collections = [
	{ id: "all", name: "All Games", color: "bg-blue-500" },
	{ id: "recent", name: "Recently Played", color: "bg-green-500" },
	{ id: "favorites", name: "Favorites", color: "bg-red-500" },
	{ id: "installed", name: "Installed", color: "bg-purple-500" },
	{ id: "wishlist", name: "Wishlist", color: "bg-yellow-500" },
];

export interface LibrarySidebarProps {
	selectedGameId?: string;
	onGameSelect?: (game: LibraryGame) => void;
}

export const LibrarySidebar: React.FC<LibrarySidebarProps> = ({ selectedGameId, onGameSelect }) => {
	const [selectedCollection, setSelectedCollection] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredGames = useMemo(() => {
		return mockGames.filter((game) => {
			const matchesSearch = searchQuery === "" || game.title.toLowerCase().includes(searchQuery.toLowerCase()) || (game.developerId && game.developerId.toLowerCase().includes(searchQuery.toLowerCase()));
			const matchesCollection = selectedCollection === "all" || (selectedCollection === "recent" && ["2 hours ago", "Yesterday", "3 days ago"].includes(game.lastPlayed)) || (selectedCollection === "installed" && true); // All are installed in mock
			return matchesSearch && matchesCollection;
		});
	}, [searchQuery, selectedCollection]);

	function formatPlayTime(hours: number) {
		if (hours < 1) return `${Math.round(hours * 60)}m`;
		if (hours < 100) return `${Math.round(hours * 10) / 10}h`;
		return `${Math.round(hours)}h`;
	}

	return (
		<div className="w-96 bg-black/40 backdrop-blur-xl border-r border-gray-800/50 flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-gray-800/50">
				<h2 className="text-lg font-semibold text-white mb-3">Game Library</h2>
				{/* Search */}
				<div className="relative mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input type="text" placeholder="Search games..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
				</div>
				{/* Collections Filter */}
				<div className="flex flex-wrap gap-2">
					{collections.map((collection) => (
						<button key={collection.id} onClick={() => setSelectedCollection(collection.id)} className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs transition-all duration-200 ${selectedCollection === collection.id ? "bg-white text-black" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"}`}>
							<div className={`w-1.5 h-1.5 ${collection.color} rounded-full`}></div>
							<span>{collection.name}</span>
							<span className="opacity-60">({filteredGames.length})</span>
						</button>
					))}
				</div>
			</div>
			{/* Games List */}
			<div className="flex-1 overflow-y-auto">
				<div className="p-2">
					{filteredGames.length === 0 ? (
						<div className="text-center py-12">
							<div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
									<line x1="3" y1="9" x2="21" y2="9"></line>
									<line x1="9" y1="21" x2="9" y2="9"></line>
								</svg>
							</div>
							<p className="text-gray-400 text-sm">No games found</p>
						</div>
					) : (
						<div className="space-y-1">
							{filteredGames.map((game) => (
								<button key={game.id} onClick={() => onGameSelect?.(game)} className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group text-left ${selectedGameId === game.id ? "bg-white/10 border border-white/20" : ""}`}>
									{/* Game Thumbnail */}
									<div className="w-12 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden flex-shrink-0 relative">
										<div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">{game.title.slice(0, 2).toUpperCase()}</div>
										{/* Status indicator */}
										<div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
									</div>
									{/* Game Info */}
									<div className="flex-1 min-w-0">
										<h3 className={`font-medium text-white text-sm truncate group-hover:text-gray-100 ${selectedGameId === game.id ? "text-white" : ""}`}>{game.title}</h3>
										<p className="text-xs text-gray-400 truncate">{game.developerId}</p>
										<div className="flex items-center justify-between mt-1">
											<span className="text-xs text-gray-500">{formatPlayTime(game.playtime ?? 0)}</span>
											<span className="text-xs text-gray-500">{game.lastPlayed}</span>
										</div>
									</div>
								</button>
							))}
						</div>
					)}
				</div>
			</div>
			{/* Footer Stats */}
			<div className="p-4 border-t border-gray-800/50">
				<div className="flex items-center justify-between text-xs text-gray-400">
					<span>{filteredGames.length} games</span>
					<span>{mockGames.length} installed</span>
				</div>
			</div>
		</div>
	);
};

export default LibrarySidebar;
