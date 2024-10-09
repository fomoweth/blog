/** @type {import("prettier").Config} */
const config = {
	trailingComma: "all",
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: false,
	plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
