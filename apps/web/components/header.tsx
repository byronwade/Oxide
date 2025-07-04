"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Minimize2,
  Square,
  X,
  Bell,
  Sparkles,
  Download,
  User,
  Code,
  Zap,
  Settings,
  ChevronDown,
  Users,
  Minus,
  Maximize2,
  Cloud,
  Newspaper,
  Eye,
  Wallet,
  Tags,
  LogOut,
  LayoutGrid,
  BookText,
  BarChart3,
  UploadCloud,
  Wrench,
  Puzzle,
  DownloadCloud,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

interface HeaderProps {
  activeView: string
  setActiveView: (view: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function Header({ activeView, setActiveView, searchQuery, setSearchQuery }: HeaderProps) {
  const [windowStyle, setWindowStyle] = useState<"windows" | "macos">("windows")

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes("mac")) {
      setWindowStyle("macos")
    }
  }, [])

  const MacOSControls = () => (
    <div className="flex items-center gap-2 mr-4">
      <button className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors group relative">
        <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 absolute inset-0 m-auto transition-opacity" />
      </button>
      <button className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-colors group relative">
        <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 absolute inset-0 m-auto transition-opacity" />
      </button>
      <button className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors group relative">
        <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 absolute inset-0 m-auto transition-opacity" />
      </button>
    </div>
  )

  const WindowsControls = () => (
    <div className="flex items-center gap-1 ml-2 pl-2 border-l border-zinc-700/50">
      <Button
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0 text-zinc-500 hover:text-white hover:bg-zinc-800/80 transition-all"
      >
        <Minimize2 className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0 text-zinc-500 hover:text-white hover:bg-zinc-800/80 transition-all"
      >
        <Square className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0 text-zinc-500 hover:text-white hover:bg-red-600/90 transition-all"
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </div>
  )

  const navItems = [
    { id: "store", label: "Store" },
    { id: "library", label: "Library" },
  ]

  return (
    <header className="h-16 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/60 flex items-center px-4 relative z-50 shadow-lg shadow-black/20 flex-shrink-0">
      {windowStyle === "macos" && <MacOSControls />}

      {/* Left Side: Logo & Main Nav */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Zap className="w-5 h-5 text-white drop-shadow-sm" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Oxide
          </span>
        </div>

        <div className="h-8 w-px bg-zinc-700/50" />

        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`h-9 px-4 text-base font-semibold transition-all duration-200 ${
                activeView === item.id ? "text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
              }`}
              onClick={() => setActiveView(item.id)}
            >
              {item.label}
            </Button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 px-4 text-base font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/40 data-[state=open]:bg-zinc-800/40"
              >
                Community
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 p-2"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Newspaper className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">News</p>
                    <p className="text-xs text-zinc-500">Latest updates and announcements</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveView("friends")}
                  className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors"
                >
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Friends</p>
                    <p className="text-xs text-zinc-500">See who's online</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Curators</p>
                    <p className="text-xs text-zinc-500">Follow community recommendations</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 px-4 text-base font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/40 data-[state=open]:bg-zinc-800/40"
              >
                Developers
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 p-2"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setActiveView("developer")}
                  className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors"
                >
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <LayoutGrid className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Dashboard</p>
                    <p className="text-xs text-zinc-500">Manage your games & sales</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <BookText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Documentation</p>
                    <p className="text-xs text-zinc-500">API & SDK references</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Analytics</p>
                    <p className="text-xs text-zinc-500">Track your game's performance</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <UploadCloud className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Upload Game</p>
                    <p className="text-xs text-zinc-500">Submit a new title for review</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 px-4 text-base font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/40 data-[state=open]:bg-zinc-800/40"
              >
                Mods
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 p-2"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Puzzle className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Browse Mods</p>
                    <p className="text-xs text-zinc-500">Discover community creations</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Mod Workshop</p>
                    <p className="text-xs text-zinc-500">Manage your subscriptions</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <UploadCloud className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Upload a Mod</p>
                    <p className="text-xs text-zinc-500">Share your work with others</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-8 h-8 mr-3 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <DownloadCloud className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-200">Modding Tools</p>
                    <p className="text-xs text-zinc-500">Download tools and resources</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Side: Search & Actions */}
      <div className="flex items-center gap-4">
        <div className="w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-9 bg-zinc-900/60 border-zinc-700/60 text-white placeholder-zinc-500 focus:border-blue-500/60 focus:bg-zinc-900/80 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {activeView === "store" && (
            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all"
          onClick={() => setActiveView("downloads")}
        >
          <Download className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all"
        >
          <Bell className="w-4 h-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 gap-2 px-2 text-zinc-400 hover:text-white hover:bg-zinc-800/40 data-[state=open]:bg-zinc-800/40 transition-all"
            >
              <Avatar className="w-7 h-7 ring-2 ring-zinc-700/50">
                <AvatarImage src="/placeholder.svg?height=28&width=28" />
                <AvatarFallback className="bg-gradient-to-br from-zinc-600 to-zinc-700 text-white text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-72 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 p-2"
          >
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 ring-2 ring-blue-500/50">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-br from-zinc-600 to-zinc-700 text-white text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-white text-base">John Doe</div>
                  <div className="text-sm text-zinc-400">Level 15</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800 my-2 h-px" />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-3" />
                  Set Status
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 p-2">
                    <DropdownMenuItem className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                      Online
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                      Away
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                      Invisible
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                onClick={() => setActiveView("profile")}
                className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                <span>View My Profile</span>
                <DropdownMenuShortcut className="ml-auto text-xs tracking-widest text-zinc-500">
                  ⇧⌘P
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-800 my-2 h-px" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                <Wallet className="w-4 h-4 mr-2" />
                <span>Wallet</span>
                <DropdownMenuShortcut className="ml-auto text-xs tracking-widest text-zinc-400 font-semibold">
                  $5.00
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
                <Tags className="w-4 h-4 mr-2" />
                <span>My Inventory</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setActiveView("cloud")}
                className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors"
              >
                <Cloud className="w-4 h-4 mr-2" />
                <span>Cloud Saves</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setActiveView("developer")}
                className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors"
              >
                <Code className="w-4 h-4 mr-2" />
                <span>Developer</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-800 my-2 h-px" />
            <DropdownMenuItem className="text-zinc-300 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-zinc-800/75 data-[highlighted]:text-white transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800 my-2 h-px" />
            <DropdownMenuItem className="text-red-400 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-red-500/10 data-[highlighted]:text-red-400 transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {windowStyle === "windows" && <WindowsControls />}
      </div>
    </header>
  )
}
