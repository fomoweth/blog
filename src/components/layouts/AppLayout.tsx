"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import PageTransition from "./PageTransition";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AnimatePresence mode="wait">
			<PageTransition />
			<main
				key={usePathname()}
				className="relative mx-auto grid min-h-[calc(100vh-128px)] w-full max-w-screen-2xl grid-cols-1"
			>
				<div className="mx-auto w-full max-w-screen-xl">{children}</div>
			</main>
		</AnimatePresence>
	);
}
