"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Zap,
  Trophy,
  Monitor,
  ImageIcon,
  Globe,
  Twitter,
  Youtube,
  Twitch,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Gamepad2,
  Cloud,
  Users2,
  Accessibility,
  User,
  Newspaper,
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface GameDetailPageProps {
  onBack: () => void
}

const cyberpunkGameData = {
  title: "Cyberpunk 2077",
  trailerUrl: "https://cdn.v0.dev/videos/cyberpunk_trailer.mp4",
  heroImage: "/cyberpunk-cityscape-night.png",
  boxArt: "/placeholder.svg?height=300&width=200",
  developer: "CD PROJEKT RED",
  publisher: "CD PROJEKT RED",
  releaseDate: "Dec 10, 2020",
  tags: ["RPG", "Open World", "Cyberpunk", "Action", "Futuristic", "Sci-fi"],
  shortDescription:
    "An open-world, action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification.",
  reviewSummary: {
    recent: "Mostly Positive",
    recentCount: 8754,
    overall: "Very Positive",
    overallCount: 589340,
  },
  media: [
    { type: "video", url: "https://cdn.v0.dev/videos/cyberpunk_trailer.mp4", thumb: "/cyberpunk-street.png" },
    { type: "image", url: "/cyberpunk-street.png" },
    { type: "image", url: "/neon-lit-alley.png" },
    { type: "image", url: "/futuristic-car-chase.png" },
    { type: "image", url: "/cybernetic-character.png" },
  ],
  editions: [
    {
      name: "Standard Edition",
      price: 29.99,
      originalPrice: 59.99,
      discount: 50,
      description: "The base game, upgraded for the next generation.",
    },
    {
      name: "Ultimate Edition",
      price: 49.99,
      originalPrice: 89.98,
      discount: 44,
      description: "Includes the base game and the Phantom Liberty expansion.",
    },
  ],
  dlcs: [
    {
      name: "Phantom Liberty",
      price: 29.99,
      image: "/spy-thriller-poster.png",
      description: "A new spy-thriller adventure.",
    },
  ],
  about:
    "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen in mind and featuring free additional content, customize your character and playstyle as you take on jobs, build a reputation, and unlock upgrades.",
  systemRequirements: {
    windows: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Core i7-6700 or Ryzen 5 1600",
        memory: "12 GB RAM",
        graphics: "GeForce GTX 1060 6GB",
        storage: "70 GB SSD",
      },
      recommended: {
        os: "Windows 10 64-bit",
        processor: "Core i7-12700 or Ryzen 7 7800X3D",
        memory: "16 GB RAM",
        graphics: "GeForce RTX 2060 SUPER",
        storage: "70 GB SSD",
      },
    },
  },
  languages: [
    { name: "English", interface: true, audio: true, subtitles: true },
    { name: "French", interface: true, audio: true, subtitles: true },
    { name: "German", interface: true, audio: true, subtitles: true },
    { name: "Spanish - Spain", interface: true, audio: true, subtitles: true },
    { name: "Japanese", interface: true, audio: true, subtitles: true },
    { name: "Polish", interface: true, audio: true, subtitles: true },
  ],
  features: [
    { name: "Single-player", icon: User },
    { name: "Steam Achievements", icon: Trophy },
    { name: "Full Controller Support", icon: Gamepad2 },
    { name: "Cloud Saves", icon: Cloud },
    { name: "Family Sharing", icon: Users2 },
    { name: "HDR Available", icon: Monitor },
    { name: "Accessibility Features", icon: Accessibility },
  ],
  criticReviews: [
    { source: "IGN", score: "9/10", quote: "An open-world RPG of incredible detail and ambition." },
    { source: "GameSpot", score: "7/10", quote: "A beautiful world, but with some rough edges." },
    { source: "PC Gamer", score: "78/100", quote: "A stunning achievement in world-building." },
  ],
  reviews: [
    {
      id: 1,
      author: "NightCityNinja",
      avatar: "/placeholder.svg?height=40&width=40",
      playtime: "125.3 hrs",
      date: "Jun 28, 2025",
      isRecommended: true,
      content:
        "After all the updates, this game is finally the masterpiece it was meant to be. The world is breathtaking, the stories are compelling, and Phantom Liberty is one of the best DLCs I've ever played. An absolute must-play.",
      helpful: 1204,
      unhelpful: 34,
    },
    {
      id: 2,
      author: "GlitchHunter",
      avatar: "/placeholder.svg?height=40&width=40",
      playtime: "22.1 hrs",
      date: "Jun 25, 2025",
      isRecommended: false,
      content:
        "It's better, for sure. But I still run into weird physics bugs and some quests feel a bit janky. The driving is still not great. It's a good game, but not the revolution we were promised. Wait for a deeper sale.",
      helpful: 256,
      unhelpful: 89,
    },
  ],
  roadmap: {
    inProgress: [
      { id: 1, title: "Vehicle Combat Overhaul", progress: 65, votes: 12400 },
      { id: 2, title: "New Radio Stations", progress: 80, votes: 8900 },
    ],
    planned: [
      { id: 3, title: "Apartment Customization Expansion", votes: 25600 },
      { id: 4, title: "More Cyberware Options", votes: 19800 },
    ],
    completed: [
      { id: 5, title: "Update 2.1 & Metro System" },
      { id: 6, title: "Phantom Liberty Expansion" },
    ],
  },
  communityPosts: [
    {
      id: 1,
      type: "dev",
      author: "CD PROJEKT RED",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "3h ago",
      content:
        "Patch 2.11 is now live! Check out the full patch notes on our website. We're excited to see your new adventures in Night City!",
      icon: Newspaper,
    },
    {
      id: 2,
      type: "user",
      author: "V_for_Vengeance",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "5h ago",
      content: "Just captured this stunning view from my apartment in Japantown. This game is a work of art.",
      image: "/cyberpunk-street.png",
      icon: ImageIcon,
    },
  ],
}

export function GameDetailPage({ onBack }: GameDetailPageProps) {
  const [game] = useState(cyberpunkGameData)
  const [activeMedia, setActiveMedia] = useState(game.media[0])

  const reviewData = [
    { name: "Jan", positive: 120, negative: 30 },
    { name: "Feb", positive: 180, negative: 40 },
    { name: "Mar", positive: 250, negative: 50 },
    { name: "Apr", positive: 220, negative: 60 },
    { name: "May", positive: 300, negative: 70 },
    { name: "Jun", positive: 450, negative: 80 },
  ]

  return (
    <div className="h-full overflow-auto bg-black text-zinc-300">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <video
            key={game.trailerUrl}
            src={game.trailerUrl}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
        </div>

        <Button
          onClick={onBack}
          variant="ghost"
          className="absolute top-6 left-6 bg-black/30 hover:bg-black/50 backdrop-blur-sm z-20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="relative z-10 flex items-end gap-8 w-full max-w-7xl px-8">
          <img
            src={game.boxArt || "/placeholder.svg"}
            alt={`${game.title} Box Art`}
            className="w-52 h-72 object-cover rounded-lg shadow-2xl shadow-black/50 flex-shrink-0"
          />
          <div className="flex-grow">
            <h1 className="text-6xl font-bold text-white tracking-tighter mb-2">{game.title}</h1>
            <p className="text-lg text-zinc-300 mb-4">{game.shortDescription}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {game.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-zinc-800/80 text-zinc-300 backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-lg shadow-yellow-500/20"
              >
                <Zap className="w-5 h-5 mr-2" />
                Instant Demo
              </Button>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Now - $29.99
              </Button>
              <Button size="lg" variant="secondary">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto p-8 grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* Media Gallery */}
          <section>
            <div className="aspect-video rounded-lg overflow-hidden mb-2 bg-zinc-900">
              {activeMedia.type === "video" ? (
                <video
                  key={activeMedia.url}
                  src={activeMedia.url}
                  controls
                  autoPlay
                  muted
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={activeMedia.url || "/placeholder.svg"}
                  alt="Screenshot"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex gap-2">
              {game.media.map((media, index) => (
                <button key={index} onClick={() => setActiveMedia(media)} className="w-24 h-14 rounded overflow-hidden">
                  <img
                    src={media.thumb || media.url}
                    alt={`Thumbnail ${index}`}
                    className={`w-full h-full object-cover transition-all ${
                      activeMedia.url === media.url ? "ring-2 ring-blue-500 scale-105" : "opacity-60 hover:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          </section>

          <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-zinc-900/50 border border-zinc-800/50 mb-6">
              <TabsTrigger value="store">Store</TabsTrigger>
              <TabsTrigger value="hub">Oxide Hub</TabsTrigger>
              <TabsTrigger value="roadmap">Living Roadmap</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="workshop">Workshop</TabsTrigger>
            </TabsList>

            <TabsContent value="store" className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">Buy {game.title}</h2>
                <div className="space-y-3">
                  {game.editions.map((edition) => (
                    <Card
                      key={edition.name}
                      className="bg-zinc-900/30 border-zinc-800/50 hover:border-blue-500/50 transition-colors"
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-white text-lg">{edition.name}</h3>
                          <p className="text-sm text-zinc-400">{edition.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-600 text-base">-{edition.discount}%</Badge>
                            <div className="text-right">
                              <p className="text-sm text-zinc-500 line-through">${edition.originalPrice}</p>
                              <p className="text-xl font-bold text-white">${edition.price}</p>
                            </div>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">About This Game</h2>
                <p className="text-zinc-300 leading-relaxed">{game.about}</p>
              </section>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                <Card className="bg-zinc-900/30 border-zinc-800/50">
                  <CardHeader>
                    <CardTitle className="text-white">Review Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reviewData}>
                          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{
                              background: "#18181b",
                              border: "1px solid #3f3f46",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Bar dataKey="positive" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="negative" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-zinc-400">
                        Overall: <strong className="text-blue-400">{game.reviewSummary.overall}</strong> (
                        {game.reviewSummary.overallCount.toLocaleString()})
                      </span>
                      <span className="text-zinc-400">
                        Recent: <strong className="text-green-400">{game.reviewSummary.recent}</strong> (
                        {game.reviewSummary.recentCount.toLocaleString()})
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-4">
                  {game.reviews.map((review) => (
                    <Card key={review.id} className="bg-zinc-900/30 border-zinc-800/50">
                      <CardHeader className="flex flex-row items-center gap-3 pb-3">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-white">{review.author}</p>
                          <p className="text-xs text-zinc-400">{review.playtime} played</p>
                        </div>
                        <Badge
                          className={`ml-auto ${
                            review.isRecommended ? "bg-green-600/20 text-green-300" : "bg-red-600/20 text-red-300"
                          }`}
                        >
                          {review.isRecommended ? (
                            <ThumbsUp className="w-3 h-3 mr-1" />
                          ) : (
                            <ThumbsDown className="w-3 h-3 mr-1" />
                          )}
                          {review.isRecommended ? "Recommended" : "Not Recommended"}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-zinc-300 leading-relaxed">{review.content}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
                          <span>Posted: {review.date}</span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-auto p-1 text-zinc-400">
                              <ThumbsUp className="w-3 h-3 mr-1" /> {review.helpful}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-auto p-1 text-zinc-400">
                              <ThumbsDown className="w-3 h-3 mr-1" /> {review.unhelpful}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <aside className="col-span-4 space-y-6">
          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardHeader>
              <CardTitle className="text-base text-white">Game Info</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">Developer</span>
                <Button variant="link" className="p-0 h-auto text-cyan-400">
                  {game.developer}
                </Button>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Publisher</span>
                <Button variant="link" className="p-0 h-auto text-cyan-400">
                  {game.publisher}
                </Button>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Release Date</span>
                <span>{game.releaseDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardHeader>
              <CardTitle className="text-base text-white">Features</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              {game.features.map((feature) => (
                <div key={feature.name} className="flex items-center gap-2">
                  <feature.icon className="w-4 h-4 text-zinc-400" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardHeader>
              <CardTitle className="text-base text-white">Follow Us</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
              <Button variant="secondary" size="icon">
                <Globe className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Youtube className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Twitch className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
