import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: {
		default: "LaunchBeacon - The Ultimate Gaming Platform & Steam Alternative",
		template: "%s | LaunchBeacon",
	},
	description: "Discover, download, and enjoy thousands of indie games on LaunchBeacon - the AI-powered gaming platform that puts developers and players first. DRM-free games, advanced mod support, and next-gen social features.",
	keywords: ["steam alternative", "indie game launcher", "DRM-free games", "game distribution platform", "PC game launcher", "digital game store", "indie games", "gaming platform", "AI-powered recommendations", "mod support"],
	authors: [{ name: "LaunchBeacon Team" }],
	creator: "LaunchBeacon",
	publisher: "LaunchBeacon",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL(process.env.NODE_ENV === "production" ? "https://launchbeacon.com" : "http://localhost:3000"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "/",
		title: "LaunchBeacon - The Ultimate Gaming Platform & Steam Alternative",
		description: "Discover thousands of indie games with AI-powered recommendations, DRM-free downloads, and advanced social features. The gaming platform built for the future.",
		siteName: "LaunchBeacon",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "LaunchBeacon Gaming Platform",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "LaunchBeacon - The Ultimate Gaming Platform",
		description: "Discover thousands of indie games with AI-powered recommendations and DRM-free downloads",
		images: ["/twitter-image.jpg"],
		creator: "@LaunchBeacon",
		site: "@LaunchBeacon",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION,
	},
	category: "gaming",
};

// JSON-LD structured data
const structuredData = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "LaunchBeacon",
	description: "The ultimate gaming platform and Steam alternative featuring indie games, AI-powered recommendations, and DRM-free downloads",
	url: "https://launchbeacon.com",
	logo: "https://launchbeacon.com/logo.png",
	sameAs: ["https://twitter.com/LaunchBeacon", "https://github.com/LaunchBeacon", "https://discord.gg/LaunchBeacon"],
	contactPoint: {
		"@type": "ContactPoint",
		contactType: "customer service",
		email: "support@launchbeacon.com",
	},
	founder: {
		"@type": "Organization",
		name: "LaunchBeacon Team",
	},
	foundingDate: "2024",
	applicationCategory: "GameApplication",
	operatingSystem: ["Windows", "macOS", "Linux"],
	offers: {
		"@type": "Offer",
		category: "Digital Games",
		availability: "https://schema.org/InStock",
		price: "0",
		priceCurrency: "USD",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="dark">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<meta name="theme-color" content="#000000" />
				<meta name="color-scheme" content="dark" />
			</head>
			<body className={`${inter.variable} font-sans antialiased min-h-screen bg-black text-white selection:bg-rust-500/20`} suppressHydrationWarning>
				<div className="relative flex min-h-screen flex-col">
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
