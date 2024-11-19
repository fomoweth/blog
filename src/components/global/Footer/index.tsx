"use client";

import { useCallback } from "react";
import Link from "next/link";
import { toPlainText } from "next-sanity";

import Banner from "./Banner";
import Navigation from "./Navigation";

interface Props {
	settings: Sanity.Settings;
}

export default function Footer({ settings }: Props) {
	const { contacts, copyright, description, paths, resume, title } = settings;

	const renderLink = useCallback(
		(href: string, text: string) => (
			<Link
				className="text-primary-foreground underline-offset-2 transition-all duration-200 hover:underline"
				href={href}
				target="_blank"
				rel="noopener noreferrer"
			>
				{text}
			</Link>
		),
		[],
	);

	return (
		<footer className="relative inset-0 z-10 w-screen bg-black md:pt-10">
			<div className="relative mx-auto max-w-screen-xl px-5 md:px-8">
				<div className="mx-auto flex h-full w-full flex-col gap-y-5 pb-10 md:flex-row">
					<div className="mx-auto flex flex-col items-start gap-y-2 pt-8 lg:gap-y-4">
						<span className="mt-0.5 text-xl text-primary-foreground lg:text-3xl">
							{description}
						</span>

						<span className="text-lg text-gray-400 md:ml-1">
							Built with{" "}
							{renderLink("https://nextjs.org/docs", "NextJS")}{" "}
							and{" "}
							{renderLink("https://www.sanity.io/docs", "Sanity")}
							.
						</span>
					</div>

					<Navigation
						className="mx-auto w-full gap-y-5 py-8 md:w-1/2"
						contacts={contacts}
						paths={paths}
						resume={resume}
					/>
				</div>

				<Banner
					className="relative mx-auto flex h-full w-full items-center justify-center overflow-hidden"
					value={title}
				/>
			</div>

			<div className="mx-auto flex h-20 w-full items-center justify-center border-t border-zinc-400 bg-transparent text-sm text-zinc-400 backdrop-blur-md">
				{toPlainText(copyright)}
			</div>
		</footer>
	);
}
