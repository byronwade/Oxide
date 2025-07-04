import { z } from "zod";

// User Schema
export const UserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	username: z.string().min(3).max(50),
	displayName: z.string().optional(),
	avatar: z.string().optional(),
	bio: z.string().optional(),
	isDeveloper: z.boolean().default(false),
	isVerified: z.boolean().default(false),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Developer Profile Schema
export const DeveloperProfileSchema = z.object({
	userId: z.string(),
	companyName: z.string().optional(),
	website: z.string().url().optional(),
	socialLinks: z
		.object({
			twitter: z.string().optional(),
			github: z.string().optional(),
			discord: z.string().optional(),
		})
		.optional(),
	verified: z.boolean().default(false),
	revenue: z.number().default(0),
	gamesPublished: z.number().default(0),
});

export type DeveloperProfile = z.infer<typeof DeveloperProfileSchema>;
