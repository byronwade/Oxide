import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit, Trophy, Clock, Star, Users, Gamepad2, Calendar, Award, Settings, Share } from "lucide-react"

export function Profile() {
  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first game",
      icon: "🎮",
      unlocked: true,
      date: "2 days ago",
    },
    { id: 2, name: "Collector", description: "Own 10 games", icon: "📚", unlocked: true, date: "1 week ago" },
    {
      id: 3,
      name: "Marathon Runner",
      description: "Play for 100 hours total",
      icon: "⏰",
      unlocked: true,
      date: "2 weeks ago",
    },
    { id: 4, name: "Social Butterfly", description: "Add 5 friends", icon: "👥", unlocked: false, date: null },
    { id: 5, name: "Completionist", description: "100% complete a game", icon: "🏆", unlocked: false, date: null },
    {
      id: 6,
      name: "Early Bird",
      description: "Play a game in early access",
      icon: "🐦",
      unlocked: true,
      date: "3 days ago",
    },
  ]

  const recentGames = [
    {
      name: "Cyberpunk 2077",
      hours: 45.2,
      lastPlayed: "2 hours ago",
      image: "/placeholder.svg?height=40&width=60",
      achievement: "Night City Legend",
    },
    {
      name: "The Witcher 3",
      hours: 127.8,
      lastPlayed: "1 day ago",
      image: "/placeholder.svg?height=40&width=60",
      achievement: null,
    },
    {
      name: "Stardew Valley",
      hours: 89.5,
      lastPlayed: "3 days ago",
      image: "/placeholder.svg?height=40&width=60",
      achievement: "Master Farmer",
    },
  ]

  const stats = [
    { label: "Games Owned", value: "24", icon: Gamepad2, color: "text-blue-400" },
    { label: "Total Playtime", value: "342h", icon: Clock, color: "text-green-400" },
    { label: "Achievements", value: "47/120", icon: Trophy, color: "text-yellow-400" },
    { label: "Friends", value: "12", icon: Users, color: "text-purple-400" },
  ]

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-r from-blue-900/20 to-purple-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1200')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative h-full flex items-end p-6">
          <div className="flex items-end gap-6">
            <Avatar className="w-24 h-24 border-4 border-zinc-800">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback className="bg-zinc-700 text-white text-2xl">JD</AvatarFallback>
            </Avatar>

            <div className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">John Doe</h1>
                <Badge className="bg-blue-600">Level 15</Badge>
              </div>
              <p className="text-zinc-300 mb-2">Passionate indie game enthusiast and completionist</p>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined March 2023</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8 Community Rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Level Progress */}
        <Card className="bg-zinc-900/30 border-zinc-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-300">Level 15 Progress</span>
              <span className="text-sm text-zinc-400">2,340 / 3,000 XP</span>
            </div>
            <Progress value={78} className="h-3 bg-zinc-800" />
            <p className="text-xs text-zinc-500 mt-2">660 XP until next level</p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700 transition-colors"
              >
                <CardContent className="p-4 text-center">
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentGames.map((game, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{game.name}</div>
                    <div className="text-xs text-zinc-400">{game.lastPlayed}</div>
                    {game.achievement && <div className="text-xs text-yellow-400">🏆 {game.achievement}</div>}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{game.hours}h</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements
                .filter((a) => a.unlocked)
                .slice(0, 4)
                .map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{achievement.name}</div>
                      <div className="text-xs text-zinc-400">{achievement.description}</div>
                      {achievement.date && <div className="text-xs text-zinc-500">{achievement.date}</div>}
                    </div>
                    <Trophy className="w-4 h-4 text-yellow-400" />
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* All Achievements */}
        <Card className="bg-zinc-900/30 border-zinc-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Achievements
              </span>
              <span className="text-sm text-zinc-400">47 / 120</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    achievement.unlocked ? "bg-zinc-800/50 hover:bg-zinc-800" : "bg-zinc-800/20 opacity-60"
                  }`}
                >
                  <div className="text-xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${achievement.unlocked ? "text-white" : "text-zinc-400"}`}>
                      {achievement.name}
                    </div>
                    <div className="text-xs text-zinc-500">{achievement.description}</div>
                  </div>
                  {achievement.unlocked && <Trophy className="w-4 h-4 text-yellow-400" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
