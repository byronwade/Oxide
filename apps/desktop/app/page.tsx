"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { GameLibrary } from "@/components/game-library"
import { Store } from "@/components/store"
import { Downloads } from "@/components/downloads"
import { Profile } from "@/components/profile"
import { DeveloperDashboard } from "@/components/developer-dashboard"
import { Friends } from "@/components/friends"
import { CloudSaves } from "@/components/cloud-saves"
import { GameDetailPage } from "@/components/game-detail-page"

export default function OxidePlatform() {
  const [activeView, setActiveView] = useState("store") // Default to store view
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState<any>(null)

  const renderActiveView = () => {
    if (selectedGame) {
      // The game prop is no longer needed as the component fetches its own data
      return <GameDetailPage onBack={() => setSelectedGame(null)} />
    }
    switch (activeView) {
      case "library":
        return <GameLibrary searchQuery={searchQuery} />
      case "store":
        return <Store searchQuery={searchQuery} onGameSelect={setSelectedGame} />
      case "friends":
        return <Friends isFullView={true} />
      case "cloud":
        return <CloudSaves />
      case "downloads":
        return <Downloads />
      case "profile":
        return <Profile />
      case "developer":
        return <DeveloperDashboard />
      default:
        return <Store searchQuery={searchQuery} onGameSelect={setSelectedGame} />
    }
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="flex-1 overflow-hidden">{renderActiveView()}</main>
    </div>
  )
}
