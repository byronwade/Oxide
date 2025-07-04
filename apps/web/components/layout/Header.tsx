"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Gamepad, Search, User as UserIcon, Settings, LogOut, Menu, X, ChevronDown, Upload, Library } from "lucide-react";

interface HeaderProps {
	user?: {
		id: string;
		username: string;
		displayName?: string;
		avatar?: string;
		level?: number;
		xp?: number;
		isPro?: boolean;
		isDeveloper?: boolean;
		accountType?: string;
	};
}

// Vercel-style navigation button
const NavigationButton = ({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) => (
	<Link href={href} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${active ? "text-white bg-gray-900" : "text-gray-400 hover:text-white hover:bg-gray-900/50"}`}>
		{children}
	</Link>
);

// Clean navigation with better spacing
function PlatformNavigation() {
	return (
		<nav className="hidden lg:flex items-center space-x-1">
			<NavigationButton href="/store">Store</NavigationButton>
			<NavigationButton href="/library">Library</NavigationButton>
			<NavigationButton href="/community">Community</NavigationButton>
			<NavigationButton href="/dashboard">Dashboard</NavigationButton>
		</nav>
	);
}

// Vercel-style search with subtle styling
function SearchBox() {
	return (
		<div className="relative max-w-sm w-full">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
			<Input type="text" placeholder="Search games..." className="w-full pl-10 pr-4 py-2 bg-gray-950/50 border-gray-800 text-sm text-white placeholder:text-gray-500 focus:border-gray-600 focus:bg-gray-950 rounded-lg transition-colors duration-200" />
		</div>
	);
}

// Clean user profile section
function UserProfile({ user }: HeaderProps) {
	if (!user) {
		return (
			<div className="flex items-center space-x-2">
				<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-900/50">
					Sign in
				</Button>
				<Button size="sm" className="btn-primary">
					Get started
				</Button>
			</div>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-gray-900/50 transition-colors duration-200">
					<Avatar className="h-7 w-7">
						<AvatarImage src={user.avatar} alt={user.username} />
						<AvatarFallback className="bg-gray-800 text-gray-300 text-xs">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
					<span className="hidden sm:inline text-white text-sm font-medium">{user.displayName || user.username}</span>
					<ChevronDown className="h-3 w-3 text-gray-500" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-gray-950 border-gray-800 text-white shadow-xl">
				<DropdownMenuLabel className="text-xs font-medium text-gray-400 uppercase tracking-wider">Account</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-gray-800" />
				<DropdownMenuItem asChild>
					<Link href="/library" className="w-full cursor-pointer flex items-center">
						<Library className="mr-2 h-4 w-4" />
						<span>Library</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
					<UserIcon className="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
					<Settings className="mr-2 h-4 w-4" />
					<span>Settings</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator className="bg-gray-800" />
				<DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sign out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// Clean, Vercel-inspired header
export function Header({ user }: HeaderProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const isDeveloper = user?.accountType === "developer";

	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-900/50 bg-black/80 backdrop-blur-xl">
			<div className="container mx-auto px-6">
				<div className="flex h-16 items-center justify-between">
					{/* Left: Logo & Navigation */}
					<div className="flex items-center space-x-8">
						<Link href="/" className="flex items-center space-x-2 group">
							<div className="p-1.5 rounded-lg bg-rust-500/10 group-hover:bg-rust-500/20 transition-colors duration-200">
								<Gamepad className="h-5 w-5 text-rust-500" />
							</div>
							<span className="font-semibold text-lg text-white hidden sm:inline">LaunchBeacon</span>
						</Link>
						<PlatformNavigation />
					</div>

					{/* Center: Search */}
					<div className="flex-1 flex justify-center max-w-md mx-8 hidden md:flex">
						<SearchBox />
					</div>

					{/* Right: Actions & Profile */}
					<div className="flex items-center space-x-3">
						{isDeveloper && (
							<Button asChild size="sm" variant="outline" className="hidden md:flex border-gray-800 hover:border-gray-700 hover:bg-gray-900/50">
								<Link href="/dashboard/upload">
									<Upload className="h-4 w-4 mr-2" />
									Upload
								</Link>
							</Button>
						)}

						<div className="hidden md:flex">
							<UserProfile user={user} />
						</div>

						{/* Mobile menu button */}
						<Button variant="ghost" size="sm" className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden border-t border-gray-900/50 bg-black/95 backdrop-blur-xl">
					<div className="container mx-auto px-6 py-6 space-y-6">
						<SearchBox />

						<nav className="space-y-1">
							<NavigationButton href="/store">Store</NavigationButton>
							<NavigationButton href="/library">Library</NavigationButton>
							<NavigationButton href="/community">Community</NavigationButton>
							<NavigationButton href="/dashboard">Dashboard</NavigationButton>
						</nav>

						{isDeveloper && (
							<Button asChild variant="outline" className="w-full justify-start border-gray-800 hover:border-gray-700">
								<Link href="/dashboard/upload">
									<Upload className="h-4 w-4 mr-2" />
									Upload Game
								</Link>
							</Button>
						)}

						<div className="border-t border-gray-900/50 pt-6">
							<UserProfile user={user} />
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
