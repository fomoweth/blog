import Link from "next/link";

import DateTime from "@/components/elements/DateTime";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	items: Array<Sanity.PostPartial>;
}

export default function Collection({ className, items }: Props) {
	if (!items.length) return null;

	const builder = useImageUrlBuilder();

	const urlFor = (source: Sanity.Image) => builder.image(source).url();

	return (
		<div
			className={cn(
				"relative mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
				className,
			)}
		>
			{items.map(({ category, coverImage, date, slug, tags, title }) => (
				<Link
					key={slug.current}
					className="group h-[340px]"
					href={`/blog/${slug.current}`}
				>
					<Card className="h-full w-full rounded-xl !p-0">
						<CardContent
							className="aspect-video rounded-t-xl px-4 pt-3 saturate-100 transition-all duration-500 group-hover:saturate-0"
							style={{
								backgroundImage: `url(${urlFor(coverImage)})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div className="inline-flex items-center gap-x-2">
								{tags?.map((tag, idx) => (
									<Badge key={idx}>{tag}</Badge>
								))}
							</div>
						</CardContent>
						<CardFooter className="px-6 py-4">
							<div className="flex flex-col items-start gap-y-2.5">
								<div className="-ml-1 inline-flex items-center gap-x-3">
									<Badge variant="outline">
										{category.title}
									</Badge>

									<DateTime
										className="text-muted-foreground"
										month="short"
										day="numeric"
										year="numeric"
										value={date}
									/>
								</div>

								<h3 className="text-wrap text-xl font-bold text-primary">
									{title}
								</h3>
							</div>
						</CardFooter>
					</Card>
				</Link>
			))}
		</div>
	);
}
