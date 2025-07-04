import { z } from "zod";

// Game Schema
export const GameSchema = z.object({
	id: z.string(),
	title: z.string(),
	slug: z.string(),
	description: z.string(),
	developerId: z.string(),
	media: z.array(z.string()),
	fileUrl: z.string().optional(),
	price: z.number().min(0),
	tags: z.array(z.string()),
	screenshots: z.array(z.string()),
	trailerUrl: z.string().optional(),
	systemRequirements: z
		.object({
			minimum: z.object({
				os: z.string(),
				processor: z.string(),
				memory: z.string(),
				graphics: z.string(),
				storage: z.string(),
			}),
			recommended: z
				.object({
					os: z.string(),
					processor: z.string(),
					memory: z.string(),
					graphics: z.string(),
					storage: z.string(),
				})
				.optional(),
		})
		.optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type Game = z.infer<typeof GameSchema>;

export interface GameFilters {
	genre?: string[];
	priceRange?: [number, number];
	platform?: string[];
	sortBy?: "title" | "price" | "releaseDate" | "popularity";
	sortOrder?: "asc" | "desc";
}
