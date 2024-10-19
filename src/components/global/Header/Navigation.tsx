"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
	paths: Array<{ href: string; label: string }>;
	title: string;
}

export default function Navigation({ paths, title }: Props) {
	const pathname = usePathname();

	const renderLink = useCallback(
		(path: { href: string; label: string }, idx: number) => {
			return (
				<Link
					key={idx}
					className={cn(
						"emphasis font-orbiter text-lg transition-colors hover:text-foreground/80",
						path.href === pathname
							? "text-foreground"
							: "text-foreground/60",
					)}
					href={path.href}
				>
					{path.label}
				</Link>
			);
		},
		[pathname, paths],
	);

	const renderLinks = useCallback(() => {
		return paths.map((path, idx) => {
			return (
				<Link
					key={idx}
					className={cn(
						"emphasis font-orbiter text-lg transition-colors hover:text-foreground/80",
						path.href === pathname
							? "text-foreground"
							: "text-foreground/60",
					)}
					href={path.href}
				>
					{path.label}
				</Link>
			);
		});
	}, [pathname, paths]);

	return (
		<nav className="hidden h-full w-full items-center justify-between gap-x-10 md:flex">
			<div className="overflow-hidden">
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					<Link
						className="ml-4 flex items-center space-x-2 text-[#006FEE] hover:opacity-80"
						href="/"
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
				</motion.div>
			</div>

			<div className="overflow-hidden">
				<motion.div
					className="flex items-center space-x-6"
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					{paths.map(renderLink)}
				</motion.div>
			</div>
		</nav>
	);
}
