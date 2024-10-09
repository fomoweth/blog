import { Inter, Roboto_Flex, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-inter",
	display: "swap",
});

export const roboto_flex = Roboto_Flex({
	subsets: ["latin"],
	weight: [
		"100",
		"200",
		"300",
		"400",
		"500",
		"600",
		"700",
		"800",
		"900",
		"1000",
	],
	variable: "--font-roboto-flex",
	display: "swap",
});

export const roboto_mono = Roboto_Mono({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	variable: "--font-roboto-mono",
	display: "swap",
});

export const geist_sans = localFont({
	src: "../../../public/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

export const geist_mono = localFont({
	src: "../../../public/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const orbiter = localFont({
	src: "../../../public/fonts/TASAOrbiterVF.woff2",
	variable: "--font-orbiter",
	display: "swap",
});
