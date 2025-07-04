"use client";

import { useState } from "react";
import Image from "next/image";

// Client Component for image with error handling and multiple fallbacks
export function GameImage({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) {
	const [imageSrc, setImageSrc] = useState(src);
	const [attempts, setAttempts] = useState(0);

	const fallbackImages = [
		src, // Original source
		"/api/placeholder/400/300", // Our placeholder API
		"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2NkN2YzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdhbWUgSW1hZ2U8L3RleHQ+PC9zdmc+", // Base64 encoded SVG fallback
	];

	const handleError = () => {
		const nextAttempt = attempts + 1;
		if (nextAttempt < fallbackImages.length) {
			setImageSrc(fallbackImages[nextAttempt]);
			setAttempts(nextAttempt);
		}
	};

	return (
		<Image
			src={imageSrc}
			alt={alt}
			width={width}
			height={height}
			className={className}
			priority={false}
			onError={handleError}
			unoptimized={imageSrc.startsWith("data:")} // Don't optimize base64 images
		/>
	);
}
