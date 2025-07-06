"use client"

import { AvatarImage } from "@/components/ui/avatar"

import { Avatar } from "@/components/ui/avatar"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Heart,
  Star,
  TrendingUp,
  Gift,
  ChevronLeft,
  ChevronRight,
  Plus,
  Gamepad2,
  Palette,
  Music,
  BookOpen,
  Users,
  Rocket,
  Calendar,
  Film,
  Tv,
  Sparkles,
  Swords,
  Flame,
  Wrench,
  Compass,
  MessageSquareQuote,
  ScrollText,
  BrainCircuit,
  Puzzle,
} from "lucide-react"

interface StoreProps {
  searchQuery: string
  onGameSelect: (game: any) => void
}

export function Store({ searchQuery, onGameSelect }: StoreProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [activeHeroTab, setActiveHeroTab] = useState("featured")

  // Data for all sections
  const featuredGames = [
		{
			id: 1,
			title: "Baldur's Gate 3",
			developer: "Larian Studios",
			heroImage: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=1920&auto=format&fit=crop",
			logoImage: "/placeholder.svg?key=4vnda",
			price: 59.99,
			originalPrice: null,
			rating: 4.9,
			reviewCount: 15420,
			tags: ["RPG", "Story Rich", "Turn-Based", "Fantasy", "Co-op"],
			discount: null,
			description: "An epic RPG adventure with unprecedented freedom and depth. Gather your party and return to the Forgotten Realms...",
			screenshots: ["https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1280&auto=format&fit=crop"],
			releaseDate: "Aug 3, 2023",
			platforms: ["Windows", "Mac", "Linux"],
		},
		{
			id: 2,
			title: "Cyberpunk 2077",
			developer: "CD Projekt Red",
			heroImage: "https://images.unsplash.com/photo-1581333107593-daoshi490970a2?q=80&w=1920&auto=format&fit=crop",
			logoImage: "/cyberpunk-2077-logo.png",
			price: 29.99,
			originalPrice: 59.99,
			rating: 4.2,
			reviewCount: 89420,
			tags: ["RPG", "Open World", "Cyberpunk", "Action", "Futuristic"],
			discount: 50,
			description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City...",
			screenshots: ["https://images.unsplash.com/photo-1581333107593-daoshi490970a2?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1280&auto=format&fit=crop"],
			releaseDate: "Dec 10, 2020",
			platforms: ["Windows", "Mac", "Linux"],
		},
		{
			id: 3,
			title: "Elden Ring",
			developer: "FromSoftware",
			heroImage: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=1920&auto=format&fit=crop",
			logoImage: "/placeholder.svg?height=200&width=400",
			price: 49.99,
			originalPrice: null,
			rating: 4.8,
			reviewCount: 67890,
			tags: ["Souls-like", "Open World", "Dark Fantasy", "Difficult", "Action RPG"],
			discount: null,
			description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord...",
			screenshots: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
			releaseDate: "Feb 25, 2022",
			platforms: ["Windows"],
		},
  ];
  const gameCategories = [
		{
			title: "Special Offers",
			subtitle: "Save big on these great games",
			icon: Gift,
			color: "text-red-400",
			games: [
				{
					id: 4,
					title: "The Witcher 3: Wild Hunt",
					developer: "CD Projekt Red",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 9.99,
					originalPrice: 39.99,
					discount: 75,
					rating: 4.9,
					reviewCount: 156789,
					tags: ["RPG", "Open World", "Story Rich"],
					releaseDate: "May 19, 2015",
				},
				{
					id: 5,
					title: "Disco Elysium",
					developer: "ZA/UM",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 19.99,
					originalPrice: 39.99,
					discount: 50,
					rating: 4.8,
					reviewCount: 45678,
					tags: ["RPG", "Detective", "Story Rich"],
					releaseDate: "Oct 15, 2019",
				},
				{
					id: 6,
					title: "Hades",
					developer: "Supergiant Games",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 14.99,
					originalPrice: 24.99,
					discount: 40,
					rating: 4.9,
					reviewCount: 89234,
					tags: ["Roguelike", "Action", "Indie"],
					releaseDate: "Sep 17, 2020",
				},
				{
					id: 7,
					title: "Celeste",
					developer: "Maddy Makes Games",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 9.99,
					originalPrice: 19.99,
					discount: 50,
					rating: 4.8,
					reviewCount: 34567,
					tags: ["Platformer", "Indie", "Difficult"],
					releaseDate: "Jan 25, 2018",
				},
				{
					id: 8,
					title: "Stardew Valley",
					developer: "ConcernedApe",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 11.99,
					originalPrice: 14.99,
					discount: 20,
					rating: 4.9,
					reviewCount: 234567,
					tags: ["Simulation", "Indie", "Relaxing"],
					releaseDate: "Feb 26, 2016",
				},
			],
		},
		{
			title: "New & Trending",
			subtitle: "Popular new releases",
			icon: TrendingUp,
			color: "text-green-400",
			games: [
				{
					id: 9,
					title: "Pizza Tower",
					developer: "Tour De Pizza",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 19.99,
					originalPrice: null,
					discount: null,
					rating: 4.8,
					reviewCount: 12345,
					tags: ["Platformer", "Indie", "Comedy"],
					releaseDate: "Jan 26, 2023",
				},
				{
					id: 10,
					title: "Hogwarts Legacy",
					developer: "Avalanche Software",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 59.99,
					originalPrice: null,
					discount: null,
					rating: 4.5,
					reviewCount: 78901,
					tags: ["RPG", "Open World", "Magic"],
					releaseDate: "Feb 10, 2023",
				},
				{
					id: 11,
					title: "Hi-Fi Rush",
					developer: "Tango Gameworks",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 29.99,
					originalPrice: null,
					discount: null,
					rating: 4.7,
					reviewCount: 23456,
					tags: ["Action", "Rhythm", "Indie"],
					releaseDate: "Jan 25, 2023",
				},
				{
					id: 12,
					title: "Atomic Heart",
					developer: "Mundfish",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 49.99,
					originalPrice: null,
					discount: null,
					rating: 4.3,
					reviewCount: 34567,
					tags: ["Action", "FPS", "Sci-Fi"],
					releaseDate: "Feb 21, 2023",
				},
				{
					id: 13,
					title: "Dead Space",
					developer: "Motive Studio",
					image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
					price: 59.99,
					originalPrice: null,
					discount: null,
					rating: 4.6,
					reviewCount: 45678,
					tags: ["Horror", "Action", "Remake"],
					releaseDate: "Jan 27, 2023",
				},
			],
		},
  ];
  const oxidePassGames = {
		title: "New on Oxide Pass",
		subtitle: "Recently added to your subscription",
		icon: Sparkles,
		color: "text-cyan-400",
		games: [
			{
				id: 14,
				title: "Ori and the Will of the Wisps",
				developer: "Moon Studios",
				image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
				price: 0,
				tags: ["Platformer", "Metroidvania", "Beautiful"],
			},
			{
				id: 15,
				title: "Gears 5",
				developer: "The Coalition",
				image: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=400&auto=format&fit=crop",
				price: 0,
				tags: ["Third-Person Shooter", "Action", "Co-op"],
			},
			{
				id: 16,
				title: "Forza Horizon 5",
				developer: "Playground Games",
				image: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=400&auto=format&fit=crop",
				price: 0,
				tags: ["Racing", "Open World", "Realistic"],
			},
			{
				id: 17,
				title: "Sea of Thieves",
				developer: "Rare",
				image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop",
				price: 0,
				tags: ["Adventure", "Multiplayer", "Pirates"],
			},
			{
				id: 18,
				title: "Halo Infinite",
				developer: "343 Industries",
				image: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=400&auto=format&fit=crop",
				price: 0,
				tags: ["FPS", "Sci-Fi", "Multiplayer"],
			},
		],
  };
  const mostPlayedGames = {
		title: "Most Played on Oxide",
		subtitle: "See what the community is playing now",
		icon: Users,
		color: "text-yellow-400",
		games: [
			{
				id: 19,
				title: "Apex Legends",
				developer: "Respawn Entertainment",
				image: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=400&auto=format&fit=crop",
				price: 0,
				tags: ["Battle Royale", "FPS", "Free to Play"],
			},
			{
				id: 20,
				title: "Valheim",
				developer: "Iron Gate Studio",
				image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop",
				price: 19.99,
				tags: ["Survival", "Open World", "Co-op"],
			},
			{
				id: 1,
				title: "Baldur's Gate 3",
				developer: "Larian Studios",
				image: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=400&auto=format&fit=crop",
				price: 59.99,
				tags: ["RPG", "Story Rich", "Turn-Based"],
			},
			{
				id: 21,
				title: "Lethal Company",
				developer: "Zeekerss",
				image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
				price: 9.99,
				tags: ["Co-op", "Horror", "Survival"],
			},
			{
				id: 2,
				title: "Cyberpunk 2077",
				developer: "CD Projekt Red",
				image: "https://images.unsplash.com/photo-1581333107593-daoshi490970a2?q=80&w=400&auto=format&fit=crop",
				price: 29.99,
				tags: ["RPG", "Open World", "Cyberpunk"],
			},
		],
  };
  const comingSoonGames = {
		title: "Coming Soon",
		subtitle: "Get ready for these upcoming titles",
		icon: Calendar,
		color: "text-purple-400",
		games: [
			{
				id: 22,
				title: "Silksong",
				developer: "Team Cherry",
				image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
				price: "TBA",
				tags: ["Metroidvania", "Indie", "Action"],
				releaseDate: "Soon™",
			},
			{
				id: 23,
				title: "Starfield: Shattered Space",
				developer: "Bethesda Game Studios",
				image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
				price: "TBA",
				tags: ["Expansion", "RPG", "Sci-Fi"],
				releaseDate: "Fall 2025",
			},
			{
				id: 24,
				title: "The Wolf Among Us 2",
				developer: "Telltale Games",
				image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
				price: "TBA",
				tags: ["Adventure", "Story Rich", "Episodic"],
				releaseDate: "2025",
			},
			{
				id: 25,
				title: "Hades II",
				developer: "Supergiant Games",
				image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
				price: "TBA",
				tags: ["Roguelike", "Action", "Mythology"],
				releaseDate: "Early Access",
			},
		],
  };
  const entertainmentApps = [
		{
			name: "Netflix",
			category: "Movies & TV",
			icon: Film,
			color: "text-red-500",
			image: "https://images.unsplash.com/photo-1543269889-c73f0584066e?q=80&w=400&auto=format&fit=crop",
		},
		{
			name: "Spotify",
			category: "Music",
			icon: Music,
			color: "text-green-500",
			image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop",
		},
		{
			name: "YouTube",
			category: "Video",
			icon: Tv,
			color: "text-red-600",
			image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop",
		},
		{
			name: "Twitch",
			category: "Streaming",
			icon: Gamepad2,
			color: "text-purple-500",
			image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop",
		},
  ];
  const themedCollections = [
		{
			title: "Co-op Champions",
			description: "Games to play with friends",
			image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
			icon: Users,
		},
		{
			title: "Story-Driven Sagas",
			description: "Get lost in incredible narratives",
			image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
			icon: BookOpen,
		},
		{
			title: "Pixel Art Perfection",
			description: "Masterpieces of the pixelated form",
			image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
			icon: Palette,
		},
  ];
  const topSellers = {
		title: "Top Sellers",
		subtitle: "What's hot right now",
		icon: Flame,
		color: "text-orange-400",
		games: [
			{ id: 1, title: "Baldur's Gate 3", image: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=400&auto=format&fit=crop", price: 59.99 },
			{ id: 21, title: "Lethal Company", image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop", price: 9.99 },
			{ id: 2, title: "Cyberpunk 2077", image: "https://images.unsplash.com/photo-1581333107593-daoshi490970a2?q=80&w=400&auto=format&fit=crop", price: 29.99 },
			{ id: 20, title: "Valheim", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop", price: 19.99 },
			{ id: 10, title: "Hogwarts Legacy", image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop", price: 59.99 },
		],
  };
  const recentlyUpdated = {
		title: "Recently Updated",
		subtitle: "Games with new content",
		icon: Wrench,
		color: "text-blue-400",
		games: [
			{
				id: 2,
				title: "Cyberpunk 2077",
				image: "https://images.unsplash.com/photo-1581333107593-daoshi490970a2?q=80&w=400&auto=format&fit=crop",
				updateInfo: "Update 2.1 & Phantom Liberty",
			},
			{ id: 20, title: "Valheim", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop", updateInfo: "Ashlands Update" },
			{ id: 8, title: "Stardew Valley", image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop", updateInfo: "Update 1.6" },
			{ id: 19, title: "Apex Legends", image: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=400&auto=format&fit=crop", updateInfo: "Season 21" },
			{ id: 17, title: "Sea of Thieves", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop", updateInfo: "Season 12" },
		],
  };
  const browseCategories = [
		{ name: "Action", icon: Swords, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=400&auto=format&fit=crop" },
		{ name: "RPG", icon: ScrollText, image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop" },
		{ name: "Strategy", icon: BrainCircuit, image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop" },
		{ name: "Indie", icon: Palette, image: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=400&auto=format&fit=crop" },
		{ name: "Adventure", icon: Compass, image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop" },
		{ name: "Simulation", icon: Gamepad2, image: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=400&auto=format&fit=crop" },
		{ name: "Sports & Racing", icon: Flame, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=400&auto=format&fit=crop" },
		{ name: "Puzzle", icon: Puzzle, image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop" },
  ];
  const curatorRecommendation = {
		curatorName: "Gamer's Gazette",
		curatorAvatar: "/placeholder.svg?height=60&width=60",
		followers: "1.2M",
		game: {
			id: 6,
			title: "Hades",
			image: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=400&auto=format&fit=crop",
			price: 14.99,
			originalPrice: 24.99,
			discount: 40,
		},
		quote: "An absolutely stellar roguelike that sets a new standard for the genre. The art, music, and gameplay are all top-notch.",
  };

  // Reusable Components
  const GameCard = ({ game, size = "normal" }: { game: any; size?: "normal" | "small" | "large" }) => {
    const cardClass = size === "large" ? "w-80 h-96" : size === "small" ? "w-48 h-64" : "w-64 h-80"
    return (
      <Card
        className={`${cardClass} bg-zinc-900/80 border-zinc-700/50 hover:border-zinc-600 transition-all group overflow-hidden cursor-pointer flex-shrink-0`}
        onClick={() => onGameSelect(game)}
      >
        <CardContent className="p-0 h-full">
          <div className="relative h-full">
            <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                {typeof game.price === "string" ? (
                  <>{game.price}</>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {game.price === 0 ? "Play Now" : `$${game.price}`}
                  </>
                )}
              </Button>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {game.discount && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-green-600 text-white font-bold px-2 py-1">-{game.discount}%</Badge>
              </div>
            )}
            {game.price === 0 && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-blue-600 text-white font-bold px-2 py-1">FREE</Badge>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-white mb-1 text-sm leading-tight">{game.title}</h3>
              <p className="text-xs text-zinc-300 mb-2">{game.developer}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {game.tags?.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                {game.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-white">{game.rating}</span>
                    <span className="text-xs text-zinc-400">({(game.reviewCount / 1000).toFixed(0)}k)</span>
                  </div>
                )}
                <div className="text-right">
                  {game.price === 0 ? (
                    <span className="text-sm font-bold text-green-400">FREE</span>
                  ) : typeof game.price === "number" ? (
                    <div className="flex items-center gap-1">
                      {game.originalPrice && (
                        <span className="text-xs text-zinc-400 line-through">${game.originalPrice}</span>
                      )}
                      <span className="text-sm font-bold text-white">${game.price}</span>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-cyan-400">{game.releaseDate}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const GameCarousel = ({ title, subtitle, icon: Icon, color, games }: any) => (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${color}`} />
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-zinc-400">{subtitle}</p>
          </div>
        </div>
        <Button variant="ghost" className="text-zinc-400 hover:text-white">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {games.map((game: any) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )

  const heroTabs = [
    { id: "featured", label: "Featured & Recommended" },
    { id: "new", label: "New & Noteworthy" },
    { id: "top", label: "Top Sellers" },
  ]

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-zinc-950 to-black">
      {/* Featured & Recommended Section */}
      <div className="px-12 pt-8">
        <div className="flex items-center gap-4 mb-6">
          {heroTabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => setActiveHeroTab(tab.id)}
              className={`text-lg font-semibold transition-all duration-200 pb-2 border-b-2 ${
                activeHeroTab === tab.id
                  ? "text-white border-blue-500"
                  : "text-zinc-400 border-transparent hover:text-white"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Games Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredGames[featuredIndex]?.heroImage || "/placeholder.svg"}
            alt={featuredGames[featuredIndex]?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative h-full flex items-center px-12">
          <div className="max-w-2xl">
            <img
              src={featuredGames[featuredIndex]?.logoImage || "/placeholder.svg"}
              alt={featuredGames[featuredIndex]?.title}
              className="h-32 mb-6 object-contain"
            />
            <p className="text-xl text-zinc-200 mb-6 leading-relaxed">{featuredGames[featuredIndex]?.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {featuredGames[featuredIndex]?.tags.map((tag: string) => (
                <Badge key={tag} className="bg-blue-600/80 text-white px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-semibold">{featuredGames[featuredIndex]?.rating}</span>
                <span className="text-zinc-300">
                  ({featuredGames[featuredIndex]?.reviewCount?.toLocaleString()} reviews)
                </span>
              </div>
              <div className="text-zinc-300">Released: {featuredGames[featuredIndex]?.releaseDate}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {featuredGames[featuredIndex]?.discount && (
                  <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                    -{featuredGames[featuredIndex].discount}%
                  </Badge>
                )}
                <div className="text-3xl font-bold text-white">
                  ${featuredGames[featuredIndex]?.price}
                  {featuredGames[featuredIndex]?.originalPrice && (
                    <span className="text-lg text-zinc-400 line-through ml-3">
                      ${featuredGames[featuredIndex].originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-6 py-3">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </Button>
            </div>
          </div>
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="grid grid-cols-2 gap-3">
              {featuredGames[featuredIndex]?.screenshots.map((screenshot: string, index: number) => (
                <div
                  key={index}
                  className="w-32 h-20 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-zinc-600 transition-colors cursor-pointer"
                >
                  <img
                    src={screenshot || "/placeholder.svg"}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-12 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setFeaturedIndex((prev) => (prev > 0 ? prev - 1 : featuredGames.length - 1))}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            {featuredGames.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${index === featuredIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"}`}
                onClick={() => setFeaturedIndex(index)}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setFeaturedIndex((prev) => (prev < featuredGames.length - 1 ? prev + 1 : 0))}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-12 py-8">
        {gameCategories.map((category) => (
          <GameCarousel key={category.title} {...category} />
        ))}

        {/* Discovery Queue CTA */}
        <div className="my-16">
          <Card className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-cyan-900/50 border-zinc-700/50 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <Compass className="w-8 h-8 text-cyan-300" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Your Discovery Queue</h2>
                  <p className="text-zinc-300">Explore a personalized selection of games just for you.</p>
                </div>
              </div>
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 shadow-lg">
                Start Your Queue
              </Button>
            </div>
          </Card>
        </div>

        <GameCarousel {...topSellers} />

        {/* Browse by Category */}
        <div className="my-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-6 h-6 text-purple-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
                <p className="text-zinc-400">Find games by your favorite genres.</p>
              </div>
            </div>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {browseCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.name}
                  className="relative h-32 bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all group overflow-hidden cursor-pointer"
                >
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                      <h3 className="text-lg font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <GameCarousel {...recentlyUpdated} />

        {/* Community Curator */}
        <div className="my-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MessageSquareQuote className="w-6 h-6 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">From the Community Curators</h2>
                <p className="text-zinc-400">Recommendations from trusted voices.</p>
              </div>
            </div>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              Find Curators <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardContent className="p-6 flex gap-6">
              <div className="w-1/3 flex-shrink-0">
                <GameCard game={curatorRecommendation.game} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={curatorRecommendation.curatorAvatar || "/placeholder.svg"} />
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{curatorRecommendation.curatorName}</p>
                    <p className="text-sm text-zinc-400">{curatorRecommendation.followers} Followers</p>
                  </div>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg italic text-zinc-300 border-l-4 border-blue-500">
                  "{curatorRecommendation.quote}"
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">Follow</Button>
                  <Button variant="secondary">View Curator Page</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <GameCarousel {...mostPlayedGames} />
        <GameCarousel {...comingSoonGames} />
      </div>

      {/* Oxide Pass CTA */}
      <div className="px-12 py-12">
        <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 p-12 flex items-center">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-white tracking-tighter">OXIDE PASS</h2>
            </div>
            <p className="text-white/80 text-xl mb-6 max-w-2xl">
              Get unlimited access to a library of incredible games, including day one releases, for one low monthly
              price.
            </p>
            <div className="flex items-center gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 text-lg px-8 py-3 shadow-lg">
                Join Now
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 text-lg px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8">
        <GameCarousel {...oxidePassGames} />
      </div>

      {/* Themed Collections */}
      <div className="px-12 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Swords className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Themed Collections</h2>
              <p className="text-zinc-400">Curated lists for every mood and genre.</p>
            </div>
          </div>
          <Button variant="ghost" className="text-zinc-400 hover:text-white">
            Browse All Collections <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {themedCollections.map((collection) => {
            const Icon = collection.icon
            return (
              <Card
                key={collection.title}
                className="relative bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700 transition-all group overflow-hidden cursor-pointer h-48"
              >
                <CardContent className="p-0 h-full">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-white" />
                      <h3 className="text-xl font-bold text-white">{collection.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-300">{collection.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Entertainment Hub */}
      <div className="px-12 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Film className="w-6 h-6 text-red-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Entertainment Hub</h2>
              <p className="text-zinc-400">Your favorite apps, all in one place.</p>
            </div>
          </div>
          <Button variant="ghost" className="text-zinc-400 hover:text-white">
            Browse All Apps <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {entertainmentApps.map((app) => {
            const Icon = app.icon
            return (
              <Card
                key={app.name}
                className="bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700 transition-all group overflow-hidden cursor-pointer"
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Icon className={`${app.color} w-6 h-6`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{app.name}</h3>
                    <p className="text-sm text-zinc-400">{app.category}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
