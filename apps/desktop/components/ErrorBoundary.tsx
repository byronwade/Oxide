"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Bug } from "lucide-react";

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ComponentType<{ error: Error | null; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
		this.setState({
			error,
			errorInfo,
		});
	}

	componentDidMount() {
		// Handle unhandled promise rejections
		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			console.error("Unhandled promise rejection:", event.reason);
			event.preventDefault();

			this.setState({
				hasError: true,
				error: new Error(event.reason?.message || "Unhandled promise rejection"),
				errorInfo: null,
			});
		};

		window.addEventListener("unhandledrejection", handleUnhandledRejection);

		// Cleanup
		return () => {
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}

	resetError = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				const FallbackComponent = this.props.fallback;
				return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
			}

			return (
				<div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4">
					<Card className="max-w-md w-full bg-zinc-900 border-zinc-800">
						<CardContent className="p-6 text-center">
							<div className="w-16 h-16 mx-auto mb-4 bg-red-900/20 rounded-full flex items-center justify-center">
								<AlertTriangle className="w-8 h-8 text-red-400" />
							</div>

							<h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
							<p className="text-zinc-400 mb-4">An error occurred while loading the application. This might be due to a network issue or a temporary problem.</p>

							<div className="space-y-2">
								<Button onClick={this.resetError} className="w-full bg-xbox-green hover:bg-xbox-green-light">
									<RefreshCw className="w-4 h-4 mr-2" />
									Try Again
								</Button>

								<Button onClick={() => window.location.reload()} variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800">
									Reload Page
								</Button>
							</div>

							{this.state.error && (
								<details className="mt-4 text-left">
									<summary className="cursor-pointer text-zinc-400 hover:text-white text-sm flex items-center gap-2">
										<Bug className="w-4 h-4" />
										Technical Details
									</summary>
									<pre className="mt-2 p-2 bg-zinc-800 rounded text-xs text-zinc-300 overflow-auto">
										{this.state.error.name}: {this.state.error.message}
										{this.state.error.stack && <div className="mt-2 text-zinc-500">{this.state.error.stack.split("\n").slice(0, 5).join("\n")}</div>}
									</pre>
								</details>
							)}
						</CardContent>
					</Card>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
