// Shared game data interfaces for LaunchBeacon platform
// Used by both web and desktop applications

export interface DataFileMetadata {
	version: string;
	lastUpdated: string;
	totalCount: number;
	apiVersion: "v1" | "v2";
	cacheExpiry: number;
}

export interface DataFile<T> {
	metadata: DataFileMetadata;
	data: T[];
	pagination?: {
		page: number;
		limit: number;
		hasNext: boolean;
		hasPrevious: boolean;
	};
	relationships?: Record<string, string[]>;
}

// Game-related interfaces
export interface Game {
	id: string;
	title: string;
	slug?: string;
	description?: string;
	shortDescription?: string;
	developerId?: string;

	// Visual assets
	coverImage: string;
	screenshots?: string[];
	trailerUrl?: string;
	iconUrl?: string;

	// Pricing
	price: number; // In cents
	originalPrice?: number;
	currency?: string;

	// Metadata
	rating: number; // 0-5 stars
	reviewCount?: number;
	downloadCount?: number;
	tags: string[];

	// Status flags
	isNew?: boolean;
	isHot?: boolean;
	isOnSale?: boolean;
	isAiRecommended?: boolean;

	// Game details
	releaseDate?: string;
	lastUpdate?: string;
	version?: string;
	platforms?: ("windows" | "mac" | "linux" | "web")[];
	genres?: string[];

	// Timestamps
	createdAt?: string;
	updatedAt?: string;
}

export interface FeaturedGame extends Game {
	discountPercent?: number;
	featured?: boolean;
	featuredReason?: string;
}

export interface GameDetails extends Game {
	fullDescription: string;
	systemRequirements: {
		minimum: SystemRequirements;
		recommended: SystemRequirements;
	};
	fileSize: number;
	supportedLanguages: string[];
	contentRating: string;
	developer: Developer;
	achievements: Achievement[];
	reviews: Review[];
	mods?: Mod[];
}

export interface SystemRequirements {
	os: string;
	processor: string;
	memory: string;
	graphics: string;
	storage: string;
	additionalNotes?: string;
}

// Developer interfaces
export interface Developer {
	id: string;
	name: string;
	displayName: string;
	description: string;
	avatar: string;
	verified: boolean;
	location?: string;
	founded?: string;
	website?: string;
	social?: {
		twitter?: string;
		youtube?: string;
		discord?: string;
		twitch?: string;
	};
	stats: {
		totalGames: number;
		totalDownloads: number;
		averageRating: number;
		followers: number;
	};
	specialties: string[];
	featuredGames: string[];
	bio: string;
	createdAt?: string;
	updatedAt?: string;
}

// Achievement interfaces
export interface Achievement {
	id: string;
	gameId: string;
	title: string;
	description: string;
	type: "story" | "challenge" | "collection" | "social" | "hidden";
	difficulty: "easy" | "medium" | "hard" | "legendary";
	category: string;
	iconUrl: string;
	points: number;
	rarity: number; // Percentage of players who have unlocked

	requirements: {
		type: "stat" | "event" | "combination";
		conditions: Record<string, string | number | boolean>;
		dependencies?: string[];
	};

	rewards: {
		xp: number;
		title?: string;
		badge?: string;
		socialShareText: string;
	};

	progress?: {
		isProgressBased: boolean;
		maxProgress?: number;
		currentProgress?: number;
		milestones?: number[];
	};

	// Meta
	isHidden: boolean;
	unlockRate: number;
	createdAt: string;
	updatedAt?: string;
}

// Category interfaces
export interface GameCategory {
	id: string;
	name: string;
	slug: string;
	description: string;
	iconType: string; // For mapping to React components
	count: number;
	image: string;
	featuredGames?: string[];
	color?: string;
	trending?: boolean;
}

// Review interfaces
export interface Review {
	id: string;
	gameId: string;
	userId: string;
	rating: number; // 1-5 stars
	title: string;
	content: string;
	helpful: number; // Helpful votes
	totalVotes: number;
	verified: boolean; // Verified purchase
	playtime: number; // In minutes
	recommended: boolean;
	createdAt: string;
	updatedAt?: string;
}

// User interfaces
export interface User {
	id: string;
	username: string;
	displayName: string;
	email?: string; // Should be encrypted/hashed in real system

	profile: {
		avatar: string;
		bio?: string;
		location?: string;
		websiteUrl?: string;
		socialLinks: {
			twitter?: string;
			youtube?: string;
			twitch?: string;
		};
		badges: string[];
		title?: string;
	};

	gaming: {
		ownedGames: string[];
		wishlist: string[];
		recentlyPlayed: {
			gameId: string;
			lastPlayed: string;
			totalPlayTime: number;
		}[];
		achievements: {
			gameId: string;
			achievementId: string;
			unlockedAt: string;
		}[];
		reviews: string[];
	};

	social: {
		friends: string[];
		following: string[];
		followers: string[];
		privacy: {
			profileVisibility: "public" | "friends" | "private";
			gameLibraryVisible: boolean;
			achievementsVisible: boolean;
			playtimeVisible: boolean;
		};
	};

	preferences: {
		favoriteGenres: string[];
		preferredDifficulty: "easy" | "medium" | "hard" | "mixed";
		playtimePreference: "short" | "medium" | "long" | "mixed";
		contentFilters: string[];
		aiRecommendations: boolean;
		platformPreferences: string[];
	};

	developer?: {
		isVerified: boolean;
		publishedGames: string[];
		revenue: {
			total: number;
			thisMonth: number;
		};
		analytics: {
			totalDownloads: number;
			totalReviews: number;
			averageRating: number;
		};
	};

	system: {
		accountType: "player" | "developer" | "admin";
		memberSince: string;
		lastSeen: string;
		isOnline: boolean;
		currentStatus: "online" | "away" | "busy" | "offline";
		notificationSettings: Record<string, boolean>;
	};

	createdAt: string;
	updatedAt: string;
}

// Mod interfaces
export interface Mod {
	id: string;
	gameId: string;
	authorId: string;
	title: string;
	description: string;
	version: string;
	downloadUrl: string;
	previewImages: string[];
	fileSize: number;
	compatibility: string[];
	downloads: number;
	rating: number;
	tags: string[];
	requirements: string[];
	installation: string;
	changelog: string;
	createdAt: string;
	updatedAt: string;
}

// API Response interfaces
export interface APIResponse<T> {
	data: T;
	pagination?: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrevious: boolean;
	};
	metadata: {
		cached: boolean;
		timestamp: string;
		source: string;
		version?: string;
	};
	error?: {
		code: string;
		message: string;
		details?: Record<string, unknown>;
	};
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
	pagination: NonNullable<APIResponse<T>["pagination"]>;
}

// Filter interfaces
export interface GameFilters {
	genre?: string;
	priceRange?: [number, number];
	rating?: number;
	tags?: string[];
	platform?: string;
	search?: string;
	sortBy?: "rating" | "price" | "release_date" | "popularity" | "name";
	sortOrder?: "asc" | "desc";
	isNew?: boolean;
	isOnSale?: boolean;
	isFree?: boolean;
}

// Collection interfaces for homepage
export interface GameCollections {
	trending: Game[];
	newReleases: Game[];
	onSale: Game[];
	popular: Game[];
	aiRecommended: Game[];
	recentlyUpdated: Game[];
	topRated: Game[];
	free: Game[];
}

// Platform-specific types
export interface PlatformStats {
	totalGames: number;
	totalDevelopers: number;
	totalUsers: number;
	totalDownloads: number;
	averageRating: number;
	topGenres: { name: string; count: number }[];
	recentActivity: {
		newGames: number;
		newUsers: number;
		totalDownloads: number;
	};
}

// Search result interfaces
export interface SearchResult {
	games: Game[];
	developers: Developer[];
	tags: string[];
	categories: GameCategory[];
	totalResults: number;
	searchTime: number;
}

// Real-time data interfaces
export interface LiveData {
	onlineUsers: number;
	currentDownloads: number;
	recentAchievements: {
		userId: string;
		gameId: string;
		achievementId: string;
		timestamp: string;
	}[];
	trendingGames: string[];
}

// Export all types as a single namespace for easy importing
export type * from "./game-data";

// Type guards for runtime type checking
export function isGame(obj: unknown): obj is Game {
	return typeof obj === "object" && obj !== null && "id" in obj && "title" in obj;
}

export function isDeveloper(obj: unknown): obj is Developer {
	return typeof obj === "object" && obj !== null && "id" in obj && "name" in obj;
}

export function isAchievement(obj: unknown): obj is Achievement {
	return typeof obj === "object" && obj !== null && "id" in obj && "gameId" in obj;
}

// Utility types for component props
export type GameCardProps = {
	game: Game;
	showAiBadge?: boolean;
	compact?: boolean;
	onClick?: (game: Game) => void;
};

export type CategoryCardProps = {
	category: GameCategory;
	onClick?: (category: GameCategory) => void;
};

export type DeveloperCardProps = {
	developer: Developer;
	showStats?: boolean;
	onClick?: (developer: Developer) => void;
};
