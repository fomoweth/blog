import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/stores/category";

interface Props {
	title: string;
	slug: "all" | string;
	numberOfPosts: number;
}

export default function Filter({ title, slug, numberOfPosts }: Props) {
	const { category: selected, select, reset } = useCategoryStore();

	useEffect(reset, [usePathname()]);

	return (
		<Button
			className={cn(
				"gap-0 capitalize duration-500",
				selected === slug
					? "*:text-zinc-50/50"
					: "border border-transparent",
			)}
			size="sm"
			variant={selected === slug ? "default" : "ghost"}
			onClick={() => select(slug)}
		>
			{title}
			<span className="ml-0.5 text-zinc-500">&#40;</span>
			{numberOfPosts}
			<span className="text-zinc-500">&#41;</span>
		</Button>
	);
}
