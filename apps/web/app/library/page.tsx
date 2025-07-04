import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Play, Download, Clock, Star, Trophy, Heart, Filter, Search, Grid3X3, List, SortAsc, Calendar, Gamepad2, Award, Target, Zap, BookmarkPlus, MoreHorizontal, Settings, Trash2, ExternalLink } from "lucide-react";
import gamesData from "@/data/games.json";
import achievementsData from "@/data/achievements.json";
import { GameImage } from "@/components/GameImage";

export const metadata: Metadata = {
	title: "My Library | LaunchBeacon",
	description: "Your personal gaming library - manage your games, track achievements, and see your gaming progress.",
	keywords: "gaming library, owned games, achievements, gaming stats, game collection",
};

// Mock user library data
const mockUserLibrary = {
	ownedGames: gamesData.data.slice(0, 15).map((game) => ({
		...game,
		dateAdded: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
		lastPlayed: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null,
		playtime: Math.floor(Math.random() * 500) + 10, // minutes
		achievements: {
			unlocked: Math.floor(Math.random() * game.metrics.achievementCount),
			total: game.metrics.achievementCount,
		},
		isInstalled: Math.random() > 0.5,
		updateAvailable: Math.random() > 0.8,
	})),
	recentlyPlayed: gamesData.data.slice(0, 6).map((game) => ({
		...game,
		lastPlayed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
		playtime: Math.floor(Math.random() * 180) + 30,
	})),
	wishlist: gamesData.data.slice(20, 35).map((game) => ({
		...game,
		dateAdded: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
		priceAlert: Math.random() > 0.7,
	})),
	stats: {
		totalGames: gamesData.data.slice(0, 15).length,
		totalPlaytime: 1247, // hours
		totalAchievements: 234,
		completedGames: 8,
		averageRating: 4.3,
		favoriteGenre: "Action",
	},
};

export default function LibraryPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-7xl mx-auto px-8 py-12">
				{/* Header */}
				<div className="space-y-8">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
						<div>
							<h1 className="text-4xl font-bold">My Library</h1>
							<p className="text-gray-400 mt-2">Manage your games, track achievements, and see your progress</p>
						</div>

						{/* Library Stats */}
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
							<Card className="bg-gray-900/50 border-gray-800">
								<CardContent className="p-4 text-center">
									<div className="text-2xl font-bold text-white">{mockUserLibrary.stats.totalGames}</div>
									<div className="text-xs text-gray-400">Games</div>
								</CardContent>
							</Card>
							<Card className="bg-gray-900/50 border-gray-800">
								<CardContent className="p-4 text-center">
									<div className="text-2xl font-bold text-rust-400">{mockUserLibrary.stats.totalPlaytime}h</div>
									<div className="text-xs text-gray-400">Played</div>
								</CardContent>
							</Card>
							<Card className="bg-gray-900/50 border-gray-800">
								<CardContent className="p-4 text-center">
									<div className="text-2xl font-bold text-yellow-400">{mockUserLibrary.stats.totalAchievements}</div>
									<div className="text-xs text-gray-400">Achievements</div>
								</CardContent>
							</Card>
							<Card className="bg-gray-900/50 border-gray-800">
								<CardContent className="p-4 text-center">
									<div className="text-2xl font-bold text-green-400">{mockUserLibrary.stats.completedGames}</div>
									<div className="text-xs text-gray-400">Completed</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Recently Played */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">Recently Played</h2>
							<Link href="/library?tab=recent" className="text-rust-400 hover:text-rust-300 text-sm font-medium">
								View All
							</Link>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
							{mockUserLibrary.recentlyPlayed.map((game) => (
								<Link key={game.id} href={`/games/${game.id}`} className="group space-y-2">
									<div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-gray-800 group-hover:border-rust-500 transition-colors">
										<GameImage src={game.media.coverImage} alt={game.title} width={200} height={267} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
										<div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
											<Button size="sm" className="bg-rust-600 hover:bg-rust-700 text-white">
												<Play className="w-4 h-4 mr-2" />
												Play
											</Button>
										</div>
									</div>
									<div className="space-y-1">
										<h3 className="font-medium text-sm text-white group-hover:text-rust-400 transition-colors truncate">{game.title}</h3>
										<div className="flex items-center space-x-2 text-xs text-gray-400">
											<Clock className="w-3 h-3" />
											<span>
												{Math.floor(game.playtime / 60)}h {game.playtime % 60}m
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* Main Content Tabs */}
				<div className="mt-12">
					<Tabs defaultValue="owned" className="space-y-8">
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
							<TabsList className="bg-gray-900 border border-gray-800 w-fit">
								<TabsTrigger value="owned" className="data-[state=active]:bg-rust-600 data-[state=active]:text-white">
									Owned Games ({mockUserLibrary.ownedGames.length})
								</TabsTrigger>
								<TabsTrigger value="wishlist" className="data-[state=active]:bg-rust-600 data-[state=active]:text-white">
									Wishlist ({mockUserLibrary.wishlist.length})
								</TabsTrigger>
								<TabsTrigger value="achievements" className="data-[state=active]:bg-rust-600 data-[state=active]:text-white">
									Achievements
								</TabsTrigger>
								<TabsTrigger value="stats" className="data-[state=active]:bg-rust-600 data-[state=active]:text-white">
									Statistics
								</TabsTrigger>
							</TabsList>

							{/* Filters & Search */}
							<div className="flex items-center space-x-3">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
									<Input type="text" placeholder="Search your games..." className="w-64 pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" />
								</div>
								<Select>
									<SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white">
										<SelectValue placeholder="Sort by" />
									</SelectTrigger>
									<SelectContent className="bg-gray-900 border-gray-700">
										<SelectItem value="recent">Recent</SelectItem>
										<SelectItem value="name">Name</SelectItem>
										<SelectItem value="playtime">Playtime</SelectItem>
										<SelectItem value="added">Date Added</SelectItem>
									</SelectContent>
								</Select>
								<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
									<Grid3X3 className="w-4 h-4" />
								</Button>
								<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
									<List className="w-4 h-4" />
								</Button>
							</div>
						</div>

						{/* Owned Games Tab */}
						<TabsContent value="owned" className="space-y-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
								{mockUserLibrary.ownedGames.map((game) => (
									<Card key={game.id} className="bg-gray-900/50 border-gray-800 hover:border-rust-500/50 transition-colors group">
										<CardContent className="p-0">
											<div className="flex">
												{/* Game Cover */}
												<div className="relative w-32 h-40 flex-shrink-0">
													<GameImage src={game.media.coverImage} alt={game.title} width={128} height={160} className="w-full h-full object-cover rounded-l-lg" />
													{game.updateAvailable && (
														<div className="absolute top-2 left-2">
															<Badge className="bg-blue-600 text-white text-xs">Update</Badge>
														</div>
													)}
												</div>

												{/* Game Info */}
												<div className="flex-1 p-4 space-y-3">
													<div className="space-y-1">
														<Link href={`/games/${game.id}`} className="font-semibold text-white hover:text-rust-400 transition-colors line-clamp-2">
															{game.title}
														</Link>
														<div className="flex items-center space-x-2 text-sm text-gray-400">
															<Clock className="w-3 h-3" />
															<span>
																{Math.floor(game.playtime / 60)}h {game.playtime % 60}m played
															</span>
														</div>
													</div>

													{/* Achievement Progress */}
													{game.achievements.total > 0 && (
														<div className="space-y-1">
															<div className="flex items-center justify-between text-sm">
																<span className="text-gray-400">Achievements</span>
																<span className="text-yellow-400">
																	{game.achievements.unlocked}/{game.achievements.total}
																</span>
															</div>
															<Progress value={(game.achievements.unlocked / game.achievements.total) * 100} className="h-2" />
														</div>
													)}

													{/* Action Buttons */}
													<div className="flex items-center justify-between pt-2">
														<div className="flex space-x-2">
															{game.isInstalled ? (
																<Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
																	<Play className="w-3 h-3 mr-1" />
																	Play
																</Button>
															) : (
																<Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
																	<Download className="w-3 h-3 mr-1" />
																	Install
																</Button>
															)}
														</div>
														<div className="text-xs text-gray-500">{game.lastPlayed ? <span>Last played {new Date(game.lastPlayed).toLocaleDateString()}</span> : <span>Never played</span>}</div>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</TabsContent>

						{/* Wishlist Tab */}
						<TabsContent value="wishlist" className="space-y-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
								{mockUserLibrary.wishlist.map((game) => (
									<Card key={game.id} className="bg-gray-900/50 border-gray-800 hover:border-rust-500/50 transition-colors">
										<CardContent className="p-0">
											<div className="flex">
												{/* Game Cover */}
												<div className="relative w-32 h-40 flex-shrink-0">
													<GameImage src={game.media.coverImage} alt={game.title} width={128} height={160} className="w-full h-full object-cover rounded-l-lg" />
													{game.priceAlert && (
														<div className="absolute top-2 left-2">
															<Badge className="bg-green-600 text-white text-xs">Price Alert</Badge>
														</div>
													)}
												</div>

												{/* Game Info */}
												<div className="flex-1 p-4 space-y-3">
													<div className="space-y-1">
														<Link href={`/games/${game.id}`} className="font-semibold text-white hover:text-rust-400 transition-colors line-clamp-2">
															{game.title}
														</Link>
														<div className="flex items-center justify-between">
															<div className="text-lg font-bold text-white">{game.pricing.basePrice === 0 ? <span className="text-green-400">Free</span> : <span>${(game.pricing.basePrice / 100).toFixed(2)}</span>}</div>
															<div className="flex items-center space-x-1 text-sm text-gray-400">
																<Star className="w-3 h-3 text-yellow-400" />
																<span>{game.metrics.rating.toFixed(1)}</span>
															</div>
														</div>
													</div>

													{/* Action Buttons */}
													<div className="flex items-center justify-between pt-2">
														<div className="flex space-x-2">
															<Button size="sm" className="bg-rust-600 hover:bg-rust-700 text-white">
																Add to Cart
															</Button>
															<Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
																<Trash2 className="w-3 h-3" />
															</Button>
														</div>
														<div className="text-xs text-gray-500">Added {new Date(game.dateAdded).toLocaleDateString()}</div>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</TabsContent>

						{/* Achievements Tab */}
						<TabsContent value="achievements" className="space-y-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								{/* Achievement Progress */}
								<div className="space-y-4">
									<h3 className="text-xl font-bold">Achievement Progress</h3>
									<Card className="bg-gray-900/50 border-gray-800">
										<CardContent className="p-6 space-y-4">
											<div className="grid grid-cols-2 gap-4">
												<div className="text-center">
													<div className="text-3xl font-bold text-yellow-400">{mockUserLibrary.stats.totalAchievements}</div>
													<div className="text-sm text-gray-400">Total Unlocked</div>
												</div>
												<div className="text-center">
													<div className="text-3xl font-bold text-white">89%</div>
													<div className="text-sm text-gray-400">Completion Rate</div>
												</div>
											</div>

											<div className="space-y-2">
												<div className="flex justify-between text-sm">
													<span className="text-gray-400">Overall Progress</span>
													<span className="text-white">234/263</span>
												</div>
												<Progress value={89} className="h-3" />
											</div>
										</CardContent>
									</Card>
								</div>

								{/* Recent Achievements */}
								<div className="space-y-4">
									<h3 className="text-xl font-bold">Recent Achievements</h3>
									<div className="space-y-3">
										{achievementsData.data.slice(0, 5).map((achievement) => (
											<Card key={achievement.id} className="bg-gray-900/50 border-gray-800">
												<CardContent className="p-4">
													<div className="flex items-center space-x-4">
														<div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
															<Trophy className="w-5 h-5 text-white" />
														</div>
														<div className="flex-1">
															<h4 className="font-semibold text-white">{achievement.title}</h4>
															<p className="text-sm text-gray-400">{achievement.description}</p>
														</div>
														<div className="text-right">
															<div className="text-sm font-medium text-yellow-400">+{achievement.rewards.xp} XP</div>
															<div className="text-xs text-gray-500">2 days ago</div>
														</div>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</div>
							</div>
						</TabsContent>

						{/* Statistics Tab */}
						<TabsContent value="stats" className="space-y-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
								{/* Gaming Stats */}
								<Card className="bg-gray-900/50 border-gray-800">
									<CardHeader>
										<CardTitle className="flex items-center space-x-2">
											<Gamepad2 className="w-5 h-5 text-rust-400" />
											<span>Gaming Stats</span>
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-3">
											<div className="flex justify-between">
												<span className="text-gray-400">Total Games</span>
												<span className="font-medium">{mockUserLibrary.stats.totalGames}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-400">Total Playtime</span>
												<span className="font-medium">{mockUserLibrary.stats.totalPlaytime}h</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-400">Average Rating</span>
												<span className="font-medium">{mockUserLibrary.stats.averageRating}/5.0</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-400">Completed Games</span>
												<span className="font-medium">{mockUserLibrary.stats.completedGames}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-400">Favorite Genre</span>
												<span className="font-medium">{mockUserLibrary.stats.favoriteGenre}</span>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Achievement Stats */}
								<Card className="bg-gray-900/50 border-gray-800">
									<CardHeader>
										<CardTitle className="flex items-center space-x-2">
											<Trophy className="w-5 h-5 text-yellow-400" />
											<span>Achievement Stats</span>
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-3">
											<div className="flex justify-between">
												<span className="text-gray-400">Total Achievements</span>
												<span className="font-medium text-yellow-400">{mockUserLibrary.stats.totalAchievements}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-400">Rare Achievements</span>
												<span className="font-medium text-purple-400">12</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-400">Perfect Games</span>
												<span className="font-medium text-green-400">3</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-400">This Month</span>
												<span className="font-medium">18</span>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Gaming Milestones */}
								<Card className="bg-gray-900/50 border-gray-800">
									<CardHeader>
										<CardTitle className="flex items-center space-x-2">
											<Award className="w-5 h-5 text-rust-400" />
											<span>Milestones</span>
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-3">
											<div className="flex items-center space-x-2">
												<div className="w-2 h-2 bg-green-400 rounded-full"></div>
												<span className="text-sm">Played 1000+ hours</span>
											</div>
											<div className="flex items-center space-x-2">
												<div className="w-2 h-2 bg-green-400 rounded-full"></div>
												<span className="text-sm">200+ achievements unlocked</span>
											</div>
											<div className="flex items-center space-x-2">
												<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
												<span className="text-sm">10 games completed (8/10)</span>
											</div>
											<div className="flex items-center space-x-2">
												<div className="w-2 h-2 bg-gray-600 rounded-full"></div>
												<span className="text-sm text-gray-400">20 games owned (15/20)</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
