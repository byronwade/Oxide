"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  MessageCircle,
  UserPlus,
  Settings,
  Gamepad2,
  Clock,
  Users,
  Bell,
  Check,
  MoreHorizontal,
  Crown,
  Zap,
  Trophy,
  Star,
  Phone,
  Video,
  Gift,
  Shield,
  X,
  User,
  PartyPopper,
  ShieldOff,
  UserX,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

interface FriendsProps {
  onClose?: () => void
  isFullView?: boolean
}

export function Friends({ onClose, isFullView = false }: FriendsProps) {
  const [activeTab, setActiveTab] = useState("friends")
  const [searchQuery, setSearchQuery] = useState("")

  const friends = [
    {
      id: 1,
      name: "Alex Chen",
      username: "alexc_gamer",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "in-game",
      game: "Cyberpunk 2077",
      gameImage: "/placeholder.svg?height=40&width=60",
      lastSeen: "Playing for 3h 24m",
      level: 23,
      xp: 15420,
      isVip: true,
      achievements: 47,
      hoursPlayed: 342,
      favoriteGenre: "RPG",
      mutualGames: 12,
      friendSince: "March 2023",
    },
    {
      id: 2,
      name: "Sarah Kim",
      username: "sarahk",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "in-game",
      game: "The Witcher 3",
      gameImage: "/placeholder.svg?height=40&width=60",
      lastSeen: "Playing for 1h 45m",
      level: 18,
      xp: 8920,
      isVip: false,
      achievements: 23,
      hoursPlayed: 156,
      favoriteGenre: "Adventure",
      mutualGames: 8,
      friendSince: "January 2024",
    },
    {
      id: 3,
      name: "Mike Johnson",
      username: "mikej_dev",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "online",
      game: null,
      gameImage: null,
      lastSeen: "Online",
      level: 31,
      xp: 24680,
      isVip: false,
      achievements: 89,
      hoursPlayed: 567,
      favoriteGenre: "Strategy",
      mutualGames: 15,
      friendSince: "August 2023",
    },
    {
      id: 4,
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "away",
      game: "Stardew Valley",
      gameImage: "/placeholder.svg?height=40&width=60",
      lastSeen: "Away for 15m",
      level: 15,
      xp: 6780,
      isVip: false,
      achievements: 34,
      hoursPlayed: 89,
      favoriteGenre: "Simulation",
      mutualGames: 6,
      friendSince: "November 2023",
    },
  ]

  const friendRequests = [
    {
      id: 1,
      name: "Jessica Brown",
      username: "jessbrown",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualFriends: 3,
      timeAgo: "2 hours ago",
      level: 12,
      favoriteGenre: "Indie",
      mutualGames: 4,
    },
    {
      id: 2,
      name: "Tom Wilson",
      username: "tomw_gamer",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualFriends: 1,
      timeAgo: "1 day ago",
      level: 8,
      favoriteGenre: "Action",
      mutualGames: 2,
    },
  ]

  const getStatusGradient = (status: string) => {
    switch (status) {
      case "online":
        return "from-green-500 to-emerald-400"
      case "in-game":
        return "from-blue-500 to-cyan-400"
      case "away":
        return "from-yellow-500 to-orange-400"
      case "offline":
        return "from-zinc-500 to-zinc-400"
      default:
        return "from-zinc-500 to-zinc-400"
    }
  }

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const onlineFriends = friends.filter((f) => f.status !== "offline").length

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-zinc-950 to-black">
      {/* Hero Header */}
      <div className="relative h-48 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1200')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative h-full flex items-end p-8">
          <div className="flex items-end gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center ring-4 ring-white/10">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="pb-2">
              <h1 className="text-4xl font-bold text-white mb-2">Friends</h1>
              <div className="flex items-center gap-6 text-zinc-300">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span>{onlineFriends} online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{friends.length} total</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>{friendRequests.length} requests</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-8 border-b border-zinc-800/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              placeholder="Search friends by name or game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-zinc-900/50 border-zinc-700/50 text-white placeholder-zinc-500 focus:border-blue-500/50 focus:bg-zinc-900 rounded-xl"
            />
          </div>
          <Button variant="ghost" className="h-12 px-6 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl">
            Filter by Game
          </Button>
          <Button variant="ghost" className="h-12 px-6 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl">
            Sort by Activity
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          {[
            { id: "friends", label: "All Friends", count: friends.length, icon: Users },
            { id: "online", label: "Online", count: onlineFriends, icon: Zap },
            { id: "requests", label: "Requests", count: friendRequests.length, icon: Bell },
            { id: "blocked", label: "Blocked", count: 0, icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`h-12 px-6 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-zinc-800 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-zinc-700 text-zinc-300">
                    {tab.count}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === "requests" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Bell className="w-6 h-6 text-yellow-400" />
              Friend Requests
            </h2>
            <div className="grid gap-4">
              {friendRequests.map((request) => (
                <Card
                  key={request.id}
                  className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/30 border-zinc-700/50 hover:border-zinc-600/50 transition-all overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-16 h-16 ring-4 ring-yellow-500/30">
                          <AvatarImage src={request.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-lg">
                            {request.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center ring-2 ring-zinc-700">
                          <span className="text-sm font-bold text-yellow-400">{request.level}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{request.name}</h3>
                          <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">New Request</Badge>
                        </div>
                        <p className="text-zinc-400 mb-3">@{request.username}</p>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Users className="w-4 h-4" />
                            <span>{request.mutualFriends} mutual friends</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Gamepad2 className="w-4 h-4" />
                            <span>{request.mutualGames} mutual games</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Star className="w-4 h-4" />
                            <span>Loves {request.favoriteGenre}</span>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-500 mt-2">{request.timeAgo}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                          <X className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "friends" || activeTab === "online") && (
          <div className="space-y-6">
            <div className="grid gap-4">
              {filteredFriends
                .filter((friend) => activeTab === "friends" || friend.status !== "offline")
                .map((friend) => (
                  <Card
                    key={friend.id}
                    className="group bg-gradient-to-r from-zinc-900/30 to-zinc-800/20 border-zinc-700/50 hover:border-zinc-600/50 hover:from-zinc-900/50 hover:to-zinc-800/30 transition-all overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Avatar className="w-20 h-20 ring-4 ring-zinc-700/50 group-hover:ring-zinc-600/50 transition-all">
                            <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-br from-zinc-600 to-zinc-700 text-white text-xl">
                              {friend.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          {/* Status Indicator */}
                          <div
                            className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${getStatusGradient(friend.status)} ring-4 ring-zinc-900 flex items-center justify-center`}
                          >
                            {friend.status === "in-game" && <Gamepad2 className="w-3 h-3 text-white" />}
                          </div>

                          {/* VIP Crown */}
                          {friend.isVip && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <Crown className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{friend.name}</h3>
                            <Badge className="bg-zinc-700 text-zinc-300">Level {friend.level}</Badge>
                            {friend.isVip && (
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">VIP</Badge>
                            )}
                          </div>

                          <p className="text-zinc-400 mb-3">
                            @{friend.username} • Friends since {friend.friendSince}
                          </p>

                          {/* Current Activity */}
                          {friend.game ? (
                            <div className="flex items-center gap-3 mb-4 p-3 bg-blue-600/10 rounded-lg border border-blue-600/20">
                              <img
                                src={friend.gameImage || "/placeholder.svg"}
                                alt={friend.game}
                                className="w-12 h-8 object-cover rounded"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <Gamepad2 className="w-4 h-4 text-blue-400" />
                                  <span className="text-blue-400 font-medium">Playing {friend.game}</span>
                                </div>
                                <span className="text-xs text-zinc-400">{friend.lastSeen}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mb-4 text-green-400">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span>{friend.lastSeen}</span>
                            </div>
                          )}

                          {/* Stats */}
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
                              <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                              <div className="font-bold text-white">{friend.achievements}</div>
                              <div className="text-xs text-zinc-400">Achievements</div>
                            </div>
                            <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
                              <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                              <div className="font-bold text-white">{friend.hoursPlayed}h</div>
                              <div className="text-xs text-zinc-400">Played</div>
                            </div>
                            <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
                              <Gamepad2 className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                              <div className="font-bold text-white">{friend.mutualGames}</div>
                              <div className="text-xs text-zinc-400">Mutual Games</div>
                            </div>
                            <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
                              <Star className="w-4 h-4 text-green-400 mx-auto mb-1" />
                              <div className="font-bold text-white">{friend.favoriteGenre}</div>
                              <div className="text-xs text-zinc-400">Favorite</div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              className="flex-1 text-zinc-400 hover:text-green-400 hover:bg-green-600/10"
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex-1 text-zinc-400 hover:text-blue-400 hover:bg-blue-600/10"
                            >
                              <Video className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex-1 text-zinc-400 hover:text-purple-400 hover:bg-purple-600/10"
                            >
                              <Gift className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="flex-1 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg"
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
                                    <User className="w-4 h-4 mr-2" />
                                    <span>View Profile</span>
                                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                                    <PartyPopper className="w-4 h-4 mr-2" />
                                    <span>Invite to Party</span>
                                    <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                                    <Gift className="w-4 h-4 mr-2" />
                                    <span>Send a Gift</span>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator className="bg-zinc-700/60" />
                                <DropdownMenuGroup>
                                  <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                                    <ShieldOff className="w-4 h-4 mr-2" />
                                    <span>Block</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:bg-red-900/50 focus:text-white">
                                    <UserX className="w-4 h-4 mr-2" />
                                    <span>Remove Friend</span>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {activeTab === "blocked" && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No blocked users</h3>
            <p className="text-zinc-400 text-lg">Users you block will appear here for easy management</p>
          </div>
        )}
      </div>
    </div>
  )
}
