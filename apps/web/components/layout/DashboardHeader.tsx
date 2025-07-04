"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GamepadIcon, Search, Bell, Settings, LogOut, User, BarChart3, Upload, Library, DollarSign, HelpCircle, Menu, X } from "lucide-react";

interface DashboardHeaderProps {
	user?: {
		id: string;
		username: string;
		displayName?: string;
		avatar?: string;
		isDeveloper?: boolean;
		isAdmin?: boolean;
	};
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [notifications] = useState(2); // Mock notifications

	// Mock user data if not provided
	const currentUser = user || {
		id: "user_001",
		username: "gamedev_pro",
		displayName: "Alex Chen",
		avatar: "/avatars/gamedev_pro.jpg",
		isDeveloper: true,
		isAdmin: false,
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-900 bg-black">
			<div className="w-full px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo & Dashboard Navigation */}
					<div className="flex items-center space-x-8">
						{/* Logo */}
						<Link href="/" className="flex items-center space-x-3 group">
							<div className="w-10 h-10 bg-rust-600 rounded-lg flex items-center justify-center group-hover:bg-rust-700 transition-colors">
								<GamepadIcon className="w-6 h-6 text-white" />
							</div>
							<span className="text-xl font-bold text-white group-hover:text-rust-400 transition-colors">Oxide</span>
						</Link>

						{/* Dashboard Navigation */}
						<nav className="hidden lg:flex items-center space-x-1">
							<Link href="/dashboard" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
								<BarChart3 className="w-4 h-4 mr-2" />
								Dashboard
							</Link>

							{currentUser.isDeveloper && (
								<>
									<Link href="/dashboard/upload" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
										<Upload className="w-4 h-4 mr-2" />
										Upload Game
									</Link>

									<Link href="/dashboard/analytics" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
										<BarChart3 className="w-4 h-4 mr-2" />
										Analytics
									</Link>

									<Link href="/dashboard/games" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
										<Library className="w-4 h-4 mr-2" />
										My Games
									</Link>

									<Link href="/dashboard/revenue" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
										<DollarSign className="w-4 h-4 mr-2" />
										Revenue
									</Link>
								</>
							)}

							{currentUser.isAdmin && (
								<Link href="/admin" className="flex items-center text-sm font-medium text-rust-400 hover:text-rust-300 px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
									<Settings className="w-4 h-4 mr-2" />
									Admin
								</Link>
							)}
						</nav>
					</div>

					{/* Search & User Actions */}
					<div className="flex items-center space-x-4">
						{/* Search Bar */}
						<div className="relative hidden md:block">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input type="text" placeholder="Search games, analytics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64 pl-10 pr-4 py-2 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-rust-500 focus:ring-rust-500" />
						</div>

						{/* Notifications */}
						<Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-900">
							<Bell className="w-5 h-5 text-gray-400" />
							{notifications > 0 && <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-rust-600 text-white text-xs">{notifications}</Badge>}
						</Button>

						{/* User Profile Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-900">
									<Avatar className="h-10 w-10">
										<AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
										<AvatarFallback className="bg-rust-600 text-white">{currentUser.displayName?.charAt(0) || currentUser.username.charAt(0).toUpperCase()}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56 bg-gray-950 border-gray-800" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none text-white">{currentUser.displayName}</p>
										<p className="text-xs leading-none text-gray-400">@{currentUser.username}</p>
										<div className="flex items-center space-x-2 mt-2">
											{currentUser.isDeveloper && <Badge className="h-5 text-xs bg-rust-600 text-white">Developer</Badge>}
											{currentUser.isAdmin && <Badge className="h-5 text-xs bg-purple-600 text-white">Admin</Badge>}
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-gray-800" />

								<DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-900">
									<Link href="/profile" className="flex items-center">
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>

								<DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-900">
									<Link href="/settings" className="flex items-center">
										<Settings className="mr-2 h-4 w-4" />
										<span>Settings</span>
									</Link>
								</DropdownMenuItem>

								<DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-900">
									<Link href="/help" className="flex items-center">
										<HelpCircle className="mr-2 h-4 w-4" />
										<span>Help & Support</span>
									</Link>
								</DropdownMenuItem>

								<DropdownMenuSeparator className="bg-gray-800" />

								<DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-900">
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Mobile Menu Toggle */}
						<Button variant="ghost" size="sm" className="lg:hidden p-2 hover:bg-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							{isMobileMenuOpen ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-gray-400" />}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="lg:hidden border-t border-gray-900 py-4">
						<nav className="flex flex-col space-y-2">
							<Link href="/dashboard" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
								<BarChart3 className="w-4 h-4 mr-2" />
								Dashboard
							</Link>

							{currentUser.isDeveloper && (
								<>
									<Link href="/dashboard/upload" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
										<Upload className="w-4 h-4 mr-2" />
										Upload Game
									</Link>

									<Link href="/dashboard/analytics" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
										<BarChart3 className="w-4 h-4 mr-2" />
										Analytics
									</Link>

									<Link href="/dashboard/games" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
										<Library className="w-4 h-4 mr-2" />
										My Games
									</Link>

									<Link href="/dashboard/revenue" className="flex items-center text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
										<DollarSign className="w-4 h-4 mr-2" />
										Revenue
									</Link>
								</>
							)}

							{currentUser.isAdmin && (
								<Link href="/admin" className="flex items-center text-sm font-medium text-rust-400 hover:text-rust-300 px-4 py-2 rounded-md hover:bg-gray-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
									<Settings className="w-4 h-4 mr-2" />
									Admin
								</Link>
							)}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
