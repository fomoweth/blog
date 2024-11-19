import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import ThemeProvider from "@/components/ThemeProvider";
import VisualEditor from "@/components/VisualEditor";

import { cn } from "@/lib/utils";
import { loadSettings } from "@/sanity/lib/queries";
import { inter, orbiter, roboto_flex, roboto_mono } from "@/styles/fonts";
import "@/styles/globals.css";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const settings = await loadSettings();

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"mx-auto min-h-screen w-full scroll-smooth bg-background font-inter text-gray-700 antialiased",
					inter.variable,
					orbiter.variable,
					roboto_flex.variable,
					roboto_mono.variable,
				)}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
				>
					<div className="relative">
						<Header settings={settings} />
						{children}
						<Footer settings={settings} />
					</div>

					<Analytics />
					<SpeedInsights />
					<VisualEditor />
				</ThemeProvider>
			</body>
		</html>
	);
}
