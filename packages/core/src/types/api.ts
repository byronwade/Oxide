import { z } from "zod";

// API Response Schema
export const ApiResponseSchema = z.object({
	success: z.boolean(),
	data: z.any().optional(),
	error: z.string().optional(),
	message: z.string().optional(),
});

export type ApiResponse<T = any> = {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
};

// Pagination Schema
export const PaginationSchema = z.object({
	page: z.number().min(1),
	limit: z.number().min(1).max(100),
	total: z.number(),
	pages: z.number(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

// Search Query Schema
export const SearchQuerySchema = z.object({
	q: z.string(),
	filters: z.record(z.any()).optional(),
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(100).default(20),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
