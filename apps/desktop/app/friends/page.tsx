"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { 
  Search, 
  MessageCircle, 
  UserPlus, 
  Phone, 
  Video, 
  Users, 
  Bell, 
  Settings, 
  Mic, 
  MicOff,
  VideoOff,
  PhoneOff,
  Volume2,
  VolumeX,
  Crown,
  Gamepad2,
  Check,
  X,
  MoreHorizontal,
  User,
  Shield,
  Headphones,
  Speaker,
  Camera,
  Monitor,
  Zap,
  Clock,
  Trophy,
  Star,
  Gift,
  PartyPopper,
  UserX,
  ShieldOff
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "../../components/ui/dropdown-menu";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: "online" | "away" | "offline" | "in-game";
  game?: string;
  gameImage?: string;
  lastSeen: string;
  level: number;
  xp: number;
  isVip: boolean;
  achievements: number;
  hoursPlayed: number;
  favoriteGenre: string;
  mutualGames: number;
  friendSince: string;
  voiceChannel?: string;
  isInCall?: boolean;
  isStreaming?: boolean;
}

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  timeAgo: string;
  level: number;
  favoriteGenre: string;
  mutualGames: number;
}

interface VoiceCall {
  id: string;
  participants: Friend[];
  isActive: boolean;
  isMuted: boolean;
  isDeafened: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  duration: string;
  quality: "HD" | "4K" | "Auto";
}

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState("online");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isInVoiceCall, setIsInVoiceCall] = useState(false);
  const [voiceCall, setVoiceCall] = useState<VoiceCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const friends: Friend[] = [
    {
      id: "1",
      name: "Alex Chen",
      username: "alexc_gamer",
      avatar: "/placeholder.svg",
      status: "in-game",
      game: "Cyberpunk 2077",
      gameImage: "/placeholder.svg",
      lastSeen: "Playing for 3h 24m",
      level: 23,
      xp: 15420,
      isVip: true,
      achievements: 47,
      hoursPlayed: 342,
      favoriteGenre: "RPG",
      mutualGames: 12,
      friendSince: "March 2023",
      voiceChannel: "Gaming Lounge",
      isInCall: true,
      isStreaming: true
    },
    {
      id: "2",
      name: "Sarah Kim",
      username: "sarahk",
      avatar: "/placeholder.svg",
      status: "online",
      lastSeen: "Online",
      level: 18,
      xp: 8920,
      isVip: false,
      achievements: 23,
      hoursPlayed: 156,
      favoriteGenre: "Adventure",
      mutualGames: 8,
      friendSince: "January 2024",
      voiceChannel: "Chill Zone",
      isInCall: false
    },
    {
      id: "3",
      name: "Mike Johnson",
      username: "mikej_dev",
      avatar: "/placeholder.svg",
      status: "away",
      lastSeen: "Away for 15m",
      level: 31,
      xp: 24680,
      isVip: false,
      achievements: 89,
      hoursPlayed: 567,
      favoriteGenre: "Strategy",
      mutualGames: 15,
      friendSince: "August 2023"
    },
    {
      id: "4",
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "/placeholder.svg",
      status: "offline",
      lastSeen: "Last seen 2 hours ago",
      level: 15,
      xp: 6780,
      isVip: false,
      achievements: 34,
      hoursPlayed: 89,
      favoriteGenre: "Simulation",
      mutualGames: 6,
      friendSince: "November 2023"
    }
  ];

  const friendRequests: FriendRequest[] = [
    {
      id: "1",
      name: "Jessica Brown",
      username: "jessbrown",
      avatar: "/placeholder.svg",
      mutualFriends: 3,
      timeAgo: "2 hours ago",
      level: 12,
      favoriteGenre: "Indie",
      mutualGames: 4
    },
    {
      id: "2",
      name: "Tom Wilson",
      username: "tomw_gamer",
      avatar: "/placeholder.svg",
      mutualFriends: 1,
      timeAgo: "1 day ago",
      level: 8,
      favoriteGenre: "Action",
      mutualGames: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "in-game": return "bg-blue-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-zinc-500";
      default: return "bg-zinc-500";
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case "online": return "from-green-500 to-emerald-400";
      case "in-game": return "from-blue-500 to-cyan-400";
      case "away": return "from-yellow-500 to-orange-400";
      case "offline": return "from-zinc-500 to-zinc-400";
      default: return "from-zinc-500 to-zinc-400";
    }
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = friends.filter(f => f.status !== "offline");
  const currentFriends = activeTab === "online" ? onlineFriends : 
                        activeTab === "friends" ? friends : filteredFriends;

  const handleVoiceCall = (friend: Friend) => {
    setVoiceCall({
      id: `call-${friend.id}`,
      participants: [friend],
      isActive: true,
      isMuted: false,
      isDeafened: false,
      isVideoEnabled: false,
      isScreenSharing: false,
      duration: "00:00",
      quality: "Auto"
    });
    setIsInVoiceCall(true);
  };

  const handleVideoCall = (friend: Friend) => {
    setVoiceCall({
      id: `call-${friend.id}`,
      participants: [friend],
      isActive: true,
      isMuted: false,
      isDeafened: false,
      isVideoEnabled: true,
      isScreenSharing: false,
      duration: "00:00",
      quality: "HD"
    });
    setIsInVoiceCall(true);
    setIsVideoEnabled(true);
  };

  const handleEndCall = () => {
    setIsInVoiceCall(false);
    setVoiceCall(null);
    setIsVideoEnabled(false);
    setIsScreenSharing(false);
    setIsMuted(false);
    setIsDeafened(false);
  };

  return (
    <div className="h-screen bg-deep-charcoal flex flex-col">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-r from-electric-teal/20 via-blue-600/20 to-purple-600/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="relative h-full flex items-end p-8">
          <div className="flex items-end gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-electric-teal to-blue-600 rounded-2xl flex items-center justify-center ring-4 ring-white/10">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="pb-2">
              <h1 className="text-4xl font-oxanium font-bold text-soft-white mb-2">Friends</h1>
              <div className="flex items-center gap-6 text-muted-grey">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span>{onlineFriends.length} online</span>
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
            <Button className="bg-electric-teal hover:bg-electric-teal/90 text-deep-charcoal font-roboto-condensed shadow-lg">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
            <Button variant="ghost" className="text-muted-grey hover:text-soft-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search and Tabs */}
          <div className="p-6 border-b border-graphite-grey/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-grey" />
                <Input
                  placeholder="Search friends by name or game..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-graphite-grey/50 border-graphite-grey/50 text-soft-white placeholder-muted-grey focus:border-electric-teal/50 focus:bg-graphite-grey rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[
                { id: "online", label: "Online", count: onlineFriends.length, icon: Zap },
                { id: "friends", label: "All Friends", count: friends.length, icon: Users },
                { id: "requests", label: "Requests", count: friendRequests.length, icon: Bell },
                { id: "blocked", label: "Blocked", count: 0, icon: Shield }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    className={`h-12 px-6 rounded-xl font-roboto-condensed transition-all ${
                      activeTab === tab.id
                        ? "bg-graphite-grey text-soft-white shadow-lg"
                        : "text-muted-grey hover:text-soft-white hover:bg-graphite-grey/30"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                    {tab.count > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-gunmetal text-muted-grey">
                        {tab.count}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Friends List */}
          <ScrollArea className="flex-1 p-6">
            {activeTab === "requests" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-oxanium font-bold text-soft-white mb-6 flex items-center gap-3">
                  <Bell className="w-6 h-6 text-bright-lime" />
                  Friend Requests
                </h2>
                {friendRequests.map((request) => (
                  <Card key={request.id} className="bg-graphite-grey/50 border-graphite-grey/50 hover:border-graphite-grey transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Avatar className="w-16 h-16 ring-4 ring-bright-lime/30">
                            <AvatarImage src={request.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-bright-lime/20 to-electric-teal/20 text-soft-white text-lg">
                              {request.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-deep-charcoal rounded-full flex items-center justify-center ring-2 ring-graphite-grey">
                            <span className="text-sm font-bold text-bright-lime">{request.level}</span>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-oxanium font-bold text-soft-white">{request.name}</h3>
                            <Badge className="bg-bright-lime/20 text-bright-lime border-bright-lime/30">New Request</Badge>
                          </div>
                          <p className="text-muted-grey mb-3">@{request.username}</p>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-grey">
                              <Users className="w-4 h-4" />
                              <span>{request.mutualFriends} mutual friends</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-grey">
                              <Gamepad2 className="w-4 h-4" />
                              <span>{request.mutualGames} mutual games</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-grey">
                              <Star className="w-4 h-4" />
                              <span>Loves {request.favoriteGenre}</span>
                            </div>
                          </div>

                          <p className="text-xs text-muted-grey mt-2">{request.timeAgo}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button className="bg-bright-lime hover:bg-bright-lime/90 text-deep-charcoal shadow-lg">
                            <Check className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button variant="ghost" className="text-muted-grey hover:text-soft-white hover:bg-graphite-grey/50">
                            <X className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {(activeTab === "friends" || activeTab === "online") && (
              <div className="space-y-4">
                {currentFriends.map((friend) => (
                  <Card key={friend.id} className="group bg-graphite-grey/30 border-graphite-grey/50 hover:border-graphite-grey hover:bg-graphite-grey/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Avatar className="w-20 h-20 ring-4 ring-graphite-grey/50 group-hover:ring-graphite-grey transition-all">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-graphite-grey to-gunmetal text-soft-white text-xl">
                              {friend.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${getStatusGradient(friend.status)} ring-4 ring-deep-charcoal flex items-center justify-center`}>
                            {friend.status === "in-game" && <Gamepad2 className="w-3 h-3 text-white" />}
                            {friend.isInCall && <Phone className="w-3 h-3 text-white" />}
                          </div>

                          {friend.isVip && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <Crown className="w-6 h-6 text-bright-lime drop-shadow-lg" />
                            </div>
                          )}

                          {friend.isStreaming && (
                            <div className="absolute -top-3 -right-3">
                              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                                <Video className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-oxanium font-bold text-soft-white">{friend.name}</h3>
                            <Badge className="bg-gunmetal text-muted-grey">Level {friend.level}</Badge>
                            {friend.isVip && (
                              <Badge className="bg-gradient-to-r from-bright-lime to-electric-teal text-deep-charcoal">VIP</Badge>
                            )}
                          </div>

                          <p className="text-muted-grey mb-3 font-roboto-condensed">
                            @{friend.username} • Friends since {friend.friendSince}
                          </p>

                          {friend.game ? (
                            <div className="flex items-center gap-3 mb-4 p-3 bg-electric-teal/10 rounded-lg border border-electric-teal/20">
                              <img
                                src={friend.gameImage || "/placeholder.svg"}
                                alt={friend.game}
                                className="w-12 h-8 object-cover rounded"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <Gamepad2 className="w-4 h-4 text-electric-teal" />
                                  <span className="text-electric-teal font-roboto-condensed font-medium">Playing {friend.game}</span>
                                </div>
                                <span className="text-xs text-muted-grey">{friend.lastSeen}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mb-4 text-green-400">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="font-roboto-condensed">{friend.lastSeen}</span>
                            </div>
                          )}

                          {friend.voiceChannel && (
                            <div className="flex items-center gap-2 mb-4 p-2 bg-purple-600/10 rounded-lg border border-purple-600/20">
                              <Headphones className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-400 font-roboto-condensed text-sm">In voice: {friend.voiceChannel}</span>
                              {friend.isInCall && <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />}
                            </div>
                          )}

                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="text-center p-2 bg-graphite-grey/30 rounded-lg">
                              <Trophy className="w-4 h-4 text-bright-lime mx-auto mb-1" />
                              <div className="font-bold text-soft-white">{friend.achievements}</div>
                              <div className="text-xs text-muted-grey">Achievements</div>
                            </div>
                            <div className="text-center p-2 bg-graphite-grey/30 rounded-lg">
                              <Clock className="w-4 h-4 text-electric-teal mx-auto mb-1" />
                              <div className="font-bold text-soft-white">{friend.hoursPlayed}h</div>
                              <div className="text-xs text-muted-grey">Played</div>
                            </div>
                            <div className="text-center p-2 bg-graphite-grey/30 rounded-lg">
                              <Gamepad2 className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                              <div className="font-bold text-soft-white">{friend.mutualGames}</div>
                              <div className="text-xs text-muted-grey">Mutual</div>
                            </div>
                            <div className="text-center p-2 bg-graphite-grey/30 rounded-lg">
                              <Star className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                              <div className="font-bold text-soft-white text-xs">{friend.favoriteGenre}</div>
                              <div className="text-xs text-muted-grey">Favorite</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button className="bg-electric-teal hover:bg-electric-teal/90 text-deep-charcoal shadow-lg">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              className="flex-1 text-muted-grey hover:text-green-400 hover:bg-green-600/10"
                              onClick={() => handleVoiceCall(friend)}
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex-1 text-muted-grey hover:text-blue-400 hover:bg-blue-600/10"
                              onClick={() => handleVideoCall(friend)}
                            >
                              <Video className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex-1 text-muted-grey hover:text-purple-400 hover:bg-purple-600/10"
                            >
                              <Gift className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex-1 text-muted-grey hover:text-soft-white hover:bg-graphite-grey/50">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-graphite-grey/95 backdrop-blur-xl border-graphite-grey/60 shadow-xl">
                                <DropdownMenuItem className="text-muted-grey hover:text-soft-white hover:bg-gunmetal/60">
                                  <User className="w-4 h-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-muted-grey hover:text-soft-white hover:bg-gunmetal/60">
                                  <PartyPopper className="w-4 h-4 mr-2" />
                                  Invite to Party
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gunmetal/60" />
                                <DropdownMenuItem className="text-neon-red hover:text-neon-red/80 focus:bg-neon-red/10">
                                  <UserX className="w-4 h-4 mr-2" />
                                  Remove Friend
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "blocked" && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-graphite-grey/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-muted-grey" />
                </div>
                <h3 className="text-2xl font-oxanium font-bold text-soft-white mb-3">No blocked users</h3>
                <p className="text-muted-grey text-lg font-roboto-condensed">Users you block will appear here for easy management</p>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 bg-graphite-grey/30 border-l border-graphite-grey/50 flex flex-col">
          <div className="p-4 border-b border-graphite-grey/50">
            <h3 className="text-lg font-oxanium font-bold text-soft-white">Direct Messages</h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            {friends.filter(f => f.status !== "offline").slice(0, 5).map((friend) => (
              <div key={friend.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-graphite-grey/50 cursor-pointer mb-2">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-graphite-grey to-gunmetal text-soft-white">
                      {friend.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(friend.status)} border-2 border-deep-charcoal`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-roboto-condensed font-medium text-soft-white truncate">{friend.name}</p>
                  <p className="text-xs text-muted-grey truncate">{friend.game || friend.lastSeen}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Voice/Video Call Interface */}
      {isInVoiceCall && voiceCall && (
        <div className="fixed bottom-0 left-0 right-0 bg-graphite-grey/95 backdrop-blur-xl border-t border-graphite-grey/50 p-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {voiceCall.participants.map((participant) => (
                  <div key={participant.id} className="relative">
                    <Avatar className="w-12 h-12 ring-2 ring-electric-teal/50">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-electric-teal to-blue-600 text-white">
                        {participant.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {participant.isStreaming && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <Monitor className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-roboto-condensed font-medium text-soft-white">
                  {isVideoEnabled ? "Video call" : "Voice call"} with {voiceCall.participants[0].name}
                </p>
                <p className="text-sm text-muted-grey">{voiceCall.duration} • {voiceCall.quality}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className={`w-12 h-12 rounded-full ${isMuted ? "bg-neon-red/20 text-neon-red" : "bg-graphite-grey/50 text-soft-white"}`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                className={`w-12 h-12 rounded-full ${isDeafened ? "bg-neon-red/20 text-neon-red" : "bg-graphite-grey/50 text-soft-white"}`}
                onClick={() => setIsDeafened(!isDeafened)}
              >
                {isDeafened ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                className={`w-12 h-12 rounded-full ${isVideoEnabled ? "bg-electric-teal/20 text-electric-teal" : "bg-graphite-grey/50 text-soft-white"}`}
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              >
                {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                className={`w-12 h-12 rounded-full ${isScreenSharing ? "bg-purple-500/20 text-purple-400" : "bg-graphite-grey/50 text-soft-white"}`}
                onClick={() => setIsScreenSharing(!isScreenSharing)}
              >
                <Monitor className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                className="w-12 h-12 rounded-full bg-neon-red/20 text-neon-red hover:bg-neon-red/30"
                onClick={handleEndCall}
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 