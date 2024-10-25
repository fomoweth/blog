"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Chevron } from "@/components/icons";
import { cn } from "@/lib/utils";

interface Props {
	canGoBack?: boolean;
	className?: string;
	pathname?: string;
}

export default function Breadcrumbs({
	className,
	pathname = usePathname(),
}: Props) {
	const routes = useMemo(() => {
		const paths = pathname.split("/").slice(1);

		return paths.reduce<Array<{ href: string; label: string }>>(
			(acc, path, idx) =>
				acc.concat({
					href:
						idx !== 0
							? acc[idx].href.concat("/" + path)
							: "/" + path,
					label: path,
				}),
			[{ href: "/", label: "home" }],
		);
	}, [pathname]);

	return (
		<nav
			className={cn(
				"relative mx-auto w-full max-w-screen-2xl p-3",
				className,
			)}
		>
			<ul className="inline-flex list-none items-center">
				{routes.map(({ href, label }, idx) => (
					<li key={idx} className="group inline-flex items-center">
						<Link
							className="z-10 capitalize opacity-70 hover:underline group-last:opacity-100"
							href={href}
						>
							{label}
						</Link>
						<Chevron
							className="mx-1.5 mt-0.5 group-last:hidden"
							direction="right"
							size={16}
							variant="single"
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}
