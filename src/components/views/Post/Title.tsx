import Link from "next/link";
import { type PortableTextBlock } from "next-sanity";

import DateTime from "@/components/elements/DateTime";
import ReadTime from "@/components/elements/ReadTime";
import { Github } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

interface Props {
	title: string;
	tags: Array<string>;
	category: Sanity.Category;
	date: string;
	sourceCode?: string;
	content: Array<PortableTextBlock>;
}

export default function Title({
	category,
	content,
	date,
	sourceCode,
	tags,
	title,
}: Props) {
	return (
		<div className="relative flex flex-col space-y-3 lg:px-4">
			<h1 className="text-balance text-center font-inter text-3xl font-bold tracking-tight md:text-4xl lg:text-pretty lg:text-5xl xl:text-start">
				{title}
			</h1>

			<div className="flex flex-wrap items-start justify-center gap-x-2 md:gap-x-4 xl:justify-start xl:gap-x-6">
				<div className="my-2 inline-flex items-center gap-x-2 xl:gap-x-4">
					<Badge className="pointer-events-none" variant="outline">
						{category.title}
					</Badge>

					{tags?.map((tag, idx) => (
						<Badge
							key={idx}
							className="pointer-events-none"
							variant="default"
						>
							{tag}
						</Badge>
					))}
				</div>

				<div className="my-2 inline-flex items-center gap-x-3 xl:gap-x-5">
					{sourceCode && (
						<Link
							className="inline-flex items-center gap-x-2 text-sm"
							href={sourceCode}
							rel="noopener noreferrer"
							target="_blank"
						>
							<Github className="h-5 w-5" />
						</Link>
					)}

					<ReadTime
						className="text-sm text-black/70"
						content={content}
					/>

					<DateTime
						className="text-sm text-black/70"
						month="short"
						day="numeric"
						year="numeric"
						value={date}
					/>
				</div>
			</div>
		</div>
	);
}
