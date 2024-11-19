import { useMemo } from "react";
import Link from "next/link";

import { cn, isExternal } from "@/lib/utils";

interface Props {
	className: string;
	contacts: Array<Sanity.Contact>;
	paths: Array<{ href: string; label: string }>;
	resume: Sanity.Asset;
}

export default function Navigation({
	className,
	contacts,
	paths,
	resume,
}: Props) {
	const { email, github, linkedin, telegram, x } = useMemo(
		() =>
			contacts.reduce<{ [key: string]: Sanity.Contact }>(
				(acc, contact) => ({
					...acc,
					[contact.label.toLowerCase()]: contact,
				}),
				{},
			),
		[contacts],
	);

	return (
		<nav
			className={cn(
				"grid grid-cols-3 items-start justify-items-center gap-y-5 md:grid-cols-3",
				className,
			)}
		>
			<Column
				title="Directory"
				links={[{ href: "/", label: "Home" }, ...paths]}
			/>
			<Column
				title="Resources"
				links={[github, { href: resume.asset.url, label: "Resumé" }]}
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
			<div className="-ml-1 text-lg font-medium capitalize text-zinc-50">
				{title}
			</div>
			<div className="flex flex-col items-start justify-center space-y-2">
				{links.map(({ href, label }, idx) => (
					<Link
						key={idx}
						className="z-10 capitalize text-gray-400 transition-all duration-200 hover:text-zinc-200 hover:opacity-80"
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
