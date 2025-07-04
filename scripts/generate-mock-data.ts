import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

// --- Type Definitions (matching store page expectations) ---

interface Media {
	coverImage: string;
	screenshots: string[];
	trailerUrl?: string;
	iconUrl: string;
}

interface Pricing {
	basePrice: number;
	currentPrice: number;
	currency: "USD";
	isDrmFree: boolean;
	isEarlyAccess: boolean;
}

interface SystemReqs {
	os: string;
	processor: string;
	memory: string;
	graphics: string;
	storage: string;
}

interface Details {
	releaseDate: string;
	lastUpdate: string;
	version: string;
	fileSize: number;
	platforms: ("windows" | "mac" | "linux")[];
	systemRequirements: {
		minimum: SystemReqs;
		recommended: SystemReqs;
	};
	genres: string[];
	tags: string[];
}

interface Metrics {
	downloadCount: number;
	rating: number;
	reviewCount: number;
	playTime: {
		average: number;
		median: number;
	};
	achievementCount: number;
	modCount: number;
}

interface AIData {
	difficultyScore: number;
	complexityLevel: "beginner" | "intermediate" | "expert";
	emotionalTone: string[];
	targetAudience: string[];
	similarGames: string[];
	autoTags: string[];
	contentWarnings: string[];
}

interface Social {
	developerNotes: string;
	communityFeatures: boolean;
	multiplayerSupport: boolean;
	workshopSupport: boolean;
	streamingFriendly: boolean;
}

interface Technical {
	engineUsed?: string;
	modSupport: boolean;
	cloudSaveSupport: boolean;
	achievementSupport: boolean;
	leaderboardSupport: boolean;
}

interface Game {
	id: string;
	title: string;
	slug: string;
	description: string;
	shortDescription: string;
	developerId: string;
	media: Media;
	pricing: Pricing;
	details: Details;
	metrics: Metrics;
	aiData: AIData;
	social: Social;
	technical: Technical;
	createdAt: string;
	updatedAt: string;
}

interface GameData {
	metadata: {
		version: string;
		lastUpdated: string;
		totalCount: number;
		apiVersion: string;
		cacheExpiry: number;
	};
	data: Game[];
}

// --- Data Generation Logic ---

function generateRealisticGame(id: number): Game {
	const title = faker.commerce.productName();
	const platforms: ("windows" | "mac" | "linux")[] = faker.helpers.arrayElements(["windows", "mac", "linux"], { min: 1, max: 3 });

	return {
		id: `game_${String(id).padStart(4, "0")}`,
		title,
		slug: faker.helpers.slugify(title).toLowerCase(),
		description: faker.lorem.paragraphs(3),
		shortDescription: faker.lorem.sentence(),
		developerId: `user_${faker.number.int({ min: 1, max: 100 })}`,
		media: {
			coverImage: faker.image.urlLoremFlickr({
				category: "videogame",
				width: 600,
				height: 800,
			}),
			screenshots: Array.from({ length: faker.number.int({ min: 4, max: 8 }) }, () =>
				faker.image.urlLoremFlickr({
					category: "game",
					width: 1920,
					height: 1080,
				})
			),
			trailerUrl: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
			iconUrl: faker.image.avatar(),
		},
		pricing: {
			basePrice: faker.number.int({ min: 499, max: 5999 }),
			currentPrice: faker.number.int({ min: 499, max: 5999 }),
			currency: "USD",
			isDrmFree: faker.datatype.boolean(),
			isEarlyAccess: faker.datatype.boolean(),
		},
		details: {
			releaseDate: faker.date.past({ years: 5 }).toISOString(),
			lastUpdate: faker.date.recent({ days: 90 }).toISOString(),
			version: `${faker.number.int({ min: 0, max: 3 })}.${faker.number.int({
				min: 1,
				max: 9,
			})}.${faker.number.int({ min: 0, max: 9 })}`,
			fileSize: faker.number.int({ min: 1_000_000_000, max: 50_000_000_000 }),
			platforms,
			systemRequirements: {
				minimum: {
					os: platforms[0],
					processor: "Intel Core i3",
					memory: "8 GB RAM",
					graphics: "NVIDIA GeForce GTX 660",
					storage: "20 GB",
				},
				recommended: {
					os: platforms[0],
					processor: "Intel Core i7",
					memory: "16 GB RAM",
					graphics: "NVIDIA GeForce GTX 1060",
					storage: "50 GB",
				},
			},
			genres: faker.helpers.arrayElements(["Action", "Adventure", "RPG", "Strategy", "Indie", "Simulation"], { min: 1, max: 3 }),
			tags: faker.helpers.arrayElements(["Singleplayer", "Multiplayer", "Story Rich", "Atmospheric", "Great Soundtrack", "Fantasy", "Sci-fi"], { min: 2, max: 5 }),
		},
		metrics: {
			downloadCount: faker.number.int({ min: 1000, max: 1000000 }),
			rating: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 1 }),
			reviewCount: faker.number.int({ min: 50, max: 20000 }),
			playTime: {
				average: faker.number.int({ min: 60, max: 6000 }),
				median: faker.number.int({ min: 50, max: 5000 }),
			},
			achievementCount: faker.number.int({ min: 5, max: 100 }),
			modCount: faker.number.int({ min: 0, max: 200 }),
		},
		aiData: {
			difficultyScore: faker.number.int({ min: 1, max: 10 }),
			complexityLevel: faker.helpers.arrayElement(["beginner", "intermediate", "expert"]),
			emotionalTone: faker.helpers.arrayElements(["Exciting", "Relaxing", "Tense", "Humorous"], 2),
			targetAudience: faker.helpers.arrayElements(["Casual", "Hardcore", "Family", "Mature"], 1),
			similarGames: [],
			autoTags: [],
			contentWarnings: [],
		},
		social: {
			developerNotes: faker.lorem.paragraph(),
			communityFeatures: faker.datatype.boolean(),
			multiplayerSupport: faker.datatype.boolean(),
			workshopSupport: faker.datatype.boolean(),
			streamingFriendly: faker.datatype.boolean(),
		},
		technical: {
			engineUsed: faker.helpers.arrayElement(["Unity", "Unreal Engine", "Godot", "Custom"]),
			modSupport: faker.datatype.boolean(),
			cloudSaveSupport: faker.datatype.boolean(),
			achievementSupport: true,
			leaderboardSupport: true,
		},
		createdAt: faker.date.past({ years: 2 }).toISOString(),
		updatedAt: faker.date.recent().toISOString(),
	};
}

// --- File Generation ---

const generateDataFile = () => {
	const totalGames = 2500;
	const games: Game[] = [];

	for (let i = 1; i <= totalGames; i++) {
		games.push(generateRealisticGame(i));
	}

	const gameData: GameData = {
		metadata: {
			version: "1.1.0",
			lastUpdated: new Date().toISOString(),
			totalCount: totalGames,
			apiVersion: "v2",
			cacheExpiry: 3600, // 1 hour
		},
		data: games,
	};

	const outputPath = path.resolve(__dirname, "../apps/web/data/games.json");

	try {
		fs.writeFileSync(outputPath, JSON.stringify(gameData, null, 2), "utf-8");
		console.log(`✅ Successfully generated ${totalGames} games at ${outputPath}`);
	} catch (error) {
		console.error("❌ Error writing games.json file:", error);
	}
};

generateDataFile();
