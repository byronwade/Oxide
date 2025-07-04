import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ dimensions: string[] }> }) {
	const resolvedParams = await params;
	const dimensions = resolvedParams.dimensions;

	// Parse dimensions like ["600", "400"] from URL path
	const width = parseInt(dimensions[0]) || 600;
	const height = parseInt(dimensions[1]) || 400;

	// Limit sizes for security
	const maxSize = 2000;
	const finalWidth = Math.min(width, maxSize);
	const finalHeight = Math.min(height, maxSize);

	// Create a simple SVG placeholder with gaming theme
	const svg = `
    <svg width="${finalWidth}" height="${finalHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect x="10" y="10" width="${finalWidth - 20}" height="${finalHeight - 20}" 
            fill="none" stroke="#cd7f32" stroke-width="2" rx="8"/>
      
      <!-- Gaming Controller Icon -->
      <g transform="translate(${finalWidth / 2 - 20}, ${finalHeight / 2 - 15})">
        <rect x="0" y="10" width="40" height="20" rx="8" fill="#cd7f32" opacity="0.8"/>
        <circle cx="8" cy="15" r="2" fill="#ffffff"/>
        <circle cx="14" cy="15" r="2" fill="#ffffff"/>
        <circle cx="26" cy="15" r="2" fill="#ffffff"/>
        <circle cx="32" cy="15" r="2" fill="#ffffff"/>
        <rect x="-5" y="16" width="8" height="4" rx="2" fill="#cd7f32" opacity="0.8"/>
        <rect x="37" y="16" width="8" height="4" rx="2" fill="#cd7f32" opacity="0.8"/>
      </g>
      
      <!-- Dimensions text -->
      <text x="${finalWidth / 2}" y="${finalHeight - 30}" 
            text-anchor="middle" fill="#888888" font-family="monospace" font-size="14">
        ${finalWidth} × ${finalHeight}
      </text>
      
      <!-- LaunchBeacon watermark -->
      <text x="${finalWidth / 2}" y="${finalHeight / 2 + 45}" 
            text-anchor="middle" fill="#cd7f32" font-family="sans-serif" font-size="16" font-weight="bold">
        LaunchBeacon
      </text>
    </svg>
  `.trim();

	return new Response(svg, {
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=3600", // Cache for 1 hour
		},
	});
}
