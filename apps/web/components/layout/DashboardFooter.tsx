"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GamepadIcon, Twitter, Github, MessageCircle, HelpCircle, FileText, Shield, Heart, Zap } from "lucide-react";

const quickLinks = [
	{ name: "Help Center", href: "/help", icon: HelpCircle },
	{ name: "Developer Docs", href: "/docs", icon: FileText },
	{ name: "API Reference", href: "/api-docs", icon: Zap },
	{ name: "Community", href: "/community", icon: MessageCircle },
];

const legalLinks = [
	{ name: "Privacy Policy", href: "/privacy" },
	{ name: "Terms of Service", href: "/terms" },
	{ name: "Developer Agreement", href: "/developer-terms" },
];

export function DashboardFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-gray-900 bg-gray-950">
			<div className="w-full px-8 py-8">
				<div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
					{/* Logo & Quick Links */}
					<div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
						{/* Logo */}
						<Link href="/" className="flex items-center space-x-3 group">
							<div className="w-8 h-8 bg-rust-600 rounded-lg flex items-center justify-center group-hover:bg-rust-700 transition-colors">
								<GamepadIcon className="w-5 h-5 text-white" />
							</div>
							<span className="text-lg font-bold text-white group-hover:text-rust-400 transition-colors">LaunchBeacon</span>
						</Link>

						{/* Quick Links */}
						<div className="flex items-center space-x-6">
							{quickLinks.map((link) => (
								<Link key={link.name} href={link.href} className="flex items-center space-x-1 text-sm text-gray-400 hover:text-rust-400 transition-colors">
									<link.icon className="w-4 h-4" />
									<span>{link.name}</span>
								</Link>
							))}
						</div>
					</div>

					{/* Social & Legal */}
					<div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
						{/* Social Links */}
						<div className="flex items-center space-x-3">
							<Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-900 text-gray-400 hover:text-rust-400">
								<Twitter className="w-4 h-4" />
							</Button>
							<Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-900 text-gray-400 hover:text-rust-400">
								<MessageCircle className="w-4 h-4" />
							</Button>
							<Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-900 text-gray-400 hover:text-rust-400">
								<Github className="w-4 h-4" />
							</Button>
						</div>

						<Separator orientation="vertical" className="h-4 bg-gray-800 hidden lg:block" />

						{/* Legal Links */}
						<div className="flex items-center space-x-4">
							{legalLinks.map((link, index) => (
								<div key={link.name} className="flex items-center space-x-4">
									<Link href={link.href} className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
										{link.name}
									</Link>
									{index < legalLinks.length - 1 && <span className="text-gray-700">•</span>}
								</div>
							))}
						</div>
					</div>
				</div>

				<Separator className="my-6 bg-gray-800" />

				{/* Bottom Row */}
				<div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
					<div className="flex items-center space-x-2 text-xs text-gray-500">
						<span>© {currentYear} LaunchBeacon.</span>
						<span>Built with</span>
						<Heart className="w-3 h-3 text-rust-400 fill-current" />
						<span>for developers and gamers.</span>
					</div>

					<div className="flex items-center space-x-4 text-xs text-gray-500">
						<div className="flex items-center space-x-1">
							<Shield className="w-3 h-3" />
							<span>Secure Platform</span>
						</div>
						<span>•</span>
						<span>Status: All systems operational</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
