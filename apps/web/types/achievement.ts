export type Achievement = {
	id: string;
	gameId: string;
	title: string;
	description: string;
	type: string;
	difficulty: string;
	category: string;
	iconUrl: string;
	points: number;
	rarity: number;
	requirements: {
		type: string;
		conditions: Record<string, any>;
	};
	rewards: {
		xp: number;
		badge: string;
		title?: string;
		socialShareText: string;
	};
	isHidden: boolean;
	unlockRate: number;
	createdAt: string;
};
