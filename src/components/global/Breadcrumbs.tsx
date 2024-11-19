import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Chevron } from "@/components/icons";
import { cn, slugify } from "@/lib/utils";

interface Props {
	className?: string;
	title?: string;
}

export default function Breadcrumbs({ className, title }: Props) {
	const pathname = usePathname();

	const paths = useMemo(() => {
		const paths = pathname.split("/").filter(Boolean);

		if (title) {
			paths.splice(paths.length - 1, 1, title);
		}

		return paths.reduce<Array<{ href: string; label: string }>>(
			(acc, path, idx) =>
				acc.concat({
					href:
						idx !== 0
							? acc[idx].href.concat("/" + slugify(path))
							: "/" + slugify(path),
					label: path,
				}),
			[{ href: "/", label: "Home" }],
		);
	}, [pathname]);

	return (
		<nav className={cn("relative mx-auto w-full px-6 py-3", className)}>
			<ul className="inline-flex w-full list-none items-center space-x-1">
				{paths.map(({ href, label }, idx) => (
					<li
						key={idx}
						className={cn(
							"group inline-flex items-center space-x-1",
							idx === paths.length - 1 && "truncate",
						)}
					>
						<Link
							className={cn(
								"truncate capitalize underline-offset-2 opacity-70 hover:underline hover:opacity-100 group-last:opacity-100 hover:group-last:opacity-70",
							)}
							href={href}
						>
							{label}
						</Link>

						<Chevron
							className="mt-0.5 group-last:hidden"
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
