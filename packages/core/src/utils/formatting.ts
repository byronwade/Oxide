// Format file size in bytes to human readable format
export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Format price to currency
export const formatPrice = (price: number, currency = "USD"): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(price);
};

// Format date to relative time
export const formatRelativeTime = (date: Date): string => {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return "just now";
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;

	return date.toLocaleDateString();
};

// Format duration in seconds to human readable format
export const formatDuration = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	} else if (minutes > 0) {
		return `${minutes}m ${secs}s`;
	} else {
		return `${secs}s`;
	}
};

// Generate game slug from title
export const generateSlug = (title: string): string => {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim()
		.replace(/^-|-$/g, "");
};
