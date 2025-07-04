import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, MessageSquare, Trophy, Calendar, TrendingUp, Star, Crown, Zap, Award, Target, Gamepad2, Clock, MessageCircle, ThumbsUp, Eye, PinIcon, Search, Filter, Globe, Map, Twitch, Youtube, Heart, Share } from "lucide-react";
import gamesData from "@/data/games.json";
import achievementsData from "@/data/achievements.json";
import developersData from "@/data/developers.json";
import { GameImage } from "@/components/GameImage";

export const metadata: Metadata = {
	title: "Community | LaunchBeacon",
	description: "Connect with fellow gamers, share achievements, participate in tournaments, and join gaming discussions on LaunchBeacon.",
	keywords: "gaming community, forums, leaderboards, tournaments, gaming events, achievements",
};

// Mock community data
const mockCommunityData = {
	forums: [
		{
			id: "general",
			name: "General Discussion",
			description: "Talk about games, gaming culture, and everything else",
			icon: "💬",
			posts: 12847,
			lastPost: {
				title: "What are you playing this weekend?",
				author: "GamerPro",
				time: "2 minutes ago",
			},
			pinned: true,
		},
		{
			id: "indie-showcase",
			name: "Indie Game Showcase",
			description: "Discover and discuss amazing indie games",
			icon: "🎮",
			posts: 8932,
			lastPost: {
				title: "Amazing pixel art game just dropped!",
				author: "PixelArtist",
				time: "15 minutes ago",
			},
		},
		{
			id: "achievements",
			name: "Achievement Hunters",
			description: "Show off your achievements and get help with difficult ones",
			icon: "🏆",
			posts: 5621,
			lastPost: {
				title: "Finally got the legendary achievement!",
				author: "AchievementKing",
				time: "1 hour ago",
			},
		},
		{
			id: "mods",
			name: "Mods & Customization",
			description: "Share mods, discuss customizations",
			icon: "🔧",
			posts: 3892,
			lastPost: {
				title: "Best graphics mods for indie games?",
				author: "ModMaster",
				time: "3 hours ago",
			},
		},
	],
	leaderboards: [
		{
			name: "Top Gamers This Month",
			players: [
				{ name: "ProGamer2023", score: 15420, avatar: "/api/placeholder/64/64", level: 89, achievements: 456 },
				{ name: "AchievementHunter", score: 14830, avatar: "/api/placeholder/64/64", level: 76, achievements: 423 },
				{ name: "IndieExplorer", score: 13950, avatar: "/api/placeholder/64/64", level: 82, achievements: 398 },
				{ name: "GamingLegend", score: 13210, avatar: "/api/placeholder/64/64", level: 71, achievements: 367 },
				{ name: "PixelMaster", score: 12890, avatar: "/api/placeholder/64/64", level: 68, achievements: 345 },
			],
		},
	],
	events: [
		{
			id: 1,
			title: "Indie Game Jam 2024",
			description: "Create an amazing indie game in 48 hours",
			date: "2024-02-15",
			participants: 1247,
			prize: "$5,000",
			status: "upcoming",
			image: "/api/placeholder/400/200",
		},
		{
			id: 2,
			title: "Achievement Speed Run",
			description: "Who can unlock the most achievements in 24 hours?",
			date: "2024-01-20",
			participants: 892,
			prize: "$1,000",
			status: "active",
			image: "/api/placeholder/400/200",
		},
		{
			id: 3,
			title: "Community Tournament",
			description: "Battle it out in our community favorite games",
			date: "2024-01-10",
			participants: 2341,
			prize: "$3,000",
			status: "completed",
			image: "/api/placeholder/400/200",
		},
	],
	featuredMembers: [
		{
			id: 1,
			name: "AlexChen",
			title: "Community Moderator",
			avatar: "/api/placeholder/64/64",
			level: 94,
			achievements: 567,
			joinDate: "2023-03-15",
			favoriteGame: "Pixel Platformer",
			bio: "Passionate indie game enthusiast and community builder",
			badges: ["Moderator", "Pro", "Top Contributor"],
		},
		{
			id: 2,
			name: "GameDevSarah",
			title: "Indie Developer",
			avatar: "/api/placeholder/64/64",
			level: 78,
			achievements: 423,
			joinDate: "2023-06-20",
			favoriteGame: "Adventure Quest",
			bio: "Creating amazing indie experiences for the community",
			badges: ["Developer", "Verified", "Top Creator"],
		},
	],
	recentActivity: [
		{
			type: "achievement",
			user: "GamerPro",
			action: "unlocked the legendary achievement",
			game: "Pixel Platformer",
			time: "5 minutes ago",
		},
		{
			type: "post",
			user: "IndieExplorer",
			action: "posted in General Discussion",
			content: "What are you playing this weekend?",
			time: "12 minutes ago",
		},
		{
			type: "review",
			user: "ReviewMaster",
			action: "reviewed",
			game: "Adventure Quest",
			rating: 5,
			time: "1 hour ago",
		},
	],
};

export default function CommunityPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			{/* Hero Section */}
			<div className="relative py-16 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-rust-600/20 to-transparent" />
				<div className="max-w-7xl mx-auto px-8 relative">
					<div className="text-center space-y-6">
						<h1 className="text-4xl lg:text-6xl font-bold">Gaming Community</h1>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">Connect with fellow gamers, share achievements, participate in tournaments, and join the conversation</p>
						<div className="flex justify-center space-x-4">
							<Button className="bg-rust-600 hover:bg-rust-700 text-white">
								<Users className="w-4 h-4 mr-2" />
								Join Discussion
							</Button>
							<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
								<Trophy className="w-4 h-4 mr-2" />
								View Leaderboards
							</Button>
						</div>
					</div>

					{/* Quick Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
						<Card className="bg-gray-900/50 border-gray-800">
							<CardContent className="p-4 text-center">
								<div className="text-2xl font-bold text-rust-400">25.4K</div>
								<div className="text-sm text-gray-400">Active Members</div>
							</CardContent>
						</Card>
						<Card className="bg-gray-900/50 border-gray-800">
							<CardContent className="p-4 text-center">
								<div className="text-2xl font-bold text-yellow-400">847K</div>
								<div className="text-sm text-gray-400">Forum Posts</div>
							</CardContent>
						</Card>
						<Card className="bg-gray-900/50 border-gray-800">
							<CardContent className="p-4 text-center">
								<div className="text-2xl font-bold text-green-400">156</div>
								<div className="text-sm text-gray-400">Events This Year</div>
							</CardContent>
						</Card>
						<Card className="bg-gray-900/50 border-gray-800">
							<CardContent className="p-4 text-center">
								<div className="text-2xl font-bold text-blue-400">92K</div>
								<div className="text-sm text-gray-400">Achievements Shared</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-8 py-12">
				<Tabs defaultValue="forums" className="space-y-8">
					<TabsList className="bg-gray-900 border border-gray-800">
						<TabsTrigger value="forums" className="data-[state=active]:bg-rust-600 data-[state=active]:text-white">
							<MessageSquare className="w-4 h-4 mr-2" />
							Forums
						</TabsTrigger>
						<TabsTrigger value="leaderboards" className="data-[state=active]:bg-rust-600 data-[state=active]:text-white">
							<Trophy className="w-4 h-4 mr-2" />
							Leaderboards
						</TabsTrigger>
						<TabsTrigger value="events" className="data-[state=active]:bg-rust-600 data-[state=active]:text-white">
							<Calendar className="w-4 h-4 mr-2" />
							Events
						</TabsTrigger>
						<TabsTrigger value="members" className="data-[state=active]:bg-rust-600 data-[state=active]:text-white">
							<Users className="w-4 h-4 mr-2" />
							Members
						</TabsTrigger>
					</TabsList>

					{/* Forums Tab */}
					<TabsContent value="forums" className="space-y-6">
						<div className="flex flex-col lg:flex-row gap-8">
							{/* Main Forums */}
							<div className="flex-1 space-y-6">
								<div className="flex items-center justify-between">
									<h2 className="text-2xl font-bold">Discussion Forums</h2>
									<div className="flex items-center space-x-2">
										<div className="relative">
											<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
											<Input type="text" placeholder="Search forums..." className="w-64 pl-10 bg-gray-900 border-gray-700 text-white" />
										</div>
										<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
											<Filter className="w-4 h-4" />
										</Button>
									</div>
								</div>

								<div className="space-y-4">
									{mockCommunityData.forums.map((forum) => (
										<Card key={forum.id} className="bg-gray-900/50 border-gray-800 hover:border-rust-500/50 transition-colors">
											<CardContent className="p-6">
												<div className="flex items-start space-x-4">
													<div className="text-3xl">{forum.icon}</div>
													<div className="flex-1 space-y-2">
														<div className="flex items-center space-x-3">
															<Link href={`/community/forums/${forum.id}`} className="text-xl font-semibold text-white hover:text-rust-400 transition-colors">
																{forum.name}
															</Link>
															{forum.pinned && <PinIcon className="w-4 h-4 text-rust-400" />}
														</div>
														<p className="text-gray-400">{forum.description}</p>
														<div className="flex items-center space-x-4 text-sm text-gray-500">
															<span>{forum.posts.toLocaleString()} posts</span>
															<span>•</span>
															<span>Last post by {forum.lastPost.author}</span>
															<span>•</span>
															<span>{forum.lastPost.time}</span>
														</div>
														<div className="text-sm text-gray-300 font-medium">{forum.lastPost.title}</div>
													</div>
													<div className="text-right space-y-1">
														<div className="text-lg font-bold text-rust-400">{forum.posts.toLocaleString()}</div>
														<div className="text-xs text-gray-500">Posts</div>
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</div>

							{/* Sidebar */}
							<div className="w-full lg:w-80 space-y-6">
								{/* Recent Activity */}
								<Card className="bg-gray-900/50 border-gray-800">
									<CardHeader>
										<CardTitle className="text-lg">Recent Activity</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										{mockCommunityData.recentActivity.map((activity, index) => (
											<div key={index} className="flex items-start space-x-3">
												<div className="w-8 h-8 bg-rust-600 rounded-full flex items-center justify-center flex-shrink-0">
													{activity.type === "achievement" && <Trophy className="w-4 h-4 text-white" />}
													{activity.type === "post" && <MessageSquare className="w-4 h-4 text-white" />}
													{activity.type === "review" && <Star className="w-4 h-4 text-white" />}
												</div>
												<div className="flex-1 space-y-1">
													<div className="text-sm">
														<span className="font-medium text-white">{activity.user}</span>
														<span className="text-gray-400"> {activity.action} </span>
														{activity.game && <span className="text-rust-400">{activity.game}</span>}
													</div>
													{activity.content && <div className="text-xs text-gray-500">"{activity.content}"</div>}
													<div className="text-xs text-gray-600">{activity.time}</div>
												</div>
											</div>
										))}
									</CardContent>
								</Card>

								{/* Online Members */}
								<Card className="bg-gray-900/50 border-gray-800">
									<CardHeader>
										<CardTitle className="text-lg flex items-center space-x-2">
											<div className="w-2 h-2 bg-green-400 rounded-full"></div>
											<span>Online Now (247)</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-8 gap-2">
											{[...Array(16)].map((_, i) => (
												<Avatar key={i} className="h-8 w-8">
													<AvatarImage src={`/api/placeholder/32/32`} />
													<AvatarFallback className="bg-gray-800 text-white text-xs">U{i + 1}</AvatarFallback>
												</Avatar>
											))}
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</TabsContent>

					{/* Leaderboards Tab */}
					<TabsContent value="leaderboards" className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">Community Leaderboards</h2>
							<div className="flex space-x-2">
								<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
									This Month
								</Button>
								<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
									All Time
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{mockCommunityData.leaderboards.map((leaderboard, index) => (
								<Card key={index} className="bg-gray-900/50 border-gray-800">
									<CardHeader>
										<CardTitle className="flex items-center space-x-2">
											<Trophy className="w-5 h-5 text-yellow-400" />
											<span>{leaderboard.name}</span>
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										{leaderboard.players.map((player, playerIndex) => (
											<div key={playerIndex} className="flex items-center space-x-4">
												<div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${playerIndex === 0 ? "bg-yellow-600 text-white" : playerIndex === 1 ? "bg-gray-400 text-black" : playerIndex === 2 ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-300"}`}>{playerIndex + 1}</div>
												<Avatar className="h-10 w-10">
													<AvatarImage src={player.avatar} alt={player.name} />
													<AvatarFallback className="bg-gray-800 text-white">{player.name[0]}</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="font-semibold text-white">{player.name}</div>
													<div className="text-sm text-gray-400">
														Level {player.level} • {player.achievements} achievements
													</div>
												</div>
												<div className="text-right">
													<div className="text-lg font-bold text-rust-400">{player.score.toLocaleString()}</div>
													<div className="text-xs text-gray-500">XP</div>
												</div>
											</div>
										))}
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					{/* Events Tab */}
					<TabsContent value="events" className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">Community Events</h2>
							<Button className="bg-rust-600 hover:bg-rust-700 text-white">
								<Calendar className="w-4 h-4 mr-2" />
								Create Event
							</Button>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
							{mockCommunityData.events.map((event) => (
								<Card key={event.id} className="bg-gray-900/50 border-gray-800 hover:border-rust-500/50 transition-colors">
									<CardContent className="p-0">
										<div className="relative">
											<GameImage src={event.image} alt={event.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
											<div className="absolute top-2 right-2">
												<Badge className={event.status === "upcoming" ? "bg-blue-600 text-white" : event.status === "active" ? "bg-green-600 text-white" : "bg-gray-600 text-white"}>{event.status}</Badge>
											</div>
										</div>
										<div className="p-6 space-y-4">
											<div className="space-y-2">
												<h3 className="text-xl font-semibold text-white">{event.title}</h3>
												<p className="text-gray-400">{event.description}</p>
											</div>

											<div className="space-y-2 text-sm text-gray-300">
												<div className="flex items-center justify-between">
													<span>Date:</span>
													<span>{new Date(event.date).toLocaleDateString()}</span>
												</div>
												<div className="flex items-center justify-between">
													<span>Participants:</span>
													<span>{event.participants.toLocaleString()}</span>
												</div>
												<div className="flex items-center justify-between">
													<span>Prize Pool:</span>
													<span className="text-green-400 font-semibold">{event.prize}</span>
												</div>
											</div>

											<Button className={`w-full ${event.status === "upcoming" ? "bg-blue-600 hover:bg-blue-700" : event.status === "active" ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"} text-white`}>{event.status === "upcoming" ? "Register" : event.status === "active" ? "Join Now" : "View Results"}</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					{/* Members Tab */}
					<TabsContent value="members" className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">Featured Community Members</h2>
							<div className="flex items-center space-x-2">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input type="text" placeholder="Search members..." className="w-64 pl-10 bg-gray-900 border-gray-700 text-white" />
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{mockCommunityData.featuredMembers.map((member) => (
								<Card key={member.id} className="bg-gray-900/50 border-gray-800">
									<CardContent className="p-6">
										<div className="flex items-start space-x-4">
											<Avatar className="h-16 w-16">
												<AvatarImage src={member.avatar} alt={member.name} />
												<AvatarFallback className="bg-gray-800 text-white text-xl">{member.name[0]}</AvatarFallback>
											</Avatar>
											<div className="flex-1 space-y-3">
												<div className="space-y-1">
													<div className="flex items-center space-x-2">
														<h3 className="text-xl font-semibold text-white">{member.name}</h3>
														{member.badges.includes("Pro") && <Crown className="w-4 h-4 text-rust-400" />}
													</div>
													<p className="text-rust-400 font-medium">{member.title}</p>
													<p className="text-gray-400 text-sm">{member.bio}</p>
												</div>

												<div className="flex flex-wrap gap-1">
													{member.badges.map((badge) => (
														<Badge key={badge} variant="secondary" className={`text-xs ${badge === "Moderator" ? "bg-green-600 text-white" : badge === "Developer" ? "bg-blue-600 text-white" : badge === "Pro" ? "bg-rust-600 text-white" : "bg-gray-600 text-white"}`}>
															{badge}
														</Badge>
													))}
												</div>

												<div className="grid grid-cols-3 gap-4 text-center">
													<div>
														<div className="text-lg font-bold text-white">Lvl {member.level}</div>
														<div className="text-xs text-gray-400">Level</div>
													</div>
													<div>
														<div className="text-lg font-bold text-yellow-400">{member.achievements}</div>
														<div className="text-xs text-gray-400">Achievements</div>
													</div>
													<div>
														<div className="text-lg font-bold text-rust-400">#{Math.floor(Math.random() * 100) + 1}</div>
														<div className="text-xs text-gray-400">Rank</div>
													</div>
												</div>

												<div className="flex items-center justify-between text-sm text-gray-400">
													<span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
													<span>Playing: {member.favoriteGame}</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
