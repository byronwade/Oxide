import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.itch.zone",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "loremflickr.com",
			},
		],
	},
	compress: true,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
