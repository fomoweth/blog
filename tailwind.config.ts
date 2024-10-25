import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class"],
	theme: {
		extend: {
			animation: {
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
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground:
						"hsl(var(--destructive-foreground) / <alpha-value>)",
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
				"custom-red": "var(--custom-red)",
				"custom-pink": "var(--custom-pink)",
				"custom-orange": "var(--custom-orange)",
				"custom-yellow": "var(--custom-yellow)",
				"custom-lime": "var(--custom-lime)",
				"custom-teal": "var(--custom-teal)",
				"custom-cyan": "var(--custom-cyan)",
				"custom-blue": "var(--custom-blue)",
				"custom-violet": "var(--custom-violet)",
				"custom-neutral": "var(--custom-neutral)",
				"custom-slate": "var(--custom-slate)",
				"custom-white": "var(--custom-white)",
			},
			fontFamily: {
				display: ["var(--font-orbiter)", "sans-serif"],
				inter: ["var(--font-inter)", "sans-serif"],
				orbiter: ["var(--font-orbiter)", "sans-serif"],
				roboto: ["var(--font-roboto-flex)", "sans-serif"],
				"roboto-mono": ["var(--font-roboto-mono)", "monospace"],
			},
			keyframes: {
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
	plugins: [require("tailwindcss-animate")],
};

export default config;
