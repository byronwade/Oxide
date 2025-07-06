import React from "react";
import type { Game } from "@/../../packages/shared/types/game-data";

const mockGame: Game = {
	id: "1",
	title: "Cyberpunk 2077",
	developerId: "CD Projekt Red",
	description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
	coverImage: "https://images.unsplash.com/photo-1581333107593-daoshi490970a2?q=80&w=400&auto=format&fit=crop",
	price: 5999,
	tags: ["RPG", "Open World"],
	screenshots: ["https://images.unsplash.com/photo-1581333107593-daoshi490970a2?q=80&w=400&auto=format&fit=crop", "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop", "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=400&auto=format&fit=crop"],
	rating: 4.5,
	downloadCount: 1000000,
	createdAt: "2023-01-01T00:00:00Z",
	updatedAt: "2023-01-01T00:00:00Z",
};

export interface GameDetailsProps {
	game?: Game | null;
}

function formatPlayTime(hours: number) {
	if (hours < 1) return `${Math.round(hours * 60)} minutes`;
	if (hours < 100) return `${Math.round(hours * 10) / 10} hours`;
	return `${Math.round(hours)} hours`;
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
	const displayGame = game || mockGame;

	// Mock achievements and friends for demo
	const achievements = [
		{ name: "Street Cred", description: "Reach Street Cred level 10", earned: "2 days ago", icon: "🏆" },
		{ name: "Cyberware", description: "Install your first cyberware", earned: "1 week ago", icon: "⚡" },
		{ name: "Night City", description: "Complete the prologue", earned: "2 weeks ago", icon: "🌃" },
	];
	const friends = [
		{ name: "Alex_Gaming", playtime: 67.2, status: "online" },
		{ name: "Sarah_K", playtime: 23.1, status: "offline" },
		{ name: "Mike_RPG", playtime: 156.8, status: "playing" },
	];

	function getStatusColor(status: string) {
		switch (status) {
			case "online":
				return "bg-green-500";
			case "playing":
				return "bg-blue-500";
			case "away":
				return "bg-yellow-500";
			default:
				return "bg-gray-500";
		}
	}

	function launchGame() {
		// Integrate with game launching logic
		alert(`Launching ${displayGame.title}...`);
	}

	function viewInStore() {
		// Navigate to store page for this game
		alert(`Viewing ${displayGame.title} in store...`);
	}

	if (!displayGame) {
		return (
			<div className="flex-1 bg-black/20 backdrop-blur-xl flex items-center justify-center">
				<div className="text-center">
					<div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
							<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
							<line x1="3" y1="9" x2="21" y2="9"></line>
							<line x1="9" y1="21" x2="9" y2="9"></line>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-white mb-2">Select a Game</h3>
					<p className="text-gray-400">Choose a game from your library to view details, achievements, and more.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 bg-black/20 backdrop-blur-xl overflow-y-auto">
			{/* Game Header */}
			<div className="relative">
				{/* Hero Image */}
				<div className="h-64 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
					<div className="absolute inset-0 bg-black/30"></div>
					<div className="absolute bottom-6 left-6 right-6">
						<h1 className="text-4xl font-bold text-white mb-2">{displayGame.title}</h1>
						<p className="text-gray-200 text-lg">{displayGame.developerId}</p>
					</div>
				</div>
				{/* Action Buttons */}
				<div className="absolute top-6 right-6 flex space-x-3">
					<button onClick={launchGame} className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<polygon points="5,3 19,12 5,21"></polygon>
						</svg>
						<span>Play</span>
					</button>
					<button onClick={viewInStore} className="bg-gray-800/80 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
						Store Page
					</button>
				</div>
			</div>
			{/* Game Stats */}
			<div className="p-6 border-b border-gray-800/50">
				<div className="grid grid-cols-3 gap-6">
					<div className="text-center">
						<div className="text-2xl font-bold text-white">{formatPlayTime(45.5)}</div>
						<div className="text-gray-400 text-sm">Total Playtime</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-white">23/44</div>
						<div className="text-gray-400 text-sm">Achievements</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-white">{Math.round((23 / 44) * 100)}%</div>
						<div className="text-gray-400 text-sm">Completion</div>
					</div>
				</div>
			</div>
			{/* Description */}
			<div className="p-6 border-b border-gray-800/50">
				<h3 className="text-lg font-semibold text-white mb-3">About</h3>
				<p className="text-gray-300 leading-relaxed">{displayGame.description}</p>
			</div>
			{/* Recent Achievements */}
			<div className="p-6 border-b border-gray-800/50">
				<h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
				<div className="space-y-3">
					{achievements.map((achievement, i) => (
						<div key={i} className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
							<div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-2xl">{achievement.icon}</div>
							<div className="flex-1">
								<div className="text-white font-medium">{achievement.name}</div>
								<div className="text-gray-400 text-sm">{achievement.description}</div>
								<div className="text-gray-500 text-xs mt-1">Earned {achievement.earned}</div>
							</div>
						</div>
					))}
				</div>
				<button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200">View All Achievements →</button>
			</div>
			{/* Friends Activity */}
			<div className="p-6 border-b border-gray-800/50">
				<h3 className="text-lg font-semibold text-white mb-4">Friends Playing</h3>
				<div className="space-y-3">
					{friends.map((friend, i) => (
						<div key={i} className="flex items-center space-x-3">
							<div className="relative">
								<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{friend.name.slice(0, 2).toUpperCase()}</div>
								<div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(friend.status)} rounded-full border-2 border-black`}></div>
							</div>
							<div className="flex-1">
								<div className="text-white text-sm font-medium">{friend.name}</div>
								<div className="text-gray-400 text-xs">{formatPlayTime(friend.playtime)} played</div>
							</div>
							{friend.status === "playing" && <div className="text-green-400 text-xs font-medium">Playing now</div>}
						</div>
					))}
				</div>
			</div>
			{/* Screenshots */}
			<div className="p-6">
				<h3 className="text-lg font-semibold text-white mb-4">Screenshots</h3>
				<div className="grid grid-cols-2 gap-4">
					{displayGame.screenshots?.map((screenshot, index) => (
						<div key={index} className="aspect-video bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
							<div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">Screenshot {index + 1}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GameDetails;
