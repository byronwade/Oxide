"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gamepad, Twitter, Github, MessageCircle, ArrowUpRight } from "lucide-react";

const footerSections = [
	{
		title: "Platform",
		links: [
			{ name: "Store", href: "/store" },
			{ name: "Library", href: "/library" },
			{ name: "Community", href: "/community" },
			{ name: "Dashboard", href: "/dashboard" },
		],
	},
	{
		title: "Developers",
		links: [
			{ name: "Upload Game", href: "/dashboard/upload" },
			{ name: "Analytics", href: "/dashboard/analytics" },
			{ name: "Documentation", href: "/docs" },
			{ name: "API", href: "/api" },
		],
	},
	{
		title: "Support",
		links: [
			{ name: "Help Center", href: "/help" },
			{ name: "Contact", href: "/contact" },
			{ name: "Status", href: "/status" },
			{ name: "Feedback", href: "/feedback" },
		],
	},
	{
		title: "Company",
		links: [
			{ name: "About", href: "/about" },
			{ name: "Blog", href: "/blog" },
			{ name: "Careers", href: "/careers" },
			{ name: "Press", href: "/press" },
		],
	},
];

const legalLinks = [
	{ name: "Terms", href: "/terms" },
	{ name: "Privacy", href: "/privacy" },
	{ name: "Cookies", href: "/cookies" },
];

export function Footer() {
	return (
		<footer className="border-t border-gray-900/50 bg-black">
			<div className="container mx-auto px-6">
				{/* Main footer content */}
				<div className="py-16">
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
						{/* Logo and description */}
						<div className="col-span-2">
							<Link href="/" className="flex items-center space-x-2 group mb-4">
								<div className="p-1.5 rounded-lg bg-rust-500/10 group-hover:bg-rust-500/20 transition-colors duration-200">
									<Gamepad className="h-5 w-5 text-rust-500" />
								</div>
								<span className="font-semibold text-lg text-white">LaunchBeacon</span>
							</Link>
							<p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">The ultimate gaming platform for indie developers and players. Discover, create, and share amazing games.</p>
							<div className="flex items-center space-x-3">
								<Button variant="ghost" size="sm" asChild className="p-2 hover:bg-gray-900/50">
									<Link href="https://twitter.com/launchbeacon" target="_blank" rel="noopener noreferrer">
										<Twitter className="h-4 w-4 text-gray-400 hover:text-white" />
									</Link>
								</Button>
								<Button variant="ghost" size="sm" asChild className="p-2 hover:bg-gray-900/50">
									<Link href="https://github.com/launchbeacon" target="_blank" rel="noopener noreferrer">
										<Github className="h-4 w-4 text-gray-400 hover:text-white" />
									</Link>
								</Button>
								<Button variant="ghost" size="sm" asChild className="p-2 hover:bg-gray-900/50">
									<Link href="/community">
										<MessageCircle className="h-4 w-4 text-gray-400 hover:text-white" />
									</Link>
								</Button>
							</div>
						</div>

						{/* Footer sections */}
						{footerSections.map((section) => (
							<div key={section.title} className="col-span-1">
								<h3 className="text-white font-medium text-sm mb-4">{section.title}</h3>
								<ul className="space-y-3">
									{section.links.map((link) => (
										<li key={link.name}>
											<Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
												{link.name}
												{link.href.startsWith("http") && <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Bottom section */}
				<div className="border-t border-gray-900/50 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="flex items-center space-x-6">
							<p className="text-gray-500 text-sm">© {new Date().getFullYear()} LaunchBeacon Corp.</p>
							<div className="flex items-center space-x-4">
								{legalLinks.map((link) => (
									<Link key={link.name} href={link.href} className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-200">
										{link.name}
									</Link>
								))}
							</div>
						</div>
						<div className="flex items-center space-x-2 text-gray-500 text-sm">
							<span>Built with</span>
							<span className="text-rust-500">♥</span>
							<span>for indie developers</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
