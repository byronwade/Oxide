import React, { useState } from "react";

const initialSettings = {
	general: {
		autoStart: true,
		minimizeToTray: false,
		notifications: true,
		autoUpdates: true,
	},
	gaming: {
		overlayEnabled: true,
		screenshotKey: "F12",
		recordingQuality: "high",
		fpsCounter: false,
	},
	ai: {
		recommendations: true,
		performanceOptimization: true,
		friendSuggestions: true,
		chatAssistant: true,
	},
	privacy: {
		profileVisibility: "friends",
		activityStatus: true,
		gameActivity: true,
		dataCollection: false,
	},
};

export const Settings: React.FC = () => {
	const [settings, setSettings] = useState(initialSettings);

	function toggleSetting(category: keyof typeof settings, setting: string) {
		setSettings((prev) => ({
			...prev,
			[category]: {
				...prev[category],
				[setting]: !(prev[category] as any)[setting],
			},
		}));
	}

	function handleSelectChange(category: keyof typeof settings, setting: string, value: string) {
		setSettings((prev) => ({
			...prev,
			[category]: {
				...prev[category],
				[setting]: value,
			},
		}));
	}

	return (
		<div className="flex-1 bg-black text-white overflow-y-auto">
			{/* Header */}
			<div className="p-6 border-b border-gray-900/50">
				<div className="flex items-center space-x-3">
					<div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="12" cy="12" r="3"></circle>
							<path d="M12 1v6m0 6v6"></path>
							<path d="m15.5 3.5-3 3-3-3"></path>
							<path d="m15.5 20.5-3-3-3 3"></path>
						</svg>
					</div>
					<div>
						<h1 className="text-xl font-bold">Settings</h1>
						<p className="text-sm text-gray-400">Configure your preferences</p>
					</div>
				</div>
			</div>
			<div className="p-6 space-y-8">
				{/* General Settings */}
				<div className="space-y-4">
					<h2 className="text-lg font-semibold text-white flex items-center space-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
							<circle cx="12" cy="12" r="3"></circle>
							<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
						</svg>
						<span>General</span>
					</h2>
					<div className="space-y-3">
						{/* Auto-start */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Auto-start with system</div>
								<div className="text-xs text-gray-400">Launch Oxide when your computer starts</div>
							</div>
							<button onClick={() => toggleSetting("general", "autoStart")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.general.autoStart ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.general.autoStart ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
						{/* Minimize to tray */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Minimize to system tray</div>
								<div className="text-xs text-gray-400">Keep running in background when closed</div>
							</div>
							<button onClick={() => toggleSetting("general", "minimizeToTray")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.general.minimizeToTray ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.general.minimizeToTray ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
						{/* Notifications */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Desktop notifications</div>
								<div className="text-xs text-gray-400">Show notifications for friends and games</div>
							</div>
							<button onClick={() => toggleSetting("general", "notifications")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.general.notifications ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.general.notifications ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
					</div>
				</div>
				{/* Gaming Settings */}
				<div className="space-y-4">
					<h2 className="text-lg font-semibold text-white flex items-center space-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
							<rect width="18" height="18" x="3" y="3" rx="2"></rect>
							<path d="M9 9h6v6H9z"></path>
						</svg>
						<span>Gaming</span>
					</h2>
					<div className="space-y-3">
						{/* In-game overlay */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">In-game overlay</div>
								<div className="text-xs text-gray-400">Show Oxide overlay while gaming</div>
							</div>
							<button onClick={() => toggleSetting("gaming", "overlayEnabled")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.gaming.overlayEnabled ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.gaming.overlayEnabled ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
						{/* FPS counter */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">FPS counter</div>
								<div className="text-xs text-gray-400">Display frame rate in games</div>
							</div>
							<button onClick={() => toggleSetting("gaming", "fpsCounter")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.gaming.fpsCounter ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.gaming.fpsCounter ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
					</div>
				</div>
				{/* AI Settings */}
				<div className="space-y-4">
					<h2 className="text-lg font-semibold text-white flex items-center space-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
							<path d="M12 2L2 7l10 5 10-5-10-5z"></path>
							<path d="M2 17l10 5 10-5"></path>
							<path d="M2 12l10 5 10-5"></path>
						</svg>
						<span>AI Features</span>
					</h2>
					<div className="space-y-3">
						{/* Game recommendations */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Game recommendations</div>
								<div className="text-xs text-gray-400">AI-powered game suggestions</div>
							</div>
							<button onClick={() => toggleSetting("ai", "recommendations")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.ai.recommendations ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.ai.recommendations ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
						{/* Performance optimization */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Performance optimization</div>
								<div className="text-xs text-gray-400">Auto-optimize game settings</div>
							</div>
							<button onClick={() => toggleSetting("ai", "performanceOptimization")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.ai.performanceOptimization ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.ai.performanceOptimization ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
						{/* Friend suggestions */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Smart friend matching</div>
								<div className="text-xs text-gray-400">AI finds compatible players</div>
							</div>
							<button onClick={() => toggleSetting("ai", "friendSuggestions")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.ai.friendSuggestions ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.ai.friendSuggestions ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
						{/* Chat assistant */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Gaming assistant</div>
								<div className="text-xs text-gray-400">AI chat for help and tips</div>
							</div>
							<button onClick={() => toggleSetting("ai", "chatAssistant")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.ai.chatAssistant ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.ai.chatAssistant ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
					</div>
				</div>
				{/* Privacy Settings */}
				<div className="space-y-4">
					<h2 className="text-lg font-semibold text-white flex items-center space-x-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
						</svg>
						<span>Privacy</span>
					</h2>
					<div className="space-y-3">
						{/* Profile visibility */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Profile visibility</div>
								<div className="text-xs text-gray-400">Who can see your profile</div>
							</div>
							<select value={settings.privacy.profileVisibility} onChange={(e) => handleSelectChange("privacy", "profileVisibility", e.target.value)} className="bg-gray-800 border border-gray-700 text-white text-sm rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500">
								<option value="public">Public</option>
								<option value="friends">Friends Only</option>
								<option value="private">Private</option>
							</select>
						</div>
						{/* Activity status */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Show activity status</div>
								<div className="text-xs text-gray-400">Let friends see when you're online</div>
							</div>
							<button onClick={() => toggleSetting("privacy", "activityStatus")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.privacy.activityStatus ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.privacy.activityStatus ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
						{/* Game activity */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Show game activity</div>
								<div className="text-xs text-gray-400">Display your game activity to others</div>
							</div>
							<button onClick={() => toggleSetting("privacy", "gameActivity")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.privacy.gameActivity ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.privacy.gameActivity ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
						{/* Data collection */}
						<div className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-orange-500/30 transition-colors">
							<div>
								<div className="text-sm font-medium text-white">Data collection</div>
								<div className="text-xs text-gray-400">Allow analytics and usage data collection</div>
							</div>
							<button onClick={() => toggleSetting("privacy", "dataCollection")} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings.privacy.dataCollection ? "bg-orange-600" : "bg-gray-600"}`}>
								<span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.privacy.dataCollection ? "translate-x-5" : "translate-x-1"}`}></span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
