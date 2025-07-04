"use client";

import React from "react";
import Link from "next/link";
import { Gamepad, Search, User as UserIcon, Settings, LogOut, Menu, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Header() {
	// This is a placeholder for a real authentication check
	const isAuthenticated = true;
	const isDeveloper = true;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<div className="mr-4 hidden md:flex">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<div className="p-2 bg-rust-900/50 rounded-lg">
							<Gamepad className="h-5 w-5 text-rust-500" />
						</div>
						<span className="font-semibold text-lg text-white hidden sm:inline">Oxide</span>
					</Link>
					<PlatformNavigation />
				</div>

				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						<form>
							<div className="relative">
								<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input type="search" placeholder="Search games..." className="pl-8 sm:w-40 md:w-64" />
							</div>
						</form>
					</div>
					<nav className="hidden md:flex items-center space-x-2">{isAuthenticated ? <UserMenu isDeveloper={isDeveloper} /> : <Button>Sign In</Button>}</nav>
				</div>

				{/* Mobile Menu */}
				<div className="md:hidden">
					<MobileMenu isDeveloper={isDeveloper} />
				</div>
			</div>
		</header>
	);
}

function PlatformNavigation() {
	return (
		<nav className="flex items-center gap-4 text-sm">
			<Link href="/store" className="font-medium text-foreground/60 transition-colors hover:text-foreground/80">
				Store
			</Link>
			<Link href="/community" className="font-medium text-foreground/60 transition-colors hover:text-foreground/80">
				Community
			</Link>
			<Link href="/library" className="font-medium text-foreground/60 transition-colors hover:text-foreground/80">
				Library
			</Link>
		</nav>
	);
}

function UserMenu({ isDeveloper }: { isDeveloper: boolean }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<UserIcon className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">Username</p>
						<p className="text-xs leading-none text-muted-foreground">user@example.com</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{isDeveloper && (
					<>
						<DropdownMenuItem asChild>
							<Link href="/dashboard">
								<LayoutDashboardIcon className="mr-2 h-4 w-4" />
								<span>Dashboard</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/dashboard/upload">
								<Upload className="mr-2 h-4 w-4" />
								<span>Upload Game</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
					</>
				)}
				<DropdownMenuItem asChild>
					<Link href="/settings">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function MobileMenu({ isDeveloper }: { isDeveloper: boolean }) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="px-2">
					{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-screen max-w-xs">
				<div className="p-4">
					<div className="flex flex-col space-y-4">
						<Link href="/store" className="font-medium" onClick={() => setIsOpen(false)}>
							Store
						</Link>
						<Link href="/community" className="font-medium" onClick={() => setIsOpen(false)}>
							Community
						</Link>
						<Link href="/library" className="font-medium" onClick={() => setIsOpen(false)}>
							Library
						</Link>
						{isDeveloper && (
							<>
								<DropdownMenuSeparator />
								<Link href="/dashboard" className="font-medium" onClick={() => setIsOpen(false)}>
									Dashboard
								</Link>
								<Link href="/dashboard/upload" className="font-medium" onClick={() => setIsOpen(false)}>
									Upload Game
								</Link>
							</>
						)}
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

const LayoutDashboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect width="7" height="9" x="3" y="3" rx="1" />
		<rect width="7" height="5" x="14" y="3" rx="1" />
		<rect width="7" height="9" x="3" y="14" rx="1" />
		<rect width="7" height="5" x="14" y="14" rx="1" />
	</svg>
);
