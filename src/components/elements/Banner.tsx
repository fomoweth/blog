import Link from "next/link";

import { cn, isExternal } from "@/lib/utils";

interface Props {
	className?: string;
	content: React.ReactNode;
	href: string;
}

export default function Banner({ className, content, href }: Props) {
	return (
		<Link
			className={cn(
				"flex h-20 w-screen items-center justify-center bg-zinc-950 text-center text-xl text-primary-foreground hover:opacity-90",
				className,
			)}
			href={href}
			{...(isExternal(href) && {
				target: "_blank",
				rel: "noopener noreferrer",
			})}
		>
			{content}
		</Link>
	);
}
