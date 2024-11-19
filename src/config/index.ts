const siteConfig = {
	author: "Ryan Kim",
	title: "rkim.xyz",
	url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
	description: "Ryan Kim's Portfolio | Dev Blog.",
	keywords: [
		"Blockchain",
		"Coding",
		"Cryptocurrency",
		"Crypto",
		"dApp",
		"Decentralized Application",
		"Decentralized Finance",
		"DeFi",
		"ETH",
		"Ethereum",
		"EVM",
		"Smart Contract",
		"Solidity",
		"Technology",
		"Web3",
	],
	twitter: "@fomoweth",
	contact: {
		email: "mailto:fomoweth@gmail.com",
		github: "https://github.com/fomoweth",
		linkedin: "https://www.linkedin.com/in/fomoweth",
		tg: "https://t.me/rykimmm",
		x: "https://x.com/fomoweth",
	},
	paths: [
		{ href: "/portfolio", label: "portfolio" },
		{ href: "/blog", label: "blog" },
	],
};

export type SiteConfig = typeof siteConfig;

export default siteConfig;
