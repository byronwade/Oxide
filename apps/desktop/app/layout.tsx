import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "./desktop.css";
import { CustomTitleBar } from "@/components/layout/CustomTitleBar";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "LaunchBeacon Desktop",
	description: "Next-generation game launcher and platform for indie developers",
	keywords: ["game launcher", "indie games", "steam alternative", "DRM-free games"],
	authors: [{ name: "LaunchBeacon Team" }],
	creator: "LaunchBeacon",
	publisher: "LaunchBeacon",
	robots: {
		index: false,
		follow: false,
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={inter.variable}>
			<body className={`${inter.className} antialiased bg-transparent text-foreground window-mask`}>
				<div className="relative min-h-screen flex flex-col bg-black rounded-xl overflow-hidden window-shadow border border-gray-800/30 m-1">
					<CustomTitleBar />
					<main className="flex-1 overflow-auto">{children}</main>
				</div>
			</body>
		</html>
	);
}
