import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1440px",
				"3xl": "1536px",
			},
		},
		extend: {
			animation: {
				"fade-in":
					"fade-in 1000ms var(--animation-delay, 0ms) ease forwards",
				"fade-up":
					"fade-up 1000ms var(--animation-delay, 0ms) ease forwards",
				"infinite-scroll": "infinite-scroll 25s linear infinite",
			},
			borderRadius: {
				sm: "calc(var(--radius) - 4px)",
				md: "calc(var(--radius) - 2px)",
				lg: "var(--radius)",
				xl: "calc(var(--radius) + 4px)",
				"4xl": "32px",
				"5xl": "40px",
				"6xl": "48px",
			},
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
				success: {
					DEFAULT: "hsl(var(--success))",
					foreground: "hsl(var(--success-foreground))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
				},
				error: {
					DEFAULT: "hsl(var(--error))",
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
				"accent-blue": {
					DEFAULT: "hsl(var(--accent-blue))",
					foreground: "hsl(var(--accent-blue-foreground))",
				},
				"accent-red": {
					DEFAULT: "hsl(var(--accent-red))",
					foreground: "hsl(var(--accent-red-foreground))",
				},
				"accent-violet": {
					DEFAULT: "hsl(var(--accent-violet))",
					foreground: "hsl(var(--accent-violet-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				"cobalt-blue": {
					DEFAULT: "#0847F7",
				},
				onyx: {
					DEFAULT: "#353839",
				},
				"chart-1": "hsl(var(--chart-1))",
				"chart-2": "hsl(var(--chart-2))",
				"chart-3": "hsl(var(--chart-3))",
				"chart-4": "hsl(var(--chart-4))",
				"chart-5": "hsl(var(--chart-5))",
			},
			fontFamily: {
				inter: ["var(--font-inter)", "sans-serif"],
				orbiter: ["var(--font-orbiter)", "sans-serif"],
				roboto: ["var(--font-roboto-flex)", "sans-serif"],
				"roboto-mono": ["var(--font-roboto-mono)", "monospace"],
			},
			keyframes: {
				"fade-in": {
					from: { opacity: "0", transform: "translateY(-10px)" },
					to: { opacity: "1", transform: "none" },
				},
				"fade-up": {
					from: { opacity: "0", transform: "translateY(20px)" },
					to: { opacity: "1", transform: "none" },
				},
				"infinite-scroll": {
					from: {
						transform: "translateX(0)",
					},
					to: {
						transform: "translateX(-100%)",
					},
				},
			},
			maxHeight: {
				fold: "calc(100svh - var(--header-height))",
			},
			screens: {
				xs: "340px",
				sm: "640px",
				md: "712px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1440px",
				"3xl": "1536px",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
};

export default config;
