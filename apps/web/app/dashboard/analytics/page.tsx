import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Download, DollarSign, Users, Star, ChevronLeft, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
	title: "Analytics Dashboard | LaunchBeacon",
	description: "Track your game performance, revenue, and user engagement metrics.",
};

// Mock analytics data - replace with real data from API
const mockAnalyticsData = {
	overview: {
		totalRevenue: 8940.5,
		totalDownloads: 45672,
		totalUsers: 23891,
		averageRating: 4.6,
		revenueChange: 15.2,
		downloadsChange: 8.5,
		usersChange: 12.1,
		ratingChange: 0.2,
	},
	revenueData: {
		daily: [
			{ date: "2024-12-22", revenue: 125.5, downloads: 89 },
			{ date: "2024-12-23", revenue: 98.2, downloads: 67 },
			{ date: "2024-12-24", revenue: 156.8, downloads: 102 },
			{ date: "2024-12-25", revenue: 89.4, downloads: 45 },
			{ date: "2024-12-26", revenue: 234.6, downloads: 156 },
			{ date: "2024-12-27", revenue: 198.3, downloads: 134 },
			{ date: "2024-12-28", revenue: 287.9, downloads: 198 },
		],
		monthly: [
			{ month: "Oct 2024", revenue: 2456.8, downloads: 5678 },
			{ month: "Nov 2024", revenue: 3123.5, downloads: 7234 },
			{ month: "Dec 2024", revenue: 3890.2, downloads: 8945 },
		],
	},
	topGames: [
		{
			id: "game_001",
			title: "Neon Runner",
			revenue: 2488.5,
			downloads: 12456,
			rating: 4.8,
			change: 15.6,
		},
		{
			id: "game_002",
			title: "Pixel Quest Adventures",
			revenue: 1780.2,
			downloads: 8901,
			rating: 4.5,
			change: 8.2,
		},
		{
			id: "game_003",
			title: "Mystic Realms",
			revenue: 1567.3,
			downloads: 7834,
			rating: 4.7,
			change: -3.1,
		},
	],
	demographics: {
		countries: [
			{ country: "United States", percentage: 35.2, users: 8405 },
			{ country: "United Kingdom", percentage: 12.8, users: 3057 },
			{ country: "Germany", percentage: 10.4, users: 2485 },
			{ country: "Canada", percentage: 8.9, users: 2126 },
			{ country: "Australia", percentage: 6.2, users: 1481 },
		],
		platforms: [
			{ platform: "Windows", percentage: 65.4, users: 15625 },
			{ platform: "Mac", percentage: 22.1, users: 5280 },
			{ platform: "Linux", percentage: 12.5, users: 2986 },
		],
	},
};

export default function AnalyticsPage() {
	const { overview, revenueData, topGames, demographics } = mockAnalyticsData;

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-7xl mx-auto px-8 py-12">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0" asChild>
							<Link href="/dashboard">
								<ChevronLeft className="w-4 h-4 mr-1" />
								Back to Dashboard
							</Link>
						</Button>
					</div>
					<div className="flex items-center space-x-3">
						<Select defaultValue="7d">
							<SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
								<SelectValue />
							</SelectTrigger>
							<SelectContent className="bg-gray-800 border-gray-700">
								<SelectItem value="7d">Last 7 days</SelectItem>
								<SelectItem value="30d">Last 30 days</SelectItem>
								<SelectItem value="90d">Last 90 days</SelectItem>
								<SelectItem value="1y">Last year</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
							<RefreshCw className="w-4 h-4 mr-2" />
							Refresh
						</Button>
					</div>
				</div>

				<div className="space-y-8">
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
						<p className="text-gray-400">Track your game performance and revenue</p>
					</div>

					{/* Key Metrics */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<MetricCard title="Total Revenue" value={`$${overview.totalRevenue.toLocaleString()}`} change={overview.revenueChange} icon={<DollarSign className="w-5 h-5" />} color="green" />
						<MetricCard title="Total Downloads" value={overview.totalDownloads.toLocaleString()} change={overview.downloadsChange} icon={<Download className="w-5 h-5" />} color="blue" />
						<MetricCard title="Total Users" value={overview.totalUsers.toLocaleString()} change={overview.usersChange} icon={<Users className="w-5 h-5" />} color="purple" />
						<MetricCard title="Average Rating" value={overview.averageRating.toString()} change={overview.ratingChange} icon={<Star className="w-5 h-5" />} color="yellow" />
					</div>

					{/* Revenue Chart */}
					<Card className="bg-gray-900/50 border-gray-800">
						<CardHeader>
							<CardTitle className="text-white">Revenue & Downloads</CardTitle>
							<CardDescription>Daily performance over the last 7 days</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between text-sm">
									<span className="text-gray-400">Daily Revenue</span>
									<span className="text-green-400 flex items-center">
										<TrendingUp className="w-3 h-3 mr-1" />
										+18.5%
									</span>
								</div>
								<div className="grid grid-cols-7 gap-2 h-40">
									{revenueData.daily.map((day, i) => {
										const maxRevenue = Math.max(...revenueData.daily.map((d) => d.revenue));
										const height = (day.revenue / maxRevenue) * 100;
										return (
											<div key={i} className="flex flex-col items-center space-y-2">
												<div className="flex-1 flex items-end w-full">
													<div className="bg-green-600 rounded-t w-full flex items-end justify-center pb-1" style={{ height: `${height}%` }}>
														<span className="text-xs text-white">${day.revenue}</span>
													</div>
												</div>
												<span className="text-xs text-gray-400">{new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}</span>
											</div>
										);
									})}
								</div>

								<div className="flex items-center justify-between text-sm pt-4 border-t border-gray-800">
									<span className="text-gray-400">Daily Downloads</span>
									<span className="text-blue-400 flex items-center">
										<TrendingUp className="w-3 h-3 mr-1" />
										+12.3%
									</span>
								</div>
								<div className="grid grid-cols-7 gap-2 h-20">
									{revenueData.daily.map((day, i) => {
										const maxDownloads = Math.max(...revenueData.daily.map((d) => d.downloads));
										const height = (day.downloads / maxDownloads) * 100;
										return (
											<div key={i} className="flex flex-col items-center">
												<div className="flex-1 flex items-end w-full">
													<div className="bg-blue-600 rounded-t w-full flex items-end justify-center pb-1" style={{ height: `${height}%` }}>
														<span className="text-[10px] text-white">{day.downloads}</span>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Top Performing Games */}
						<Card className="bg-gray-900/50 border-gray-800">
							<CardHeader>
								<CardTitle className="text-white">Top Performing Games</CardTitle>
								<CardDescription>Your best games by revenue</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{topGames.map((game, index) => (
									<div key={game.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
										<div className="flex items-center space-x-3">
											<div className="w-8 h-8 bg-rust-600 rounded flex items-center justify-center text-white text-sm font-bold">{index + 1}</div>
											<div>
												<h4 className="font-semibold text-white">{game.title}</h4>
												<p className="text-sm text-gray-400">{game.downloads.toLocaleString()} downloads</p>
											</div>
										</div>
										<div className="text-right">
											<p className="font-semibold text-green-400">${game.revenue.toFixed(2)}</p>
											<div className="flex items-center text-xs">
												{game.change > 0 ? <TrendingUp className="w-3 h-3 text-green-400 mr-1" /> : <TrendingDown className="w-3 h-3 text-red-400 mr-1" />}
												<span className={game.change > 0 ? "text-green-400" : "text-red-400"}>
													{game.change > 0 ? "+" : ""}
													{game.change}%
												</span>
											</div>
										</div>
									</div>
								))}
							</CardContent>
						</Card>

						{/* User Demographics */}
						<Card className="bg-gray-900/50 border-gray-800">
							<CardHeader>
								<CardTitle className="text-white">User Demographics</CardTitle>
								<CardDescription>Where your players are from</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-3">
									<h4 className="text-sm font-semibold text-gray-300">Top Countries</h4>
									{demographics.countries.map((country) => (
										<div key={country.country} className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="w-3 h-3 bg-rust-600 rounded-full" />
												<span className="text-white text-sm">{country.country}</span>
											</div>
											<div className="flex items-center space-x-2">
												<span className="text-gray-400 text-sm">{country.percentage}%</span>
												<span className="text-gray-500 text-xs">({country.users.toLocaleString()})</span>
											</div>
										</div>
									))}
								</div>

								<div className="space-y-3 pt-4 border-t border-gray-800">
									<h4 className="text-sm font-semibold text-gray-300">Platforms</h4>
									{demographics.platforms.map((platform) => (
										<div key={platform.platform} className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="w-3 h-3 bg-blue-600 rounded-full" />
												<span className="text-white text-sm">{platform.platform}</span>
											</div>
											<div className="flex items-center space-x-2">
												<span className="text-gray-400 text-sm">{platform.percentage}%</span>
												<span className="text-gray-500 text-xs">({platform.users.toLocaleString()})</span>
											</div>
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

function MetricCard({ title, value, change, icon, color }: { title: string; value: string; change: number; icon: React.ReactNode; color: "green" | "blue" | "purple" | "yellow" }) {
	const colorClasses = {
		green: "text-green-400 bg-green-400/10",
		blue: "text-blue-400 bg-blue-400/10",
		purple: "text-purple-400 bg-purple-400/10",
		yellow: "text-yellow-400 bg-yellow-400/10",
	};

	return (
		<Card className="bg-gray-900/50 border-gray-800">
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-4">
					<div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
					<div className="flex items-center text-sm">
						{change > 0 ? <TrendingUp className="w-3 h-3 text-green-400 mr-1" /> : <TrendingDown className="w-3 h-3 text-red-400 mr-1" />}
						<span className={change > 0 ? "text-green-400" : "text-red-400"}>
							{change > 0 ? "+" : ""}
							{change}%
						</span>
					</div>
				</div>
				<div>
					<h3 className="text-2xl font-bold text-white">{value}</h3>
					<p className="text-gray-400 text-sm">{title}</p>
				</div>
			</CardContent>
		</Card>
	);
}
