"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Play, ChevronLeft, ChevronRight, Brain, Sparkles, Users, Star, Download, Heart, Clock, Shield, Eye, Trophy, Flame, Activity, Calendar, ArrowRight, BarChart3, Gamepad2, TrendingUp, Zap, Bookmark, Settings } from "lucide-react";

// Enhanced mock data with AI features
const featuredPicks = [
	{
		id: "1",
		title: "Cybernetic Horizon",
		image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
		aiScore: 95,
		description: "AI-curated RPG with dynamic storytelling that adapts to your choices",
		genre: "RPG",
		playtime: "40+ hours",
		rating: 4.8,
		players: "1.2M",
		tags: ["Story Rich", "AI-Powered", "Open World"],
		status: "installed",
	},
	{
		id: "2",
		title: "Neural Networks",
		image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop",
		aiScore: 92,
		description: "AI-powered puzzle platformer with procedural level generation",
		genre: "Puzzle",
		playtime: "15 hours",
		rating: 4.6,
		players: "850K",
		tags: ["Puzzle", "AI-Generated", "Mind-Bending"],
		status: "downloading",
	},
	{
		id: "3",
		title: "Quantum Realms",
		image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop",
		aiScore: 88,
		description: "Experience reality-bending gameplay with quantum mechanics",
		genre: "Adventure",
		playtime: "25 hours",
		rating: 4.7,
		players: "650K",
		tags: ["Adventure", "Sci-Fi", "Physics"],
		status: "wishlisted",
	},
];

const aiRecommendations = [
	{ id: "ai-1", title: "Echoes of Tomorrow", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop", score: 94, genre: "Sci-Fi RPG", price: "$29.99", status: "new" },
	{ id: "ai-2", title: "Stellar Odyssey", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop", score: 91, genre: "Space Sim", price: "$19.99", status: "trending" },
	{ id: "ai-3", title: "Mystic Legends", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop", score: 89, genre: "Fantasy", price: "$24.99", status: "popular" },
	{ id: "ai-4", title: "Neon Uprising", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop", score: 87, genre: "Cyberpunk", price: "$34.99", status: "new" },
	{ id: "ai-5", title: "Digital Dreams", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop", score: 85, genre: "Puzzle", price: "$14.99", status: "trending" },
	{ id: "ai-6", title: "Void Runners", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop", score: 83, genre: "Action", price: "$39.99", status: "popular" },
];

const recentActivity = [
	{
		id: "1",
		content: "Your friend Alex just achieved 'Master Explorer' in Cybernetic Horizon",
		type: "friend",
		time: "2 hours ago",
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
		game: "Cybernetic Horizon",
	},
	{
		id: "2",
		content: "New legendary achievement unlocked in Stellar Odyssey",
		type: "achievement",
		time: "4 hours ago",
		points: "+500 XP",
	},
	{
		id: "3",
		content: "Weekly challenge: Complete 3 indie games this week",
		type: "challenge",
		time: "1 day ago",
		progress: "1/3 completed",
	},
	{
		id: "4",
		content: "AI discovered a perfect match: Quantum Dreams (96% compatibility)",
		type: "ai",
		time: "2 days ago",
		confidence: "96%",
	},
];

const stats = [
	{ label: "Games Played", value: "127", trend: "+12 this month", icon: Gamepad2 },
	{ label: "Hours Gaming", value: "340", trend: "+45 this week", icon: Clock },
	{ label: "Achievements", value: "89", trend: "+7 this week", icon: Trophy },
	{ label: "AI Matches", value: "96%", trend: "Perfect score!", icon: Brain },
];

export default function Home() {
	const [currentHero, setCurrentHero] = useState(0);

	const nextHero = () => {
		setCurrentHero((prev) => (prev + 1) % featuredPicks.length);
	};

	const prevHero = () => {
		setCurrentHero((prev) => (prev - 1 + featuredPicks.length) % featuredPicks.length);
	};

	return (
		<div className="space-y-6 max-w-none">
			{/* Welcome Section */}
			<section className="native-panel p-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold font-oxanium text-[#F2F2F2] mb-1">Welcome back, Gamer</h1>
						<p className="text-[#AAAAAA] text-sm font-roboto-condensed">Ready to discover your next favorite game?</p>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2 bg-[#2B2B2B] rounded-sm px-3 py-1">
							<div className="w-2 h-2 bg-[#80FF00] rounded-full animate-pulse"></div>
							<span className="text-xs text-[#F2F2F2] font-roboto-condensed">Online</span>
						</div>
						<Button variant="outline" className="native-button h-8">
							<Activity className="w-3 h-3 mr-2" />
							<span className="font-roboto-condensed text-xs">View Stats</span>
						</Button>
					</div>
				</div>
			</section>

			{/* Stats Grid */}
			<section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
				{stats.map((stat) => (
					<div key={stat.label} className="native-panel p-3">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-[#00FFC6]/10 rounded-sm flex items-center justify-center">
								<stat.icon className="w-4 h-4 text-[#00FFC6]" />
							</div>
							<div>
								<div className="text-lg font-bold text-[#F2F2F2]">{stat.value}</div>
								<div className="text-xs text-[#AAAAAA]">{stat.label}</div>
								<div className="text-xs text-[#80FF00]">{stat.trend}</div>
							</div>
						</div>
					</div>
				))}
			</section>

			{/* Hero Banner */}
			<section className="relative h-80 rounded-sm overflow-hidden native-panel">
				<Image src={featuredPicks[currentHero].image} alt={featuredPicks[currentHero].title} fill className="object-cover opacity-40 transition-all duration-700" />
				<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

				{/* Hero Content */}
				<div className="absolute bottom-0 left-0 p-6 text-[#F2F2F2]">
					<div className="flex items-center gap-2 mb-3">
						<Badge className="bg-[#00FFC6]/20 text-[#00FFC6] border-[#00FFC6]/30 text-xs">
							<Brain className="w-3 h-3 mr-1" />
							AI Score: {featuredPicks[currentHero].aiScore}
						</Badge>
						<Badge variant="outline" className="border-[#2B2B2B] text-[#AAAAAA] text-xs">
							{featuredPicks[currentHero].genre}
						</Badge>
						<div className="flex items-center gap-1">
							<Star className="w-3 h-3 text-[#80FF00]" />
							<span className="text-[#80FF00] text-xs font-medium">{featuredPicks[currentHero].rating}</span>
						</div>
					</div>

					<h2 className="text-3xl font-bold font-oxanium mb-2">{featuredPicks[currentHero].title}</h2>
					<p className="text-sm text-[#AAAAAA] mb-3 max-w-md font-roboto-condensed">{featuredPicks[currentHero].description}</p>

					<div className="flex items-center gap-4 mb-4">
						{featuredPicks[currentHero].tags.map((tag) => (
							<span key={tag} className="px-2 py-1 bg-[#2B2B2B] rounded-sm text-xs text-[#F2F2F2] font-roboto-condensed">
								{tag}
							</span>
						))}
					</div>

					<div className="flex items-center gap-3">
						<Button className="native-button-primary h-8">
							<Play className="mr-2 h-4 w-4" />
							Play Now
						</Button>
						<Button variant="outline" className="native-button h-8">
							<Heart className="mr-2 h-3 w-3" />
							Wishlist
						</Button>
					</div>
				</div>

				{/* Navigation Arrows */}
				<Button variant="ghost" onClick={prevHero} className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-[#0A0A0A]/50 hover:bg-[#0A0A0A]/70 rounded-sm">
					<ChevronLeft className="w-5 h-5" />
				</Button>
				<Button variant="ghost" onClick={nextHero} className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-[#0A0A0A]/50 hover:bg-[#0A0A0A]/70 rounded-sm">
					<ChevronRight className="w-5 h-5" />
				</Button>

				{/* Dots Indicator */}
				<div className="absolute bottom-4 right-6 flex gap-2">
					{featuredPicks.map((_, index) => (
						<button key={index} onClick={() => setCurrentHero(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentHero ? "bg-[#00FFC6]" : "bg-[#2B2B2B]"}`} />
					))}
				</div>
			</section>

			{/* AI Recommendations */}
			<section className="native-spacing">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<Brain className="w-5 h-5 text-[#00FFC6]" />
						<h2 className="text-lg font-semibold text-[#F2F2F2]">AI Recommendations</h2>
						<Badge className="bg-[#00FFC6]/20 text-[#00FFC6] text-xs">96% Match</Badge>
					</div>
					<Button variant="ghost" className="native-button h-8 text-xs">
						View All
						<ArrowRight className="w-3 h-3 ml-1" />
					</Button>
				</div>

				<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
					{aiRecommendations.map((game) => (
						<div key={game.id} className="game-card-native-interactive group">
							<div className="relative aspect-video overflow-hidden">
								<Image src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
								<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />

								{/* Status Badge */}
								{game.status === "new" && <Badge className="absolute top-2 left-2 bg-[#00FFC6] text-[#0A0A0A] text-xs">NEW</Badge>}
								{game.status === "trending" && <Badge className="absolute top-2 left-2 bg-[#FF3B3B] text-white text-xs">TRENDING</Badge>}
								{game.status === "popular" && <Badge className="absolute top-2 left-2 bg-[#80FF00] text-[#0A0A0A] text-xs">POPULAR</Badge>}

								{/* AI Score */}
								<div className="absolute top-2 right-2 bg-[#0A0A0A]/80 rounded-sm px-2 py-1">
									<span className="text-xs font-bold text-[#00FFC6]">{game.score}</span>
								</div>

								{/* Quick Actions */}
								<div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
									<Button size="sm" className="h-6 w-6 p-0 bg-[#00FFC6] text-[#0A0A0A]">
										<Play className="w-3 h-3" />
									</Button>
								</div>
							</div>

							<div className="p-3">
								<h3 className="font-medium text-[#F2F2F2] text-sm mb-1 truncate">{game.title}</h3>
								<p className="text-xs text-[#AAAAAA] mb-2">{game.genre}</p>
								<div className="flex items-center justify-between">
									<span className="text-sm font-bold text-[#F2F2F2]">{game.price}</span>
									<Button variant="ghost" size="sm" className="h-6 w-6 p-0">
										<Heart className="w-3 h-3" />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Recent Activity */}
			<section className="native-spacing">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<Activity className="w-5 h-5 text-[#00FFC6]" />
						<h2 className="text-lg font-semibold text-[#F2F2F2]">Recent Activity</h2>
					</div>
					<Button variant="ghost" className="native-button h-8 text-xs">
						View All
						<ArrowRight className="w-3 h-3 ml-1" />
					</Button>
				</div>

				<div className="grid gap-3">
					{recentActivity.map((activity) => (
						<div key={activity.id} className="native-panel p-3">
							<div className="flex items-start gap-3">
								{activity.avatar && <Image src={activity.avatar} alt="Avatar" width={32} height={32} className="rounded-sm" />}
								<div className="flex-1">
									<p className="text-sm text-[#F2F2F2] mb-1">{activity.content}</p>
									<div className="flex items-center gap-2 text-xs text-[#AAAAAA]">
										<span>{activity.time}</span>
										{activity.points && <span className="text-[#80FF00]">{activity.points}</span>}
										{activity.progress && <span className="text-[#00FFC6]">{activity.progress}</span>}
										{activity.confidence && <span className="text-[#00FFC6]">{activity.confidence}</span>}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
