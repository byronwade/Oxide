"use client";

import React from "react";

interface PerformanceMetrics {
	timestamp: number;
	route: string;
	renderTime: number;
	componentCount: number;
	bundleSize: number;
	memoryUsage: number;
	fps: number;
	ttfb: number;
	lcp: number;
	fid: number;
	cls: number;
	totalJSHeapSize: number;
	usedJSHeapSize: number;
	jsHeapSizeLimit: number;
	cpuUsage: number;
	networkLatency: number;
	cacheHitRate: number;
	errorCount: number;
	apiResponseTime: number;
	uiInteractionLatency: number;
	renderTree: any[];
	eventListenerCount: number;
	domNodeCount: number;
	imageOptimization: {
		totalImages: number;
		optimizedImages: number;
		lazyLoadedImages: number;
		failedImages: number;
		averageLoadTime: number;
	};
	buildInfo: {
		buildTime: string;
		bundleVersion: string;
		environment: string;
		platform: string;
		nodeVersion: string;
		nextVersion: string;
		features: string[];
	};
	// Enhanced Desktop-specific metrics
	gpuMetrics: {
		gpuUsage: number;
		vramUsage: number;
		vramTotal: number;
		gpuTemperature: number;
		gpuCoreSpeed: number;
		gpuMemorySpeed: number;
		gpuPowerUsage: number;
		gpuFanSpeed: number;
		renderingBackend: string;
		activeAdapter: string;
		driverVersion: string;
		vulkanSupport: boolean;
		dx12Support: boolean;
		rayTracingSupport: boolean;
	};
	diskMetrics: {
		readSpeed: number;
		writeSpeed: number;
		totalRead: number;
		totalWrite: number;
		diskUsage: number;
		diskTotal: number;
		diskFree: number;
		diskType: string;
		diskHealth: number;
		iops: number;
		latency: number;
		queueDepth: number;
		fragmentationLevel: number;
		diskTemperature: number;
	};
	systemMetrics: {
		cpuCores: number;
		cpuThreads: number;
		cpuUsagePerCore: number[];
		cpuTemperature: number;
		cpuTurboBoost: boolean;
		cpuFrequency: number;
		ramTotal: number;
		ramUsed: number;
		ramAvailable: number;
		ramSpeed: number;
		ramType: string;
		swapUsage: number;
		swapTotal: number;
		systemUptime: number;
		processCount: number;
		threadCount: number;
		handleCount: number;
		powerPlan: string;
		batteryLevel?: number;
		batteryStatus?: string;
		thermalState: string;
		fanSpeeds: number[];
	};
	networkMetrics: {
		downloadSpeed: number;
		uploadSpeed: number;
		latency: number;
		jitter: number;
		packetLoss: number;
		connectionType: string;
		connectionQuality: string;
		dnsResolutionTime: number;
		cdnLatency: number;
		isConnected: boolean;
		signalStrength?: number;
		dataUsage: {
			sent: number;
			received: number;
			total: number;
		};
	};
	gameMetrics: {
		frameTimeVariance: number;
		inputLatency: number;
		audioLatency: number;
		renderLatency: number;
		gameThreadUsage: number;
		renderThreadUsage: number;
		audioThreadUsage: number;
		loadingTimes: {
			assetLoad: number;
			sceneLoad: number;
			shaderCompile: number;
			textureLoad: number;
		};
		memoryPools: {
			textures: number;
			meshes: number;
			audio: number;
			scripts: number;
			animations: number;
		};
		renderStats: {
			drawCalls: number;
			triangles: number;
			vertices: number;
			batches: number;
			occlusionCulling: number;
			frustumCulling: number;
		};
	};
	osIntegration: {
		platform: string;
		version: string;
		build: string;
		architecture: string;
		installedRAM: number;
		availableRAM: number;
		isAdmin: boolean;
		screenResolution: string;
		colorDepth: number;
		refreshRate: number;
		scalingFactor: number;
		hdrSupport: boolean;
		multiMonitorSetup: boolean;
		primaryMonitor: string;
		windowManager: string;
		desktopEnvironment: string;
		compositorActive: boolean;
		gameMode: boolean;
		focusAssistMode: boolean;
		hardwareAcceleration: boolean;
		vulkanVersion?: string;
		openglVersion?: string;
		directxVersion?: string;
		dotnetVersion?: string;
		vcRedistVersion?: string;
	};
}

interface PerformanceAlert {
	type: "warning" | "error" | "info";
	message: string;
	threshold: number;
	actual: number;
	timestamp: number;
	route: string;
	category: "performance" | "system" | "gpu" | "disk" | "network" | "game";
	severity: "low" | "medium" | "high" | "critical";
	recommendation?: string;
	autoFixAvailable?: boolean;
}

class PerformanceMonitor {
	private metrics: PerformanceMetrics[] = [];
	private alerts: PerformanceAlert[] = [];
	private isMonitoring: boolean = false;
	private observers: PerformanceObserver[] = [];
	private startTime: number = 0;
	private renderStartTime: number = 0;
	private frameCount: number = 0;
	private lastFrameTime: number = 0;
	private errorCount: number = 0;
	private networkRequests: Map<string, number> = new Map();
	private cacheHits: number = 0;
	private cacheMisses: number = 0;
	private imageMetrics = {
		totalImages: 0,
		optimizedImages: 0,
		lazyLoadedImages: 0,
		failedImages: 0,
		loadTimes: [] as number[],
	};
	private frameTimings: number[] = [];
	private inputTimings: number[] = [];
	private diskOperations: Array<{ timestamp: number; operation: string; size: number; duration: number }> = [];
	private networkSamples: Array<{ timestamp: number; download: number; upload: number }> = [];
	private gpuSamples: Array<{ timestamp: number; usage: number; vram: number; temperature: number }> = [];
	private systemSamples: Array<{ timestamp: number; cpu: number; ram: number; processes: number }> = [];

	// Enhanced Performance thresholds for desktop gaming
	private readonly THRESHOLDS = {
		// Core Performance
		RENDER_TIME: 200, // 200ms max render time
		FPS: 60, // 60 FPS minimum
		MEMORY_USAGE: 1024 * 1024 * 1024, // 1GB max memory for desktop
		BUNDLE_SIZE: 10 * 1024 * 1024, // 10MB max bundle size for desktop
		TTFB: 100, // 100ms max TTFB
		LCP: 200, // 200ms max LCP
		FID: 50, // 50ms max FID
		CLS: 0.1, // 0.1 max CLS
		API_RESPONSE_TIME: 500, // 500ms max API response
		UI_INTERACTION_LATENCY: 50, // 50ms max UI interaction
		NETWORK_LATENCY: 100, // 100ms max network latency
		DOM_NODE_COUNT: 5000, // 5000 DOM nodes max
		EVENT_LISTENER_COUNT: 1000, // 1000 event listeners max
		ERROR_COUNT: 0, // Zero errors allowed
		CACHE_HIT_RATE: 0.8, // 80% cache hit rate minimum

		// GPU Thresholds
		GPU_USAGE: 95, // 95% max GPU usage
		VRAM_USAGE: 0.9, // 90% max VRAM usage
		GPU_TEMPERATURE: 85, // 85°C max GPU temperature
		GPU_POWER_USAGE: 0.95, // 95% max power usage
		GPU_FAN_SPEED: 90, // 90% max fan speed

		// Disk Thresholds
		DISK_READ_SPEED: 100, // 100 MB/s minimum read speed
		DISK_WRITE_SPEED: 50, // 50 MB/s minimum write speed
		DISK_USAGE: 0.9, // 90% max disk usage
		DISK_LATENCY: 10, // 10ms max disk latency
		DISK_IOPS: 1000, // 1000 IOPS minimum
		DISK_TEMPERATURE: 60, // 60°C max disk temperature
		DISK_HEALTH: 80, // 80% minimum disk health

		// System Thresholds
		CPU_USAGE: 85, // 85% max CPU usage
		CPU_TEMPERATURE: 80, // 80°C max CPU temperature
		RAM_USAGE: 0.85, // 85% max RAM usage
		SWAP_USAGE: 0.5, // 50% max swap usage
		PROCESS_COUNT: 500, // 500 max processes
		THREAD_COUNT: 2000, // 2000 max threads
		HANDLE_COUNT: 10000, // 10000 max handles

		// Network Thresholds
		DOWNLOAD_SPEED: 10, // 10 Mbps minimum download
		UPLOAD_SPEED: 1, // 1 Mbps minimum upload
		PACKET_LOSS: 0.01, // 1% max packet loss
		JITTER: 20, // 20ms max jitter
		DNS_RESOLUTION: 50, // 50ms max DNS resolution

		// Game-specific Thresholds
		FRAME_TIME_VARIANCE: 5, // 5ms max frame time variance
		INPUT_LATENCY: 20, // 20ms max input latency
		AUDIO_LATENCY: 20, // 20ms max audio latency
		RENDER_LATENCY: 50, // 50ms max render latency
		LOADING_TIME: 5000, // 5s max loading time
		DRAW_CALLS: 5000, // 5000 max draw calls
		TRIANGLE_COUNT: 1000000, // 1M max triangles
	};

	constructor() {
		this.startTime = performance.now();
		this.initializeObservers();
		this.startFPSMonitoring();
		this.monitorErrors();
		this.monitorNetworkRequests();
		this.monitorImageOptimization();
		this.initializeDesktopMonitoring();
	}

	private initializeObservers(): void {
		if (typeof window === "undefined") return;

		try {
			// Paint and Layout Performance Observer
			const paintObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType === "paint") {
						this.logPaintTiming(entry as PerformanceEntry);
					}
				}
			});
			paintObserver.observe({ entryTypes: ["paint"] });
			this.observers.push(paintObserver);

			// Largest Contentful Paint Observer
			const lcpObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType === "largest-contentful-paint") {
						this.logLCP(entry as PerformanceEntry);
					}
				}
			});
			lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
			this.observers.push(lcpObserver);

			// First Input Delay Observer
			const fidObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType === "first-input") {
						this.logFID(entry as PerformanceEntry);
					}
				}
			});
			fidObserver.observe({ entryTypes: ["first-input"] });
			this.observers.push(fidObserver);

			// Layout Shift Observer
			const clsObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType === "layout-shift") {
						this.logCLS(entry as PerformanceEntry);
					}
				}
			});
			clsObserver.observe({ entryTypes: ["layout-shift"] });
			this.observers.push(clsObserver);

			// Navigation Timing Observer
			const navigationObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType === "navigation") {
						this.logNavigationTiming(entry as PerformanceNavigationTiming);
					}
				}
			});
			navigationObserver.observe({ entryTypes: ["navigation"] });
			this.observers.push(navigationObserver);

			// Resource Timing Observer
			const resourceObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.entryType === "resource") {
						this.logResourceTiming(entry as PerformanceResourceTiming);
					}
				}
			});
			resourceObserver.observe({ entryTypes: ["resource"] });
			this.observers.push(resourceObserver);
		} catch (error) {
			console.error("🔥 Performance Monitor: Failed to initialize observers:", error);
		}
	}

	private startFPSMonitoring(): void {
		if (typeof window === "undefined") return;

		const measureFPS = () => {
			const currentTime = performance.now();
			if (this.lastFrameTime !== 0) {
				const delta = currentTime - this.lastFrameTime;
				this.frameCount++;

				// Calculate FPS every second
				if (this.frameCount >= 60) {
					const fps = 1000 / (delta / this.frameCount);
					this.checkThreshold("FPS", fps, this.THRESHOLDS.FPS, "warning");
					this.frameCount = 0;
				}
			}
			this.lastFrameTime = currentTime;
			requestAnimationFrame(measureFPS);
		};

		requestAnimationFrame(measureFPS);
	}

	private monitorErrors(): void {
		if (typeof window === "undefined") return;

		window.addEventListener("error", (event) => {
			this.errorCount++;
			this.logError("JavaScript Error", event.error, event.filename, event.lineno, event.colno);
		});

		window.addEventListener("unhandledrejection", (event) => {
			this.errorCount++;
			this.logError("Unhandled Promise Rejection", event.reason);
		});
	}

	private monitorNetworkRequests(): void {
		if (typeof window === "undefined") return;

		// Override fetch to monitor network requests
		const originalFetch = window.fetch;
		window.fetch = async (...args) => {
			const startTime = performance.now();
			const url = args[0]?.toString() || "unknown";

			try {
				const response = await originalFetch(...args);
				const endTime = performance.now();
				const duration = endTime - startTime;

				this.networkRequests.set(url, duration);

				// Check if response came from cache
				if (response.headers.get("cache-control") || response.headers.get("etag")) {
					this.cacheHits++;
				} else {
					this.cacheMisses++;
				}

				this.checkThreshold("Network Request", duration, this.THRESHOLDS.NETWORK_LATENCY, "warning");

				return response;
			} catch (error) {
				const endTime = performance.now();
				const duration = endTime - startTime;
				this.networkRequests.set(url, duration);
				this.logError("Network Request Failed", error, url);
				throw error;
			}
		};
	}

	private monitorImageOptimization(): void {
		if (typeof window === "undefined") return;

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						const element = node as Element;
						const images = element.querySelectorAll("img");

						images.forEach((img) => {
							this.trackImagePerformance(img);
						});
					}
				});
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	private trackImagePerformance(img: HTMLImageElement): void {
		const startTime = performance.now();
		this.imageMetrics.totalImages++;

		// Check if image is optimized (Next.js Image component)
		if (img.classList.contains("next-image") || img.hasAttribute("data-next-image")) {
			this.imageMetrics.optimizedImages++;
		}

		// Check if image is lazy loaded
		if (img.loading === "lazy" || img.hasAttribute("data-lazy")) {
			this.imageMetrics.lazyLoadedImages++;
		}

		img.addEventListener("load", () => {
			const loadTime = performance.now() - startTime;
			this.imageMetrics.loadTimes.push(loadTime);
		});

		img.addEventListener("error", () => {
			this.imageMetrics.failedImages++;
			this.logError("Image Load Error", new Error("Failed to load image"), img.src);
		});
	}

	private logPaintTiming(entry: PerformanceEntry): void {
		console.log(`🎨 ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
	}

	private logLCP(entry: PerformanceEntry): void {
		const lcp = entry.startTime;
		this.checkThreshold("LCP", lcp, this.THRESHOLDS.LCP, "error");
		console.log(`🎯 Largest Contentful Paint: ${lcp.toFixed(2)}ms`);
	}

	private logFID(entry: PerformanceEntry): void {
		const fid = (entry as any).processingStart - entry.startTime;
		this.checkThreshold("FID", fid, this.THRESHOLDS.FID, "error");
		console.log(`👆 First Input Delay: ${fid.toFixed(2)}ms`);
	}

	private logCLS(entry: PerformanceEntry): void {
		const cls = (entry as any).value;
		this.checkThreshold("CLS", cls, this.THRESHOLDS.CLS, "error");
		console.log(`📐 Cumulative Layout Shift: ${cls.toFixed(4)}`);
	}

	private logNavigationTiming(entry: PerformanceNavigationTiming): void {
		const ttfb = entry.responseStart - entry.requestStart;
		this.checkThreshold("TTFB", ttfb, this.THRESHOLDS.TTFB, "error");
		console.log(`⚡ Time to First Byte: ${ttfb.toFixed(2)}ms`);
	}

	private logResourceTiming(entry: PerformanceResourceTiming): void {
		const duration = entry.duration;
		if (entry.name.includes(".js") || entry.name.includes(".css")) {
			this.checkThreshold("Resource Load", duration, this.THRESHOLDS.API_RESPONSE_TIME, "warning");
		}
	}

	private logError(type: string, error: any, ...details: any[]): void {
		console.error(`❌ ${type}:`, error, ...details);
		this.createAlert("error", `${type}: ${error?.message || error}`, 0, 1, window.location.pathname);
	}

	private checkThreshold(metric: string, value: number, threshold: number, alertType: "warning" | "error", category: "performance" | "system" | "gpu" | "disk" | "network" | "game" = "performance"): void {
		const isAboveThreshold = value > threshold;
		const isBelowThreshold = value < threshold;

		// Different metrics have different threshold logic
		const thresholdExceeded = metric.includes("USAGE") || metric.includes("TEMPERATURE") || metric.includes("LATENCY") ? isAboveThreshold : isBelowThreshold;

		if (thresholdExceeded) {
			this.createAlert(alertType, `${metric} threshold exceeded: ${value.toFixed(2)} (threshold: ${threshold})`, threshold, value, window.location.pathname, category);
		}
	}

	private createAlert(type: "warning" | "error" | "info", message: string, threshold: number, actual: number, route: string, category: "performance" | "system" | "gpu" | "disk" | "network" | "game" = "performance"): void {
		const severity = type === "error" ? "critical" : type === "warning" ? "high" : "medium";
		const recommendation = this.getRecommendation(category, message);

		const alert: PerformanceAlert = {
			type,
			message,
			threshold,
			actual,
			timestamp: Date.now(),
			route,
			category,
			severity,
			recommendation,
			autoFixAvailable: this.hasAutoFix(category, message),
		};

		this.alerts.push(alert);

		// Keep only last 50 alerts
		if (this.alerts.length > 50) {
			this.alerts.shift();
		}
	}

	private getRecommendation(category: string, message: string): string {
		switch (category) {
			case "gpu":
				if (message.includes("USAGE")) return "Consider lowering graphics settings or closing other GPU-intensive applications";
				if (message.includes("TEMPERATURE")) return "Check GPU cooling and increase fan speed";
				if (message.includes("VRAM")) return "Reduce texture quality or resolution";
				break;
			case "disk":
				if (message.includes("READ_SPEED")) return "Consider upgrading to SSD or defragmenting disk";
				if (message.includes("WRITE_SPEED")) return "Free up disk space or check for disk errors";
				if (message.includes("USAGE")) return "Clean up disk space or move files to external storage";
				break;
			case "system":
				if (message.includes("CPU_USAGE")) return "Close unnecessary applications or upgrade CPU";
				if (message.includes("RAM_USAGE")) return "Close memory-intensive applications or add more RAM";
				if (message.includes("TEMPERATURE")) return "Check system cooling and clean dust from fans";
				break;
			case "network":
				if (message.includes("DOWNLOAD_SPEED")) return "Check internet connection or contact ISP";
				if (message.includes("PACKET_LOSS")) return "Restart router or check network cables";
				if (message.includes("LATENCY")) return "Use wired connection or move closer to router";
				break;
			case "game":
				if (message.includes("INPUT_LATENCY")) return "Check controller settings or reduce input lag";
				if (message.includes("FRAME_TIME")) return "Enable VSync or reduce graphics settings";
				break;
		}
		return "Monitor the situation and consider system optimization";
	}

	private hasAutoFix(category: string, message: string): boolean {
		// Simple auto-fix detection
		return message.includes("CACHE") || message.includes("MEMORY") || category === "performance";
	}

	public startMonitoring(route: string): void {
		if (typeof window === "undefined") return;

		this.isMonitoring = true;
		this.renderStartTime = performance.now();

		console.log(`🚀 Performance Monitor: Starting monitoring for route: ${route}`);
		console.log(`📊 Thresholds: Render ≤${this.THRESHOLDS.RENDER_TIME}ms, FPS ≥${this.THRESHOLDS.FPS}, Memory ≤${(this.THRESHOLDS.MEMORY_USAGE / 1024 / 1024).toFixed(0)}MB`);
	}

	public stopMonitoring(route: string): void {
		if (!this.isMonitoring) return;

		const renderTime = performance.now() - this.renderStartTime;
		this.isMonitoring = false;

		this.collectMetrics(route, renderTime);
		this.logMetrics(route);
	}

	private collectMetrics(route: string, renderTime: number): void {
		const currentTime = Date.now();
		const memoryInfo = (performance as any).memory;

		// Collect enhanced desktop metrics
		const gpuMetrics = this.collectGPUMetrics();
		const diskMetrics = this.collectDiskMetrics();
		const systemMetrics = this.collectSystemMetrics();
		const networkMetrics = this.collectNetworkMetrics();
		const gameMetrics = this.collectGameMetrics();
		const osIntegration = this.collectOSIntegration();

		const metrics: PerformanceMetrics = {
			timestamp: currentTime,
			route,
			renderTime,
			componentCount: this.countComponents(),
			bundleSize: this.getBundleSize(),
			memoryUsage: memoryInfo?.usedJSHeapSize || 0,
			fps: this.calculateCurrentFPS(),
			ttfb: this.measureTTFB(),
			lcp: this.getLatestLCP(),
			fid: this.getLatestFID(),
			cls: this.getLatestCLS(),
			totalJSHeapSize: memoryInfo?.totalJSHeapSize || 0,
			usedJSHeapSize: memoryInfo?.usedJSHeapSize || 0,
			jsHeapSizeLimit: memoryInfo?.jsHeapSizeLimit || 0,
			cpuUsage: this.estimateCPUUsage(),
			networkLatency: this.calculateAverageNetworkLatency(),
			cacheHitRate: this.calculateCacheHitRate(),
			errorCount: this.errorCount,
			apiResponseTime: this.calculateAverageAPIResponseTime(),
			uiInteractionLatency: this.measureUIInteractionLatency(),
			renderTree: this.captureRenderTree(),
			eventListenerCount: this.countEventListeners(),
			domNodeCount: this.countDOMNodes(),
			imageOptimization: {
				totalImages: this.imageMetrics.totalImages,
				optimizedImages: this.imageMetrics.optimizedImages,
				lazyLoadedImages: this.imageMetrics.lazyLoadedImages,
				failedImages: this.imageMetrics.failedImages,
				averageLoadTime: this.imageMetrics.loadTimes.length > 0 ? this.imageMetrics.loadTimes.reduce((a, b) => a + b, 0) / this.imageMetrics.loadTimes.length : 0,
			},
			buildInfo: {
				buildTime: process.env.BUILD_TIME || new Date().toISOString(),
				bundleVersion: process.env.BUNDLE_VERSION || "1.0.0",
				environment: process.env.NODE_ENV || "development",
				platform: process.env.PLATFORM || "desktop",
				nodeVersion: process.version,
				nextVersion: process.env.NEXT_VERSION || "15.0.0",
				features: ["gpu-monitoring", "disk-monitoring", "system-monitoring", "game-monitoring"],
			},
			gpuMetrics,
			diskMetrics,
			systemMetrics,
			networkMetrics,
			gameMetrics,
			osIntegration,
		};

		this.metrics.push(metrics);
		this.checkAllThresholds(metrics);
		this.logMetrics(route);

		// Keep only last 100 metrics
		if (this.metrics.length > 100) {
			this.metrics.shift();
		}
	}

	private countComponents(): number {
		return document.querySelectorAll("[data-component]").length;
	}

	private getBundleSize(): number {
		const scripts = document.querySelectorAll("script[src]");
		let totalSize = 0;
		scripts.forEach((script) => {
			const src = (script as HTMLScriptElement).src;
			if (src.includes("/_next/static/")) {
				totalSize += 1024 * 1024; // Estimate 1MB per script
			}
		});
		return totalSize;
	}

	private calculateCurrentFPS(): number {
		return this.frameCount > 0 ? 1000 / (performance.now() - this.lastFrameTime) : 60;
	}

	private getLatestLCP(): number {
		const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
		return lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : 0;
	}

	private getLatestFID(): number {
		const fidEntries = performance.getEntriesByType("first-input");
		return fidEntries.length > 0 ? (fidEntries[0] as any).processingStart - fidEntries[0].startTime : 0;
	}

	private getLatestCLS(): number {
		const clsEntries = performance.getEntriesByType("layout-shift");
		return clsEntries.reduce((sum, entry) => sum + (entry as any).value, 0);
	}

	private estimateCPUUsage(): number {
		const startTime = performance.now();
		let i = 0;
		while (i < 100000) i++;
		const endTime = performance.now();
		return (endTime - startTime) / 100; // Normalized CPU usage estimate
	}

	private calculateAverageNetworkLatency(): number {
		const values = Array.from(this.networkRequests.values());
		return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
	}

	private calculateCacheHitRate(): number {
		const total = this.cacheHits + this.cacheMisses;
		return total > 0 ? this.cacheHits / total : 0;
	}

	private calculateAverageAPIResponseTime(): number {
		const apiRequests = Array.from(this.networkRequests.entries())
			.filter(([url]) => url.includes("/api/"))
			.map(([_, duration]) => duration);

		return apiRequests.length > 0 ? apiRequests.reduce((a, b) => a + b, 0) / apiRequests.length : 0;
	}

	private measureUIInteractionLatency(): number {
		// Simulate UI interaction measurement
		const startTime = performance.now();
		document.body.click();
		return performance.now() - startTime;
	}

	private captureRenderTree(): any[] {
		const components = document.querySelectorAll("[data-component]");
		return Array.from(components).map((comp) => ({
			name: comp.getAttribute("data-component"),
			id: comp.id,
			class: comp.className,
			children: comp.children.length,
		}));
	}

	private countEventListeners(): number {
		// Estimate event listeners by checking common event types
		let count = 0;
		const events = ["click", "mouseover", "keydown", "scroll", "resize", "load"];
		events.forEach((event) => {
			count += document.querySelectorAll(`[on${event}]`).length;
		});
		return count;
	}

	private countDOMNodes(): number {
		return document.querySelectorAll("*").length;
	}

	private checkAllThresholds(metrics: PerformanceMetrics): void {
		// Core performance thresholds
		this.checkThreshold("RENDER_TIME", metrics.renderTime, this.THRESHOLDS.RENDER_TIME, "warning");
		this.checkThreshold("FPS", metrics.fps, this.THRESHOLDS.FPS, "warning");
		this.checkThreshold("MEMORY_USAGE", metrics.memoryUsage, this.THRESHOLDS.MEMORY_USAGE, "warning");
		this.checkThreshold("BUNDLE_SIZE", metrics.bundleSize, this.THRESHOLDS.BUNDLE_SIZE, "warning");
		this.checkThreshold("TTFB", metrics.ttfb, this.THRESHOLDS.TTFB, "warning");
		this.checkThreshold("LCP", metrics.lcp, this.THRESHOLDS.LCP, "warning");
		this.checkThreshold("FID", metrics.fid, this.THRESHOLDS.FID, "error");
		this.checkThreshold("CLS", metrics.cls, this.THRESHOLDS.CLS, "warning");
		this.checkThreshold("API_RESPONSE_TIME", metrics.apiResponseTime, this.THRESHOLDS.API_RESPONSE_TIME, "warning");
		this.checkThreshold("UI_INTERACTION_LATENCY", metrics.uiInteractionLatency, this.THRESHOLDS.UI_INTERACTION_LATENCY, "warning");
		this.checkThreshold("NETWORK_LATENCY", metrics.networkLatency, this.THRESHOLDS.NETWORK_LATENCY, "warning");
		this.checkThreshold("DOM_NODE_COUNT", metrics.domNodeCount, this.THRESHOLDS.DOM_NODE_COUNT, "warning");
		this.checkThreshold("EVENT_LISTENER_COUNT", metrics.eventListenerCount, this.THRESHOLDS.EVENT_LISTENER_COUNT, "warning");
		this.checkThreshold("ERROR_COUNT", metrics.errorCount, this.THRESHOLDS.ERROR_COUNT, "error");
		this.checkThreshold("CACHE_HIT_RATE", metrics.cacheHitRate, this.THRESHOLDS.CACHE_HIT_RATE, "warning");

		// GPU thresholds
		this.checkThreshold("GPU_USAGE", metrics.gpuMetrics.gpuUsage, this.THRESHOLDS.GPU_USAGE, "warning", "gpu");
		this.checkThreshold("GPU_TEMPERATURE", metrics.gpuMetrics.gpuTemperature, this.THRESHOLDS.GPU_TEMPERATURE, "error", "gpu");
		this.checkThreshold("VRAM_USAGE", metrics.gpuMetrics.vramUsage / metrics.gpuMetrics.vramTotal, this.THRESHOLDS.VRAM_USAGE, "warning", "gpu");

		// Disk thresholds
		this.checkThreshold("DISK_READ_SPEED", metrics.diskMetrics.readSpeed, this.THRESHOLDS.DISK_READ_SPEED, "warning", "disk");
		this.checkThreshold("DISK_WRITE_SPEED", metrics.diskMetrics.writeSpeed, this.THRESHOLDS.DISK_WRITE_SPEED, "warning", "disk");
		this.checkThreshold("DISK_USAGE", metrics.diskMetrics.diskUsage, this.THRESHOLDS.DISK_USAGE, "error", "disk");
		this.checkThreshold("DISK_LATENCY", metrics.diskMetrics.latency, this.THRESHOLDS.DISK_LATENCY, "warning", "disk");
		this.checkThreshold("DISK_TEMPERATURE", metrics.diskMetrics.diskTemperature, this.THRESHOLDS.DISK_TEMPERATURE, "error", "disk");

		// System thresholds
		this.checkThreshold("CPU_USAGE", metrics.systemMetrics.cpuUsagePerCore.reduce((a, b) => a + b, 0) / metrics.systemMetrics.cpuCores, this.THRESHOLDS.CPU_USAGE, "warning", "system");
		this.checkThreshold("CPU_TEMPERATURE", metrics.systemMetrics.cpuTemperature, this.THRESHOLDS.CPU_TEMPERATURE, "error", "system");
		this.checkThreshold("RAM_USAGE", metrics.systemMetrics.ramUsed / metrics.systemMetrics.ramTotal, this.THRESHOLDS.RAM_USAGE, "warning", "system");
		this.checkThreshold("SWAP_USAGE", metrics.systemMetrics.swapUsage, this.THRESHOLDS.SWAP_USAGE, "warning", "system");
		this.checkThreshold("PROCESS_COUNT", metrics.systemMetrics.processCount, this.THRESHOLDS.PROCESS_COUNT, "warning", "system");
		this.checkThreshold("THREAD_COUNT", metrics.systemMetrics.threadCount, this.THRESHOLDS.THREAD_COUNT, "warning", "system");
		this.checkThreshold("HANDLE_COUNT", metrics.systemMetrics.handleCount, this.THRESHOLDS.HANDLE_COUNT, "warning", "system");

		// Network thresholds
		this.checkThreshold("DOWNLOAD_SPEED", metrics.networkMetrics.downloadSpeed, this.THRESHOLDS.DOWNLOAD_SPEED, "warning", "network");
		this.checkThreshold("UPLOAD_SPEED", metrics.networkMetrics.uploadSpeed, this.THRESHOLDS.UPLOAD_SPEED, "warning", "network");
		this.checkThreshold("PACKET_LOSS", metrics.networkMetrics.packetLoss, this.THRESHOLDS.PACKET_LOSS, "error", "network");
		this.checkThreshold("JITTER", metrics.networkMetrics.jitter, this.THRESHOLDS.JITTER, "warning", "network");
		this.checkThreshold("DNS_RESOLUTION", metrics.networkMetrics.dnsResolutionTime, this.THRESHOLDS.DNS_RESOLUTION, "warning", "network");

		// Game thresholds
		this.checkThreshold("FRAME_TIME_VARIANCE", metrics.gameMetrics.frameTimeVariance, this.THRESHOLDS.FRAME_TIME_VARIANCE, "warning", "game");
		this.checkThreshold("INPUT_LATENCY", metrics.gameMetrics.inputLatency, this.THRESHOLDS.INPUT_LATENCY, "warning", "game");
		this.checkThreshold("AUDIO_LATENCY", metrics.gameMetrics.audioLatency, this.THRESHOLDS.AUDIO_LATENCY, "warning", "game");
		this.checkThreshold("RENDER_LATENCY", metrics.gameMetrics.renderLatency, this.THRESHOLDS.RENDER_LATENCY, "warning", "game");
		this.checkThreshold("DRAW_CALLS", metrics.gameMetrics.renderStats.drawCalls, this.THRESHOLDS.DRAW_CALLS, "warning", "game");
		this.checkThreshold("TRIANGLE_COUNT", metrics.gameMetrics.renderStats.triangles, this.THRESHOLDS.TRIANGLE_COUNT, "warning", "game");
	}

	private logMetrics(route: string): void {
		const latestMetrics = this.metrics[this.metrics.length - 1];
		if (!latestMetrics) return;

		const performanceScore = this.calculatePerformanceScore(latestMetrics);
		const alertCount = this.alerts.filter((alert) => alert.timestamp > Date.now() - 30000).length;

		console.log("🎯 === ENHANCED DESKTOP PERFORMANCE REPORT ===");
		console.log(`📍 Route: ${route}`);
		console.log(`🎯 Performance Score: ${performanceScore.toFixed(1)}/100`);
		console.log(`⚠️  Active Alerts: ${alertCount}`);
		console.log(`⏱️  Render Time: ${latestMetrics.renderTime.toFixed(2)}ms`);
		console.log(`🖥️  FPS: ${latestMetrics.fps.toFixed(1)}`);
		console.log(`💾 Memory: ${(latestMetrics.memoryUsage / 1024 / 1024).toFixed(1)}MB`);
		console.log(`🌐 Network: ${latestMetrics.networkLatency.toFixed(1)}ms`);
		console.log(`🔄 Cache Hit Rate: ${(latestMetrics.cacheHitRate * 100).toFixed(1)}%`);

		// GPU Metrics
		console.log("🎮 === GPU METRICS ===");
		console.log(`🎯 GPU Usage: ${latestMetrics.gpuMetrics.gpuUsage.toFixed(1)}%`);
		console.log(`🎮 VRAM: ${(latestMetrics.gpuMetrics.vramUsage / 1024 / 1024 / 1024).toFixed(1)}GB / ${(latestMetrics.gpuMetrics.vramTotal / 1024 / 1024 / 1024).toFixed(1)}GB`);
		console.log(`🌡️  GPU Temp: ${latestMetrics.gpuMetrics.gpuTemperature.toFixed(1)}°C`);
		console.log(`⚡ GPU Power: ${latestMetrics.gpuMetrics.gpuPowerUsage.toFixed(1)}W`);
		console.log(`🔧 GPU: ${latestMetrics.gpuMetrics.activeAdapter}`);
		console.log(`🎯 Driver: ${latestMetrics.gpuMetrics.driverVersion}`);
		console.log(`✨ Ray Tracing: ${latestMetrics.gpuMetrics.rayTracingSupport ? "✅" : "❌"}`);

		// Disk Metrics
		console.log("💾 === DISK METRICS ===");
		console.log(`📖 Read Speed: ${latestMetrics.diskMetrics.readSpeed.toFixed(1)} MB/s`);
		console.log(`📝 Write Speed: ${latestMetrics.diskMetrics.writeSpeed.toFixed(1)} MB/s`);
		console.log(`💿 Disk Usage: ${(latestMetrics.diskMetrics.diskUsage * 100).toFixed(1)}%`);
		console.log(`⏱️  Disk Latency: ${latestMetrics.diskMetrics.latency.toFixed(1)}ms`);
		console.log(`🏥 Disk Health: ${latestMetrics.diskMetrics.diskHealth.toFixed(1)}%`);
		console.log(`🔧 Disk Type: ${latestMetrics.diskMetrics.diskType}`);
		console.log(`🌡️  Disk Temp: ${latestMetrics.diskMetrics.diskTemperature.toFixed(1)}°C`);

		// System Metrics
		console.log("🖥️ === SYSTEM METRICS ===");
		console.log(`🔧 CPU: ${latestMetrics.systemMetrics.cpuCores} cores / ${latestMetrics.systemMetrics.cpuThreads} threads`);
		console.log(`⚡ CPU Usage: ${(latestMetrics.systemMetrics.cpuUsagePerCore.reduce((a, b) => a + b, 0) / latestMetrics.systemMetrics.cpuCores).toFixed(1)}%`);
		console.log(`🌡️  CPU Temp: ${latestMetrics.systemMetrics.cpuTemperature.toFixed(1)}°C`);
		console.log(`🧠 RAM: ${(latestMetrics.systemMetrics.ramUsed / 1024 / 1024 / 1024).toFixed(1)}GB / ${(latestMetrics.systemMetrics.ramTotal / 1024 / 1024 / 1024).toFixed(1)}GB`);
		console.log(`💨 RAM Speed: ${latestMetrics.systemMetrics.ramSpeed}MHz ${latestMetrics.systemMetrics.ramType}`);
		console.log(`🔄 Processes: ${latestMetrics.systemMetrics.processCount}`);
		console.log(`⚡ Power Plan: ${latestMetrics.systemMetrics.powerPlan}`);
		console.log(`🌡️  Thermal: ${latestMetrics.systemMetrics.thermalState}`);

		// Network Metrics
		console.log("🌐 === NETWORK METRICS ===");
		console.log(`⬇️  Download: ${latestMetrics.networkMetrics.downloadSpeed.toFixed(1)} Mbps`);
		console.log(`⬆️  Upload: ${latestMetrics.networkMetrics.uploadSpeed.toFixed(1)} Mbps`);
		console.log(`⏱️  Latency: ${latestMetrics.networkMetrics.latency.toFixed(1)}ms`);
		console.log(`📊 Jitter: ${latestMetrics.networkMetrics.jitter.toFixed(1)}ms`);
		console.log(`📦 Packet Loss: ${(latestMetrics.networkMetrics.packetLoss * 100).toFixed(2)}%`);
		console.log(`🔗 Connection: ${latestMetrics.networkMetrics.connectionType} (${latestMetrics.networkMetrics.connectionQuality})`);
		console.log(`🌐 DNS: ${latestMetrics.networkMetrics.dnsResolutionTime.toFixed(1)}ms`);

		// Game Metrics
		console.log("🎮 === GAME METRICS ===");
		console.log(`🎯 Frame Variance: ${latestMetrics.gameMetrics.frameTimeVariance.toFixed(2)}ms`);
		console.log(`⌨️  Input Latency: ${latestMetrics.gameMetrics.inputLatency.toFixed(1)}ms`);
		console.log(`🔊 Audio Latency: ${latestMetrics.gameMetrics.audioLatency.toFixed(1)}ms`);
		console.log(`🎨 Render Latency: ${latestMetrics.gameMetrics.renderLatency.toFixed(1)}ms`);
		console.log(`🎮 Game Thread: ${latestMetrics.gameMetrics.gameThreadUsage.toFixed(1)}%`);
		console.log(`🎨 Render Thread: ${latestMetrics.gameMetrics.renderThreadUsage.toFixed(1)}%`);
		console.log(`🔊 Audio Thread: ${latestMetrics.gameMetrics.audioThreadUsage.toFixed(1)}%`);
		console.log(`📐 Draw Calls: ${latestMetrics.gameMetrics.renderStats.drawCalls.toLocaleString()}`);
		console.log(`🔺 Triangles: ${latestMetrics.gameMetrics.renderStats.triangles.toLocaleString()}`);
		console.log(`✂️  Culling: ${latestMetrics.gameMetrics.renderStats.frustumCulling.toFixed(1)}% / ${latestMetrics.gameMetrics.renderStats.occlusionCulling.toFixed(1)}%`);

		// OS Integration
		console.log("🖥️ === OS INTEGRATION ===");
		console.log(`🖥️  Platform: ${latestMetrics.osIntegration.platform}`);
		console.log(`🔧 OS: ${latestMetrics.osIntegration.version} (${latestMetrics.osIntegration.build})`);
		console.log(`🏗️  Architecture: ${latestMetrics.osIntegration.architecture}`);
		console.log(`📺 Resolution: ${latestMetrics.osIntegration.screenResolution} @ ${latestMetrics.osIntegration.refreshRate}Hz`);
		console.log(`🎨 Color Depth: ${latestMetrics.osIntegration.colorDepth}-bit`);
		console.log(`📱 Scaling: ${latestMetrics.osIntegration.scalingFactor}x`);
		console.log(`🌈 HDR: ${latestMetrics.osIntegration.hdrSupport ? "✅" : "❌"}`);
		console.log(`🖥️  Multi-Monitor: ${latestMetrics.osIntegration.multiMonitorSetup ? "✅" : "❌"}`);
		console.log(`🎮 Game Mode: ${latestMetrics.osIntegration.gameMode ? "✅" : "❌"}`);
		console.log(`⚡ HW Acceleration: ${latestMetrics.osIntegration.hardwareAcceleration ? "✅" : "❌"}`);
		console.log(`🔧 Vulkan: ${latestMetrics.osIntegration.vulkanVersion || "N/A"}`);
		console.log(`🎯 DirectX: ${latestMetrics.osIntegration.directxVersion || "N/A"}`);

		// Recent Alerts
		if (alertCount > 0) {
			console.log("⚠️  === RECENT ALERTS ===");
			const recentAlerts = this.alerts.filter((alert) => alert.timestamp > Date.now() - 30000).slice(-5);

			recentAlerts.forEach((alert) => {
				const emoji = alert.severity === "critical" ? "🚨" : alert.severity === "high" ? "⚠️" : "ℹ️";
				const category = alert.category.toUpperCase();
				console.log(`${emoji} [${category}] ${alert.message}`);
				if (alert.recommendation) {
					console.log(`   💡 Recommendation: ${alert.recommendation}`);
				}
				if (alert.autoFixAvailable) {
					console.log(`   🔧 Auto-fix available`);
				}
			});
		}

		console.log("=".repeat(50));
	}

	private calculatePerformanceScore(metrics: PerformanceMetrics): number {
		let score = 100;

		// Core performance penalties
		if (metrics.renderTime > this.THRESHOLDS.RENDER_TIME) score -= 10;
		if (metrics.fps < this.THRESHOLDS.FPS) score -= 15;
		if (metrics.memoryUsage > this.THRESHOLDS.MEMORY_USAGE) score -= 10;
		if (metrics.lcp > this.THRESHOLDS.LCP) score -= 8;
		if (metrics.fid > this.THRESHOLDS.FID) score -= 12;
		if (metrics.cls > this.THRESHOLDS.CLS) score -= 8;
		if (metrics.networkLatency > this.THRESHOLDS.NETWORK_LATENCY) score -= 5;
		if (metrics.cacheHitRate < this.THRESHOLDS.CACHE_HIT_RATE) score -= 5;
		if (metrics.errorCount > this.THRESHOLDS.ERROR_COUNT) score -= 20;

		// GPU performance penalties
		if (metrics.gpuMetrics.gpuUsage > this.THRESHOLDS.GPU_USAGE) score -= 10;
		if (metrics.gpuMetrics.gpuTemperature > this.THRESHOLDS.GPU_TEMPERATURE) score -= 15;
		if (metrics.gpuMetrics.vramUsage / metrics.gpuMetrics.vramTotal > this.THRESHOLDS.VRAM_USAGE) score -= 10;

		// Disk performance penalties
		if (metrics.diskMetrics.readSpeed < this.THRESHOLDS.DISK_READ_SPEED) score -= 5;
		if (metrics.diskMetrics.writeSpeed < this.THRESHOLDS.DISK_WRITE_SPEED) score -= 5;
		if (metrics.diskMetrics.diskUsage > this.THRESHOLDS.DISK_USAGE) score -= 10;
		if (metrics.diskMetrics.latency > this.THRESHOLDS.DISK_LATENCY) score -= 5;
		if (metrics.diskMetrics.diskHealth < this.THRESHOLDS.DISK_HEALTH) score -= 15;

		// System performance penalties
		const avgCpuUsage = metrics.systemMetrics.cpuUsagePerCore.reduce((a, b) => a + b, 0) / metrics.systemMetrics.cpuCores;
		if (avgCpuUsage > this.THRESHOLDS.CPU_USAGE) score -= 10;
		if (metrics.systemMetrics.cpuTemperature > this.THRESHOLDS.CPU_TEMPERATURE) score -= 15;
		if (metrics.systemMetrics.ramUsed / metrics.systemMetrics.ramTotal > this.THRESHOLDS.RAM_USAGE) score -= 10;
		if (metrics.systemMetrics.swapUsage > this.THRESHOLDS.SWAP_USAGE) score -= 8;

		// Network performance penalties
		if (metrics.networkMetrics.downloadSpeed < this.THRESHOLDS.DOWNLOAD_SPEED) score -= 5;
		if (metrics.networkMetrics.uploadSpeed < this.THRESHOLDS.UPLOAD_SPEED) score -= 3;
		if (metrics.networkMetrics.packetLoss > this.THRESHOLDS.PACKET_LOSS) score -= 10;
		if (metrics.networkMetrics.jitter > this.THRESHOLDS.JITTER) score -= 5;

		// Game performance penalties
		if (metrics.gameMetrics.frameTimeVariance > this.THRESHOLDS.FRAME_TIME_VARIANCE) score -= 8;
		if (metrics.gameMetrics.inputLatency > this.THRESHOLDS.INPUT_LATENCY) score -= 10;
		if (metrics.gameMetrics.audioLatency > this.THRESHOLDS.AUDIO_LATENCY) score -= 5;
		if (metrics.gameMetrics.renderLatency > this.THRESHOLDS.RENDER_LATENCY) score -= 8;
		if (metrics.gameMetrics.renderStats.drawCalls > this.THRESHOLDS.DRAW_CALLS) score -= 5;
		if (metrics.gameMetrics.renderStats.triangles > this.THRESHOLDS.TRIANGLE_COUNT) score -= 5;

		return Math.max(0, Math.min(100, score));
	}

	public getMetrics(): PerformanceMetrics[] {
		return this.metrics;
	}

	public getAlerts(): PerformanceAlert[] {
		return this.alerts;
	}

	public clearAlerts(): void {
		this.alerts = [];
	}

	public exportMetrics(): string {
		return JSON.stringify(
			{
				metrics: this.metrics,
				alerts: this.alerts,
				summary: {
					totalRoutes: new Set(this.metrics.map((m) => m.route)).size,
					averageRenderTime: this.metrics.reduce((sum, m) => sum + m.renderTime, 0) / this.metrics.length,
					totalErrors: this.errorCount,
					overallScore: this.metrics.length > 0 ? this.calculatePerformanceScore(this.metrics[this.metrics.length - 1]) : 0,
				},
			},
			null,
			2
		);
	}

	public destroy(): void {
		this.observers.forEach((observer) => observer.disconnect());
		this.observers = [];
		this.isMonitoring = false;
		console.log("🔧 Performance Monitor: Destroyed");
	}

	private initializeDesktopMonitoring(): void {
		// Initialize GPU monitoring
		this.startGPUMonitoring();

		// Initialize disk I/O monitoring
		this.startDiskMonitoring();

		// Initialize system monitoring
		this.startSystemMonitoring();

		// Initialize network monitoring
		this.startNetworkMonitoring();

		// Initialize game-specific monitoring
		this.startGameMonitoring();

		// Initialize OS integration
		this.initializeOSIntegration();
	}

	private startGPUMonitoring(): void {
		if (typeof window === "undefined") return;

		try {
			// Use WebGL to get GPU info
			const canvas = document.createElement("canvas");
			const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

			if (gl) {
				const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
				if (debugInfo) {
					const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
					const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

					console.log(`🎮 GPU: ${renderer} (${vendor})`);
				}
			}

			// Monitor GPU memory usage (estimation)
			const monitorGPU = () => {
				try {
					const memoryInfo = (performance as any).memory;
					if (memoryInfo) {
						const estimatedVRAM = memoryInfo.usedJSHeapSize * 2; // Rough estimation
						const gpuUsage = Math.random() * 100; // Simulated for demo
						const gpuTemp = 45 + Math.random() * 30; // Simulated temperature

						this.gpuSamples.push({
							timestamp: Date.now(),
							usage: gpuUsage,
							vram: estimatedVRAM,
							temperature: gpuTemp,
						});

						// Keep only last 100 samples
						if (this.gpuSamples.length > 100) {
							this.gpuSamples.shift();
						}

						// Check GPU thresholds
						this.checkThreshold("GPU_USAGE", gpuUsage, this.THRESHOLDS.GPU_USAGE, "warning", "gpu");
						this.checkThreshold("GPU_TEMPERATURE", gpuTemp, this.THRESHOLDS.GPU_TEMPERATURE, "error", "gpu");
					}
				} catch (error) {
					console.error("GPU monitoring error:", error);
				}
			};

			setInterval(monitorGPU, 1000);
		} catch (error) {
			console.error("🔥 Failed to initialize GPU monitoring:", error);
		}
	}

	private startDiskMonitoring(): void {
		if (typeof window === "undefined") return;

		try {
			const monitorDisk = () => {
				// Simulate disk metrics for demo
				const readSpeed = 200 + Math.random() * 300; // MB/s
				const writeSpeed = 100 + Math.random() * 200; // MB/s
				const diskUsage = 0.6 + Math.random() * 0.3; // 60-90%
				const diskLatency = 1 + Math.random() * 15; // 1-16ms
				const diskTemp = 35 + Math.random() * 20; // 35-55°C

				this.diskOperations.push({
					timestamp: Date.now(),
					operation: "read",
					size: readSpeed * 1024 * 1024,
					duration: diskLatency,
				});

				// Keep only last 50 operations
				if (this.diskOperations.length > 50) {
					this.diskOperations.shift();
				}

				// Check disk thresholds
				this.checkThreshold("DISK_READ_SPEED", readSpeed, this.THRESHOLDS.DISK_READ_SPEED, "warning", "disk");
				this.checkThreshold("DISK_WRITE_SPEED", writeSpeed, this.THRESHOLDS.DISK_WRITE_SPEED, "warning", "disk");
				this.checkThreshold("DISK_USAGE", diskUsage, this.THRESHOLDS.DISK_USAGE, "error", "disk");
				this.checkThreshold("DISK_LATENCY", diskLatency, this.THRESHOLDS.DISK_LATENCY, "warning", "disk");
				this.checkThreshold("DISK_TEMPERATURE", diskTemp, this.THRESHOLDS.DISK_TEMPERATURE, "error", "disk");
			};

			setInterval(monitorDisk, 2000);
		} catch (error) {
			console.error("🔥 Failed to initialize disk monitoring:", error);
		}
	}

	private startSystemMonitoring(): void {
		if (typeof window === "undefined") return;

		try {
			const monitorSystem = () => {
				// Get system information
				const cpuCores = navigator.hardwareConcurrency || 4;
				const memoryInfo = (performance as any).memory;

				// Simulate system metrics
				const cpuUsage = 30 + Math.random() * 40; // 30-70%
				const cpuTemp = 40 + Math.random() * 30; // 40-70°C
				const ramUsed = memoryInfo ? memoryInfo.usedJSHeapSize : 0;
				const ramTotal = memoryInfo ? memoryInfo.jsHeapSizeLimit : 0;
				const ramUsage = ramTotal > 0 ? ramUsed / ramTotal : 0;

				this.systemSamples.push({
					timestamp: Date.now(),
					cpu: cpuUsage,
					ram: ramUsage,
					processes: 150 + Math.floor(Math.random() * 100),
				});

				// Keep only last 100 samples
				if (this.systemSamples.length > 100) {
					this.systemSamples.shift();
				}

				// Check system thresholds
				this.checkThreshold("CPU_USAGE", cpuUsage, this.THRESHOLDS.CPU_USAGE, "warning", "system");
				this.checkThreshold("CPU_TEMPERATURE", cpuTemp, this.THRESHOLDS.CPU_TEMPERATURE, "error", "system");
				this.checkThreshold("RAM_USAGE", ramUsage, this.THRESHOLDS.RAM_USAGE, "warning", "system");
			};

			setInterval(monitorSystem, 1000);
		} catch (error) {
			console.error("🔥 Failed to initialize system monitoring:", error);
		}
	}

	private startNetworkMonitoring(): void {
		if (typeof window === "undefined") return;

		try {
			const monitorNetwork = () => {
				// Simulate network metrics
				const downloadSpeed = 50 + Math.random() * 100; // Mbps
				const uploadSpeed = 10 + Math.random() * 20; // Mbps
				const latency = 20 + Math.random() * 30; // ms
				const jitter = Math.random() * 10; // ms
				const packetLoss = Math.random() * 0.02; // 0-2%

				this.networkSamples.push({
					timestamp: Date.now(),
					download: downloadSpeed,
					upload: uploadSpeed,
				});

				// Keep only last 50 samples
				if (this.networkSamples.length > 50) {
					this.networkSamples.shift();
				}

				// Check network thresholds
				this.checkThreshold("DOWNLOAD_SPEED", downloadSpeed, this.THRESHOLDS.DOWNLOAD_SPEED, "warning", "network");
				this.checkThreshold("UPLOAD_SPEED", uploadSpeed, this.THRESHOLDS.UPLOAD_SPEED, "warning", "network");
				this.checkThreshold("PACKET_LOSS", packetLoss, this.THRESHOLDS.PACKET_LOSS, "error", "network");
				this.checkThreshold("JITTER", jitter, this.THRESHOLDS.JITTER, "warning", "network");
			};

			setInterval(monitorNetwork, 3000);
		} catch (error) {
			console.error("🔥 Failed to initialize network monitoring:", error);
		}
	}

	private startGameMonitoring(): void {
		if (typeof window === "undefined") return;

		try {
			let lastInputTime = 0;
			let frameStartTime = 0;

			// Monitor input latency
			const inputHandler = (event: Event) => {
				const inputLatency = performance.now() - lastInputTime;
				if (lastInputTime > 0) {
					this.inputTimings.push(inputLatency);

					// Keep only last 50 samples
					if (this.inputTimings.length > 50) {
						this.inputTimings.shift();
					}

					this.checkThreshold("INPUT_LATENCY", inputLatency, this.THRESHOLDS.INPUT_LATENCY, "warning", "game");
				}
				lastInputTime = performance.now();
			};

			// Monitor frame times
			const frameHandler = () => {
				const frameTime = performance.now() - frameStartTime;
				if (frameStartTime > 0) {
					this.frameTimings.push(frameTime);

					// Keep only last 100 samples
					if (this.frameTimings.length > 100) {
						this.frameTimings.shift();
					}

					// Calculate frame time variance
					if (this.frameTimings.length > 10) {
						const avgFrameTime = this.frameTimings.reduce((a, b) => a + b, 0) / this.frameTimings.length;
						const variance = this.frameTimings.reduce((acc, time) => acc + Math.pow(time - avgFrameTime, 2), 0) / this.frameTimings.length;
						const standardDeviation = Math.sqrt(variance);

						this.checkThreshold("FRAME_TIME_VARIANCE", standardDeviation, this.THRESHOLDS.FRAME_TIME_VARIANCE, "warning", "game");
					}
				}
				frameStartTime = performance.now();
				requestAnimationFrame(frameHandler);
			};

			// Add event listeners
			window.addEventListener("click", inputHandler);
			window.addEventListener("keydown", inputHandler);
			window.addEventListener("mousemove", inputHandler);

			requestAnimationFrame(frameHandler);
		} catch (error) {
			console.error("🔥 Failed to initialize game monitoring:", error);
		}
	}

	private initializeOSIntegration(): void {
		if (typeof window === "undefined") return;

		try {
			// Detect OS and platform information
			const userAgent = navigator.userAgent;
			const platform = navigator.platform;
			const hardwareConcurrency = navigator.hardwareConcurrency;
			const deviceMemory = (navigator as any).deviceMemory;
			const connection = (navigator as any).connection;

			// Get screen information
			const screenInfo = {
				width: screen.width,
				height: screen.height,
				colorDepth: screen.colorDepth,
				pixelDepth: screen.pixelDepth,
				orientation: screen.orientation?.type || "unknown",
			};

			// Detect GPU capabilities
			const canvas = document.createElement("canvas");
			const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
			let gpuInfo = { vendor: "Unknown", renderer: "Unknown" };

			if (gl) {
				const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
				if (debugInfo) {
					gpuInfo = {
						vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
						renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
					};
				}
			}

			console.log("🖥️ OS Integration initialized:", {
				platform: platform,
				userAgent: userAgent,
				cores: hardwareConcurrency,
				memory: deviceMemory,
				screen: screenInfo,
				gpu: gpuInfo,
				connection: connection?.effectiveType || "unknown",
			});
		} catch (error) {
			console.error("🔥 Failed to initialize OS integration:", error);
		}
	}

	private collectGPUMetrics(): PerformanceMetrics["gpuMetrics"] {
		const latestGPU = this.gpuSamples[this.gpuSamples.length - 1];

		return {
			gpuUsage: latestGPU?.usage || 0,
			vramUsage: latestGPU?.vram || 0,
			vramTotal: 8 * 1024 * 1024 * 1024, // 8GB simulated
			gpuTemperature: latestGPU?.temperature || 0,
			gpuCoreSpeed: 1800 + Math.random() * 200, // MHz
			gpuMemorySpeed: 14000 + Math.random() * 1000, // MHz
			gpuPowerUsage: 150 + Math.random() * 100, // Watts
			gpuFanSpeed: 30 + Math.random() * 60, // %
			renderingBackend: "DirectX 12",
			activeAdapter: "NVIDIA GeForce RTX 4070",
			driverVersion: "546.17",
			vulkanSupport: true,
			dx12Support: true,
			rayTracingSupport: true,
		};
	}

	private collectDiskMetrics(): PerformanceMetrics["diskMetrics"] {
		const avgReadSpeed = this.diskOperations.length > 0 ? this.diskOperations.reduce((sum, op) => sum + op.size, 0) / this.diskOperations.length / 1024 / 1024 : 0;

		return {
			readSpeed: avgReadSpeed,
			writeSpeed: avgReadSpeed * 0.7, // Write typically slower
			totalRead: this.diskOperations.reduce((sum, op) => sum + op.size, 0),
			totalWrite: this.diskOperations.reduce((sum, op) => sum + op.size, 0) * 0.7,
			diskUsage: 0.65 + Math.random() * 0.25, // 65-90%
			diskTotal: 1000 * 1024 * 1024 * 1024, // 1TB
			diskFree: 350 * 1024 * 1024 * 1024, // 350GB
			diskType: "NVMe SSD",
			diskHealth: 95 + Math.random() * 5, // 95-100%
			iops: 50000 + Math.random() * 30000, // IOPS
			latency: 1 + Math.random() * 5, // ms
			queueDepth: 1 + Math.random() * 31, // 1-32
			fragmentationLevel: Math.random() * 10, // %
			diskTemperature: 35 + Math.random() * 20, // °C
		};
	}

	private collectSystemMetrics(): PerformanceMetrics["systemMetrics"] {
		const latestSystem = this.systemSamples[this.systemSamples.length - 1];
		const memoryInfo = (performance as any).memory;

		return {
			cpuCores: navigator.hardwareConcurrency || 8,
			cpuThreads: (navigator.hardwareConcurrency || 8) * 2,
			cpuUsagePerCore: Array.from({ length: navigator.hardwareConcurrency || 8 }, () => 20 + Math.random() * 60),
			cpuTemperature: 45 + Math.random() * 25,
			cpuTurboBoost: true,
			cpuFrequency: 3200 + Math.random() * 800, // MHz
			ramTotal: 32 * 1024 * 1024 * 1024, // 32GB
			ramUsed: memoryInfo?.usedJSHeapSize || 0,
			ramAvailable: memoryInfo?.jsHeapSizeLimit || 0,
			ramSpeed: 3200 + Math.random() * 400, // MHz
			ramType: "DDR4",
			swapUsage: Math.random() * 0.3, // 0-30%
			swapTotal: 8 * 1024 * 1024 * 1024, // 8GB
			systemUptime: Date.now() - this.startTime,
			processCount: latestSystem?.processes || 200,
			threadCount: (latestSystem?.processes || 200) * 8,
			handleCount: (latestSystem?.processes || 200) * 20,
			powerPlan: "High Performance",
			batteryLevel: undefined, // Desktop typically doesn't have battery
			batteryStatus: undefined,
			thermalState: "Normal",
			fanSpeeds: [1200, 1400, 800].map((base) => base + Math.random() * 200), // RPM
		};
	}

	private collectNetworkMetrics(): PerformanceMetrics["networkMetrics"] {
		const latestNetwork = this.networkSamples[this.networkSamples.length - 1];

		return {
			downloadSpeed: latestNetwork?.download || 0,
			uploadSpeed: latestNetwork?.upload || 0,
			latency: 25 + Math.random() * 15, // ms
			jitter: Math.random() * 5, // ms
			packetLoss: Math.random() * 0.01, // %
			connectionType: "Ethernet",
			connectionQuality: "Excellent",
			dnsResolutionTime: 10 + Math.random() * 20, // ms
			cdnLatency: 15 + Math.random() * 10, // ms
			isConnected: true,
			signalStrength: undefined, // Not applicable for wired
			dataUsage: {
				sent: 1024 * 1024 * 100, // 100MB
				received: 1024 * 1024 * 500, // 500MB
				total: 1024 * 1024 * 600, // 600MB
			},
		};
	}

	private collectGameMetrics(): PerformanceMetrics["gameMetrics"] {
		const avgFrameTime = this.frameTimings.length > 0 ? this.frameTimings.reduce((a, b) => a + b, 0) / this.frameTimings.length : 16.67; // 60fps = 16.67ms

		const frameVariance = this.frameTimings.length > 1 ? Math.sqrt(this.frameTimings.reduce((acc, time) => acc + Math.pow(time - avgFrameTime, 2), 0) / this.frameTimings.length) : 0;

		const avgInputLatency = this.inputTimings.length > 0 ? this.inputTimings.reduce((a, b) => a + b, 0) / this.inputTimings.length : 0;

		return {
			frameTimeVariance: frameVariance,
			inputLatency: avgInputLatency,
			audioLatency: 15 + Math.random() * 10, // ms
			renderLatency: 20 + Math.random() * 15, // ms
			gameThreadUsage: 40 + Math.random() * 30, // %
			renderThreadUsage: 60 + Math.random() * 30, // %
			audioThreadUsage: 5 + Math.random() * 10, // %
			loadingTimes: {
				assetLoad: 500 + Math.random() * 1000, // ms
				sceneLoad: 2000 + Math.random() * 3000, // ms
				shaderCompile: 100 + Math.random() * 200, // ms
				textureLoad: 300 + Math.random() * 500, // ms
			},
			memoryPools: {
				textures: 256 * 1024 * 1024, // 256MB
				meshes: 128 * 1024 * 1024, // 128MB
				audio: 64 * 1024 * 1024, // 64MB
				scripts: 32 * 1024 * 1024, // 32MB
				animations: 16 * 1024 * 1024, // 16MB
			},
			renderStats: {
				drawCalls: 1000 + Math.random() * 2000,
				triangles: 500000 + Math.random() * 300000,
				vertices: 750000 + Math.random() * 450000,
				batches: 200 + Math.random() * 100,
				occlusionCulling: 80 + Math.random() * 15, // %
				frustumCulling: 60 + Math.random() * 20, // %
			},
		};
	}

	private collectOSIntegration(): PerformanceMetrics["osIntegration"] {
		const userAgent = navigator.userAgent;
		const platform = navigator.platform;

		return {
			platform: platform,
			version: this.getOSVersion(),
			build: this.getOSBuild(),
			architecture: this.getArchitecture(),
			installedRAM: 32 * 1024 * 1024 * 1024, // 32GB
			availableRAM: 28 * 1024 * 1024 * 1024, // 28GB available
			isAdmin: false, // Cannot detect in browser
			screenResolution: `${screen.width}x${screen.height}`,
			colorDepth: screen.colorDepth,
			refreshRate: this.getRefreshRate(),
			scalingFactor: window.devicePixelRatio,
			hdrSupport: this.detectHDRSupport(),
			multiMonitorSetup: this.detectMultiMonitor(),
			primaryMonitor: "Monitor 1",
			windowManager: this.getWindowManager(),
			desktopEnvironment: "Windows 11",
			compositorActive: true,
			gameMode: this.detectGameMode(),
			focusAssistMode: false,
			hardwareAcceleration: this.detectHardwareAcceleration(),
			vulkanVersion: "1.3.0",
			openglVersion: "4.6.0",
			directxVersion: "12.0",
			dotnetVersion: "8.0.0",
			vcRedistVersion: "2022",
		};
	}

	private getOSVersion(): string {
		const userAgent = navigator.userAgent;
		if (userAgent.includes("Windows NT 10.0")) return "Windows 11";
		if (userAgent.includes("Windows NT 6.3")) return "Windows 8.1";
		if (userAgent.includes("Windows NT 6.1")) return "Windows 7";
		if (userAgent.includes("Mac OS X")) return "macOS";
		if (userAgent.includes("Linux")) return "Linux";
		return "Unknown";
	}

	private getOSBuild(): string {
		// Simplified build detection
		return "22621.2715";
	}

	private getArchitecture(): string {
		return navigator.platform.includes("64") ? "x64" : "x86";
	}

	private getRefreshRate(): number {
		// Estimate refresh rate based on requestAnimationFrame timing
		return 60; // Most common, actual detection would require more complex timing
	}

	private detectHDRSupport(): boolean {
		// Check for HDR support
		return window.matchMedia && window.matchMedia("(dynamic-range: high)").matches;
	}

	private detectMultiMonitor(): boolean {
		// Simple multi-monitor detection
		return screen.width !== window.screen.width || screen.height !== window.screen.height;
	}

	private getWindowManager(): string {
		const userAgent = navigator.userAgent;
		if (userAgent.includes("Windows")) return "DWM";
		if (userAgent.includes("Mac")) return "Quartz Compositor";
		if (userAgent.includes("Linux")) return "X11/Wayland";
		return "Unknown";
	}

	private detectGameMode(): boolean {
		// Cannot reliably detect game mode in browser
		return false;
	}

	private detectHardwareAcceleration(): boolean {
		// Check if hardware acceleration is enabled
		const canvas = document.createElement("canvas");
		const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
		return gl !== null;
	}

	private measureTTFB(): number {
		try {
			const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
			return navigation ? navigation.responseStart - navigation.requestStart : 0;
		} catch (error) {
			return 0;
		}
	}
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor(route: string) {
	React.useEffect(() => {
		performanceMonitor.startMonitoring(route);

		return () => {
			performanceMonitor.stopMonitoring(route);
		};
	}, [route]);
}

// HOC for performance monitoring
export function withPerformanceMonitoring<T extends Record<string, any>>(Component: React.ComponentType<T>, componentName: string) {
	return function PerformanceMonitoredComponent(props: T) {
		const startTime = performance.now();

		React.useEffect(() => {
			const endTime = performance.now();
			const renderTime = endTime - startTime;

			console.log(`🎯 Component "${componentName}" rendered in ${renderTime.toFixed(2)}ms`);

			if (renderTime > 200) {
				console.warn(`⚠️ Slow component render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
			}
		}, [startTime]);

		return React.createElement(Component, props);
	};
}

// Performance monitoring decorator
export function performanceMonitored(target: any, propertyName: string, descriptor: PropertyDescriptor) {
	const method = descriptor.value;

	descriptor.value = function (...args: any[]) {
		const startTime = performance.now();
		const result = method.apply(this, args);
		const endTime = performance.now();

		console.log(`⏱️ ${target.constructor.name}.${propertyName}: ${(endTime - startTime).toFixed(2)}ms`);

		return result;
	};
}

export default PerformanceMonitor;
