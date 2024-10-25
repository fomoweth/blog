"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function AppLayout({
	children,
	className,
	...props
}: React.ComponentProps<"main">) {
	return (
		<main
			key={usePathname()}
			className={cn("relative z-10 grow", className)}
			{...props}
		>
			{children}
		</main>
	);
}
