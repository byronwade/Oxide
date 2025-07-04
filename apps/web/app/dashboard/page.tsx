import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, BarChart3, Gamepad2, DollarSign, Users, Eye, Download, Star, TrendingUp, Settings, Plus } from "lucide-react";

export const metadata: Metadata = {
	title: "Developer Dashboard | LaunchBeacon",
	description: "Manage your games, track analytics, and grow your audience on LaunchBeacon.",
};

// Mock user data - replace with real data from API
const mockDashboardData = {
	user: {
		name: "Alex Johnson",
		username: "alexdev",
		accountType: "developer",
		memberSince: "2023-01-15",
		avatar: "/api/placeholder/64/64",
	},
	stats: {
		totalGames: 12,
		totalDownloads: 45672,
		totalRevenue: 8940.5,
		totalFollowers: 1284,
		monthlyViews: 23891,
		averageRating: 4.6,
	},
	recentGames: [
		{
			id: "game_001",
			title: "Neon Runner",
			status: "published",
			downloads: 12456,
			revenue: 2488.5,
			rating: 4.8,
			lastUpdate: "2024-12-20",
			coverImage: "/api/placeholder/100/133",
		},
		{
			id: "game_002",
			title: "Pixel Quest Adventures",
			status: "published",
			downloads: 8901,
			revenue: 1780.2,
			rating: 4.5,
			lastUpdate: "2024-12-15",
			coverImage: "/api/placeholder/100/133",
		},
		{
			id: "game_003",
			title: "Mystic Realms",
			status: "draft",
			downloads: 0,
			revenue: 0,
			rating: 0,
			lastUpdate: "2024-12-28",
			coverImage: "/api/placeholder/100/133",
		},
	],
	analytics: {
		weeklyDownloads: [120, 145, 167, 234, 189, 256, 312],
		weeklyRevenue: [24.6, 29.8, 33.4, 46.8, 37.8, 51.2, 62.4],
	},
};

export default function DashboardPage() {
	const { user, stats, recentGames, analytics } = mockDashboardData;

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-7xl mx-auto px-8 py-12">
				{/* Header */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
					<div>
						<h1 className="text-3xl font-bold text-white">Developer Dashboard</h1>
						<p className="text-gray-400">Welcome back, {user.name}</p>
					</div>

					<div className="flex items-center space-x-3">
						<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
							<Settings className="w-4 h-4 mr-2" />
							Settings
						</Button>
						<Button className="bg-rust-600 hover:bg-rust-700 text-white" asChild>
							<Link href="/dashboard/upload">
								<Plus className="w-4 h-4 mr-2" />
								Upload New Game
							</Link>
						</Button>
					</div>
				</div>

				{/* Stats Overview */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
					<StatCard title="Total Games" value={stats.totalGames.toString()} icon={<Gamepad2 className="w-4 h-4" />} color="rust" />
					<StatCard title="Downloads" value={stats.totalDownloads.toLocaleString()} icon={<Download className="w-4 h-4" />} color="blue" />
					<StatCard title="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={<DollarSign className="w-4 h-4" />} color="green" />
					<StatCard title="Followers" value={stats.totalFollowers.toLocaleString()} icon={<Users className="w-4 h-4" />} color="purple" />
					<StatCard title="Monthly Views" value={stats.monthlyViews.toLocaleString()} icon={<Eye className="w-4 h-4" />} color="orange" />
					<StatCard title="Avg Rating" value={stats.averageRating.toString()} icon={<Star className="w-4 h-4" />} color="yellow" />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					{/* Recent Games */}
					<Card className="bg-gray-900 border-gray-800">
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-white">Your Games</CardTitle>
								<Button variant="ghost" size="sm" className="text-rust-400 hover:text-rust-300" asChild>
									<Link href="/dashboard/games">View All</Link>
								</Button>
							</div>
							<CardDescription>Manage and track your published games</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{recentGames.map((game) => (
								<GameCard key={game.id} game={game} />
							))}
						</CardContent>
					</Card>

					{/* Quick Analytics */}
					<Card className="bg-gray-900 border-gray-800">
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-white">Analytics Overview</CardTitle>
								<Button variant="ghost" size="sm" className="text-rust-400 hover:text-rust-300" asChild>
									<Link href="/dashboard/analytics">
										<BarChart3 className="w-4 h-4 mr-1" />
										View Details
									</Link>
								</Button>
							</div>
							<CardDescription>Track your performance this week</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-gray-400">Weekly Downloads</span>
									<span className="text-green-400 flex items-center">
										<TrendingUp className="w-3 h-3 mr-1" />
										+24%
									</span>
								</div>
								<div className="flex items-center space-x-1 text-xs text-gray-500">
									{analytics.weeklyDownloads.map((downloads, i) => (
										<div key={i} className="flex-1 bg-gray-800 rounded">
											<div className="bg-rust-600 rounded h-8 flex items-end justify-center" style={{ height: `${(downloads / Math.max(...analytics.weeklyDownloads)) * 32}px` }}>
												<span className="text-[10px] text-white pb-1">{downloads}</span>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-gray-400">Weekly Revenue</span>
									<span className="text-green-400 flex items-center">
										<TrendingUp className="w-3 h-3 mr-1" />
										+18%
									</span>
								</div>
								<div className="flex items-center space-x-1 text-xs text-gray-500">
									{analytics.weeklyRevenue.map((revenue, i) => (
										<div key={i} className="flex-1 bg-gray-800 rounded">
											<div className="bg-green-600 rounded h-8 flex items-end justify-center" style={{ height: `${(revenue / Math.max(...analytics.weeklyRevenue)) * 32}px` }}>
												<span className="text-[10px] text-white pb-1">${revenue}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<Card className="bg-gray-900 border-gray-800">
					<CardHeader>
						<CardTitle className="text-white">Quick Actions</CardTitle>
						<CardDescription>Common tasks and shortcuts</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<QuickActionCard title="Upload Game" description="Add a new game to your catalog" icon={<Upload className="w-5 h-5" />} href="/dashboard/upload" color="rust" />
							<QuickActionCard title="View Analytics" description="Track downloads and revenue" icon={<BarChart3 className="w-5 h-5" />} href="/dashboard/analytics" color="blue" />
							<QuickActionCard title="Manage Games" description="Edit and update your games" icon={<Gamepad2 className="w-5 h-5" />} href="/dashboard/games" color="purple" />
							<QuickActionCard title="Ad Campaigns" description="Promote your games" icon={<TrendingUp className="w-5 h-5" />} href="/dashboard/ads" color="green" />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: "rust" | "blue" | "green" | "purple" | "orange" | "yellow" }) {
	const colorClasses = {
		rust: "text-rust-400 bg-rust-900",
		blue: "text-blue-400 bg-blue-900",
		green: "text-green-400 bg-green-900",
		purple: "text-purple-400 bg-purple-900",
		orange: "text-orange-400 bg-orange-900",
		yellow: "text-yellow-400 bg-yellow-900",
	};

	return (
		<Card className="bg-gray-900 border-gray-800">
			<CardContent className="p-4">
				<div className="flex items-center space-x-3">
					<div className={`p-2 rounded ${colorClasses[color]}`}>{icon}</div>
					<div>
						<p className="text-sm text-gray-400">{title}</p>
						<p className="text-lg font-bold text-white">{value}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function GameCard({ game }: { game: (typeof mockDashboardData.recentGames)[0] }) {
	return (
		<div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
			<img src={game.coverImage} alt={game.title} className="w-12 h-16 object-cover rounded bg-gray-700" />
			<div className="flex-1 min-w-0">
				<div className="flex items-center space-x-2">
					<h4 className="font-semibold text-white truncate">{game.title}</h4>
					<Badge variant={game.status === "published" ? "default" : "secondary"} className={game.status === "published" ? "bg-green-600" : "bg-gray-600"}>
						{game.status}
					</Badge>
				</div>
				<p className="text-sm text-gray-400">{game.downloads > 0 ? `${game.downloads.toLocaleString()} downloads` : "Not published"}</p>
				<p className="text-xs text-gray-500">Updated {new Date(game.lastUpdate).toLocaleDateString()}</p>
			</div>
			<div className="text-right">
				<p className="text-sm font-semibold text-green-400">${game.revenue.toFixed(2)}</p>
				{game.rating > 0 && (
					<div className="flex items-center text-xs text-gray-400">
						<Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
						{game.rating}
					</div>
				)}
			</div>
		</div>
	);
}

function QuickActionCard({ title, description, icon, href, color }: { title: string; description: string; icon: React.ReactNode; href: string; color: "rust" | "blue" | "green" | "purple" }) {
	const colorClasses = {
		rust: "border-rust-600/20 hover:border-rust-500 text-rust-400",
		blue: "border-blue-600/20 hover:border-blue-500 text-blue-400",
		green: "border-green-600/20 hover:border-green-500 text-green-400",
		purple: "border-purple-600/20 hover:border-purple-500 text-purple-400",
	};

	return (
		<Link href={href}>
			<Card className={`bg-gray-900/30 border-2 ${colorClasses[color]} hover:bg-gray-800/50 transition-all cursor-pointer`}>
				<CardContent className="p-4 text-center space-y-2">
					<div className="flex justify-center">{icon}</div>
					<h4 className="font-semibold text-white">{title}</h4>
					<p className="text-xs text-gray-400">{description}</p>
				</CardContent>
			</Card>
		</Link>
	);
}
