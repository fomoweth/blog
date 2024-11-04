import { cn } from "@/lib/utils";

import Filter from "./Filter";

interface Props {
	className: string;
	items: Array<Sanity.Category>;
	total: number;
}

export default function Categories({ className, items, total }: Props) {
	if (!items.length) return null;

	return (
		<div className={cn("mx-auto w-full", className)}>
			<div className="group flex flex-wrap gap-1 max-sm:justify-center">
				<Filter title="All" slug="all" numberOfPosts={total} />

				{items.map(({ title, slug, numberOfPosts }, idx) => (
					<Filter
						key={idx}
						title={title}
						slug={slug.current}
						numberOfPosts={numberOfPosts}
					/>
				))}
			</div>
		</div>
	);
}
