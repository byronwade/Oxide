export type Game = {
	id: string;
	title: string;
	slug: string;
	coverImage: string;
	price: number;
	rating: number;
	tags: string[];
	downloadCount: number;
	developer?: {
		name: string;
	};
	media?: {
		coverImage: string;
		screenshots: string[];
		iconUrl: string;
	};
	isHot: boolean;
	isNew: boolean;
	isOnSale: boolean;
	isAiRecommended: boolean;
};
