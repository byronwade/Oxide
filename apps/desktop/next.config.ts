import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	// Optimized for Tauri desktop app
	experimental: {
		optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"],
	},
	// Disable features not needed for desktop
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: false,
	},
};

export default nextConfig;
