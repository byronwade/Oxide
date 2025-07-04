import React from "react";
import type { GameCardProps } from "@/../../packages/shared/types/game-data";

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => (
	<div className="group relative bg-gray-900/20 rounded-xl overflow-hidden border border-gray-800/30 hover:border-gray-700/50 hover:bg-gray-900/40 transition-all duration-300 cursor-pointer" onClick={() => onClick?.(game)} tabIndex={0} role="button" aria-label={`Open details for ${game.title}`}>
		{/* Game Image/Placeholder */}
		<div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
			{/* TODO: Replace with <Image /> if available */}
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
				<polygon points="23 7 16 12 23 17 23 7"></polygon>
				<rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
			</svg>
			{/* Play button overlay */}
			<div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" aria-label={`Play ${game.title}`} tabIndex={-1}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-black ml-1">
						<polygon points="5,3 19,12 5,21"></polygon>
					</svg>
				</button>
			</div>
		</div>
		{/* Game Info */}
		<div className="p-4">
			<h3 className="font-semibold text-white text-sm mb-1 truncate" title={game.title}>
				{game.title}
			</h3>
			<p className="text-xs text-gray-400 truncate" title={game.developerId}>
				{game.developerId}
			</p>
			{/* Status indicator */}
			<div className="flex items-center justify-between mt-3">
				<div className="flex items-center space-x-1">
					<div className="w-2 h-2 bg-green-500 rounded-full"></div>
					<span className="text-xs text-gray-500">Installed</span>
				</div>
				{/* Quick actions */}
				<div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
					<button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-800 transition-colors" aria-label={`More options for ${game.title}`} tabIndex={-1}>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
							<circle cx="12" cy="12" r="1"></circle>
							<circle cx="19" cy="12" r="1"></circle>
							<circle cx="5" cy="12" r="1"></circle>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default GameCard;
