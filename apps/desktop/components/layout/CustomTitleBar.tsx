"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List, Settings, Minimize, Maximize, X, Menu, Gamepad2 } from "lucide-react";

interface CustomTitleBarProps {
	activeView: string;
	setActiveView: (view: string) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	isMobile: boolean;
	isSidebarCollapsed: boolean;
	setIsSidebarCollapsed: (collapsed: boolean) => void;
}

export function CustomTitleBar({ activeView, setActiveView, searchQuery, setSearchQuery, isMobile, isSidebarCollapsed, setIsSidebarCollapsed }: CustomTitleBarProps) {
	const [isMaximized, setIsMaximized] = useState(false);

	const handleMinimize = () => {
		// In a real Tauri app, this would minimize the window
		console.log("Minimize window");
	};

	const handleMaximize = () => {
		setIsMaximized(!isMaximized);
		// In a real Tauri app, this would maximize/restore the window
		console.log("Maximize/Restore window");
	};

	const handleClose = () => {
		// In a real Tauri app, this would close the window
		console.log("Close window");
	};

	return (
		<div className="native-header flex items-center justify-between native-drag">
			{/* Left side - Menu and Search */}
			<div className="flex items-center gap-3 native-no-drag">
				{/* Sidebar toggle for mobile */}
				{isMobile && (
					<Button variant="ghost" size="sm" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="h-8 w-8 p-0 hover:bg-[#2B2B2B]">
						<Menu className="w-4 h-4" />
					</Button>
				)}

				{/* Search Bar */}
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
					<Input placeholder="Search games, friends, or settings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="native-input pl-10 w-80 h-8 text-sm" />
				</div>

				{/* View Toggle */}
				{activeView === "store" && (
					<div className="flex border border-[#2B2B2B] rounded-sm overflow-hidden">
						<Button variant="ghost" size="sm" className="h-8 px-3 text-[#F2F2F2] hover:bg-[#2B2B2B] rounded-none border-r border-[#2B2B2B]">
							<Grid className="w-4 h-4" />
						</Button>
						<Button variant="ghost" size="sm" className="h-8 px-3 text-[#F2F2F2] hover:bg-[#2B2B2B] rounded-none">
							<List className="w-4 h-4" />
						</Button>
					</div>
				)}
			</div>

			{/* Center - App Title */}
			<div className="flex items-center gap-2 native-no-drag">
				<div className="w-6 h-6 bg-gradient-to-br from-[#00FFC6] to-[#80FF00] rounded-sm flex items-center justify-center">
					<Gamepad2 className="w-4 h-4 text-[#0A0A0A]" />
				</div>
				<span className="text-sm font-medium text-[#F2F2F2]">Oxide Desktop</span>
			</div>

			{/* Right side - Window Controls */}
			<div className="flex items-center native-no-drag">
				{/* Settings */}
				<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#2B2B2B]">
					<Settings className="w-4 h-4" />
				</Button>

				{/* Window Controls */}
				<div className="flex ml-2">
					<Button variant="ghost" size="sm" onClick={handleMinimize} className="h-8 w-12 p-0 hover:bg-[#2B2B2B] rounded-none border-l border-[#2B2B2B]">
						<Minimize className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="sm" onClick={handleMaximize} className="h-8 w-12 p-0 hover:bg-[#2B2B2B] rounded-none border-l border-[#2B2B2B]">
						<Maximize className="w-4 h-4" />
					</Button>
					<Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-12 p-0 hover:bg-[#FF3B3B] hover:text-white rounded-none border-l border-[#2B2B2B]">
						<X className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
