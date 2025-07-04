// API Configuration
export const API_ENDPOINTS = {
	GAMES: "/api/games",
	USERS: "/api/users",
	AUTH: "/api/auth",
	SEARCH: "/api/search",
	UPLOADS: "/api/uploads",
} as const;

// Game Categories
export const GAME_CATEGORIES = ["Action", "Adventure", "RPG", "Strategy", "Simulation", "Sports", "Racing", "Puzzle", "Platformer", "Fighting", "Shooter", "Horror", "Indie"] as const;

// Platform Support
export const PLATFORMS = ["Windows", "macOS", "Linux", "Web"] as const;

// File Upload Limits
export const UPLOAD_LIMITS = {
	MAX_FILE_SIZE: 5 * 1024 * 1024 * 1024, // 5GB
	MAX_SCREENSHOT_SIZE: 10 * 1024 * 1024, // 10MB
	MAX_AVATAR_SIZE: 2 * 1024 * 1024, // 2MB
	ALLOWED_GAME_FORMATS: [".zip", ".tar.gz", ".exe", ".dmg", ".deb"],
	ALLOWED_IMAGE_FORMATS: [".jpg", ".jpeg", ".png", ".webp"],
} as const;

// Revenue Share
export const REVENUE_SHARE = {
	LAUNCHBEACON_PERCENTAGE: 5,
	DEVELOPER_PERCENTAGE: 95,
	MINIMUM_PAYOUT: 100, // $100 minimum
} as const;
