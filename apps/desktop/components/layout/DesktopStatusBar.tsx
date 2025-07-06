"use client";

import { useState, useEffect } from "react";
import { Wifi, Battery, Clock, Activity, Download, Gamepad2, Signal } from "lucide-react";

interface DesktopStatusBarProps {
	activeView: string;
}

export function DesktopStatusBar({ activeView }: DesktopStatusBarProps) {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [downloadProgress, setDownloadProgress] = useState(0);
	const [isDownloading, setIsDownloading] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Simulate download progress
	useEffect(() => {
		if (isDownloading) {
			const interval = setInterval(() => {
				setDownloadProgress((prev) => {
					if (prev >= 100) {
						setIsDownloading(false);
						return 0;
					}
					return prev + 1;
				});
			}, 100);

			return () => clearInterval(interval);
		}
	}, [isDownloading]);

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
	};

	return (
		<div className="native-status-bar flex items-center justify-between">
			{/* Left side - App info */}
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<Gamepad2 className="w-3 h-3 text-[#00FFC6]" />
					<span className="text-xs font-medium">Oxide Desktop</span>
				</div>

				{activeView && (
					<div className="flex items-center gap-1">
						<span className="text-xs text-[#AAAAAA]">•</span>
						<span className="text-xs capitalize">{activeView}</span>
					</div>
				)}
			</div>

			{/* Center - Download progress */}
			{isDownloading && (
				<div className="flex items-center gap-2">
					<Download className="w-3 h-3 text-[#00FFC6]" />
					<div className="w-24 h-1 bg-[#2B2B2B] rounded-full overflow-hidden">
						<div className="h-full bg-[#00FFC6] transition-all duration-300" style={{ width: `${downloadProgress}%` }} />
					</div>
					<span className="text-xs">{downloadProgress}%</span>
				</div>
			)}

			{/* Right side - System info */}
			<div className="flex items-center gap-3">
				{/* Network */}
				<div className="flex items-center gap-1">
					<Wifi className="w-3 h-3 text-[#00FFC6]" />
					<span className="text-xs">Connected</span>
				</div>

				{/* Activity indicator */}
				<div className="flex items-center gap-1">
					<Activity className="w-3 h-3 text-[#80FF00]" />
					<span className="text-xs">Online</span>
				</div>

				{/* Battery */}
				<div className="flex items-center gap-1">
					<Battery className="w-3 h-3 text-[#80FF00]" />
					<span className="text-xs">85%</span>
				</div>

				{/* Time */}
				<div className="flex items-center gap-1">
					<Clock className="w-3 h-3 text-[#AAAAAA]" />
					<span className="text-xs">{formatTime(currentTime)}</span>
				</div>
			</div>
		</div>
	);
}
