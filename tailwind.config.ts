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
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				accent: {
					DEFAULT: "#0847F7",
					light: "#0847F7",
					dark: "#0032DC",
				},
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
				// accent: {
				// 	DEFAULT: "hsl(var(--accent))",
				// 	foreground: "hsl(var(--accent-foreground))",
				// },
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			fontFamily: {
				display: ["var(--font-orbiter)", "sans-serif"],
				inter: ["var(--font-inter)", "sans-serif"],
				"geist-sans": ["var(--font-geist-sans)", "sans-serif"],
				"geist-mono": ["var(--font-geist-mono)", "monospace"],
				orbiter: ["var(--font-orbiter)", "sans-serif"],
				roboto: ["var(--font-roboto-flex)", "sans-serif"],
				"roboto-mono": ["var(--font-roboto-mono)", "monospace"],
			},
			borderRadius: {
				sm: "calc(var(--radius) - 4px)",
				md: "calc(var(--radius) - 2px)",
				lg: "var(--radius)",
				xl: "calc(var(--radius) + 4px)",
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
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			},
			screens: {
				sm: "340px",
				md: "640px",
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
