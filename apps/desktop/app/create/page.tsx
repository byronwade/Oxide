"use client";

import { useState, useEffect } from "react";
import { usePerformanceMonitor } from "../../hooks/use-performance.tsx";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import { Upload, Code, Wrench, Database, TrendingUp, DollarSign, Users, Download, Star, Eye, MessageCircle, Heart, Share2, Play, Pause, Settings, Package, Zap, Shield, CheckCircle, AlertCircle, Clock, BarChart3, Target, Rocket, Sparkles, Crown, Gift, FileText, ImageIcon, Video, Gamepad2, Paintbrush, Layers, Boxes, Cpu, MemoryStick, HardDrive, Wifi, PlusCircle, Edit, Trash2, RefreshCw, Calendar, MoreHorizontal } from "lucide-react";

interface Project {
	id: string;
	name: string;
	type: "game" | "mod" | "asset" | "tool";
	status: "draft" | "in-review" | "published" | "rejected";
	engine: "unity" | "unreal" | "godot" | "custom";
	progress: number;
	lastModified: string;
	coverImage: string;
	description: string;
	downloads: number;
	rating: number;
	revenue: number;
	version: string;
	platforms: string[];
	fileSize: number;
	tags: string[];
	isPrivate: boolean;
	collaborators: number;
}

interface AnalyticsData {
	totalDownloads: number;
	totalRevenue: number;
	avgRating: number;
	totalProjects: number;
	activeProjects: number;
	monthlyGrowth: number;
	engagement: {
		views: number;
		likes: number;
		comments: number;
		shares: number;
	};
}

const SAMPLE_PROJECTS: Project[] = [
	{
		id: "1",
		name: "Cyberpunk Graphics Mod",
		type: "mod",
		status: "published",
		engine: "unity",
		progress: 100,
		lastModified: "2024-01-15",
		coverImage: "/placeholder.svg",
		description: "Enhanced graphics and lighting for Cyberpunk 2077",
		downloads: 12543,
		rating: 4.8,
		revenue: 1250.5,
		version: "2.1.0",
		platforms: ["PC", "Steam Deck"],
		fileSize: 2.4,
		tags: ["graphics", "enhancement", "lighting"],
		isPrivate: false,
		collaborators: 3,
	},
	{
		id: "2",
		name: "Indie RPG Adventure",
		type: "game",
		status: "in-review",
		engine: "godot",
		progress: 85,
		lastModified: "2024-01-14",
		coverImage: "/placeholder.svg",
		description: "A story-driven RPG with unique mechanics",
		downloads: 0,
		rating: 0,
		revenue: 0,
		version: "0.9.0",
		platforms: ["PC", "Mac", "Linux"],
		fileSize: 1.2,
		tags: ["rpg", "story", "indie"],
		isPrivate: true,
		collaborators: 1,
	},
];

const SAMPLE_ANALYTICS: AnalyticsData = {
	totalDownloads: 25640,
	totalRevenue: 3450.75,
	avgRating: 4.6,
	totalProjects: 8,
	activeProjects: 5,
	monthlyGrowth: 15.3,
	engagement: {
		views: 45320,
		likes: 2340,
		comments: 567,
		shares: 189,
	},
};

export default function CreatePage() {
	const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);
	const [analytics, setAnalytics] = useState<AnalyticsData>(SAMPLE_ANALYTICS);
	const [activeTab, setActiveTab] = useState("projects");
	const [isLoading, setIsLoading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);

	const performance = usePerformanceMonitor("CreatePage", "/create");

	useEffect(() => {
		const fetchCreateData = async () => {
			setIsLoading(true);
			try {
				await new Promise((resolve) => setTimeout(resolve, 100));
				console.log("🛠️ Create page loaded successfully");
			} catch (error) {
				console.error("❌ Failed to load create data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCreateData();
	}, []);

	const handleProjectAction = (projectId: string, action: string) => {
		setProjects((prev) =>
			prev.map((project) => {
				if (project.id === projectId) {
					switch (action) {
						case "publish":
							return { ...project, status: "in-review" as const };
						case "unpublish":
							return { ...project, status: "draft" as const };
						case "delete":
							return { ...project, status: "draft" as const }; // Simulate deletion
						default:
							return project;
					}
				}
				return project;
			})
		);
	};

	const simulateUpload = () => {
		setIsUploading(true);
		setUploadProgress(0);

		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsUploading(false);
					return 100;
				}
				return prev + 10;
			});
		}, 200);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "published":
				return "bg-green-500/20 text-green-400";
			case "in-review":
				return "bg-yellow-500/20 text-yellow-400";
			case "draft":
				return "bg-gray-500/20 text-gray-400";
			case "rejected":
				return "bg-red-500/20 text-red-400";
			default:
				return "bg-gray-500/20 text-gray-400";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "published":
				return <CheckCircle className="w-4 h-4" />;
			case "in-review":
				return <Clock className="w-4 h-4" />;
			case "draft":
				return <Edit className="w-4 h-4" />;
			case "rejected":
				return <AlertCircle className="w-4 h-4" />;
			default:
				return <FileText className="w-4 h-4" />;
		}
	};

	return (
		<div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2]">
			{/* Header */}
			<section className="bg-[#1C1C1C]/50 border-b border-[#2B2B2B]/30">
				<div className="container mx-auto px-6 py-6">
					<div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-[#F2F2F2] mb-2">Developer Console</h1>
							<p className="text-[#AAAAAA]">Create, publish, and manage your games with advanced tools</p>
						</div>
						<div className="flex gap-3">
							<Button onClick={simulateUpload} disabled={isUploading} className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
								<Upload className="w-4 h-4 mr-2" />
								{isUploading ? "Uploading..." : "Upload New Game"}
							</Button>
							<Button variant="outline" className="border-[#3D3D3D] text-[#AAAAAA]">
								<Settings className="w-4 h-4 mr-2" />
								Settings
				</Button>
			</div>
					</div>
					{isUploading && (
						<div className="mt-4 bg-[#2B2B2B] rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-[#AAAAAA]">Uploading Game Build...</span>
								<span className="text-sm text-[#00FFC6]">{uploadProgress}%</span>
							</div>
							<Progress value={uploadProgress} className="bg-[#1C1C1C] h-2" />
						</div>
					)}
				</div>
			</section>

			{/* Main Content */}
			<div className="container mx-auto px-6 py-8">
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-5 mb-8 bg-[#1C1C1C]">
						<TabsTrigger value="projects" className="data-[state=active]:bg-[#00FFC6] data-[state=active]:text-[#0A0A0A]">
							<Package className="w-4 h-4 mr-2" />
							Projects
						</TabsTrigger>
						<TabsTrigger value="analytics" className="data-[state=active]:bg-[#00FFC6] data-[state=active]:text-[#0A0A0A]">
							<BarChart3 className="w-4 h-4 mr-2" />
							Analytics
						</TabsTrigger>
						<TabsTrigger value="upload" className="data-[state=active]:bg-[#00FFC6] data-[state=active]:text-[#0A0A0A]">
							<Upload className="w-4 h-4 mr-2" />
							Upload
						</TabsTrigger>
						<TabsTrigger value="protection" className="data-[state=active]:bg-[#00FFC6] data-[state=active]:text-[#0A0A0A]">
							<Shield className="w-4 h-4 mr-2" />
							Protection
						</TabsTrigger>
						<TabsTrigger value="tools" className="data-[state=active]:bg-[#00FFC6] data-[state=active]:text-[#0A0A0A]">
							<Wrench className="w-4 h-4 mr-2" />
							Tools
						</TabsTrigger>
					</TabsList>

					{/* Projects Tab */}
					<TabsContent value="projects" className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
							{projects.map((project) => (
								<Card key={project.id} className="bg-[#1C1C1C] border-[#2B2B2B]">
									<CardHeader className="pb-3">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Badge className={getStatusColor(project.status)}>
													{getStatusIcon(project.status)}
													<span className="ml-1 capitalize">{project.status}</span>
												</Badge>
												<Badge variant="outline" className="text-xs">
													{project.type}
												</Badge>
											</div>
											<Button variant="ghost" size="sm">
												<MoreHorizontal className="w-4 h-4" />
											</Button>
										</div>
						</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="aspect-video bg-[#2B2B2B] rounded-lg mb-3" />
											<div>
												<h3 className="font-semibold text-[#F2F2F2] mb-1">{project.name}</h3>
												<p className="text-[#AAAAAA] text-sm mb-2">{project.description}</p>
												<div className="flex items-center justify-between text-sm text-[#AAAAAA]">
													<span>v{project.version}</span>
													<span>{project.fileSize}GB</span>
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex items-center justify-between text-sm">
													<span className="text-[#AAAAAA]">Progress</span>
													<span className="text-[#00FFC6]">{project.progress}%</span>
												</div>
												<Progress value={project.progress} className="bg-[#2B2B2B] h-2" />
											</div>
											<div className="grid grid-cols-3 gap-2 text-center">
												<div className="bg-[#2B2B2B] rounded-lg p-2">
													<div className="text-sm font-semibold text-[#F2F2F2]">{project.downloads.toLocaleString()}</div>
													<div className="text-xs text-[#AAAAAA]">Downloads</div>
												</div>
												<div className="bg-[#2B2B2B] rounded-lg p-2">
													<div className="text-sm font-semibold text-[#F2F2F2]">{project.rating.toFixed(1)}</div>
													<div className="text-xs text-[#AAAAAA]">Rating</div>
												</div>
												<div className="bg-[#2B2B2B] rounded-lg p-2">
													<div className="text-sm font-semibold text-[#F2F2F2]">${project.revenue.toLocaleString()}</div>
													<div className="text-xs text-[#AAAAAA]">Revenue</div>
												</div>
											</div>
											<div className="flex gap-2">
												<Button size="sm" className="flex-1 bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
													<Edit className="w-4 h-4 mr-2" />
													Edit
												</Button>
												<Button size="sm" variant="outline" className="flex-1 border-[#3D3D3D] text-[#AAAAAA]">
													<Play className="w-4 h-4 mr-2" />
													{project.status === "published" ? "View" : "Publish"}
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					{/* Analytics Tab */}
					<TabsContent value="analytics" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-[#AAAAAA] text-sm">Total Downloads</p>
											<p className="text-2xl font-bold text-[#F2F2F2]">{analytics.totalDownloads.toLocaleString()}</p>
										</div>
										<Download className="w-8 h-8 text-[#00FFC6]" />
									</div>
									<div className="mt-2 text-xs text-[#00FFC6]">+{analytics.monthlyGrowth}% this month</div>
								</CardContent>
							</Card>
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-[#AAAAAA] text-sm">Total Revenue</p>
											<p className="text-2xl font-bold text-[#F2F2F2]">${analytics.totalRevenue.toLocaleString()}</p>
										</div>
										<DollarSign className="w-8 h-8 text-[#00FFC6]" />
									</div>
									<div className="mt-2 text-xs text-[#00FFC6]">+{analytics.monthlyGrowth}% this month</div>
								</CardContent>
							</Card>
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-[#AAAAAA] text-sm">Average Rating</p>
											<p className="text-2xl font-bold text-[#F2F2F2]">{analytics.avgRating.toFixed(1)}</p>
										</div>
										<Star className="w-8 h-8 text-[#00FFC6]" />
									</div>
									<div className="mt-2 text-xs text-[#00FFC6]">Top 10% of developers</div>
								</CardContent>
							</Card>
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
						<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-[#AAAAAA] text-sm">Active Projects</p>
											<p className="text-2xl font-bold text-[#F2F2F2]">{analytics.activeProjects}</p>
										</div>
										<Package className="w-8 h-8 text-[#00FFC6]" />
									</div>
									<div className="mt-2 text-xs text-[#AAAAAA]">of {analytics.totalProjects} total</div>
								</CardContent>
							</Card>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2]">Engagement Metrics</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Eye className="w-4 h-4 text-[#AAAAAA]" />
												<span className="text-[#AAAAAA]">Views</span>
											</div>
											<span className="text-[#F2F2F2] font-semibold">{analytics.engagement.views.toLocaleString()}</span>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Heart className="w-4 h-4 text-[#AAAAAA]" />
												<span className="text-[#AAAAAA]">Likes</span>
											</div>
											<span className="text-[#F2F2F2] font-semibold">{analytics.engagement.likes.toLocaleString()}</span>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<MessageCircle className="w-4 h-4 text-[#AAAAAA]" />
												<span className="text-[#AAAAAA]">Comments</span>
											</div>
											<span className="text-[#F2F2F2] font-semibold">{analytics.engagement.comments.toLocaleString()}</span>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Share2 className="w-4 h-4 text-[#AAAAAA]" />
												<span className="text-[#AAAAAA]">Shares</span>
											</div>
											<span className="text-[#F2F2F2] font-semibold">{analytics.engagement.shares.toLocaleString()}</span>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2]">Performance Insights</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="bg-[#2B2B2B] rounded-lg p-4">
											<h4 className="font-semibold text-[#F2F2F2] mb-2">🔥 Top Performing Game</h4>
											<p className="text-[#AAAAAA] text-sm">Cyberpunk Graphics Mod</p>
											<p className="text-[#00FFC6] text-sm">12.5K downloads this month</p>
										</div>
										<div className="bg-[#2B2B2B] rounded-lg p-4">
											<h4 className="font-semibold text-[#F2F2F2] mb-2">📈 Growth Opportunity</h4>
											<p className="text-[#AAAAAA] text-sm">Consider adding mobile support</p>
											<p className="text-[#00FFC6] text-sm">+45% potential reach</p>
										</div>
										<div className="bg-[#2B2B2B] rounded-lg p-4">
											<h4 className="font-semibold text-[#F2F2F2] mb-2">🎯 Recommendation</h4>
											<p className="text-[#AAAAAA] text-sm">Update your game descriptions</p>
											<p className="text-[#00FFC6] text-sm">+20% discovery boost</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Upload Tab */}
					<TabsContent value="upload" className="space-y-6">
						<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
							<CardHeader>
								<CardTitle className="text-[#F2F2F2]">Upload New Game</CardTitle>
								<p className="text-[#AAAAAA]">Follow the steps below to upload your game to the Oxide platform</p>
							</CardHeader>
							<CardContent>
								<div className="space-y-8">
									{/* Step 1: Basic Information */}
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 bg-[#00FFC6] rounded-full flex items-center justify-center text-[#0A0A0A] font-semibold">1</div>
											<h3 className="text-lg font-semibold text-[#F2F2F2]">Basic Information</h3>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
											<div>
												<label className="block text-sm font-medium text-[#AAAAAA] mb-2">Game Title</label>
												<Input placeholder="Enter game title" className="bg-[#2B2B2B] border-[#3D3D3D]" />
											</div>
											<div>
												<label className="block text-sm font-medium text-[#AAAAAA] mb-2">Genre</label>
												<Input placeholder="e.g., Action RPG" className="bg-[#2B2B2B] border-[#3D3D3D]" />
											</div>
											<div>
												<label className="block text-sm font-medium text-[#AAAAAA] mb-2">Price</label>
												<Input placeholder="$0.00" className="bg-[#2B2B2B] border-[#3D3D3D]" />
											</div>
											<div>
												<label className="block text-sm font-medium text-[#AAAAAA] mb-2">Release Date</label>
												<Input type="date" className="bg-[#2B2B2B] border-[#3D3D3D]" />
											</div>
										</div>
									</div>

									{/* Step 2: Media & Assets */}
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 bg-[#3D3D3D] rounded-full flex items-center justify-center text-[#AAAAAA] font-semibold">2</div>
											<h3 className="text-lg font-semibold text-[#F2F2F2]">Media & Assets</h3>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
											<div className="space-y-2">
												<label className="block text-sm font-medium text-[#AAAAAA]">Cover Image</label>
												<div className="border-2 border-dashed border-[#3D3D3D] rounded-lg p-8 text-center">
													<ImageIcon className="w-12 h-12 mx-auto text-[#AAAAAA] mb-4" />
													<p className="text-[#AAAAAA]">Upload cover image (1920x1080)</p>
													<Button variant="outline" className="mt-2">Choose File</Button>
												</div>
											</div>
											<div className="space-y-2">
												<label className="block text-sm font-medium text-[#AAAAAA]">Screenshots</label>
												<div className="border-2 border-dashed border-[#3D3D3D] rounded-lg p-8 text-center">
													<Layers className="w-12 h-12 mx-auto text-[#AAAAAA] mb-4" />
													<p className="text-[#AAAAAA]">Upload screenshots (up to 10)</p>
													<Button variant="outline" className="mt-2">Choose Files</Button>
												</div>
											</div>
										</div>
									</div>

									{/* Step 3: Game Files */}
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 bg-[#3D3D3D] rounded-full flex items-center justify-center text-[#AAAAAA] font-semibold">3</div>
											<h3 className="text-lg font-semibold text-[#F2F2F2]">Game Files</h3>
										</div>
										<div className="ml-11">
											<div className="border-2 border-dashed border-[#3D3D3D] rounded-lg p-12 text-center">
												<Package className="w-16 h-16 mx-auto text-[#AAAAAA] mb-4" />
												<p className="text-[#F2F2F2] text-lg mb-2">Upload Game Build</p>
												<p className="text-[#AAAAAA] mb-4">Drag & drop your game files or click to browse</p>
												<Button className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
													<Upload className="w-4 h-4 mr-2" />
													Upload Files
												</Button>
											</div>
										</div>
									</div>

									{/* Step 4: Protection Settings */}
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 bg-[#3D3D3D] rounded-full flex items-center justify-center text-[#AAAAAA] font-semibold">4</div>
											<h3 className="text-lg font-semibold text-[#F2F2F2]">Protection & Security</h3>
										</div>
										<div className="ml-11 space-y-4">
											<div className="bg-[#2B2B2B] rounded-lg p-6">
												<h4 className="font-semibold text-[#F2F2F2] mb-4">Anti-Piracy Protection</h4>
												<div className="space-y-3">
													<div className="flex items-center justify-between">
														<span className="text-[#AAAAAA]">DRM Protection</span>
														<Button variant="outline" size="sm">Configure</Button>
													</div>
													<div className="flex items-center justify-between">
														<span className="text-[#AAAAAA]">Real-time Monitoring</span>
														<Button variant="outline" size="sm">Enable</Button>
													</div>
													<div className="flex items-center justify-between">
														<span className="text-[#AAAAAA]">Automated Takedowns</span>
														<Button variant="outline" size="sm">Setup</Button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Protection Tab */}
					<TabsContent value="protection" className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2] flex items-center">
										<Shield className="w-5 h-5 mr-2 text-[#00FFC6]" />
										Protection Status
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center justify-between p-4 bg-[#2B2B2B] rounded-lg">
											<div className="flex items-center gap-3">
												<CheckCircle className="w-5 h-5 text-green-400" />
												<span className="text-[#F2F2F2]">DRM Protection</span>
											</div>
											<Badge className="bg-green-500/20 text-green-400">Active</Badge>
										</div>
										<div className="flex items-center justify-between p-4 bg-[#2B2B2B] rounded-lg">
											<div className="flex items-center gap-3">
												<CheckCircle className="w-5 h-5 text-green-400" />
												<span className="text-[#F2F2F2]">Real-time Monitoring</span>
											</div>
											<Badge className="bg-green-500/20 text-green-400">Active</Badge>
										</div>
										<div className="flex items-center justify-between p-4 bg-[#2B2B2B] rounded-lg">
											<div className="flex items-center gap-3">
												<AlertCircle className="w-5 h-5 text-yellow-400" />
												<span className="text-[#F2F2F2]">Automated Takedowns</span>
											</div>
											<Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2]">Security Metrics</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Threats Detected</span>
											<span className="text-[#F2F2F2] font-semibold">3</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Takedowns Sent</span>
											<span className="text-[#F2F2F2] font-semibold">2</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Success Rate</span>
											<span className="text-[#00FFC6] font-semibold">85%</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Protected Revenue</span>
											<span className="text-[#00FFC6] font-semibold">$1,247</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Tools Tab */}
					<TabsContent value="tools" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2] flex items-center">
										<Code className="w-5 h-5 mr-2 text-[#00FFC6]" />
										SDK & APIs
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-[#AAAAAA] text-sm mb-4">Integrate Oxide features into your games</p>
									<div className="space-y-2">
										<Button variant="outline" className="w-full justify-start">
											<Download className="w-4 h-4 mr-2" />
											Download SDK
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<FileText className="w-4 h-4 mr-2" />
											API Documentation
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2] flex items-center">
										<Paintbrush className="w-5 h-5 mr-2 text-[#00FFC6]" />
										Asset Store
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-[#AAAAAA] text-sm mb-4">Buy and sell game assets</p>
									<div className="space-y-2">
										<Button variant="outline" className="w-full justify-start">
											<Package className="w-4 h-4 mr-2" />
											Browse Assets
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<Upload className="w-4 h-4 mr-2" />
											Sell Assets
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2] flex items-center">
										<Users className="w-5 h-5 mr-2 text-[#00FFC6]" />
										Community
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-[#AAAAAA] text-sm mb-4">Connect with other developers</p>
									<div className="space-y-2">
										<Button variant="outline" className="w-full justify-start">
											<MessageCircle className="w-4 h-4 mr-2" />
											Developer Forums
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<Calendar className="w-4 h-4 mr-2" />
											Events & Jams
										</Button>
							</div>
						</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
			{/* Header */}
			<section className="bg-[#1C1C1C]/50 border-b border-[#2B2B2B]/30">
				<div className="container mx-auto px-6 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold text-[#F2F2F2] mb-2">Create & Develop</h1>
							<p className="text-[#AAAAAA]">Build, publish, and monetize your games</p>
						</div>
						<div className="flex gap-3">
							<Button variant="outline" className="border-[#3D3D3D] text-[#AAAAAA] hover:text-[#F2F2F2]">
								<Settings className="w-4 h-4 mr-2" />
								Settings
							</Button>
							<Button className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]" onClick={simulateUpload} disabled={isUploading}>
								<Upload className="w-4 h-4 mr-2" />
								New Project
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Analytics Dashboard */}
			<section className="bg-[#1C1C1C]/30 border-b border-[#2B2B2B]/30">
				<div className="container mx-auto px-6 py-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-[#AAAAAA] text-sm mb-1">Total Downloads</p>
										<p className="text-2xl font-bold text-[#F2F2F2]">{analytics.totalDownloads.toLocaleString()}</p>
									</div>
									<Download className="w-8 h-8 text-[#00FFC6]" />
								</div>
								<div className="flex items-center gap-2 mt-2">
									<TrendingUp className="w-4 h-4 text-green-400" />
									<span className="text-green-400 text-sm">+{analytics.monthlyGrowth}%</span>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-[#AAAAAA] text-sm mb-1">Revenue</p>
										<p className="text-2xl font-bold text-[#F2F2F2]">${analytics.totalRevenue.toLocaleString()}</p>
									</div>
									<DollarSign className="w-8 h-8 text-[#00FFC6]" />
								</div>
								<div className="flex items-center gap-2 mt-2">
									<TrendingUp className="w-4 h-4 text-green-400" />
									<span className="text-green-400 text-sm">+12.5%</span>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-[#AAAAAA] text-sm mb-1">Avg Rating</p>
										<p className="text-2xl font-bold text-[#F2F2F2]">{analytics.avgRating.toFixed(1)}</p>
									</div>
									<Star className="w-8 h-8 text-[#00FFC6]" />
								</div>
								<div className="flex items-center gap-2 mt-2">
									<span className="text-[#AAAAAA] text-sm">{analytics.engagement.likes} likes</span>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-[#AAAAAA] text-sm mb-1">Active Projects</p>
										<p className="text-2xl font-bold text-[#F2F2F2]">{analytics.activeProjects}</p>
									</div>
									<Package className="w-8 h-8 text-[#00FFC6]" />
								</div>
								<div className="flex items-center gap-2 mt-2">
									<span className="text-[#AAAAAA] text-sm">of {analytics.totalProjects} total</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Upload Progress */}
			{isUploading && (
				<section className="bg-[#1C1C1C]/30 border-b border-[#2B2B2B]/30">
					<div className="container mx-auto px-6 py-4">
						<div className="flex items-center gap-4">
							<Upload className="w-5 h-5 text-[#00FFC6]" />
							<div className="flex-1">
								<div className="flex items-center justify-between mb-2">
									<span className="text-[#F2F2F2] font-medium">Uploading project...</span>
									<span className="text-[#AAAAAA]">{uploadProgress}%</span>
								</div>
								<Progress value={uploadProgress} className="h-2" />
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Navigation Tabs */}
			<section className="bg-[#1C1C1C]/30 border-b border-[#2B2B2B]/30">
				<div className="container mx-auto px-6">
					<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
						<TabsList className="bg-transparent border-b border-[#2B2B2B] rounded-none h-auto p-0">
							<TabsTrigger value="projects" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#00FFC6] data-[state=active]:text-[#00FFC6] rounded-none px-6 py-4">
								<Package className="w-4 h-4 mr-2" />
								Projects
							</TabsTrigger>
							<TabsTrigger value="analytics" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#00FFC6] data-[state=active]:text-[#00FFC6] rounded-none px-6 py-4">
								<BarChart3 className="w-4 h-4 mr-2" />
								Analytics
							</TabsTrigger>
							<TabsTrigger value="resources" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#00FFC6] data-[state=active]:text-[#00FFC6] rounded-none px-6 py-4">
								<Wrench className="w-4 h-4 mr-2" />
								Resources
							</TabsTrigger>
							<TabsTrigger value="community" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#00FFC6] data-[state=active]:text-[#00FFC6] rounded-none px-6 py-4">
								<Users className="w-4 h-4 mr-2" />
								Community
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</section>

			<div className="container mx-auto px-6 py-8">
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					{/* Projects Tab */}
					<TabsContent value="projects" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{projects.map((project) => (
								<Card key={project.id} className="bg-[#1C1C1C] border-[#2B2B2B] hover:border-[#00FFC6]/50 transition-colors">
									<CardContent className="p-0">
										{/* Project Cover */}
										<div className="relative aspect-video rounded-t-lg overflow-hidden bg-[#2B2B2B]">
											<img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
											<div className="absolute top-3 left-3 flex gap-2">
												<Badge className={getStatusColor(project.status)}>
													{getStatusIcon(project.status)}
													<span className="ml-1 capitalize">{project.status}</span>
												</Badge>
												<Badge variant="secondary" className="bg-[#2B2B2B]/80 text-[#AAAAAA]">
													{project.type}
												</Badge>
											</div>
											{project.isPrivate && (
												<div className="absolute top-3 right-3">
													<Badge className="bg-purple-500/20 text-purple-400">
														<Shield className="w-3 h-3 mr-1" />
														Private
													</Badge>
												</div>
											)}
										</div>

										{/* Project Info */}
										<div className="p-6">
											<div className="flex items-start justify-between mb-3">
												<h3 className="font-semibold text-[#F2F2F2] text-lg line-clamp-1">{project.name}</h3>
												<Button variant="ghost" size="sm">
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</div>

											<p className="text-[#AAAAAA] text-sm mb-4 line-clamp-2">{project.description}</p>

											{/* Progress Bar */}
											{project.progress < 100 && (
												<div className="mb-4">
													<div className="flex items-center justify-between mb-2">
														<span className="text-sm text-[#AAAAAA]">Progress</span>
														<span className="text-sm text-[#00FFC6]">{project.progress}%</span>
													</div>
													<Progress value={project.progress} className="h-2" />
												</div>
											)}

											{/* Stats */}
											<div className="grid grid-cols-2 gap-4 mb-4">
												<div className="text-center">
													<div className="text-[#00FFC6] font-semibold">{project.downloads.toLocaleString()}</div>
													<div className="text-[#AAAAAA] text-xs">Downloads</div>
												</div>
												<div className="text-center">
													<div className="text-[#00FFC6] font-semibold">{project.rating > 0 ? project.rating.toFixed(1) : "N/A"}</div>
													<div className="text-[#AAAAAA] text-xs">Rating</div>
												</div>
											</div>

											{/* Tags */}
											<div className="flex flex-wrap gap-1 mb-4">
												{project.tags.slice(0, 3).map((tag) => (
													<Badge key={tag} variant="secondary" className="bg-[#2B2B2B] text-[#AAAAAA] text-xs">
														{tag}
													</Badge>
												))}
											</div>

											{/* Actions */}
											<div className="flex gap-2">
												<Button size="sm" className="flex-1 bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]">
													<Edit className="w-4 h-4 mr-2" />
													Edit
												</Button>
												{project.status === "published" ? (
													<Button variant="outline" size="sm" onClick={() => handleProjectAction(project.id, "unpublish")} className="border-[#3D3D3D]">
														<Pause className="w-4 h-4" />
							</Button>
												) : (
													<Button variant="outline" size="sm" onClick={() => handleProjectAction(project.id, "publish")} className="border-[#3D3D3D]">
														<Play className="w-4 h-4" />
							</Button>
												)}
											</div>
										</div>
									</CardContent>
					</Card>
				))}

							{/* Add New Project Card */}
							<Card className="bg-[#1C1C1C] border-[#2B2B2B] border-dashed hover:border-[#00FFC6]/50 transition-colors cursor-pointer">
								<CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
									<PlusCircle className="w-16 h-16 text-[#3D3D3D] mb-4" />
									<h3 className="text-[#AAAAAA] text-lg mb-2">Create New Project</h3>
									<p className="text-[#AAAAAA] text-sm text-center mb-4">Start building your next game, mod, or asset</p>
									<Button className="bg-[#00FFC6] hover:bg-[#00FFC6]/80 text-[#0A0A0A]" onClick={simulateUpload}>
										<Plus className="w-4 h-4 mr-2" />
										New Project
									</Button>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Analytics Tab */}
					<TabsContent value="analytics" className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2]">Revenue Overview</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">This Month</span>
											<span className="text-[#00FFC6] font-semibold">$1,245.50</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Last Month</span>
											<span className="text-[#AAAAAA]">$1,087.25</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Growth</span>
											<span className="text-green-400">+14.6%</span>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2]">Engagement</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Views</span>
											<span className="text-[#00FFC6] font-semibold">{analytics.engagement.views.toLocaleString()}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Likes</span>
											<span className="text-[#AAAAAA]">{analytics.engagement.likes.toLocaleString()}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Comments</span>
											<span className="text-[#AAAAAA]">{analytics.engagement.comments.toLocaleString()}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Resources Tab */}
					<TabsContent value="resources" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2] flex items-center">
										<Code className="w-5 h-5 mr-2" />
										Development Tools
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Unity 2023.2</span>
											<Button variant="outline" size="sm">
												Download
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Unreal Engine 5</span>
											<Button variant="outline" size="sm">
												Download
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Godot 4.2</span>
											<Button variant="outline" size="sm">
												Download
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2] flex items-center">
										<Paintbrush className="w-5 h-5 mr-2" />
										Asset Libraries
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Texture Packs</span>
											<Button variant="outline" size="sm">
												Browse
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">3D Models</span>
											<Button variant="outline" size="sm">
												Browse
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Sound Effects</span>
											<Button variant="outline" size="sm">
												Browse
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2] flex items-center">
										<Database className="w-5 h-5 mr-2" />
										Documentation
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">API Reference</span>
											<Button variant="outline" size="sm">
												View
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Tutorials</span>
											<Button variant="outline" size="sm">
												View
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-[#AAAAAA]">Best Practices</span>
											<Button variant="outline" size="sm">
												View
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					{/* Community Tab */}
					<TabsContent value="community" className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2]">Developer Forum</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center gap-3 p-3 bg-[#2B2B2B] rounded-lg">
											<div className="w-8 h-8 bg-[#3D3D3D] rounded-full" />
											<div className="flex-1">
												<p className="text-[#F2F2F2] text-sm">Need help with Unity scripting?</p>
												<p className="text-[#AAAAAA] text-xs">2 hours ago</p>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 bg-[#2B2B2B] rounded-lg">
											<div className="w-8 h-8 bg-[#3D3D3D] rounded-full" />
											<div className="flex-1">
												<p className="text-[#F2F2F2] text-sm">Showcasing my latest indie game</p>
												<p className="text-[#AAAAAA] text-xs">5 hours ago</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-[#1C1C1C] border-[#2B2B2B]">
								<CardHeader>
									<CardTitle className="text-[#F2F2F2]">Events & Jams</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center gap-3 p-3 bg-[#2B2B2B] rounded-lg">
											<Calendar className="w-8 h-8 text-[#00FFC6]" />
											<div className="flex-1">
												<p className="text-[#F2F2F2] text-sm">Indie Game Jam 2024</p>
												<p className="text-[#AAAAAA] text-xs">Starts in 3 days</p>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 bg-[#2B2B2B] rounded-lg">
											<Calendar className="w-8 h-8 text-[#00FFC6]" />
											<div className="flex-1">
												<p className="text-[#F2F2F2] text-sm">Unity Workshop</p>
												<p className="text-[#AAAAAA] text-xs">Next week</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
