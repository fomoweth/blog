import Link from "next/link";
import { type PortableTextBlock } from "next-sanity";

import DateTime from "@/components/elements/DateTime";
import ReadTime from "@/components/elements/ReadTime";
import { Github } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

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
		<div className="relative flex flex-col space-y-3">
			<div className="ml-1">
				<Badge className="pointer-events-none" variant="secondary">
					{category.title}
				</Badge>
			</div>

			<h1 className="font-orbiter text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">
				{title}
			</h1>

			<div
				className={cn(
					"grid w-full grid-cols-1 items-center lg:grid-cols-2",
					"[&>div]:flex [&>div]:px-4 [&>div]:py-2",
				)}
			>
				<div className="my-2 inline-flex w-full items-center justify-center gap-x-5 lg:justify-start">
					{tags.map((tag, idx) => (
						<Badge
							key={idx}
							className="pointer-events-none"
							variant="secondary"
						>
							{tag}
						</Badge>
					))}
				</div>

				<div
					className={cn(
						"mx-auto w-full lg:w-fit",
						"grid items-center",
						"justify-end",
						sourceCode ? "grid-cols-3" : "grid-cols-2",
						"[&>*]:mx-auto [&>*]:flex [&>*]:px-4 [&>*]:py-2",
					)}
				>
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
