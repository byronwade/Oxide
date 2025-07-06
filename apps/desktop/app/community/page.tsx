"use client";

import { useState, useEffect } from "react";
import { usePerformanceMonitor } from "../../hooks/use-performance.tsx";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { MessageCircle, Users, TrendingUp, Heart, Share2, Calendar, Gamepad2, Image as ImageIcon, Video, MoreHorizontal, Plus, Bookmark, Crown, Zap, Gift, Flame } from "lucide-react";

interface CommunityPost {
	id: string;
	author: {
		id: string;
		username: string;
		avatar: string;
		isVerified: boolean;
		badges: string[];
	};
	content: string;
	images?: string[];
	video?: string;
	gameId?: string;
	gameName?: string;
	timestamp: string;
	likes: number;
	dislikes: number;
	comments: number;
	shares: number;
	views: number;
	isLiked: boolean;
	isBookmarked: boolean;
	type: "text" | "screenshot" | "video" | "achievement" | "review";
	tags: string[];
}

interface CommunityEvent {
	id: string;
	title: string;
	description: string;
	image: string;
	startDate: string;
	endDate: string;
	participants: number;
	maxParticipants?: number;
	type: "tournament" | "jam" | "stream" | "meetup";
	gameId?: string;
	gameName?: string;
	organizer: string;
}

interface CommunityGroup {
	id: string;
	name: string;
	description: string;
	image: string;
	members: number;
	category: string;
	isJoined: boolean;
	isVerified: boolean;
	activity: "high" | "medium" | "low";
}

const SAMPLE_POSTS: CommunityPost[] = [
	{
		id: "1",
		author: {
			id: "user1",
			username: "GamerPro2024",
			avatar: "/placeholder.svg",
			isVerified: true,
			badges: ["Pro Player", "Beta Tester"],
		},
		content: "Just finished an amazing 12-hour session of Cyberpunk 2077! The new DLC is absolutely incredible. The storytelling and graphics are next level. 🎮✨",
		images: ["/placeholder.svg"],
		gameId: "cyberpunk-2077",
		gameName: "Cyberpunk 2077",
		timestamp: "2024-01-15T14:30:00Z",
		likes: 142,
		dislikes: 3,
		comments: 28,
		shares: 15,
		views: 1250,
		isLiked: false,
		isBookmarked: true,
		type: "screenshot",
		tags: ["cyberpunk", "dlc", "review"],
	},
	{
		id: "2",
		author: {
			id: "user2",
			username: "IndieHunter",
			avatar: "/placeholder.svg",
			isVerified: false,
			badges: ["Indie Lover"],
		},
		content: "Found this hidden gem on the store today! Amazing pixel art and gameplay. Definitely worth checking out for indie game lovers.",
		timestamp: "2024-01-15T12:15:00Z",
		likes: 89,
		dislikes: 1,
		comments: 12,
		shares: 8,
		views: 654,
		isLiked: true,
		isBookmarked: false,
		type: "review",
		tags: ["indie", "recommendation", "pixel-art"],
	},
];

const SAMPLE_EVENTS: CommunityEvent[] = [
	{
		id: "1",
		title: "Oxide Gaming Tournament 2024",
		description: "Join the biggest gaming tournament of the year with $50,000 in prizes!",
		image: "/placeholder.svg",
		startDate: "2024-02-15T18:00:00Z",
		endDate: "2024-02-17T22:00:00Z",
		participants: 1247,
		maxParticipants: 2000,
		type: "tournament",
		gameId: "tournament-game",
		gameName: "Multiple Games",
		organizer: "Oxide Gaming",
	},
	{
		id: "2",
		title: "Indie Game Jam: Space Theme",
		description: "Create amazing space-themed games in 48 hours. Open to all skill levels!",
		image: "/placeholder.svg",
		startDate: "2024-01-20T00:00:00Z",
		endDate: "2024-01-22T23:59:59Z",
		participants: 543,
		type: "jam",
		organizer: "Indie Collective",
	},
];

const SAMPLE_GROUPS: CommunityGroup[] = [
	{
		id: "1",
		name: "RPG Enthusiasts",
		description: "For lovers of role-playing games, from classic to modern",
		image: "/placeholder.svg",
		members: 15420,
		category: "Genre",
		isJoined: true,
		isVerified: true,
		activity: "high",
	},
	{
		id: "2",
		name: "Indie Game Developers",
		description: "Connect with fellow indie developers and share your projects",
		image: "/placeholder.svg",
		members: 8932,
		category: "Development",
		isJoined: false,
		isVerified: true,
		activity: "high",
	},
];

export default function CommunityPage() {
	const [posts, setPosts] = useState<CommunityPost[]>(SAMPLE_POSTS);
	const [events, setEvents] = useState<CommunityEvent[]>(SAMPLE_EVENTS);
	const [groups, setGroups] = useState<CommunityGroup[]>(SAMPLE_GROUPS);
	const [activeTab, setActiveTab] = useState("feed");
	const [isLoading, setIsLoading] = useState(false);
	const [newPost, setNewPost] = useState("");

	const performance = usePerformanceMonitor("CommunityPage", "/community");

	useEffect(() => {
		const fetchCommunityData = async () => {
			setIsLoading(true);
			try {
				await new Promise((resolve) => setTimeout(resolve, 100));
				console.log("👥 Community loaded successfully");
			} catch (error) {
				console.error("❌ Failed to load community:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCommunityData();
	}, []);

	const handlePostAction = (postId: string, action: string) => {
		setPosts((prev) =>
			prev.map((post) => {
				if (post.id === postId) {
					switch (action) {
						case "like":
							return {
								...post,
								likes: post.isLiked ? post.likes - 1 : post.likes + 1,
								isLiked: !post.isLiked,
							};
						case "bookmark":
							return { ...post, isBookmarked: !post.isBookmarked };
						case "share":
							return { ...post, shares: post.shares + 1 };
						default:
							return post;
					}
				}
				return post;
			})
		);
	};

	const handleJoinGroup = (groupId: string) => {
		setGroups((prev) =>
			prev.map((group) => {
				if (group.id === groupId) {
					return {
						...group,
						isJoined: !group.isJoined,
						members: group.isJoined ? group.members - 1 : group.members + 1,
					};
				}
				return group;
			})
		);
	};

	const formatTimeAgo = (timestamp: string) => {
		const now = new Date();
		const time = new Date(timestamp);
		const diff = now.getTime() - time.getTime();
		const hours = Math.floor(diff / (1000 * 60 * 60));

		if (hours < 1) return "Just now";
		if (hours < 24) return `${hours}h ago`;
		const days = Math.floor(hours / 24);
		return `${days}d ago`;
	};

	return (
		<div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2]">
			{/* Header */}
			<section className="bg-[#1C1C1C]/50 border-b border-[#2B2B2B]/30">
				<div className="container mx-auto px-6 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-[#F2F2F2] mb-2">Community</h1>
							<p className="text-[#AAAAAA]">Connect with gamers worldwide</p>
						</div>
						<Button className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
							<Plus className="w-4 h-4 mr-2" />
							Create Post
						</Button>
					</div>
				</div>
			</section>

			{/* Navigation Tabs */}
			<section className="bg-[#1C1C1C]/30 border-b border-[#2B2B2B]/30">
				<div className="container mx-auto px-6">
					<div className="flex gap-8">
						{[
							{ id: "feed", name: "Feed", icon: MessageCircle },
							{ id: "events", name: "Events", icon: Calendar },
							{ id: "groups", name: "Groups", icon: Users },
							{ id: "trending", name: "Trending", icon: TrendingUp },
						].map((tab) => (
							<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${activeTab === tab.id ? "border-[#00FFC6] text-[#00FFC6]" : "border-transparent text-[#AAAAAA] hover:text-[#F2F2F2]"}`}>
								<tab.icon className="w-5 h-5" />
								{tab.name}
							</button>
						))}
					</div>
				</div>
			</section>

			<div className="container mx-auto px-6 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{activeTab === "feed" && (
							<div className="space-y-6">
								{/* Create Post */}
								<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
									<CardContent className="p-6">
										<div className="flex gap-4">
											<Avatar>
												<AvatarImage src="/placeholder.svg" />
												<AvatarFallback>U</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<Input placeholder="Share your gaming thoughts..." value={newPost} onChange={(e) => setNewPost(e.target.value)} className="bg-[#2B2B2B] border-[#3D3D3D] mb-4" />
												<div className="flex items-center justify-between">
													<div className="flex gap-2">
														<Button variant="outline" size="sm" className="border-[#3D3D3D]">
															<ImageIcon className="w-4 h-4 mr-2" />
															Photo
														</Button>
														<Button variant="outline" size="sm" className="border-[#3D3D3D]">
															<Video className="w-4 h-4 mr-2" />
															Video
														</Button>
														<Button variant="outline" size="sm" className="border-[#3D3D3D]">
															<Gamepad2 className="w-4 h-4 mr-2" />
															Game
														</Button>
													</div>
													<Button className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]" disabled={!newPost.trim()}>
														Post
													</Button>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Posts Feed */}
								{posts.map((post) => (
									<Card key={post.id} className="bg-[#1C1C1C] border-[#2B2B2B]">
										<CardContent className="p-6">
											{/* Post Header */}
											<div className="flex items-center justify-between mb-4">
												<div className="flex items-center gap-3">
													<Avatar>
														<AvatarImage src={post.author.avatar} />
														<AvatarFallback>{post.author.username[0]}</AvatarFallback>
													</Avatar>
													<div>
														<div className="flex items-center gap-2">
															<span className="font-semibold text-[#F2F2F2]">{post.author.username}</span>
															{post.author.isVerified && (
																<Badge className="bg-[#00FFC6] text-[#0A0A0A] text-xs">
																	<Crown className="w-3 h-3 mr-1" />
																	Verified
																</Badge>
															)}
														</div>
														<div className="flex items-center gap-2 text-sm text-[#AAAAAA]">
															<span>{formatTimeAgo(post.timestamp)}</span>
															{post.gameName && (
																<>
																	<span>•</span>
																	<span>Playing {post.gameName}</span>
																</>
															)}
														</div>
													</div>
												</div>
												<Button variant="ghost" size="sm">
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</div>

											{/* Post Content */}
											<div className="mb-4">
												<p className="text-[#F2F2F2] mb-3">{post.content}</p>
												{post.images && post.images.length > 0 && (
													<div className="rounded-lg overflow-hidden bg-[#2B2B2B] aspect-video">
														<img src={post.images[0]} alt="Post image" className="w-full h-full object-cover" />
													</div>
												)}
												{post.tags.length > 0 && (
													<div className="flex flex-wrap gap-2 mt-3">
														{post.tags.map((tag) => (
															<Badge key={tag} variant="secondary" className="bg-[#2B2B2B] text-[#00FFC6] text-xs">
																#{tag}
															</Badge>
														))}
													</div>
												)}
											</div>

											{/* Post Stats */}
											<div className="flex items-center justify-between pt-4 border-t border-[#2B2B2B]">
												<div className="flex items-center gap-6">
													<Button variant="ghost" size="sm" onClick={() => handlePostAction(post.id, "like")} className={post.isLiked ? "text-[#00FFC6]" : "text-[#AAAAAA]"}>
														<Heart className={`w-4 h-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
														{post.likes}
													</Button>
													<Button variant="ghost" size="sm" className="text-[#AAAAAA]">
														<MessageCircle className="w-4 h-4 mr-2" />
														{post.comments}
													</Button>
													<Button variant="ghost" size="sm" onClick={() => handlePostAction(post.id, "share")} className="text-[#AAAAAA]">
														<Share2 className="w-4 h-4 mr-2" />
														{post.shares}
													</Button>
												</div>
												<Button variant="ghost" size="sm" onClick={() => handlePostAction(post.id, "bookmark")} className={post.isBookmarked ? "text-[#00FFC6]" : "text-[#AAAAAA]"}>
													<Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-current" : ""}`} />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}

						{activeTab === "events" && (
							<div className="space-y-6">
								{events.map((event) => (
									<Card key={event.id} className="bg-[#1C1C1C] border-[#2B2B2B]">
										<CardContent className="p-6">
											<div className="flex gap-4">
												<div className="w-20 h-20 bg-[#2B2B2B] rounded-lg flex-shrink-0" />
												<div className="flex-1">
													<div className="flex items-start justify-between mb-2">
														<h3 className="text-lg font-semibold text-[#F2F2F2]">{event.title}</h3>
														<Badge className="bg-[#00FFC6]/20 text-[#00FFC6]">{event.type}</Badge>
													</div>
													<p className="text-[#AAAAAA] mb-3">{event.description}</p>
													<div className="flex items-center gap-4 text-sm text-[#AAAAAA] mb-4">
														<span className="flex items-center gap-1">
															<Calendar className="w-4 h-4" />
															{new Date(event.startDate).toLocaleDateString()}
														</span>
														<span className="flex items-center gap-1">
															<Users className="w-4 h-4" />
															{event.participants} participants
														</span>
													</div>
													<Button className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">Join Event</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}

						{activeTab === "groups" && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{groups.map((group) => (
									<Card key={group.id} className="bg-[#1C1C1C] border-[#2B2B2B]">
										<CardContent className="p-6">
											<div className="flex items-start gap-4">
												<div className="w-16 h-16 bg-[#2B2B2B] rounded-lg flex-shrink-0" />
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-1">
														<h3 className="font-semibold text-[#F2F2F2] truncate">{group.name}</h3>
														{group.isVerified && <Crown className="w-4 h-4 text-[#00FFC6]" />}
													</div>
													<p className="text-[#AAAAAA] text-sm mb-2 line-clamp-2">{group.description}</p>
													<div className="flex items-center gap-4 text-sm text-[#AAAAAA] mb-4">
														<span>{group.members.toLocaleString()} members</span>
														<Badge variant="secondary" className={`text-xs ${group.activity === "high" ? "bg-green-500/20 text-green-400" : group.activity === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"}`}>
															{group.activity} activity
														</Badge>
													</div>
													<Button variant={group.isJoined ? "outline" : "default"} size="sm" onClick={() => handleJoinGroup(group.id)} className={group.isJoined ? "border-[#3D3D3D] text-[#AAAAAA]" : "bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]"}>
														{group.isJoined ? "Joined" : "Join Group"}
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Community Stats */}
						<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
							<CardHeader>
								<CardTitle className="text-[#F2F2F2]">Community Stats</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className="text-[#AAAAAA]">Active Users</span>
										<span className="text-[#00FFC6] font-semibold">45.2K</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[#AAAAAA]">Posts Today</span>
										<span className="text-[#00FFC6] font-semibold">1.2K</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-[#AAAAAA]">Events This Week</span>
										<span className="text-[#00FFC6] font-semibold">15</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Trending Topics */}
						<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
							<CardHeader>
								<CardTitle className="text-[#F2F2F2] flex items-center">
									<Flame className="w-5 h-5 mr-2 text-orange-500" />
									Trending
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{["#CyberpunkDLC", "#IndieGameJam", "#MultiplayerMadness", "#RetroGaming", "#VRExperience"].map((topic, i) => (
										<div key={topic} className="flex items-center justify-between">
											<span className="text-[#00FFC6] cursor-pointer hover:text-[#00FFC6]/80">{topic}</span>
											<span className="text-[#AAAAAA] text-sm">{Math.floor(Math.random() * 1000) + 100} posts</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Suggested Groups */}
						<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
							<CardHeader>
								<CardTitle className="text-[#F2F2F2]">Suggested Groups</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{groups
										.filter((g) => !g.isJoined)
										.slice(0, 3)
										.map((group) => (
											<div key={group.id} className="flex items-center gap-3">
												<div className="w-10 h-10 bg-[#2B2B2B] rounded-lg flex-shrink-0" />
												<div className="flex-1 min-w-0">
													<p className="font-medium text-[#F2F2F2] text-sm truncate">{group.name}</p>
													<p className="text-[#AAAAAA] text-xs">{group.members.toLocaleString()} members</p>
												</div>
												<Button size="sm" onClick={() => handleJoinGroup(group.id)} className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
													Join
												</Button>
											</div>
										))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
