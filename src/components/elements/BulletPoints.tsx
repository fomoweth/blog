import { cn } from "@/lib/utils";

interface Props {
	classNames?: { ul?: string; li?: string; span?: string };
	items: Array<string>;
}

export default function BulletPoints({ classNames, items }: Props) {
	if (!items.length) return null;

	return (
		<ul
			className={cn(
				"flex list-disc flex-col gap-2 overflow-y-auto text-sm md:text-base",
				classNames?.ul,
			)}
		>
			{items.map((item, idx) => (
				<li
					key={idx}
					className={cn("text-accent ml-5", classNames?.li)}
				>
					<span
						className={cn(
							"text-balance tracking-tight text-gray-600 dark:text-gray-400 md:text-pretty",
							classNames?.span,
						)}
					>
						{item}
					</span>
				</li>
			))}
		</ul>
	);
}
