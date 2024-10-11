"use client";

import { useCallback } from "react";
import Link from "next/link";

import SocialButton from "@/components/elements/SocialButton";
import { cn } from "@/lib/utils";

interface Props {
	content: string | Array<string>;
	position: "left" | "right";
}

export default function Side({ content, position }: Props) {
	const renderLinks = useCallback(() => {
		if (!Array.isArray(content)) {
			const email = new URL(content);

			return (
				<Link
					className={cn(
						"easeInOut my-24 rotate-90 border-l border-r border-blue-500 p-5 font-mono text-xs font-semibold leading-4 tracking-widest text-slate-400 !no-underline transition-transform duration-500 hover:-translate-y-5 hover:opacity-70",
					)}
					href={email.href}
					rel="noopener noreferrer"
					target="_blank"
				>
					{email.pathname}
				</Link>
			);
		} else {
			return content.reduce<Array<JSX.Element>>(
				(acc, href, idx) =>
					[
						<SocialButton
							key={idx}
							className="p-5 text-slate-800 hover:-translate-y-1 dark:text-zinc-200"
							color="#94A3B8"
							href={href}
							transition="scale"
							variant="logo"
						/>,
					].concat(acc),
				[],
			);
		}
	}, [content]);

	return (
		<div
			className={cn(
				"fixed bottom-0 hidden w-10 overflow-hidden lg:block",
				position === "left" && "left-5 right-auto lg:left-10",
				position === "right" && "left-auto right-5 lg:right-10",
			)}
		>
			<div className="flex flex-col items-center after:mx-auto after:mt-7 after:block after:h-40 after:w-[2px] after:bg-slate-400">
				{renderLinks()}
			</div>
		</div>
	);
}
