import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Add rust color palette
				rust: {
					50: "#fdf8f3",
					100: "#fae8d0",
					200: "#f4d1a8",
					300: "#edb475",
					400: "#e5943d",
					500: "#cd7f32",
					600: "#b87333",
					700: "#9a5a2a",
					800: "#7c4722",
					900: "#8b4513",
				},
			},
			borderColor: {
				DEFAULT: "hsl(var(--border))",
				border: "hsl(var(--border))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					from: { opacity: "0", transform: "translateY(10px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"slide-in": {
					from: { transform: "translateX(-100%)" },
					to: { transform: "translateX(0)" },
				},
				glow: {
					"0%, 100%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.3)" },
					"50%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				glow: "glow 2s ease-in-out infinite",
			},
			backdropBlur: {
				xs: "2px",
			},
			boxShadow: {
				"glow-sm": "0 0 10px rgba(59, 130, 246, 0.3)",
				"glow-md": "0 0 20px rgba(59, 130, 246, 0.4)",
				"glow-lg": "0 0 30px rgba(59, 130, 246, 0.5)",
			},
		},
	},
	plugins: [],
} satisfies Config;

export default config;
