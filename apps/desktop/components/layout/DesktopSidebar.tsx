"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Store, Library, Users, Settings, Download, Heart, Gamepad2, ChevronLeft, ChevronRight, User, Bell, MessageSquare, Trophy, Bookmark, FolderOpen, Plus } from "lucide-react";

interface DesktopSidebarProps {
	activeView: string;
	setActiveView: (view: string) => void;
	isCollapsed: boolean;
	setIsCollapsed: (collapsed: boolean) => void;
	isMobile: boolean;
}

export function DesktopSidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed, isMobile }: DesktopSidebarProps) {
	const [notifications, setNotifications] = useState(3);
	const [messages, setMessages] = useState(1);

	const navigationItems = [
		{ id: "home", label: "Home", icon: Home, badge: null },
		{ id: "store", label: "Store", icon: Store, badge: "NEW" },
		{ id: "library", label: "Library", icon: Library, badge: null },
		{ id: "community", label: "Community", icon: Users, badge: messages > 0 ? messages.toString() : null },
		{ id: "downloads", label: "Downloads", icon: Download, badge: null },
		{ id: "wishlist", label: "Wishlist", icon: Heart, badge: null },
		{ id: "achievements", label: "Achievements", icon: Trophy, badge: null },
		{ id: "collections", label: "Collections", icon: Bookmark, badge: null },
	];

	const quickActions = [
		{ id: "add-game", label: "Add Game", icon: Plus, action: () => console.log("Add game") },
		{ id: "scan-folder", label: "Scan Folder", icon: FolderOpen, action: () => console.log("Scan folder") },
	];

	return (
		<div className={`native-sidebar transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} flex flex-col`}>
			{/* Logo Section */}
			<div className="native-header flex items-center justify-between">
				{!isCollapsed && (
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gradient-to-br from-[#00FFC6] to-[#80FF00] rounded-sm flex items-center justify-center">
							<Gamepad2 className="w-5 h-5 text-[#0A0A0A]" />
						</div>
						<span className="text-lg font-bold text-[#F2F2F2]">Oxide</span>
					</div>
				)}
				<Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="native-no-drag h-8 w-8 p-0 hover:bg-[#2B2B2B]">
					{isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
				</Button>
			</div>

			{/* User Profile */}
			{!isCollapsed && (
				<div className="native-panel m-2 p-3">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-[#2B2B2B] rounded-sm flex items-center justify-center">
							<User className="w-5 h-5 text-[#AAAAAA]" />
						</div>
						<div className="flex-1 min-w-0">
							<div className="text-sm font-medium text-[#F2F2F2] truncate">Gamer</div>
							<div className="text-xs text-[#AAAAAA]">Online</div>
						</div>
						<Button variant="ghost" size="sm" className="h-6 w-6 p-0">
							<Bell className="w-3 h-3" />
						</Button>
					</div>
				</div>
			)}

			{/* Navigation */}
			<div className="flex-1 overflow-y-auto native-spacing p-2">
				{!isCollapsed && <div className="text-xs font-medium text-[#AAAAAA] uppercase tracking-wider px-2 py-1">Navigation</div>}

				{navigationItems.map((item) => (
					<Button key={item.id} variant={activeView === item.id ? "default" : "ghost"} className={`w-full justify-start h-10 px-2 ${activeView === item.id ? "bg-[#00FFC6] text-[#0A0A0A] hover:bg-[#00FFC6]/90" : "text-[#F2F2F2] hover:bg-[#2B2B2B]"}`} onClick={() => setActiveView(item.id)}>
						<item.icon className="w-4 h-4 mr-3" />
						{!isCollapsed && (
							<>
								<span className="flex-1 text-left">{item.label}</span>
								{item.badge && <Badge className="ml-auto bg-[#FF3B3B] text-white text-xs px-1 py-0 h-4">{item.badge}</Badge>}
							</>
						)}
					</Button>
				))}

				{/* Quick Actions */}
				{!isCollapsed && (
					<>
						<div className="text-xs font-medium text-[#AAAAAA] uppercase tracking-wider px-2 py-1 mt-4">Quick Actions</div>
						{quickActions.map((action) => (
							<Button key={action.id} variant="ghost" className="w-full justify-start h-10 px-2 text-[#F2F2F2] hover:bg-[#2B2B2B]" onClick={action.action}>
								<action.icon className="w-4 h-4 mr-3" />
								<span className="flex-1 text-left">{action.label}</span>
							</Button>
						))}
					</>
				)}
			</div>

			{/* Bottom Actions */}
			<div className="native-panel m-2 p-2">
				{!isCollapsed ? (
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="sm" className="flex-1 h-8 text-[#F2F2F2] hover:bg-[#2B2B2B]">
							<MessageSquare className="w-4 h-4 mr-2" />
							Chat
						</Button>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#F2F2F2] hover:bg-[#2B2B2B]">
							<Settings className="w-4 h-4" />
						</Button>
					</div>
				) : (
					<div className="flex flex-col gap-1">
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#F2F2F2] hover:bg-[#2B2B2B]">
							<MessageSquare className="w-4 h-4" />
						</Button>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#F2F2F2] hover:bg-[#2B2B2B]">
							<Settings className="w-4 h-4" />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
