import Link from "next/link";
import { FiArrowRight as ArrowRight } from "react-icons/fi";

import DateTime from "@/components/elements/DateTime";
import { Badge } from "@/components/ui/badge";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	items: Array<Sanity.PostPartial>;
}

export default function Collection({ className, items }: Props) {
	if (!items.length) return null;

	const builder = useImageUrlBuilder();

	return (
		<div
			className={cn(
				"relative mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
				className,
			)}
		>
			{items.map((item, idx) => {
				const { category, coverImage, date, slug, tags, title } = item;

				const source = builder.image(coverImage).url();

				return (
					<Link
						key={idx}
						className="group relative h-64 w-full overflow-hidden rounded-3xl bg-zinc-200"
						href={`/blog/${slug.current}`}
					>
						<div
							className="absolute inset-0 aspect-auto h-full w-full saturate-100 transition-all duration-500 group-hover:scale-110 group-hover:saturate-0"
							style={{
								backgroundImage: `url(${source})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						/>

						<div className="absolute left-5 top-5 inline-flex items-center gap-x-4 transition-all duration-700 group-hover:-left-72">
							{tags.map((tag, idx) => (
								<Badge
									key={idx}
									className="pointer-events-none"
									variant="default"
								>
									{tag}
								</Badge>
							))}
						</div>

						<div className="relative z-20 flex h-full flex-col justify-between p-4 text-zinc-50">
							<ArrowRight className="ml-auto -rotate-45 text-3xl transition-transform duration-500 group-hover:rotate-0" />

							<div className="flex flex-col gap-5">
								<div className="inline-flex items-center gap-x-4 transition-opacity duration-700 group-hover:opacity-0">
									<Badge
										className="pointer-events-none"
										variant="default"
									>
										{category.title}
									</Badge>

									<DateTime
										className="text-zinc-50"
										month="short"
										day="numeric"
										year="numeric"
										value={date}
									/>
								</div>

								<h3 className="text-balance text-xl font-semibold text-zinc-200 transition-all duration-500 group-hover:text-2xl">
									{title}
								</h3>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
