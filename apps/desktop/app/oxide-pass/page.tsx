"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { CheckCircle, Shield, Gift, Star } from "lucide-react";
import Image from "next/image";

const passPerks = [
	{ icon: <Shield className="h-6 w-6 text-cyan-400" />, text: "Instant access to a library of 100+ games" },
	{ icon: <Star className="h-6 w-6 text-cyan-400" />, text: "New games added every month, including day one releases" },
	{ icon: <Gift className="h-6 w-6 text-cyan-400" />, text: "Exclusive in-game content and member discounts" },
	{ icon: <CheckCircle className="h-6 w-6 text-cyan-400" />, text: "Play games in the cloud on any supported device" },
];

const OxidePassPage = () => {
	return (
		<div className="space-y-8">
			{/* Hero Section */}
			<section className="relative h-[450px] rounded-2xl overflow-hidden flex items-center justify-center text-center">
				<Image src="/api/placeholder/1200/500" alt="Oxide Pass" layout="fill" objectFit="cover" className="z-0" />
				<div className="absolute inset-0 bg-black/70 z-10"></div>
				<div className="z-20 text-zinc-50 p-8">
					<h1 className="text-7xl font-oxanium font-extrabold tracking-tighter">OXIDE PASS</h1>
					<p className="text-2xl mt-2 text-zinc-400 font-roboto-condensed">Unlock Your Next Favorite Game.</p>
					<Button className="mt-8 bg-cyan-400 text-black font-bold text-xl px-10 py-7 rounded-full hover:bg-white hover:scale-105 transition-transform">Join Now</Button>
				</div>
			</section>

			{/* Perks Section */}
			<section>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{passPerks.map((perk, index) => (
						<div key={index} className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 text-center">
							<div className="flex justify-center mb-4">{perk.icon}</div>
							<p className="font-roboto-condensed text-lg">{perk.text}</p>
						</div>
					))}
				</div>
			</section>

			{/* Game Showcase Section */}
			<section>
				<h2 className="text-4xl font-oxanium font-bold text-center mb-8">Recently Added to The Pass</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{["1", "2", "3", "4", "5"].map((id) => (
						<div key={id} className="rounded-lg overflow-hidden group">
							<Image src={`/api/placeholder/300/400?id=${id}`} alt="Game" width={300} height={400} className="w-full object-cover transition-transform duration-300 group-hover:scale-105" />
						</div>
					))}
				</div>
				<div className="text-center mt-8">
					<Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
						Browse Full Library
					</Button>
				</div>
			</section>
		</div>
	);
};

export default OxidePassPage;
