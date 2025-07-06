"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, UserPlus, MessageSquare, Award, Gamepad2 } from "lucide-react";
import Image from "next/image";

const mockUser = {
	name: "CyberRonin",
	avatarUrl: "/api/placeholder/128/128",
	bio: "Co-op enthusiast | Indie game developer | Explorer of digital worlds.",
	followers: 1250,
	following: 340,
	gamesOwned: 152,
	achievements: 845,
};

const recentActivity = [
	{ id: 1, game: "Cybernetic Horizon", achievement: "Unlocked 'Master of the Blade'", time: "2 hours ago", image: "/api/placeholder/64/64" },
	{ id: 2, game: "Dwarf Fortress", achievement: "Played for 5 hours straight", time: "1 day ago", image: "/api/placeholder/64/64" },
	{ id: 3, game: "Forgotten Isles", achievement: "Reached Level 50", time: "3 days ago", image: "/api/placeholder/64/64" },
];

const favoriteGames = [
	{ id: 1, title: "Cybernetic Horizon", image: "/api/placeholder/200/270" },
	{ id: 2, title: "The Last Spell", image: "/api/placeholder/200/270" },
	{ id: 3, title: "Stardew Valley", image: "/api/placeholder/200/270" },
];

const ProfilePage = () => {
	return (
		<div className="space-y-8">
			{/* Profile Header */}
			<Card className="bg-graphite-grey border-gunmetal text-soft-white overflow-hidden">
				<div className="relative h-48">
					<Image src="/api/placeholder/1200/300" alt="Profile Banner" layout="fill" objectFit="cover" />
				</div>
				<div className="p-6 flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16 space-y-4 sm:space-y-0 sm:space-x-6">
					<Avatar className="h-32 w-32 border-4 border-deep-charcoal">
						<AvatarImage src={mockUser.avatarUrl} />
						<AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex-grow text-center sm:text-left">
						<h1 className="text-4xl font-oxanium font-bold">{mockUser.name}</h1>
						<p className="text-muted-grey font-roboto-condensed mt-1 max-w-xl">{mockUser.bio}</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" className="border-gunmetal hover:bg-gunmetal">
							<UserPlus size={16} className="mr-2" /> Follow
						</Button>
						<Button variant="ghost" size="icon" className="text-muted-grey hover:text-electric-teal hover:bg-gunmetal">
							<MessageSquare size={20} />
						</Button>
						<Button variant="ghost" size="icon" className="text-muted-grey hover:text-electric-teal hover:bg-gunmetal">
							<Settings size={20} />
						</Button>
					</div>
				</div>
				<div className="bg-gunmetal/50 px-6 py-3 flex justify-center sm:justify-start gap-8 font-roboto-condensed text-lg">
					<div className="text-center">
						<strong className="block font-bold text-electric-teal">{mockUser.followers}</strong> Followers
					</div>
					<div className="text-center">
						<strong className="block font-bold text-electric-teal">{mockUser.following}</strong> Following
					</div>
					<div className="text-center">
						<strong className="block font-bold text-electric-teal">{mockUser.gamesOwned}</strong> Games
					</div>
					<div className="text-center">
						<strong className="block font-bold text-electric-teal">{mockUser.achievements}</strong> Achievements
					</div>
				</div>
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content: Recent Activity */}
				<div className="lg:col-span-2 space-y-6">
					<h2 className="text-3xl font-oxanium font-bold">Recent Activity</h2>
					<div className="space-y-4">
						{recentActivity.map((activity) => (
							<Card key={activity.id} className="bg-graphite-grey border-gunmetal p-4 flex items-center gap-4">
								<Image src={activity.image} alt={activity.game} width={64} height={64} className="rounded-md" />
								<div>
									<p className="text-soft-white">
										<span className="font-bold text-electric-teal">{activity.achievement}</span> in {activity.game}
									</p>
									<p className="text-xs text-muted-grey font-roboto-condensed mt-1">{activity.time}</p>
								</div>
							</Card>
						))}
					</div>
				</div>

				{/* Sidebar: Favorite Games */}
				<div className="space-y-6">
					<h2 className="text-3xl font-oxanium font-bold">Favorites</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
						{favoriteGames.map((game) => (
							<div key={game.id} className="rounded-lg overflow-hidden group">
								<Image src={game.image} alt={game.title} width={200} height={270} className="w-full object-cover transition-transform duration-300 group-hover:scale-105" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
