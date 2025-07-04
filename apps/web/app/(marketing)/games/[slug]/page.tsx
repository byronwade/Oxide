import { cache } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import gamesData from "@/data/complete-games.json";
import achievementsData from "@/data/achievements.json";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Download, Users, Calendar, Info, Tag, Award, Heart, Share, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Game } from "@/types/game";
import { Achievement } from "@/types/achievement";

// This would typically be in an action file
const getGameBySlug = cache(async (slug: string): Promise<Game | null> => {
	const game = (gamesData.data as Game[]).find((g) => g.slug === slug);
	return game || null;
});

const getAchievementsByGameId = cache(async (gameId: string): Promise<Achievement[]> => {
	return (achievementsData.data as unknown as Achievement[]).filter((a) => a.gameId === gameId);
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const game = await getGameBySlug(slug);
	if (!game) {
		return { title: "Game Not Found" };
	}
	return {
		title: `${game.title} by ${game.developer?.name || "Unknown Developer"}`,
		description: `Download and play ${game.title}, an indie game on LaunchBeacon.`,
	};
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const game = await getGameBySlug(slug);

	if (!game) {
		notFound();
	}

	const achievements = await getAchievementsByGameId(game.id);

	return (
		<div className="min-h-screen bg-black">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Breadcrumbs */}
				<Breadcrumb className="py-6">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/" className="text-gray-500 hover:text-white transition-colors">
								<Home className="h-4 w-4" />
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-gray-600" />
						<BreadcrumbItem>
							<BreadcrumbLink href="/store" className="text-gray-500 hover:text-white transition-colors">
								Store
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="text-gray-600" />
						<BreadcrumbItem>
							<span className="text-white">{game.title}</span>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Header */}
						<div className="space-y-4">
							<h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{game.title}</h1>
							<div className="flex items-center space-x-4">
								<p className="text-gray-400">
									by{" "}
									<Link href={`/developers/${game.developer?.name || "unknown"}`} className="text-rust-400 hover:text-rust-300 transition-colors">
										{game.developer?.name || "Unknown Developer"}
									</Link>
								</p>
								<div className="flex items-center space-x-1">
									<Star className="w-4 h-4 text-rust-400 fill-rust-400" />
									<span className="text-sm text-gray-400">{game.rating?.toFixed(1) || "N/A"}</span>
								</div>
							</div>
						</div>

						{/* Hero Image */}
						<div className="relative rounded-xl overflow-hidden bg-gray-950/50 border border-gray-800/50 backdrop-blur-sm">{game.media?.screenshots?.length ? <Image src={game.media.screenshots[0]} alt={game.title} width={1920} height={1080} className="w-full aspect-video object-cover" priority /> : <Image src={game.coverImage} alt={game.title} width={1920} height={1080} className="w-full aspect-video object-cover" priority />}</div>

						{/* Description */}
						<div className="bg-gray-950/50 border border-gray-800/50 rounded-lg backdrop-blur-sm p-6">
							<h2 className="text-xl font-semibold text-white mb-4">About this game</h2>
							<div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-a:text-rust-400 hover:prose-a:text-rust-300">
								<ReactMarkdown>This is a placeholder description. A real one would be fetched from the game data.</ReactMarkdown>
							</div>
						</div>

						{/* Screenshots */}
						{game.media && game.media.screenshots.length > 1 && (
							<div className="space-y-4">
								<h2 className="text-xl font-semibold text-white">Screenshots</h2>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{game.media.screenshots.slice(1).map((ss: string, index: number) => (
										<div key={index} className="bg-gray-950/50 border border-gray-800/50 rounded-lg overflow-hidden hover:border-gray-700/50 transition-colors duration-200">
											<Image src={ss} alt={`Screenshot ${index + 1}`} width={800} height={600} className="w-full aspect-video object-cover" />
										</div>
									))}
								</div>
							</div>
						)}

						{/* Achievements */}
						{achievements.length > 0 && (
							<div className="space-y-4">
								<h2 className="text-xl font-semibold text-white">Achievements</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{achievements.map((achievement) => (
										<div key={achievement.id} className="bg-gray-950/50 border border-gray-800/50 rounded-lg backdrop-blur-sm p-4">
											<div className="flex items-start space-x-3">
												<div className="p-2 rounded-lg bg-rust-500/10">
													<Award className="w-5 h-5 text-rust-400" />
												</div>
												<div className="flex-1 min-w-0">
													<h3 className="font-medium text-white">{achievement.title}</h3>
													<p className="text-sm text-gray-400 mt-1">{achievement.description}</p>
													<div className="flex items-center justify-between mt-3 text-xs text-gray-500">
														<span>{achievement.rewards.xp} XP</span>
														<span>{achievement.rarity}% earned</span>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div className="lg:sticky lg:top-24 lg:h-fit">
						<Card className="bg-gray-950/50 border border-gray-800/50 backdrop-blur-sm overflow-hidden">
							<div className="aspect-[3/4] relative">
								<Image src={game.coverImage} alt={game.title} fill className="object-cover" />
							</div>

							<div className="p-6 space-y-6">
								{/* Price and Actions */}
								<div className="space-y-3">
									<div className="text-2xl font-bold text-white">${(game.price / 100).toFixed(2)}</div>

									<Button size="lg" className="w-full bg-rust-600 hover:bg-rust-700 text-white border-rust-600 hover:border-rust-700 transition-colors duration-200">
										<Download className="mr-2 h-4 w-4" />
										Buy Now
									</Button>

									<div className="flex space-x-2">
										<Button variant="outline" className="flex-1 border-gray-700 hover:border-gray-600">
											<Heart className="mr-2 h-4 w-4" />
											Wishlist
										</Button>
										<Button variant="outline" size="icon" className="border-gray-700 hover:border-gray-600">
											<Share className="h-4 w-4" />
										</Button>
									</div>
								</div>

								{/* Game Info */}
								<div className="space-y-4 text-sm">
									<div className="flex items-center space-x-3">
										<Users className="h-4 w-4 text-gray-500" />
										<span className="text-gray-400">Developer:</span>
										<span className="text-white">{game.developer?.name || "Unknown"}</span>
									</div>

									<div className="flex items-center space-x-3">
										<Calendar className="h-4 w-4 text-gray-500" />
										<span className="text-gray-400">Released:</span>
										<span className="text-white">2024</span>
									</div>

									<div className="flex items-center space-x-3">
										<Info className="h-4 w-4 text-gray-500" />
										<span className="text-gray-400">Platforms:</span>
										<span className="text-white">PC, Mac, Linux</span>
									</div>

									<div className="space-y-2">
										<div className="flex items-center space-x-3">
											<Tag className="h-4 w-4 text-gray-500" />
											<span className="text-gray-400">Tags:</span>
										</div>
										<div className="flex flex-wrap gap-1">
											{game.tags?.map((tag: string) => (
												<Badge key={tag} variant="secondary" className="text-xs">
													{tag}
												</Badge>
											)) || (
												<Badge variant="secondary" className="text-xs">
													Indie
												</Badge>
											)}
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
