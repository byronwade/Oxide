"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minimize2, Maximize2, X, Search, Settings, User, Bell, ShoppingCart, Download, Users } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export function CustomTitleBar() {
	const [isMaximized, setIsMaximized] = useState(false);

	const handleMinimize = async () => {
		const window = getCurrentWindow();
		await window.minimize();
	};

	const handleMaximize = async () => {
		const window = getCurrentWindow();
		if (isMaximized) {
			await window.unmaximize();
			setIsMaximized(false);
		} else {
			await window.maximize();
			setIsMaximized(true);
		}
	};

	const handleClose = async () => {
		const window = getCurrentWindow();
		await window.close();
	};

	return (
		<div className="flex items-center justify-between h-12 bg-black/95 backdrop-blur-xl border-b border-gray-900/50 px-4 select-none rounded-t-xl" data-tauri-drag-region>
			{/* Left: Logo + Navigation */}
			<div className="flex items-center space-x-6" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
				{/* LaunchBeacon Logo */}
				<div className="flex items-center space-x-2">
					<div className="w-6 h-6 bg-rust-500 rounded-sm flex items-center justify-center">
						<span className="text-white text-xs font-bold">LB</span>
					</div>
					<span className="text-white font-semibold text-sm">LaunchBeacon</span>
					<Badge variant="secondary" className="bg-rust-600/20 text-rust-400 border-rust-500/30 text-xs">
						Desktop
					</Badge>
				</div>

				{/* Navigation */}
				<nav className="flex items-center space-x-1">
					<Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800/50">
						Store
					</Button>
					<Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800/50">
						Library
					</Button>
					<Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800/50">
						Community
					</Button>
					<Button variant="ghost" size="sm" className="text-rust-400 hover:text-rust-300 hover:bg-rust-900/20">
						AI Hub
					</Button>
				</nav>
			</div>

			{/* Center: Search Bar */}
			<div className="flex-1 max-w-md mx-8" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
					<input type="text" placeholder="Search games, developers, mods..." className="w-full bg-gray-900/50 border border-gray-800/50 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rust-500/50 focus:border-rust-500/50" />
				</div>
			</div>

			{/* Right: Actions + Window Controls */}
			<div className="flex items-center space-x-2">
				{/* Action Buttons */}
				<div className="flex items-center space-x-1 mr-4" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
					<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2">
						<Bell className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2">
						<Users className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2">
						<ShoppingCart className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2">
						<Download className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2">
						<User className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2">
						<Settings className="w-4 h-4" />
					</Button>
				</div>

				{/* Window Controls */}
				<div className="flex items-center space-x-1" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
					<button onClick={handleMinimize} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
						<Minimize2 className="w-4 h-4" />
					</button>
					<button onClick={handleMaximize} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
						<Maximize2 className="w-4 h-4" />
					</button>
					<button onClick={handleClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/80 rounded transition-colors">
						<X className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
