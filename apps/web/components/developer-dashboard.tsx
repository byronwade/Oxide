"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  BarChart3,
  DollarSign,
  Users,
  Download,
  Eye,
  Star,
  Plus,
  TrendingUp,
  Calendar,
  Settings,
} from "lucide-react"

export function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const myGames = [
    {
      id: 1,
      title: "Neon Runner",
      status: "published",
      downloads: 1247,
      revenue: 2494.5,
      rating: 4.2,
      views: 5632,
      image: "/placeholder.svg?height=60&width=80",
      lastUpdate: "2 days ago",
    },
    {
      id: 2,
      title: "Pixel Quest",
      status: "in_review",
      downloads: 0,
      revenue: 0,
      rating: 0,
      views: 0,
      image: "/placeholder.svg?height=60&width=80",
      lastUpdate: "1 week ago",
    },
    {
      id: 3,
      title: "Space Odyssey",
      status: "draft",
      downloads: 0,
      revenue: 0,
      rating: 0,
      views: 0,
      image: "/placeholder.svg?height=60&width=80",
      lastUpdate: "3 weeks ago",
    },
  ]

  const stats = [
    { label: "Total Revenue", value: "$2,494.50", icon: DollarSign, change: "+12.5%", color: "text-green-400" },
    { label: "Total Downloads", value: "1,247", icon: Download, change: "+8.2%", color: "text-blue-400" },
    { label: "Page Views", value: "5,632", icon: Eye, change: "+15.3%", color: "text-purple-400" },
    { label: "Followers", value: "89", icon: Users, change: "+5.1%", color: "text-yellow-400" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-600"
      case "in_review":
        return "bg-yellow-600"
      case "draft":
        return "bg-zinc-600"
      default:
        return "bg-zinc-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Live"
      case "in_review":
        return "In Review"
      case "draft":
        return "Draft"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800/50 bg-zinc-950/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Developer Dashboard</h1>
            <p className="text-zinc-400">Manage your games and track performance</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Upload New Game
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="bg-zinc-900/30 border-zinc-800/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <Badge variant="secondary" className="text-xs bg-green-900 text-green-300">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "games", label: "My Games" },
            { id: "analytics", label: "Analytics" },
            { id: "payouts", label: "Payouts" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`pb-2 rounded-none border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-white"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Performance */}
            <Card className="bg-zinc-900/30 border-zinc-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Recent Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">Downloads (7 days)</span>
                  <span className="text-white font-semibold text-green-400">+127</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">Revenue (7 days)</span>
                  <span className="text-white font-semibold text-green-400">+$254.00</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">New Reviews</span>
                  <span className="text-white font-semibold text-blue-400">+8</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">Wishlist Adds</span>
                  <span className="text-white font-semibold text-purple-400">+23</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-zinc-900/30 border-zinc-800/50">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                >
                  <Upload className="w-4 h-4 mr-3" />
                  Upload New Game
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Analytics
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                >
                  <DollarSign className="w-4 h-4 mr-3" />
                  Request Payout
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Update
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Developer Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "games" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">My Games</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Game
              </Button>
            </div>

            {myGames.map((game) => (
              <Card key={game.id} className="bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white text-lg">{game.title}</h3>
                        <Badge className={getStatusColor(game.status)}>{getStatusText(game.status)}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1 text-zinc-400">
                          <Download className="w-3 h-3" />
                          <span>{game.downloads} downloads</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-400">
                          <DollarSign className="w-3 h-3" />
                          <span>${game.revenue.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-400">
                          <Eye className="w-3 h-3" />
                          <span>{game.views} views</span>
                        </div>
                        {game.rating > 0 && (
                          <div className="flex items-center gap-1 text-zinc-400">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{game.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 mt-2">Last updated: {game.lastUpdate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {(activeTab === "analytics" || activeTab === "payouts") && (
          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === "analytics" ? (
                  <BarChart3 className="w-8 h-8 text-zinc-400" />
                ) : (
                  <DollarSign className="w-8 h-8 text-zinc-400" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {activeTab === "analytics" ? "Analytics Coming Soon" : "Payouts Coming Soon"}
              </h3>
              <p className="text-zinc-400 max-w-md mx-auto">
                {activeTab === "analytics"
                  ? "Detailed analytics and insights for your games will be available here soon."
                  : "Payout management and transaction history will be available here soon."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
