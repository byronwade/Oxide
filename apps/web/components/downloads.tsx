import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, Pause, Play, X, CheckCircle, AlertCircle, ArrowUp, ArrowDown, Settings } from "lucide-react"

export function Downloads() {
  const downloads = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      type: "update",
      progress: 75,
      speed: "45.2 MB/s",
      eta: "2 min",
      size: "2.1 GB",
      downloaded: "1.6 GB",
      status: "downloading",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 2,
      title: "Hollow Knight",
      type: "install",
      progress: 100,
      speed: "0 MB/s",
      eta: "Complete",
      size: "2.8 GB",
      downloaded: "2.8 GB",
      status: "completed",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 3,
      title: "The Witcher 3",
      type: "update",
      progress: 0,
      speed: "0 MB/s",
      eta: "Queued",
      size: "1.5 GB",
      downloaded: "0 GB",
      status: "queued",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 4,
      title: "Stardew Valley",
      type: "install",
      progress: 45,
      speed: "0 MB/s",
      eta: "Paused",
      size: "500 MB",
      downloaded: "225 MB",
      status: "paused",
      image: "/placeholder.svg?height=60&width=80",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "downloading":
        return <Download className="w-4 h-4 text-blue-400 animate-pulse" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-400" />
      case "queued":
        return <AlertCircle className="w-4 h-4 text-zinc-400" />
      default:
        return <Download className="w-4 h-4 text-zinc-400" />
    }
  }

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800/50 bg-zinc-950/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Downloads</h1>
            <p className="text-zinc-400">Manage your game installations and updates</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              Pause All
            </Button>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              Clear Completed
            </Button>
          </div>
        </div>

        {/* Download Speed Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                <ArrowDown className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm text-zinc-400">Download Speed</span>
            </div>
            <span className="text-2xl font-bold text-white">45.2 MB/s</span>
          </div>

          <div className="bg-zinc-900/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                <ArrowUp className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm text-zinc-400">Upload Speed</span>
            </div>
            <span className="text-2xl font-bold text-white">2.1 MB/s</span>
          </div>

          <div className="bg-zinc-900/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                <Download className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-sm text-zinc-400">Active Downloads</span>
            </div>
            <span className="text-2xl font-bold text-white">2</span>
          </div>
        </div>
      </div>

      {/* Downloads List */}
      <div className="p-6 space-y-3">
        {downloads.map((download) => (
          <Card key={download.id} className="bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Game Image */}
                <img
                  src={download.image || "/placeholder.svg"}
                  alt={download.title}
                  className="w-16 h-12 object-cover rounded"
                />

                {/* Status Icon */}
                <div className="flex-shrink-0">{getStatusIcon(download.status)}</div>

                {/* Game Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white truncate">{download.title}</h3>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${download.type === "update" ? "bg-blue-600" : "bg-green-600"}`}
                    >
                      {download.type === "update" ? "Update" : "Install"}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <Progress value={download.progress} className="h-2 bg-zinc-800" />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-zinc-400">
                    <span className="font-medium">{download.progress}%</span>
                    <span>
                      {download.downloaded} / {download.size}
                    </span>
                    <span>{download.speed}</span>
                    <span>{download.eta}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  {download.status === "downloading" && (
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-zinc-400 hover:text-white">
                      <Pause className="w-4 h-4" />
                    </Button>
                  )}
                  {download.status === "paused" && (
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-zinc-400 hover:text-white">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  {download.status !== "completed" && (
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-zinc-400 hover:text-red-400">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {downloads.length === 0 && (
          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No active downloads</h3>
              <p className="text-zinc-400">Your downloads and updates will appear here</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
