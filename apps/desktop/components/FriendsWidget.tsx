"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MessageCircle, UserPlus, Gamepad2, Users, Bell, Check, MoreHorizontal, Crown, Zap, Phone, Video, X, User, UserX, Minimize2, Maximize2, Minus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface FriendsWidgetProps {
	isOpen: boolean;
	onClose: () => void;
	onMinimize?: () => void;
	onMaximize?: () => void;
	isMinimized?: boolean;
	isMaximized?: boolean;
	className?: string;
}

export function FriendsWidget({ isOpen, onClose, onMinimize, onMaximize, isMinimized = false, isMaximized = false, className = "" }: FriendsWidgetProps) {
	const [activeTab, setActiveTab] = useState("online");
	const [searchQuery, setSearchQuery] = useState("");

	const friends = [
		{
			id: 1,
			name: "Alex Chen",
			username: "alexc_gamer",
			avatar: "/placeholder.svg",
			status: "in-game",
			game: "Cyberpunk 2077",
			gameImage: "/placeholder.svg",
			lastSeen: "Playing for 3h 24m",
			level: 23,
			xp: 15420,
			isVip: true,
			achievements: 47,
			hoursPlayed: 342,
			favoriteGenre: "RPG",
			mutualGames: 12,
			friendSince: "March 2023",
		},
		{
			id: 2,
			name: "Sarah Kim",
			username: "sarahk",
			avatar: "/placeholder.svg",
			status: "in-game",
			game: "The Witcher 3",
			gameImage: "/placeholder.svg",
			lastSeen: "Playing for 1h 45m",
			level: 18,
			xp: 8920,
			isVip: false,
			achievements: 23,
			hoursPlayed: 156,
			favoriteGenre: "Adventure",
			mutualGames: 8,
			friendSince: "January 2024",
		},
		{
			id: 3,
			name: "Mike Johnson",
			username: "mikej_dev",
			avatar: "/placeholder.svg",
			status: "online",
			game: null,
			gameImage: null,
			lastSeen: "Online",
			level: 31,
			xp: 24680,
			isVip: false,
			achievements: 89,
			hoursPlayed: 567,
			favoriteGenre: "Strategy",
			mutualGames: 15,
			friendSince: "August 2023",
		},
		{
			id: 4,
			name: "Emma Wilson",
			username: "emmaw",
			avatar: "/placeholder.svg",
			status: "away",
			game: "Stardew Valley",
			gameImage: "/placeholder.svg",
			lastSeen: "Away for 15m",
			level: 15,
			xp: 6780,
			isVip: false,
			achievements: 34,
			hoursPlayed: 89,
			favoriteGenre: "Simulation",
			mutualGames: 6,
			friendSince: "November 2023",
		},
		{
			id: 5,
			name: "David Lee",
			username: "davidl_fps",
			avatar: "/placeholder.svg",
			status: "offline",
			game: null,
			gameImage: null,
			lastSeen: "Last seen 2 hours ago",
			level: 42,
			xp: 35200,
			isVip: true,
			achievements: 127,
			hoursPlayed: 892,
			favoriteGenre: "FPS",
			mutualGames: 23,
			friendSince: "June 2023",
		},
	];

	const friendRequests = [
		{
			id: 1,
			name: "Jessica Brown",
			username: "jessbrown",
			avatar: "/placeholder.svg",
			mutualFriends: 3,
			timeAgo: "2 hours ago",
			level: 12,
			favoriteGenre: "Indie",
			mutualGames: 4,
		},
		{
			id: 2,
			name: "Tom Wilson",
			username: "tomw_gamer",
			avatar: "/placeholder.svg",
			mutualFriends: 1,
			timeAgo: "1 day ago",
			level: 8,
			favoriteGenre: "Action",
			mutualGames: 2,
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "online":
				return "bg-green-500";
			case "in-game":
				return "bg-blue-500";
			case "away":
				return "bg-yellow-500";
			case "offline":
				return "bg-zinc-500";
			default:
				return "bg-zinc-500";
		}
	};

	const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || friend.username.toLowerCase().includes(searchQuery.toLowerCase()));

	const onlineFriends = friends.filter((f) => f.status !== "offline");
	const allFriends = friends;

	// Safe handlers to prevent unhandled rejections
	const handleMinimize = () => {
		try {
			onMinimize?.();
		} catch (error) {
			console.error("Error minimizing friends widget:", error);
		}
	};

	const handleMaximize = () => {
		try {
			onMaximize?.();
		} catch (error) {
			console.error("Error maximizing friends widget:", error);
		}
	};

	const handleClose = () => {
		try {
			onClose();
		} catch (error) {
			console.error("Error closing friends widget:", error);
		}
	};

	const handleFriendAction = async (action: string, friendId: number) => {
		try {
			// Simulate async action - replace with actual API calls
			console.log(`Performing ${action} for friend ${friendId}`);
			// Add actual implementation here
		} catch (error) {
			console.error(`Error performing ${action} for friend ${friendId}:`, error);
		}
	};

	if (!isOpen) return null;

	const currentFriends = activeTab === "online" ? onlineFriends : activeTab === "friends" ? allFriends : filteredFriends;

	return (
		<div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
			<div className={`bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl ${isMaximized ? "w-full h-full" : isMinimized ? "w-80 h-20" : "w-[900px] h-[700px]"} transition-all duration-300 flex flex-col overflow-hidden`}>
				{/* Window Header */}
				<div className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-800/50">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
							<Users className="w-4 h-4 text-white" />
						</div>
						<div>
							<h2 className="text-lg font-bold text-white">Friends</h2>
							<p className="text-sm text-zinc-400">
								{onlineFriends.length} online • {friends.length} total
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Button variant="ghost" size="sm" onClick={handleMinimize} className="text-zinc-400 hover:text-white hover:bg-zinc-700">
							<Minus className="w-4 h-4" />
						</Button>
						<Button variant="ghost" size="sm" onClick={handleMaximize} className="text-zinc-400 hover:text-white hover:bg-zinc-700">
							{isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
						</Button>
						<Button variant="ghost" size="sm" onClick={handleClose} className="text-zinc-400 hover:text-white hover:bg-zinc-700">
							<X className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* Content - Hidden when minimized */}
				{!isMinimized && (
					<>
						{/* Search and Controls */}
						<div className="p-4 border-b border-zinc-700/50 bg-zinc-800/20">
							<div className="flex items-center gap-4 mb-4">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
									<Input placeholder="Search friends..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-zinc-800/50 border-zinc-600/50 text-white placeholder-zinc-500 focus:border-blue-500/50 focus:bg-zinc-800" />
								</div>
								<Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleFriendAction("add", 0)}>
									<UserPlus className="w-4 h-4 mr-2" />
									Add Friend
								</Button>
							</div>

							{/* Tabs */}
							<div className="flex items-center gap-2">
								{[
									{ id: "online", label: "Online", count: onlineFriends.length, icon: Zap },
									{ id: "friends", label: "All Friends", count: friends.length, icon: Users },
									{ id: "requests", label: "Requests", count: friendRequests.length, icon: Bell },
								].map((tab) => {
									const Icon = tab.icon;
									return (
										<Button key={tab.id} variant="ghost" className={`h-10 px-4 rounded-lg transition-all ${activeTab === tab.id ? "bg-zinc-700 text-white shadow-lg" : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"}`} onClick={() => setActiveTab(tab.id)}>
											<Icon className="w-4 h-4 mr-2" />
											{tab.label}
											{tab.count > 0 && (
												<Badge variant="secondary" className="ml-2 bg-zinc-600 text-zinc-300">
													{tab.count}
												</Badge>
											)}
										</Button>
									);
								})}
							</div>
						</div>

						{/* Friends List */}
						<div className="flex-1 overflow-hidden">
							<ScrollArea className="h-full">
								<div className="p-4">
									{activeTab === "requests" ? (
										<div className="space-y-4">
											{friendRequests.map((request) => (
												<Card key={request.id} className="bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600/50 transition-all">
													<CardContent className="p-4">
														<div className="flex items-center gap-4">
															<div className="relative">
																<Avatar className="w-12 h-12">
																	<AvatarImage src={request.avatar} />
																	<AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
																		{request.name
																			.split(" ")
																			.map((n) => n[0])
																			.join("")}
																	</AvatarFallback>
																</Avatar>
																<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center border-2 border-zinc-700">
																	<span className="text-xs font-bold text-yellow-400">{request.level}</span>
																</div>
															</div>

															<div className="flex-1">
																<div className="flex items-center gap-2 mb-1">
																	<h3 className="font-bold text-white">{request.name}</h3>
																	<Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">New</Badge>
																</div>
																<p className="text-zinc-400 text-sm mb-2">@{request.username}</p>
																<p className="text-zinc-500 text-xs">{request.timeAgo}</p>
															</div>

															<div className="flex items-center gap-2">
																<Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleFriendAction("accept", request.id)}>
																	<Check className="w-4 h-4 mr-1" />
																	Accept
																</Button>
																<Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => handleFriendAction("decline", request.id)}>
																	<X className="w-4 h-4 mr-1" />
																	Decline
																</Button>
															</div>
														</div>
													</CardContent>
												</Card>
											))}
										</div>
									) : (
										<div className="space-y-2">
											{currentFriends.map((friend) => (
												<Card key={friend.id} className="bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600/50 hover:bg-zinc-800/50 transition-all cursor-pointer">
													<CardContent className="p-4">
														<div className="flex items-center gap-4">
															<div className="relative">
																<Avatar className="w-12 h-12">
																	<AvatarImage src={friend.avatar} />
																	<AvatarFallback className="bg-gradient-to-br from-zinc-600 to-zinc-700 text-white">
																		{friend.name
																			.split(" ")
																			.map((n) => n[0])
																			.join("")}
																	</AvatarFallback>
																</Avatar>

																{/* Status Indicator */}
																<div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(friend.status)} border-2 border-zinc-900 flex items-center justify-center`}>{friend.status === "in-game" && <Gamepad2 className="w-2 h-2 text-white" />}</div>

																{/* VIP Crown */}
																{friend.isVip && (
																	<div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
																		<Crown className="w-4 h-4 text-yellow-400" />
																	</div>
																)}
															</div>

															<div className="flex-1 min-w-0">
																<div className="flex items-center gap-2 mb-1">
																	<h3 className="font-bold text-white truncate">{friend.name}</h3>
																	<Badge className="bg-zinc-700 text-zinc-300 text-xs">{friend.level}</Badge>
																	{friend.isVip && <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">VIP</Badge>}
																</div>

																<p className="text-zinc-400 text-sm truncate">@{friend.username}</p>

																{/* Activity Status */}
																{friend.game ? (
																	<div className="flex items-center gap-2 mt-1">
																		<Gamepad2 className="w-3 h-3 text-blue-400" />
																		<span className="text-blue-400 text-xs truncate">Playing {friend.game}</span>
																	</div>
																) : (
																	<div className="flex items-center gap-2 mt-1">
																		<div className={`w-2 h-2 rounded-full ${getStatusColor(friend.status)}`} />
																		<span className="text-zinc-400 text-xs">{friend.lastSeen}</span>
																	</div>
																)}
															</div>

															{/* Quick Actions */}
															<div className="flex items-center gap-1">
																<Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 px-3" onClick={() => handleFriendAction("chat", friend.id)}>
																	<MessageCircle className="w-3 h-3 mr-1" />
																	Chat
																</Button>
																<DropdownMenu>
																	<DropdownMenuTrigger asChild>
																		<Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-700 h-8 w-8 p-0">
																			<MoreHorizontal className="w-3 h-3" />
																		</Button>
																	</DropdownMenuTrigger>
																	<DropdownMenuContent align="end" className="bg-zinc-800/95 backdrop-blur-xl border-zinc-700/60 shadow-xl">
																		<DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-700/60" onClick={() => handleFriendAction("profile", friend.id)}>
																			<User className="w-4 h-4 mr-2" />
																			View Profile
																		</DropdownMenuItem>
																		<DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-700/60" onClick={() => handleFriendAction("voice", friend.id)}>
																			<Phone className="w-4 h-4 mr-2" />
																			Voice Call
																		</DropdownMenuItem>
																		<DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-700/60" onClick={() => handleFriendAction("video", friend.id)}>
																			<Video className="w-4 h-4 mr-2" />
																			Video Call
																		</DropdownMenuItem>
																		<DropdownMenuSeparator className="bg-zinc-700/60" />
																		<DropdownMenuItem className="text-red-400 hover:text-red-300 focus:bg-red-900/50" onClick={() => handleFriendAction("remove", friend.id)}>
																			<UserX className="w-4 h-4 mr-2" />
																			Remove Friend
																		</DropdownMenuItem>
																	</DropdownMenuContent>
																</DropdownMenu>
															</div>
														</div>
													</CardContent>
												</Card>
											))}
										</div>
									)}
								</div>
							</ScrollArea>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
