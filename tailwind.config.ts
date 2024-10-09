import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				inter: ["var(--font-inter)", "sans-serif"],
				"geist-sans": ["var(--font-geist-sans)", "sans-serif"],
				"geist-mono": ["var(--font-geist-mono)", "monospace"],
				orbiter: ["var(--font-orbiter)", "sans-serif"],
				roboto: ["var(--font-roboto-flex)", "sans-serif"],
				"roboto-mono": ["var(--font-roboto-mono)", "monospace"],
			},
		},
	},
	plugins: [],
};

export default config;
