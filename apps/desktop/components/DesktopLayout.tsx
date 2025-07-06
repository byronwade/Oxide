"use client";

import { useState, useEffect } from "react";
import { CustomTitleBar } from "./layout/CustomTitleBar";
import { DesktopSidebar } from "./layout/DesktopSidebar";
import { DesktopStatusBar } from "./layout/DesktopStatusBar";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
	const [activeView, setActiveView] = useState("home");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			const mobile = window.innerWidth < 1024;
			setIsMobile(mobile);
			if (mobile) {
				setIsSidebarCollapsed(true);
			}
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	return (
		<div className="flex h-screen bg-[#0A0A0A] text-[#F2F2F2] overflow-hidden native-window">
			{/* Sidebar */}
			<DesktopSidebar activeView={activeView} setActiveView={setActiveView} isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} isMobile={isMobile} />

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Title Bar */}
				<CustomTitleBar activeView={activeView} setActiveView={setActiveView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} isMobile={isMobile} isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} />

				{/* Toolbar */}
				<div className="native-toolbar">
					<div className="flex items-center gap-2 text-sm text-[#AAAAAA]">
						<span className="font-medium">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</span>
						{activeView === "home" && <span>• Dashboard</span>}
						{activeView === "store" && <span>• Browse Games</span>}
						{activeView === "library" && <span>• Your Games</span>}
						{activeView === "community" && <span>• Social</span>}
					</div>
				</div>

				{/* Main Content */}
				<div className="flex-1 overflow-hidden">
					<div className="h-full overflow-y-auto native-padding">{children}</div>
				</div>

				{/* Status Bar */}
				<DesktopStatusBar activeView={activeView} />
			</div>
		</div>
	);
}
