import type {
	PortableTextBlock,
	PortableTextComponentProps,
} from "next-sanity";

import { cn, sluggify } from "@/lib/utils";

interface Props extends PortableTextComponentProps<PortableTextBlock> {
	as: keyof JSX.IntrinsicElements;
	color?: string;
}

export default function Heading({ as: Tag, children, color, value }: Props) {
	const id = sluggify(
		value.children.reduce<string>((acc, { text }) => acc + text, ""),
	);

	return (
		<Tag
			id={id}
			className={cn("group")}
			style={{ "--highlight": color || "#3B82F6" } as React.CSSProperties}
		>
			{children}
		</Tag>
	);
}
