"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export function TauriGreet() {
	const [greeting, setGreeting] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGreeting = async () => {
			try {
				setLoading(true);
				const result = await invoke<string>("greet", { name: "LaunchBeacon Desktop" });
				setGreeting(result);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch greeting");
				setGreeting("Hello from Next.js! (Tauri not available)");
			} finally {
				setLoading(false);
			}
		};

		fetchGreeting();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center p-4">
				<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rust-400"></div>
				<span className="ml-2 text-gray-400">Loading from Rust backend...</span>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
				<p className="text-lg font-medium text-rust-300">{greeting}</p>
			</div>

			{error && (
				<div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
					<p className="text-sm text-red-400">
						<strong>Note:</strong> {error}
					</p>
					<p className="text-xs text-gray-500 mt-1">This is expected when running in development mode without Tauri.</p>
				</div>
			)}

			<div className="text-sm text-gray-400">
				<p>This greeting is fetched from the Rust backend using Tauri&apos;s invoke system.</p>
				<p className="mt-1">The Rust backend provides native performance and system access.</p>
			</div>
		</div>
	);
}
