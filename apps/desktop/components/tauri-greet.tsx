"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export function TauriGreet() {
	const [greeting, setGreeting] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const greet = async () => {
			try {
				setLoading(true);
				const result = await invoke<string>("greet", { name: "Oxide Desktop" });
				setGreeting(result);
				setError(null);
			} catch (err) {
				console.error("Failed to invoke greet command:", err);
				setError(err instanceof Error ? err.message : String(err));
			} finally {
				setLoading(false);
			}
		};
		greet();
	}, []);

	return (
		<div className="text-center p-4">
			<p className="text-xl font-bold">{greeting || "..."}</p>
			{loading && <p className="text-sm text-gray-500">Loading...</p>}
			{error && <p className="text-sm text-red-500">Error: {error}</p>}
		</div>
	);
}
