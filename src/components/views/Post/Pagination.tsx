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
			<CTA className="justify-start" post={prev}>
				<Chevron direction="left" variant="single" />
				<span className="truncate">{prev?.title}</span>
			</CTA>

			<CTA className="justify-end" post={next}>
				<span className="truncate">{next?.title}</span>
				<Chevron direction="right" variant="single" />
			</CTA>
		</div>
	);
}

function CTA({
	children,
	className,
	post,
}: {
	children: React.ReactNode;
	className?: string;
	post?: Sanity.PostPartial;
}) {
	const Tag: JSX.ElementType = !!post ? Link : "div";

	return (
		<Tag
			className={cn(
				"inline-flex w-1/2 items-center space-x-2 text-lg font-semibold",
				"[&>span]:hidden [&>span]:md:block",
				post ? "hover:opacity-80" : "opacity-50",
				className,
			)}
			href={post && `/blog/${post.slug.current}`}
		>
			{children}
		</Tag>
	);
}
