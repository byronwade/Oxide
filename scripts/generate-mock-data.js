import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const NUM_GAMES = 2500;
const NUM_DEVELOPERS = 500;
const NUM_CATEGORIES = 20;

console.log("Generating mock data...");

// --- Generate Developers ---
const developers = Array.from({ length: NUM_DEVELOPERS }, (_, i) => ({
	id: `dev_${String(i + 1).padStart(3, "0")}`,
	name: faker.company.name(),
	bio: faker.lorem.paragraph(),
	location: faker.location.city(),
	websiteUrl: faker.internet.url(),
	avatar: faker.image.avatar(),
	socialLinks: {
		twitter: `https://twitter.com/${faker.internet.userName()}`,
		youtube: `https://youtube.com/c/${faker.internet.userName()}`,
	},
	publishedGames: [],
	createdAt: faker.date.past({ years: 5 }).toISOString(),
}));

// --- Generate Categories ---
const categories = Array.from({ length: NUM_CATEGORIES }, () => {
	const name = faker.commerce.department();
	return {
		id: faker.string.uuid(),
		slug: faker.helpers.slugify(name).toLowerCase(),
		name: name,
		description: faker.lorem.sentence(),
		image: `/api/placeholder/400/225?text=${name.replace(/\s+/g, "+")}`,
		icon: "gamepad-2",
	};
});

// --- Generate Games ---
const games = Array.from({ length: NUM_GAMES }, (_, i) => {
	const developer = faker.helpers.arrayElement(developers);
	const basePrice = faker.number.int({ min: 0, max: 5999 });
	const isOnSale = faker.datatype.boolean({ probability: 0.3 });
	const currentPrice = isOnSale ? Math.floor(basePrice * (1 - faker.number.float({ min: 0.1, max: 0.9 }))) : basePrice;

	const game = {
		id: `game_${String(i + 1).padStart(4, "0")}`,
		title: faker.commerce.productName(),
		slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
		description: faker.lorem.paragraphs(3),
		shortDescription: faker.lorem.sentence(),
		developerId: developer.id,
		media: {
			coverImage: `/api/placeholder/400/300?text=Game+${i + 1}`,
			screenshots: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => `/api/placeholder/800/600?text=Screenshot`),
			iconUrl: `/api/placeholder/64/64?text=Icon`,
		},
		pricing: {
			basePrice,
			currentPrice,
			currency: "USD",
			isDrmFree: faker.datatype.boolean(),
			isEarlyAccess: faker.datatype.boolean({ probability: 0.1 }),
			discountPercent: isOnSale ? Math.round(((basePrice - currentPrice) / basePrice) * 100) : 0,
		},
		details: {
			releaseDate: faker.date.past({ years: 4 }).toISOString(),
			lastUpdate: faker.date.recent({ days: 180 }).toISOString(),
			version: `${faker.number.int({ min: 1, max: 5 })}.${faker.number.int({ min: 0, max: 9 })}.${faker.number.int({
				min: 0,
				max,
			})}`,
			fileSize: faker.number.int({ min: 100_000_000, max: 80_000_000_000 }), // 100MB - 80GB
			platforms: faker.helpers.arrayElements(["windows", "mac", "linux"], { min: 1, max: 3 }),
			genres: faker.helpers.arrayElements(
				categories.map((c) => c.name),
				{ min: 1, max: 3 }
			),
			tags: faker.helpers.arrayElements(["Singleplayer", "Multiplayer", "Co-op", "Story Rich", "Atmospheric", "Difficult", "Funny", "Relaxing"], { min: 2, max: 6 }),
		},
		metrics: {
			downloadCount: faker.number.int({ min: 100, max: 5_000_000 }),
			rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }),
			reviewCount: faker.number.int({ min: 10, max: 50_000 }),
			playTime: {
				average: faker.number.int({ min: 60, max: 2400 }), // 1hr - 40hrs
				median: faker.number.int({ min: 60, max: 2400 }),
			},
			achievementCount: faker.number.int({ min: 0, max: 150 }),
			modCount: faker.number.int({ min: 0, max: 100 }),
		},
		aiData: {
			difficultyScore: faker.number.int({ min: 1, max: 10 }),
			complexityLevel: faker.helpers.arrayElement(["beginner", "intermediate", "expert"]),
			emotionalTone: faker.helpers.arrayElements(["happy", "sad", "exciting", "relaxing", "intense"], { min: 1, max: 3 }),
			targetAudience: faker.helpers.arrayElements(["casual", "hardcore", "family", "teens"], { min: 1, max: 2 }),
			similarGames: [],
			autoTags: [],
			contentWarnings: faker.datatype.boolean() ? ["violence", "language"] : [],
		},
		social: {
			multiplayerSupport: faker.datatype.boolean(),
			workshopSupport: faker.datatype.boolean(),
			streamingFriendly: faker.datatype.boolean(),
		},
		technical: {
			engineUsed: faker.helpers.arrayElement(["Unity", "Unreal", "Godot", "Custom"]),
			modSupport: faker.datatype.boolean(),
			achievementSupport: faker.datatype.boolean(),
		},
		createdAt: faker.date.past({ years: 3 }).toISOString(),
		updatedAt: faker.date.recent({ days: 30 }).toISOString(),
	};

	// @ts-ignore
	developer.publishedGames.push(game.id);
	return game;
});

// --- Write to JSON files ---
const dataDir = path.join(process.cwd(), "apps/web/data");

if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

function writeJsonFile(filename: string, data: any) {
	fs.writeFileSync(
		path.join(dataDir, filename),
		JSON.stringify(
			{
				metadata: {
					version: "1.1.0",
					lastUpdated: new Date().toISOString(),
					totalCount: data.length,
					apiVersion: "v2",
					cacheExpiry: 300,
				},
				data,
			},
			null,
			2
		)
	);
}

writeJsonFile("games.json", games);
writeJsonFile("developers.json", developers);
writeJsonFile("categories.json", categories);

console.log(`✅ Generated ${NUM_GAMES} games, ${NUM_DEVELOPERS} developers, and ${NUM_CATEGORIES} categories.`);
console.log(`Mock data written to ${dataDir}`);
