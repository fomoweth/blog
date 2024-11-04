import Link from "next/link";

import { Chevron } from "@/components/icons";

import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	prev?: Sanity.PostPartial;
	next?: Sanity.PostPartial;
}

export default function Pagination({ className, prev, next }: Props) {
	return (
		<div
			className={cn(
				"mx-auto flex w-full flex-row items-center justify-between",
				className,
			)}
		>
			<CTA className="justify-start" slug={prev?.slug}>
				<Chevron direction="left" variant="single" />
				<span className="truncate">{prev?.title}</span>
			</CTA>

			<CTA className="justify-end" slug={next?.slug}>
				<span className="truncate">{next?.title}</span>
				<Chevron direction="right" variant="single" />
			</CTA>
		</div>
	);
}

function CTA({
	children,
	className,
	slug,
}: {
	children: React.ReactNode;
	className?: string;
	slug?: Sanity.Slug;
}) {
	return (
		<Link
			className={cn(
				"inline-flex w-1/2 items-center space-x-2 text-lg font-semibold",
				"[&>span]:hidden [&>span]:md:block",
				!!slug ? "hover:opacity-80" : "pointer-events-none opacity-50",
				className,
			)}
			href={!!slug ? `/blog/${slug.current}` : "#"}
		>
			{children}
		</Link>
	);
}
