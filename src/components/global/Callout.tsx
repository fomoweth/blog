import Link from "next/link";
import { FiArrowRight as ArrowRight } from "react-icons/fi";

import { cn, isExternal } from "@/lib/utils";

interface Props {
	className: string;
	content: React.ReactNode;
	cta: { href: string; label: string };
}

export default function Callout({
	className,
	content,
	cta: { href, label },
}: Props) {
	return (
		<div
			className={cn(
				"mx-auto flex w-full flex-col items-center gap-y-5 rounded-2xl p-8 md:flex-row md:justify-between",
				className,
			)}
		>
			{content}

			<Link
				className="group flex min-w-[165px] items-center gap-x-2 rounded-full bg-zinc-200 px-1.5 py-1 text-black"
				href={href}
				{...(isExternal(href) && {
					target: "_blank",
					rel: "noopener noreferrer",
				})}
			>
				<div className="rounded-full bg-black p-2 text-zinc-50">
					<ArrowRight
						className="-rotate-45 transition-transform duration-500 group-hover:rotate-0"
						size={16}
					/>
				</div>
				<div className="mr-1">{label}</div>
			</Link>
		</div>
	);
}
