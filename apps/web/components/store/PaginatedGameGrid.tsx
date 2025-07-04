"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// Game type - simplified for this component
interface Game {
	id: string;
	title: string;
	media: {
		coverImage: string;
	};
	pricing: {
		currentPrice: number;
		basePrice: number;
	};
	metrics: {
		rating: number;
	};
	discountPercent: number;
}

interface PaginatedGameGridProps {
	games: Game[];
}

export function PaginatedGameGrid({ games }: PaginatedGameGridProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;

	const totalPages = Math.ceil(games.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentGames = games.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
				{currentGames.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</div>
			<PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
		</>
	);
}

// Simple GameCard component
function GameCard({ game }: { game: Game }) {
	return (
		<div className="group relative bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
			<div className="aspect-[3/4] bg-gray-800">
				<img src={game.media.coverImage} alt={game.title} className="w-full h-full object-cover" />
			</div>
			<div className="p-3">
				<h3 className="font-medium text-sm text-white truncate">{game.title}</h3>
				<div className="flex items-center justify-between mt-2">
					<div className="flex items-center gap-2">
						{game.discountPercent > 0 && <span className="bg-rust-600 text-white text-xs px-2 py-1 rounded">-{game.discountPercent}%</span>}
						<span className="text-white font-medium">${(game.pricing.currentPrice / 100).toFixed(2)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

// Pagination Controls
function PaginationControls({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
	const handlePageClick = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const pageNumbers = [];
	const maxPagesToShow = 5;
	let startPage, endPage;

	if (totalPages <= maxPagesToShow) {
		startPage = 1;
		endPage = totalPages;
	} else {
		if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
			startPage = 1;
			endPage = maxPagesToShow;
		} else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
			startPage = totalPages - maxPagesToShow + 1;
			endPage = totalPages;
		} else {
			startPage = currentPage - Math.floor(maxPagesToShow / 2);
			endPage = currentPage + Math.floor(maxPagesToShow / 2);
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="flex items-center justify-center space-x-2 mt-12">
			<Button variant="outline" size="icon" onClick={() => handlePageClick(1)} disabled={currentPage === 1} className="hidden sm:flex">
				<ChevronsLeft className="h-4 w-4" />
			</Button>
			<Button variant="outline" size="icon" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			{startPage > 1 && (
				<Button variant="outline" className="hidden sm:flex">
					...
				</Button>
			)}
			{pageNumbers.map((number) => (
				<Button key={number} variant={currentPage === number ? "default" : "outline"} onClick={() => handlePageClick(number)} className="w-10 h-10">
					{number}
				</Button>
			))}
			{endPage < totalPages && (
				<Button variant="outline" className="hidden sm:flex">
					...
				</Button>
			)}
			<Button variant="outline" size="icon" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
				<ChevronRight className="h-4 w-4" />
			</Button>
			<Button variant="outline" size="icon" onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages} className="hidden sm:flex">
				<ChevronsRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
