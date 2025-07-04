import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Gamepad2, DollarSign, AlertTriangle, CheckCircle, TrendingUp, Activity, Database, Settings, FileText, Zap, Eye } from "lucide-react";

export const metadata: Metadata = {
	title: "Admin Dashboard | LaunchBeacon",
	description: "Platform administration and management tools for LaunchBeacon.",
};

// Mock admin data - replace with real data from API
const mockAdminData = {
	platform: {
		totalUsers: 125684,
		totalDevelopers: 8932,
		totalGames: 45123,
		totalRevenue: 2485390.5,
		activeUsers: 23891,
		pendingReviews: 156,
		reportedContent: 23,
		systemHealth: 99.8,
	},
	recentActivity: [
		{
			id: "1",
			type: "user_registered",
			user: "alex.dev",
			timestamp: "2024-12-29T10:30:00Z",
			details: "New developer account created",
		},
		{
			id: "2",
			type: "game_published",
			user: "indie.studio",
			timestamp: "2024-12-29T10:15:00Z",
			details: "Published 'Pixel Adventures'",
		},
		{
			id: "3",
			type: "content_reported",
			user: "moderator.team",
			timestamp: "2024-12-29T09:45:00Z",
			details: "Content violation reported for game ID: 12345",
		},
	],
	systemMetrics: {
		serverLoad: 45,
		memoryUsage: 62,
		diskUsage: 78,
		apiResponseTime: 125,
	},
	moderation: {
		pendingReports: 23,
		resolvedToday: 45,
		autoModActions: 156,
		flaggedContent: 12,
	},
};

export default function AdminDashboardPage() {
	const { platform, recentActivity, systemMetrics, moderation } = mockAdminData;

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-7xl mx-auto px-8 py-12">
				{/* Header */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
					<div>
						<h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
						<p className="text-gray-400">Platform administration and monitoring</p>
					</div>

					<div className="flex items-center space-x-3">
						<Badge variant="outline" className="border-green-600 text-green-400">
							<Activity className="w-3 h-3 mr-1" />
							System Healthy
						</Badge>
						<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
							<Settings className="w-4 h-4 mr-2" />
							Settings
						</Button>
					</div>
				</div>

				{/* Platform Overview */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<AdminStatCard title="Total Users" value={platform.totalUsers.toLocaleString()} icon={<Users className="w-5 h-5" />} color="blue" trend="+12.5%" />
					<AdminStatCard title="Total Games" value={platform.totalGames.toLocaleString()} icon={<Gamepad2 className="w-5 h-5" />} color="rust" trend="+8.3%" />
					<AdminStatCard title="Platform Revenue" value={`$${(platform.totalRevenue / 1000000).toFixed(1)}M`} icon={<DollarSign className="w-5 h-5" />} color="green" trend="+15.2%" />
					<AdminStatCard title="Active Users" value={platform.activeUsers.toLocaleString()} icon={<Activity className="w-5 h-5" />} color="purple" trend="+5.7%" />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					{/* System Health */}
					<Card className="bg-gray-900/50 border-gray-800">
						<CardHeader>
							<CardTitle className="text-white flex items-center">
								<Database className="w-5 h-5 mr-2 text-blue-400" />
								System Health
							</CardTitle>
							<CardDescription>Real-time system performance metrics</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<SystemMetric label="Server Load" value={systemMetrics.serverLoad} max={100} unit="%" color="blue" />
							<SystemMetric label="Memory Usage" value={systemMetrics.memoryUsage} max={100} unit="%" color="green" />
							<SystemMetric label="Disk Usage" value={systemMetrics.diskUsage} max={100} unit="%" color="orange" />
							<SystemMetric label="API Response Time" value={systemMetrics.apiResponseTime} max={500} unit="ms" color="purple" />
						</CardContent>
					</Card>

					{/* Content Moderation */}
					<Card className="bg-gray-900/50 border-gray-800">
						<CardHeader>
							<CardTitle className="text-white flex items-center">
								<Shield className="w-5 h-5 mr-2 text-rust-400" />
								Content Moderation
							</CardTitle>
							<CardDescription>AI-powered content moderation overview</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<ModerationStat label="Pending Reports" value={moderation.pendingReports} icon={<AlertTriangle className="w-4 h-4" />} color="yellow" action="Review" href="/admin/moderation/reports" />
							<ModerationStat label="Resolved Today" value={moderation.resolvedToday} icon={<CheckCircle className="w-4 h-4" />} color="green" action="View" href="/admin/moderation/resolved" />
							<ModerationStat label="Auto-Mod Actions" value={moderation.autoModActions} icon={<Zap className="w-4 h-4" />} color="blue" action="Monitor" href="/admin/moderation/auto" />
							<ModerationStat label="Flagged Content" value={moderation.flaggedContent} icon={<Eye className="w-4 h-4" />} color="red" action="Review" href="/admin/moderation/flagged" />
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<AdminActionCard title="User Management" description="Manage users and developers" icon={<Users className="w-6 h-6" />} href="/admin/users" color="blue" stats="125,684 users" />
					<AdminActionCard title="Content Review" description="Review pending games and content" icon={<FileText className="w-6 h-6" />} href="/admin/content" color="rust" stats={`${platform.pendingReviews} pending`} />
					<AdminActionCard title="Analytics" description="Platform performance insights" icon={<TrendingUp className="w-6 h-6" />} href="/admin/analytics" color="green" stats="Real-time data" />
					<AdminActionCard title="System Settings" description="Configure platform settings" icon={<Settings className="w-6 h-6" />} href="/admin/settings" color="purple" stats="Full control" />
				</div>

				{/* Recent Activity */}
				<Card className="bg-gray-900/50 border-gray-800">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-white">Recent Platform Activity</CardTitle>
							<Button variant="ghost" size="sm" className="text-rust-400 hover:text-rust-300" asChild>
								<Link href="/admin/activity">View All</Link>
							</Button>
						</div>
						<CardDescription>Latest platform events and admin actions</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentActivity.map((activity) => (
								<ActivityItem key={activity.id} activity={activity} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function AdminStatCard({ title, value, icon, color, trend }: { title: string; value: string; icon: React.ReactNode; color: "rust" | "blue" | "green" | "purple"; trend?: string }) {
	const colorClasses = {
		rust: "text-rust-400 bg-rust-400/10",
		blue: "text-blue-400 bg-blue-400/10",
		green: "text-green-400 bg-green-400/10",
		purple: "text-purple-400 bg-purple-400/10",
	};

	return (
		<Card className="bg-gray-900/50 border-gray-800">
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
					{trend && <span className="text-green-400 text-sm font-medium">{trend}</span>}
				</div>
				<div className="mt-4">
					<h3 className="text-2xl font-bold text-white">{value}</h3>
					<p className="text-gray-400 text-sm">{title}</p>
				</div>
			</CardContent>
		</Card>
	);
}

function SystemMetric({ label, value, max, unit, color }: { label: string; value: number; max: number; unit: string; color: "blue" | "green" | "orange" | "purple" }) {
	const percentage = (value / max) * 100;
	const colorClasses = {
		blue: "bg-blue-600",
		green: "bg-green-600",
		orange: "bg-orange-600",
		purple: "bg-purple-600",
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-gray-400">{label}</span>
				<span className="text-white font-medium">
					{value}
					{unit}
				</span>
			</div>
			<div className="w-full bg-gray-700 rounded-full h-2">
				<div className={`h-2 rounded-full ${colorClasses[color]}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
			</div>
		</div>
	);
}

function ModerationStat({ label, value, icon, color, action, href }: { label: string; value: number; icon: React.ReactNode; color: "yellow" | "green" | "blue" | "red"; action: string; href: string }) {
	const colorClasses = {
		yellow: "text-yellow-400",
		green: "text-green-400",
		blue: "text-blue-400",
		red: "text-red-400",
	};

	return (
		<div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
			<div className="flex items-center space-x-3">
				<div className={colorClasses[color]}>{icon}</div>
				<div>
					<p className="text-white font-medium">{value}</p>
					<p className="text-gray-400 text-sm">{label}</p>
				</div>
			</div>
			<Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800" asChild>
				<Link href={href}>{action}</Link>
			</Button>
		</div>
	);
}

function AdminActionCard({ title, description, icon, href, color, stats }: { title: string; description: string; icon: React.ReactNode; href: string; color: "blue" | "rust" | "green" | "purple"; stats: string }) {
	const colorClasses = {
		blue: "border-blue-600/20 hover:border-blue-500 text-blue-400",
		rust: "border-rust-600/20 hover:border-rust-500 text-rust-400",
		green: "border-green-600/20 hover:border-green-500 text-green-400",
		purple: "border-purple-600/20 hover:border-purple-500 text-purple-400",
	};

	return (
		<Link href={href}>
			<Card className={`bg-gray-900/30 border-2 ${colorClasses[color]} hover:bg-gray-800/50 transition-all cursor-pointer`}>
				<CardContent className="p-6">
					<div className="flex items-start justify-between">
						<div className="space-y-2">
							<div className="flex items-center space-x-2">
								{icon}
								<h3 className="text-white font-semibold">{title}</h3>
							</div>
							<p className="text-gray-400 text-sm">{description}</p>
							<p className="text-xs font-medium opacity-75">{stats}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

function ActivityItem({ activity }: { activity: (typeof mockAdminData.recentActivity)[0] }) {
	const getActivityIcon = (type: string) => {
		switch (type) {
			case "user_registered":
				return <Users className="w-4 h-4 text-blue-400" />;
			case "game_published":
				return <Gamepad2 className="w-4 h-4 text-green-400" />;
			case "content_reported":
				return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
			default:
				return <Activity className="w-4 h-4 text-gray-400" />;
		}
	};

	const getActivityColor = (type: string) => {
		switch (type) {
			case "user_registered":
				return "bg-blue-400/10";
			case "game_published":
				return "bg-green-400/10";
			case "content_reported":
				return "bg-yellow-400/10";
			default:
				return "bg-gray-400/10";
		}
	};

	return (
		<div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg">
			<div className={`p-2 rounded ${getActivityColor(activity.type)}`}>{getActivityIcon(activity.type)}</div>
			<div className="flex-1 min-w-0">
				<p className="text-white text-sm">
					<span className="font-medium">{activity.user}</span> - {activity.details}
				</p>
				<p className="text-gray-500 text-xs">{new Date(activity.timestamp).toLocaleString()}</p>
			</div>
		</div>
	);
}
