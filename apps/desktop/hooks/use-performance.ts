"use client";

import { useEffect, useRef, useState } from "react";
import { performanceMonitor } from "../lib/performance-monitor";

export interface PerformanceMetrics {
	renderTime: number;
	memoryUsage: number;
	reRenderCount: number;
	componentLifecycle: string;
	propsChanges: number;
	stateChanges: number;
	effectCount: number;
	errorBoundaryTriggers: number;
}

export function usePerformanceMonitor(componentName: string, route?: string) {
	const renderStartTime = useRef<number>(0);
	const renderCount = useRef<number>(0);
	const propsChanges = useRef<number>(0);
	const stateChanges = useRef<number>(0);
	const effectCount = useRef<number>(0);
	const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

	useEffect(() => {
		renderStartTime.current = performance.now();
		renderCount.current++;

		const currentRoute = route || (typeof window !== "undefined" ? window.location.pathname : "/");
		performanceMonitor.startMonitoring(`${currentRoute}:${componentName}`);

		return () => {
			const renderTime = performance.now() - renderStartTime.current;
			const memory = (performance as any).memory;

			const componentMetrics: PerformanceMetrics = {
				renderTime,
				memoryUsage: memory?.usedJSHeapSize || 0,
				reRenderCount: renderCount.current,
				componentLifecycle: "useEffect cleanup",
				propsChanges: propsChanges.current,
				stateChanges: stateChanges.current,
				effectCount: effectCount.current,
				errorBoundaryTriggers: 0,
			};

			setMetrics(componentMetrics);
			performanceMonitor.stopMonitoring(`${currentRoute}:${componentName}`);

			// Log component-specific metrics
			console.log(`🔧 Component Performance: ${componentName}`);
			console.log(`   Render Time: ${renderTime.toFixed(2)}ms`);
			console.log(`   Re-renders: ${renderCount.current}`);
			console.log(`   Memory: ${(componentMetrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`);
			console.log(`   Props Changes: ${propsChanges.current}`);
			console.log(`   State Changes: ${stateChanges.current}`);
			console.log(`   Effects: ${effectCount.current}`);
		};
	}, [componentName, route]);

	return {
		metrics,
		trackPropsChange: () => propsChanges.current++,
		trackStateChange: () => stateChanges.current++,
		trackEffect: () => effectCount.current++,
	};
}

export function useRenderPerformance(componentName: string) {
	const renderTimes = useRef<number[]>([]);
	const lastRenderTime = useRef<number>(0);

	useEffect(() => {
		const startTime = performance.now();

		return () => {
			const renderTime = performance.now() - startTime;
			renderTimes.current.push(renderTime);
			lastRenderTime.current = renderTime;

			// Log if render time is above threshold
			if (renderTime > 16.67) {
				// 60fps = 16.67ms per frame
				console.warn(`⚠️ Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
			}

			// Keep only last 100 render times
			if (renderTimes.current.length > 100) {
				renderTimes.current = renderTimes.current.slice(-100);
			}
		};
	});

	return {
		lastRenderTime: lastRenderTime.current,
		averageRenderTime: renderTimes.current.length > 0 ? renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length : 0,
		renderCount: renderTimes.current.length,
	};
}

export function useMemoryMonitor(componentName: string, interval: number = 5000) {
	const [memoryUsage, setMemoryUsage] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const checkMemory = () => {
			const memory = (performance as any).memory;
			if (memory) {
				const usage = memory.usedJSHeapSize;
				setMemoryUsage(usage);

				// Log memory usage if it's high
				const usageMB = usage / 1024 / 1024;
				if (usageMB > 100) {
					console.warn(`🧠 High memory usage detected: ${componentName} - ${usageMB.toFixed(2)}MB`);
				}
			}
		};

		checkMemory();
		intervalRef.current = setInterval(checkMemory, interval);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [componentName, interval]);

	return memoryUsage;
}

export function useNetworkMonitor() {
	const [networkRequests, setNetworkRequests] = useState<Map<string, number>>(new Map());
	const [pendingRequests, setPendingRequests] = useState<Set<string>>(new Set());

	useEffect(() => {
		const originalFetch = window.fetch;

		window.fetch = async (...args) => {
			const url = args[0]?.toString() || "unknown";
			const startTime = performance.now();

			setPendingRequests((prev) => new Set(prev).add(url));

			try {
				const response = await originalFetch(...args);
				const endTime = performance.now();
				const duration = endTime - startTime;

				setNetworkRequests((prev) => new Map(prev).set(url, duration));
				setPendingRequests((prev) => {
					const newSet = new Set(prev);
					newSet.delete(url);
					return newSet;
				});

				// Log slow requests
				if (duration > 1000) {
					console.warn(`🌐 Slow network request: ${url} took ${duration.toFixed(2)}ms`);
				}

				return response;
			} catch (error) {
				setPendingRequests((prev) => {
					const newSet = new Set(prev);
					newSet.delete(url);
					return newSet;
				});
				console.error(`❌ Network request failed: ${url}`, error);
				throw error;
			}
		};

		return () => {
			window.fetch = originalFetch;
		};
	}, []);

	return {
		networkRequests,
		pendingRequests,
		totalRequests: networkRequests.size,
		averageRequestTime: networkRequests.size > 0 ? Array.from(networkRequests.values()).reduce((a, b) => a + b, 0) / networkRequests.size : 0,
	};
}

export function useErrorMonitor(componentName: string) {
	const [errors, setErrors] = useState<Error[]>([]);
	const errorCount = useRef<number>(0);

	useEffect(() => {
		const handleError = (event: ErrorEvent) => {
			const error = new Error(event.message);
			error.stack = event.error?.stack;

			setErrors((prev) => [...prev, error]);
			errorCount.current++;

			console.error(`❌ Error in ${componentName}:`, error);
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			const error = new Error(`Unhandled promise rejection: ${event.reason}`);
			setErrors((prev) => [...prev, error]);
			errorCount.current++;

			console.error(`❌ Unhandled rejection in ${componentName}:`, event.reason);
		};

		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleUnhandledRejection);

		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}, [componentName]);

	return {
		errors,
		errorCount: errorCount.current,
		clearErrors: () => setErrors([]),
	};
}

export function useUserInteractionMonitor() {
	const [interactions, setInteractions] = useState<Map<string, number>>(new Map());
	const [slowInteractions, setSlowInteractions] = useState<string[]>([]);

	useEffect(() => {
		const trackInteraction = (eventType: string) => (event: Event) => {
			const startTime = performance.now();

			// Track interaction response time
			requestAnimationFrame(() => {
				const responseTime = performance.now() - startTime;
				setInteractions((prev) => new Map(prev).set(eventType, responseTime));

				// Log slow interactions
				if (responseTime > 50) {
					console.warn(`👆 Slow interaction: ${eventType} took ${responseTime.toFixed(2)}ms`);
					setSlowInteractions((prev) => [...prev, `${eventType}: ${responseTime.toFixed(2)}ms`]);
				}
			});
		};

		const events = ["click", "scroll", "keydown", "mousemove"];
		const listeners = events.map((event) => {
			const listener = trackInteraction(event);
			document.addEventListener(event, listener, { passive: true });
			return { event, listener };
		});

		return () => {
			listeners.forEach(({ event, listener }) => {
				document.removeEventListener(event, listener);
			});
		};
	}, []);

	return {
		interactions,
		slowInteractions,
		averageInteractionTime: interactions.size > 0 ? Array.from(interactions.values()).reduce((a, b) => a + b, 0) / interactions.size : 0,
	};
}

export function useComponentProfiler<T extends object>(Component: React.ComponentType<T>, componentName: string) {
	return function ProfiledComponent(props: T) {
		const performance = usePerformanceMonitor(componentName);
		const renderPerf = useRenderPerformance(componentName);
		const memoryUsage = useMemoryMonitor(componentName);
		const errorMonitor = useErrorMonitor(componentName);

		useEffect(() => {
			console.log(`🔍 Component Profile: ${componentName}`);
			console.log(`   Last Render: ${renderPerf.lastRenderTime.toFixed(2)}ms`);
			console.log(`   Average Render: ${renderPerf.averageRenderTime.toFixed(2)}ms`);
			console.log(`   Memory Usage: ${(memoryUsage / 1024 / 1024).toFixed(2)}MB`);
			console.log(`   Error Count: ${errorMonitor.errorCount}`);
		}, [renderPerf.lastRenderTime, memoryUsage, errorMonitor.errorCount]);

		return <Component {...props} />;
	};
}

export function withPerformanceProfiler<T extends object>(Component: React.ComponentType<T>, componentName: string) {
	return useComponentProfiler(Component, componentName);
}
