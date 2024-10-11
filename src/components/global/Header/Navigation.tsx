"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

interface Props {
	paths: Array<string>;
	title: string;
}

export default function Navigation({ paths, title }: Props) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const pathname = usePathname();

	const renderLinks = useCallback(() => {
		return paths.map((path, idx) => (
			<Link
				key={idx}
				className={cn(
					"font-orbiter text-lg font-bold uppercase leading-loose tracking-widest transition-colors hover:text-foreground/80",
					path === pathname
						? "text-foreground"
						: "text-foreground/60",
				)}
				href={path}
			>
				{path.slice(1)}
			</Link>
		));
	}, [pathname, paths]);

	const renderMobileLinks = useCallback(() => {
		return paths.map((path, idx) => (
			<motion.li
				key={idx}
				variants={{
					hidden: { opacity: 0, y: -100 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							duration: 0.2,
							ease: [0.455, 0.03, 0.515, 0.955],
						},
					},
				}}
				onClick={() => setIsMenuOpen(false)}
			>
				<Link
					className={cn(
						"py-1 font-orbiter text-2xl font-bold capitalize leading-loose tracking-widest hover:opacity-70",
						path === pathname
							? "text-foreground"
							: "text-foreground/60",
					)}
					href={path}
				>
					{path.slice(1)}
				</Link>
			</motion.li>
		));
	}, [pathname, paths]);

	return (
		<>
			<nav className="flex h-full w-full items-center justify-between gap-x-2">
				<div className="grid h-full w-full grid-cols-[1fr,auto] items-center overflow-hidden">
					<Link
						href="/"
						className="ml-4 flex items-center space-x-2 text-[#006FEE] hover:opacity-80"
						onClick={() => setIsMenuOpen(false)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							height={28}
							width={28}
							fill="none"
							focusable="false"
							aria-hidden="true"
						>
							<path
								d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.7}
							/>
						</svg>

						<span className="font-orbiter text-xl font-bold">
							{title}
						</span>
					</Link>

					<div className="flex items-center gap-4 overflow-hidden text-sm max-md:hidden lg:gap-6">
						{renderLinks()}
					</div>
				</div>

				<div className="flex items-center">
					<ThemeToggle />

					<div className="md:hidden">
						<button
							type="button"
							className="group mr-2 inline-flex h-12 w-12 items-center justify-center rounded bg-transparent fill-slate-800 text-center transition dark:fill-zinc-200"
							aria-pressed={isMenuOpen}
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<span className="sr-only">Menu</span>
							<svg
								className="pointer-events-none h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
							>
								<rect
									className={cn(
										"origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300",
										"ease-[cubic-bezier(0.5,0.85,0.25,1.1)]",
										"group-[[aria-pressed=true]]:translate-x-0",
										"group-[[aria-pressed=true]]:translate-y-0",
										"group-[[aria-pressed=true]]:rotate-[315deg]",
									)}
									width="9"
									height="2"
									rx="1"
									y="7"
								/>
								<rect
									className={cn(
										"origin-center transition-all duration-300",
										"ease-[cubic-bezier(0.5,0.85,0.25,1.8)]",
										"group-[[aria-pressed=true]]:rotate-45",
									)}
									width="16"
									height="2"
									rx="1"
									y="7"
								/>
								<rect
									className={cn(
										"origin-center translate-y-[5px] transition-all duration-300",
										"ease-[cubic-bezier(0.5,0.85,0.25,1.1)]",
										"group-[[aria-pressed=true]]:translate-y-0",
										"group-[[aria-pressed=true]]:rotate-[135deg]",
									)}
									width="9"
									height="2"
									rx="1"
									y="7"
								/>
							</svg>
						</button>
					</div>
				</div>
			</nav>

			<motion.ul
				className={cn(
					"fixed inset-x-0 bottom-0 top-[64px] z-30 h-[calc(100dvh-64px)] w-screen max-w-full list-none flex-col gap-2 overflow-y-auto bg-background/90 px-8 pt-2 backdrop-blur-xl backdrop-saturate-150 transition-all duration-200",
					isMenuOpen ? "flex" : "hidden",
				)}
			>
				{renderMobileLinks()}
			</motion.ul>
		</>
	);
}
