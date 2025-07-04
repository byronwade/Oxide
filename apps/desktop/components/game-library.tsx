"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Download,
  MoreHorizontal,
  Grid3X3,
  List,
  Filter,
  Clock,
  Star,
  Folder,
  Tag,
  Calendar,
  Gamepad2,
  Cloud,
  CloudOff,
  Settings,
  BarChart2,
  Heart,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

interface GameLibraryProps {
  searchQuery: string
}

export function GameLibrary({ searchQuery }: GameLibraryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Games", count: 24 },
    { id: "recent", label: "Recent", count: 5 },
    { id: "installed", label: "Installed", count: 18 },
    { id: "favorites", label: "Favorites", count: 7 },
    { id: "rpg", label: "RPG", count: 8 },
    { id: "indie", label: "Indie", count: 12 },
    { id: "action", label: "Action", count: 6 },
  ]

  const games = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      developer: "CD Projekt Red",
      image: "/placeholder.svg?height=300&width=400",
      installed: true,
      lastPlayed: "2 hours ago",
      playtime: "45.2 hours",
      status: "ready",
      rating: 4.2,
      category: ["rpg", "action"],
      favorite: true,
      cloudSync: "synced",
      cloudLastSync: "2 minutes ago",
    },
    {
      id: 2,
      title: "The Witcher 3: Wild Hunt",
      developer: "CD Projekt Red",
      image: "/placeholder.svg?height=300&width=400",
      installed: true,
      lastPlayed: "1 day ago",
      playtime: "127.8 hours",
      status: "ready",
      rating: 4.9,
      category: ["rpg"],
      favorite: true,
      cloudSync: "syncing",
      cloudLastSync: "syncing...",
    },
    {
      id: 3,
      title: "Hollow Knight",
      developer: "Team Cherry",
      image: "/placeholder.svg?height=300&width=400",
      installed: false,
      lastPlayed: "Never",
      playtime: "0 hours",
      status: "not_installed",
      rating: 4.8,
      category: ["indie", "action"],
      favorite: false,
      cloudSync: "none",
      cloudLastSync: "No saves",
    },
    {
      id: 4,
      title: "Stardew Valley",
      developer: "ConcernedApe",
      image: "/placeholder.svg?height=300&width=400",
      installed: true,
      lastPlayed: "3 days ago",
      playtime: "89.5 hours",
      status: "update_available",
      rating: 4.7,
      category: ["indie"],
      favorite: true,
      cloudSync: "conflict",
      cloudLastSync: "Conflict detected",
    },
    {
      id: 5,
      title: "Baldur's Gate 3",
      developer: "Larian Studios",
      image: "/placeholder.svg?height=300&width=400",
      installed: true,
      lastPlayed: "5 hours ago",
      playtime: "23.1 hours",
      status: "ready",
      rating: 4.9,
      category: ["rpg"],
      favorite: false,
      cloudSync: "synced",
      cloudLastSync: "1 hour ago",
    },
    {
      id: 6,
      title: "Celeste",
      developer: "Maddy Makes Games",
      image: "/placeholder.svg?height=300&width=400",
      installed: true,
      lastPlayed: "1 week ago",
      playtime: "15.3 hours",
      status: "ready",
      rating: 4.8,
      category: ["indie", "action"],
      favorite: false,
      cloudSync: "error",
      cloudLastSync: "Sync failed",
    },
  ]

  const getCloudSyncIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <Cloud className="w-3 h-3 text-green-400" />
      case "syncing":
        return <Cloud className="w-3 h-3 text-blue-400 animate-pulse" />
      case "conflict":
        return <Cloud className="w-3 h-3 text-yellow-400" />
      case "error":
        return <CloudOff className="w-3 h-3 text-red-400" />
      default:
        return null
    }
  }

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.developer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "recent" && game.lastPlayed !== "Never") ||
      (selectedCategory === "installed" && game.installed) ||
      (selectedCategory === "favorites" && game.favorite) ||
      game.category.includes(selectedCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex h-full">
      {/* Contextual Sidebar - Only for Library */}
      <div className="w-64 bg-zinc-950/50 border-r border-zinc-800/50 flex flex-col">
        <div className="p-4 border-b border-zinc-800/50">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-3">Library</h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-between h-8 px-3 ${
                  selectedCategory === category.id
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="flex items-center gap-2">
                  {category.id === "all" && <Gamepad2 className="w-4 h-4" />}
                  {category.id === "recent" && <Clock className="w-4 h-4" />}
                  {category.id === "installed" && <Folder className="w-4 h-4" />}
                  {category.id === "favorites" && <Star className="w-4 h-4" />}
                  {!["all", "recent", "installed", "favorites"].includes(category.id) && <Tag className="w-4 h-4" />}
                  {category.label}
                </span>
                <span className="text-xs text-zinc-500">{category.count}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-zinc-400 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Install Queue
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-zinc-400 hover:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Recently Added
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-zinc-400 hover:text-white">
              <Cloud className="w-4 h-4 mr-2" />
              Cloud Saves
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="p-6 border-b border-zinc-800/50 bg-zinc-950/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {categories.find((c) => c.id === selectedCategory)?.label || "Library"}
              </h1>
              <p className="text-zinc-400">{filteredGames.length} games</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>

              <div className="flex items-center gap-1 bg-zinc-900 rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="w-8 h-8 p-0"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="w-8 h-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Games Content */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredGames.map((game) => (
                <Card
                  key={game.id}
                  className="bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700 transition-all group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4]">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {game.installed ? (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="w-4 h-4 mr-2" />
                            Play
                          </Button>
                        ) : (
                          <Button size="sm" variant="secondary">
                            <Download className="w-4 h-4 mr-2" />
                            Install
                          </Button>
                        )}
                      </div>

                      {/* Status Badges */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {game.status === "update_available" && <Badge className="bg-orange-600 text-xs">Update</Badge>}
                        {game.favorite && <Badge className="bg-yellow-600 text-xs">★</Badge>}
                        {game.cloudSync !== "none" && (
                          <Badge className="bg-zinc-800/80 text-xs flex items-center gap-1">
                            {getCloudSyncIcon(game.cloudSync)}
                          </Badge>
                        )}
                      </div>

                      {/* Game Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="font-semibold text-white mb-1 text-sm">{game.title}</h3>
                        <p className="text-xs text-zinc-300 mb-2">{game.developer}</p>
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {game.playtime}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{game.rating}</span>
                          </div>
                        </div>
                        {game.cloudSync !== "none" && (
                          <div className="text-xs text-zinc-500 flex items-center gap-1">
                            {getCloudSyncIcon(game.cloudSync)}
                            <span>{game.cloudLastSync}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredGames.map((game) => (
                <Card
                  key={game.id}
                  className="bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{game.title}</h3>
                          {game.favorite && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                          {game.cloudSync !== "none" && (
                            <div className="flex items-center gap-1">{getCloudSyncIcon(game.cloudSync)}</div>
                          )}
                        </div>
                        <p className="text-sm text-zinc-400 mb-1">{game.developer}</p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-1">
                          <span>{game.playtime}</span>
                          <span>Last played: {game.lastPlayed}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{game.rating}</span>
                          </div>
                        </div>
                        {game.cloudSync !== "none" && (
                          <div className="text-xs text-zinc-500 flex items-center gap-1">
                            <span>Cloud: {game.cloudLastSync}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {game.status === "update_available" && <Badge className="bg-orange-600">Update</Badge>}
                        {game.installed ? (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="w-4 h-4 mr-2" />
                            Play
                          </Button>
                        ) : (
                          <Button size="sm" variant="secondary">
                            <Download className="w-4 h-4 mr-2" />
                            Install
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-64 bg-zinc-900/95 backdrop-blur-xl border-zinc-700/60 shadow-xl shadow-black/40"
                          >
                            <DropdownMenuGroup>
                              <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                                <Settings className="w-4 h-4 mr-2" />
                                <span>Manage</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                                <Cloud className="w-4 h-4 mr-2" />
                                <span>Cloud Saves</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                                <BarChart2 className="w-4 h-4 mr-2" />
                                <span>View Achievements</span>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className="bg-zinc-700/60" />
                            <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                              <Heart className="w-4 h-4 mr-2" />
                              <span>{game.favorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-700/60" />
                            {game.installed && (
                              <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:bg-red-900/50 focus:text-white">
                                <Trash2 className="w-4 h-4 mr-2" />
                                <span>Uninstall</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
