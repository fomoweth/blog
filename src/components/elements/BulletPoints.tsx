import { cn } from "@/lib/utils";

interface Props {
	classNames?: { ul?: string; li?: string };
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
					className={cn(
						"marker:text-cobalt-blue ml-5 text-balance tracking-tight md:text-pretty",
						classNames?.li,
					)}
				>
					{item}
				</li>
			))}
		</ul>
	);
}
