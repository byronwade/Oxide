import type { Metadata } from "next";
import { Inter, Oxanium, Roboto_Condensed, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import DesktopLayout from "../components/DesktopLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-oxanium" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], variable: "--font-roboto-condensed" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
	title: "Oxide Desktop",
	description: "The ultimate gaming platform for PC",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="dark">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={`${inter.variable} ${oxanium.variable} ${robotoCondensed.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-dark-bg text-text-primary selection:bg-xbox-green/20`} suppressHydrationWarning>
				<DesktopLayout>{children}</DesktopLayout>
				{/* <PerformanceDashboard /> */}

				{/* Performance Monitor Initialization */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
							// Initialize performance monitoring
							if (typeof window !== 'undefined') {
								console.log('🔧 Desktop Performance Monitor: Initialized');
								// Performance monitoring will be handled by the desktop performance monitor
							}
						`,
					}}
				/>
			</body>
		</html>
	);
}
