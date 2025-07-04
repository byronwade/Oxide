import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "./desktop.css";
import { CustomTitleBar } from "@/components/layout/CustomTitleBar";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Oxide Desktop",
	description: "The official Oxide desktop app.",
	keywords: ["game launcher", "indie games", "steam alternative", "DRM-free games"],
	authors: [{ name: "The Oxide Team" }],
	creator: "The Oxide Team",
	publisher: "The Oxide Team",
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
		<html lang="en" suppressHydrationWarning>
			<body className={`font-sans ${inter.variable} bg-transparent`}>
				<CustomTitleBar />
				{children}
			</body>
		</html>
	);
}
