import Link from "next/link";

import { cn, isExternal } from "@/lib/utils";

export default function CTA({
	className,
	href,
	...props
}: React.ComponentProps<typeof Link>) {
	return (
		<Link
			className={cn(
				"btn transform bg-gray-900 px-5 py-2 tracking-wider transition-colors duration-300 hover:bg-gray-700",
				className,
			)}
			href={href}
			{...{
				props,
				...(isExternal(href) && {
					target: "_blank",
					rel: "noopener noreferrer",
				}),
			}}
		/>
	);
}
