import { useState } from "react";
import { motion } from "framer-motion";

import DateTime from "@/components/elements/DateTime";
import { Chevron } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { urlForCoverImage } from "@/sanity/lib/utils";

interface Props {
	className?: string;
	items?: Array<Sanity.PostPartial>;
}

export default function RelatedPosts({ className, items = [] }: Props) {
	const [position, setPosition] = useState<number>(0);

	const shiftLeft = () => {
		if (position > 0) setPosition((prev) => prev - 1);
	};

	const shiftRight = () => {
		if (position < items.length - 1) setPosition((prev) => prev + 1);
	};

	const translate = (idx: number) =>
		position >= idx ? idx * 100 : idx * 100 - 100 * (idx - position);

	return (
		<div className={cn("mx-auto w-full", className)}>
			<div className="mx-8 overflow-hidden md:mx-12 xl:mx-6">
				<div className="mx-auto mb-8 flex items-center justify-between gap-4">
					<h3 className="text-3xl font-bold leading-relaxed md:ml-8 md:text-4xl">
						Related Posts
					</h3>

					{items.length > 1 && (
						<div className="flex gap-2">
							<Button
								className="h-fit rounded-none bg-zinc-950 p-2 md:p-4"
								disabled={position === 0}
								onClick={shiftLeft}
							>
								<Chevron direction="left" variant="single" />
							</Button>

							<Button
								className="h-fit rounded-none bg-zinc-950 p-2 md:p-4"
								disabled={position === items.length - 1}
								onClick={shiftRight}
							>
								<Chevron direction="right" variant="single" />
							</Button>
						</div>
					)}
				</div>

				<div className="ml-4 flex gap-4 p-2">
					{items.map((item, idx) => {
						const { category, date, slug, tags, title } = item;

						return (
							<motion.a
								key={slug.current}
								className="relative flex h-[340px] w-10/12 max-w-lg shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-background shadow-md md:w-[45%]"
								href={`/blog/${slug.current}`}
								animate={{ x: `${-translate(idx)}%` }}
								transition={{
									duration: 0.35,
									ease: "easeInOut",
								}}
							>
								<div className="absolute left-4 top-5 inline-flex items-center gap-x-2">
									{tags?.map((tag, idx) => (
										<Badge key={idx}>{tag}</Badge>
									))}
								</div>

								<div
									className="aspect-video h-[225px] w-full"
									style={{
										backgroundImage: `url(${urlForCoverImage(item)})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
									}}
								/>

								<div className="flex h-[125px] w-full flex-col justify-center gap-y-2 px-6 py-2">
									<div className="inline-flex items-center gap-x-2">
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

									<h3 className="text-pretty font-bold text-primary md:text-lg lg:text-xl xl:text-xl">
										{title}
									</h3>
								</div>
							</motion.a>
						);
					})}
				</div>
			</div>
		</div>
	);
}
