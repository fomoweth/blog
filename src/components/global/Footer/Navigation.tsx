"use client";

import { useMemo } from "react";
import Link from "next/link";

import { cn, isExternal } from "@/lib/utils";

interface Props {
	author: Sanity.Author;
	className: string;
	paths: Array<{ href: string; label: string }>;
}

export default function Navigation({ author, className, paths }: Props) {
	const { email, github, linkedin, telegram, x } = useMemo(
		() =>
			author.contacts.reduce<{ [key: string]: Sanity.Contact }>(
				(acc, contact) => ({
					...acc,
					[contact.label.toLowerCase()]: contact,
				}),
				{},
			),
		[author],
	);

	return (
		<nav
			className={cn(
				"grid grid-cols-3 items-start justify-items-center gap-y-5 md:grid-cols-3",
				className,
			)}
		>
			<Column title="Directory" links={paths} />
			<Column
				title="Resources"
				links={[
					github,
					{ href: author.resume.asset.url, label: "Resumé" },
				]}
			/>
			<Column title="Contact" links={[linkedin, x, telegram, email]} />
		</nav>
	);
}

function Column({
	title,
	links,
}: {
	title: string;
	links: Array<{ href: string; label: string }>;
}) {
	return (
		<div className="flex flex-col items-start justify-center space-y-2">
			<div className="text-lg font-medium capitalize text-zinc-200">
				{title}
			</div>
			<div className="ml-1 flex flex-col items-start justify-center space-y-2">
				{links.map(({ href, label }, idx) => (
					<Link
						key={idx}
						className="z-10 capitalize text-neutral-500 transition-all duration-200 hover:text-zinc-200 hover:opacity-80"
						href={href}
						{...(isExternal(href) && {
							target: "_blank",
							rel: "noopener noreferrer",
						})}
					>
						{label}
					</Link>
				))}
			</div>
		</div>
	);
}
