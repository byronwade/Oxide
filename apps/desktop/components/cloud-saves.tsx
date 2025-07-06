"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Cloud,
  CloudOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Smartphone,
  Monitor,
  Settings,
  Trash2,
  MoreHorizontal,
  Wifi,
  WifiOff,
  Zap,
  Shield,
  Archive,
  History,
  DownloadCloud,
  UploadCloud,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CloudSaves() {
  const [activeTab, setActiveTab] = useState("saves")
  const [syncStatus, setSyncStatus] = useState<"online" | "offline">("online")
  const [showConflictDialog, setShowConflictDialog] = useState(false)

  const cloudSaves = [
		{
			id: 1,
			game: "Cyberpunk 2077",
			gameImage: "https://images.unsplash.com/photo-1581333107593-daoshi490970a2?q=80&w=60&auto=format&fit=crop",
			lastSync: "2 minutes ago",
			size: "2.4 MB",
			devices: ["PC", "Steam Deck"],
			status: "synced",
			conflicts: 0,
			saves: 3,
			lastPlayed: "2 hours ago",
			playtime: "45.2 hours",
		},
		{
			id: 2,
			game: "The Witcher 3",
			gameImage: "https://images.unsplash.com/photo-1593411342535-395893a7a4a8?q=80&w=60&auto=format&fit=crop",
			lastSync: "5 minutes ago",
			size: "1.8 MB",
			devices: ["PC", "Steam Deck", "Mobile"],
			status: "syncing",
			conflicts: 0,
			saves: 5,
			lastPlayed: "1 day ago",
			playtime: "127.8 hours",
		},
		{
			id: 3,
			game: "Stardew Valley",
			gameImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=60&auto=format&fit=crop",
			lastSync: "1 hour ago",
			size: "892 KB",
			devices: ["PC", "Mobile"],
			status: "conflict",
			conflicts: 2,
			saves: 2,
			lastPlayed: "3 days ago",
			playtime: "89.5 hours",
		},
		{
			id: 4,
			game: "Hollow Knight",
			gameImage: "https://images.unsplash.com/photo-1627920453477-9a00ab3e0839?q=80&w=60&auto=format&fit=crop",
			lastSync: "3 hours ago",
			size: "456 KB",
			devices: ["PC"],
			status: "error",
			conflicts: 0,
			saves: 1,
			lastPlayed: "1 week ago",
			playtime: "23.1 hours",
		},
  ];

  const devices = [
    {
      id: 1,
      name: "Gaming PC",
      type: "desktop",
      lastSync: "2 minutes ago",
      status: "online",
      saves: 24,
      storage: "12.4 MB",
    },
    {
      id: 2,
      name: "Steam Deck",
      type: "handheld",
      lastSync: "1 hour ago",
      status: "online",
      saves: 18,
      storage: "8.7 MB",
    },
    {
      id: 3,
      name: "Mobile",
      type: "mobile",
      lastSync: "2 days ago",
      status: "offline",
      saves: 6,
      storage: "2.1 MB",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "syncing":
        return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
      case "conflict":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "error":
        return <CloudOff className="w-4 h-4 text-red-400" />
      default:
        return <Cloud className="w-4 h-4 text-zinc-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "syncing":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "conflict":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "error":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      default:
        return "bg-zinc-600/20 text-zinc-400 border-zinc-600/30"
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "desktop":
        return <Monitor className="w-4 h-4" />
      case "handheld":
        return <Smartphone className="w-4 h-4" />
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      default:
        return <HardDrive className="w-4 h-4" />
    }
  }

  const totalStorage = cloudSaves.reduce((acc, save) => {
    const sizeInMB = Number.parseFloat(save.size.replace(/[^\d.]/g, ""))
    return acc + (save.size.includes("KB") ? sizeInMB / 1024 : sizeInMB)
  }, 0)

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-zinc-950 to-black">
      {/* Hero Header */}
      <div className="relative h-48 bg-gradient-to-r from-blue-900/20 via-cyan-900/20 to-purple-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1200')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative h-full flex items-end p-8">
          <div className="flex items-end gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center ring-4 ring-white/10">
              <Cloud className="w-10 h-10 text-white drop-shadow-sm" />
            </div>
            <div className="pb-2">
              <h1 className="text-4xl font-bold text-white mb-2">Cloud Saves</h1>
              <div className="flex items-center gap-6 text-zinc-300">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${syncStatus === "online" ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                  />
                  <span>{syncStatus === "online" ? "Online" : "Offline"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4" />
                  <span>{cloudSaves.length} games</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  <span>{totalStorage.toFixed(1)} MB used</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All
            </Button>
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-8 border-b border-zinc-800/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {cloudSaves.filter((s) => s.status === "synced").length}
                  </div>
                  <div className="text-sm text-zinc-400">Synced</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-600/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {cloudSaves.filter((s) => s.status === "conflict").length}
                  </div>
                  <div className="text-sm text-zinc-400">Conflicts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{totalStorage.toFixed(1)} MB</div>
                  <div className="text-sm text-zinc-400">Storage Used</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {devices.filter((d) => d.status === "online").length}
                  </div>
                  <div className="text-sm text-zinc-400">Devices Online</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-8 py-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          {[
            { id: "saves", label: "Game Saves", icon: Archive },
            { id: "devices", label: "Devices", icon: Monitor },
            { id: "conflicts", label: "Conflicts", icon: AlertTriangle },
            { id: "settings", label: "Settings", icon: Settings },
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
                {tab.id === "conflicts" && cloudSaves.filter((s) => s.status === "conflict").length > 0 && (
                  <Badge className="ml-2 bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                    {cloudSaves.filter((s) => s.status === "conflict").length}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === "saves" && (
          <div className="space-y-4">
            {cloudSaves.map((save) => (
              <Card
                key={save.id}
                className="bg-gradient-to-r from-zinc-900/30 to-zinc-800/20 border-zinc-700/50 hover:border-zinc-600/50 hover:from-zinc-900/50 hover:to-zinc-800/30 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={save.gameImage || "/placeholder.svg"}
                      alt={save.game}
                      className="w-16 h-12 object-cover rounded-lg shadow-lg"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{save.game}</h3>
                        <Badge className={`${getStatusColor(save.status)}`}>
                          {getStatusIcon(save.status)}
                          <span className="ml-1 capitalize">{save.status}</span>
                        </Badge>
                        {save.conflicts > 0 && (
                          <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                            {save.conflicts} conflicts
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-zinc-400 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Last sync: {save.lastSync}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-4 h-4" />
                          <span>Size: {save.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Archive className="w-4 h-4" />
                          <span>{save.saves} save files</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span>{save.playtime} played</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-500">Synced across:</span>
                        {save.devices.map((device, index) => (
                          <Badge key={index} variant="secondary" className="bg-zinc-700 text-zinc-300">
                            {getDeviceIcon(device.toLowerCase())}
                            <span className="ml-1">{device}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {save.status === "conflict" && (
                        <Dialog open={showConflictDialog} onOpenChange={setShowConflictDialog}>
                          <DialogTrigger asChild>
                            <Button className="bg-yellow-600 hover:bg-yellow-700 shadow-lg">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Resolve
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-zinc-900 border-zinc-700">
                            <DialogHeader>
                              <DialogTitle className="text-white">Resolve Save Conflict</DialogTitle>
                              <DialogDescription className="text-zinc-400">
                                Multiple versions of your save file were found. Choose which version to keep.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-white">Gaming PC</span>
                                  <Badge className="bg-blue-600">Current Device</Badge>
                                </div>
                                <div className="text-sm text-zinc-400">
                                  Last modified: 2 hours ago • Level 47 • 45.2 hours
                                </div>
                              </div>
                              <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-white">Steam Deck</span>
                                  <Badge variant="secondary">Cloud Version</Badge>
                                </div>
                                <div className="text-sm text-zinc-400">
                                  Last modified: 1 day ago • Level 46 • 44.8 hours
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="ghost" onClick={() => setShowConflictDialog(false)}>
                                Cancel
                              </Button>
                              <Button className="bg-blue-600 hover:bg-blue-700">Keep PC Version</Button>
                              <Button variant="secondary">Keep Cloud Version</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
                              <DownloadCloud className="w-4 h-4 mr-2" />
                              <span>Download Backup</span>
                              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                              <UploadCloud className="w-4 h-4 mr-2" />
                              <span>Force Upload</span>
                              <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800/60">
                              <History className="w-4 h-4 mr-2" />
                              <span>View History</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator className="bg-zinc-700/60" />
                          <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:bg-red-900/50 focus:text-white">
                            <Trash2 className="w-4 h-4 mr-2" />
                            <span>Delete Cloud Save</span>
                            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "devices" && (
          <div className="grid gap-6">
            {devices.map((device) => (
              <Card
                key={device.id}
                className="bg-gradient-to-r from-zinc-900/30 to-zinc-800/20 border-zinc-700/50 hover:border-zinc-600/50 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-zinc-800/50 rounded-xl flex items-center justify-center">
                      {getDeviceIcon(device.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{device.name}</h3>
                        <Badge
                          className={
                            device.status === "online"
                              ? "bg-green-600/20 text-green-400 border-green-600/30"
                              : "bg-zinc-600/20 text-zinc-400 border-zinc-600/30"
                          }
                        >
                          {device.status === "online" ? (
                            <Wifi className="w-3 h-3 mr-1" />
                          ) : (
                            <WifiOff className="w-3 h-3 mr-1" />
                          )}
                          {device.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm text-zinc-400">
                        <div>Last sync: {device.lastSync}</div>
                        <div>{device.saves} games synced</div>
                        <div>{device.storage} storage used</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" className="text-zinc-400 hover:text-white">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-zinc-400 hover:text-white">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "conflicts" && (
          <div className="text-center py-20">
            {cloudSaves.filter((s) => s.status === "conflict").length > 0 ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-10 h-10 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Save Conflicts Detected</h3>
                  <p className="text-zinc-400 text-lg mb-6">
                    {cloudSaves.filter((s) => s.status === "conflict").length} games have conflicting save files that
                    need your attention.
                  </p>
                  <Button className="bg-yellow-600 hover:bg-yellow-700">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Resolve All Conflicts
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">No Conflicts</h3>
                  <p className="text-zinc-400 text-lg">
                    All your save files are perfectly synchronized across devices.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <Card className="bg-zinc-900/30 border-zinc-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Sync Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Auto-sync saves</div>
                    <div className="text-sm text-zinc-400">Automatically sync saves when games close</div>
                  </div>
                  <Button variant="secondary">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Conflict resolution</div>
                    <div className="text-sm text-zinc-400">How to handle save conflicts</div>
                  </div>
                  <Button variant="ghost" className="text-zinc-400">
                    Ask me
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Storage limit</div>
                    <div className="text-sm text-zinc-400">Maximum cloud storage per game</div>
                  </div>
                  <Button variant="ghost" className="text-zinc-400">
                    100 MB
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/30 border-zinc-800/50">
              <CardHeader>
                <CardTitle className="text-white">Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Used</span>
                    <span className="text-white">{totalStorage.toFixed(1)} MB of 1 GB</span>
                  </div>
                  <Progress value={(totalStorage / 1024) * 100} className="h-2" />
                  <div className="text-xs text-zinc-500">
                    {(((1024 - totalStorage) / 1024) * 100).toFixed(1)}% remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
