import { z } from "zod";

// Email validation
export const validateEmail = (email: string): boolean => {
	const emailSchema = z.string().email();
	return emailSchema.safeParse(email).success;
};

// Username validation
export const validateUsername = (username: string): boolean => {
	const usernameSchema = z
		.string()
		.min(3)
		.max(50)
		.regex(/^[a-zA-Z0-9_]+$/);
	return usernameSchema.safeParse(username).success;
};

// Password validation
export const validatePassword = (password: string): boolean => {
	const passwordSchema = z
		.string()
		.min(8)
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/);
	return passwordSchema.safeParse(password).success;
};

// Game slug validation
export const validateGameSlug = (slug: string): boolean => {
	const slugSchema = z
		.string()
		.min(1)
		.max(100)
		.regex(/^[a-z0-9-]+$/);
	return slugSchema.safeParse(slug).success;
};

// File size validation
export const validateFileSize = (size: number, maxSize: number): boolean => {
	return size <= maxSize && size > 0;
};
