import { motion } from "framer-motion";
import { FiArrowRight as ArrowRight } from "react-icons/fi";

import DateTime from "@/components/elements/DateTime";
import Callout from "@/components/global/Callout";
import { Badge } from "@/components/ui/badge";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";

interface Props {
	className: string;
	items: Array<Sanity.Post>;
}

export default function LatestPosts({ className, items }: Props) {
	if (!items.length) return null;

	const builder = useImageUrlBuilder();

	return (
		<div className={className}>
			<motion.section className="mx-auto mt-10 min-h-fit w-full max-w-screen-2xl place-content-start md:h-[calc(100vh_-_120px)]">
				<div className="relative mx-auto px-8 md:px-12 lg:px-14 xl:px-16">
					<h2 className="title h2 mb-8 inline-block text-zinc-200 md:mb-14">
						Latest Posts
						<span className="ml-1 inline-block size-2 bg-[#0847F7] md:size-2.5 lg:size-3" />
					</h2>

					<div className="mx-auto grid w-full grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
						{items.map((item) => {
							const {
								category,
								coverImage,
								date,
								slug,
								tags,
								title,
							} = item;

							const source = builder
								.image(coverImage)
								.fit("crop")
								.url();

							return (
								<motion.a
									key={slug.current}
									className="group relative h-[300px] w-full overflow-hidden rounded-3xl lg:rounded-none"
									href={`/blog/${slug.current}`}
									whileHover="hover"
									transition={{
										staggerChildren: 0.035,
									}}
								>
									<div
										className="absolute inset-0 aspect-auto h-full w-full saturate-100 transition-all duration-500 group-hover:scale-110 lg:group-hover:saturate-0"
										style={{
											backgroundImage: `url(${source})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
										}}
									/>

									<div className="relative z-20 flex h-full flex-col justify-between px-5 py-4 text-zinc-200">
										<div className="inline-flex items-center justify-between">
											<div className="inline-flex items-center gap-x-4">
												{tags?.map((tag, idx) => (
													<Badge
														key={idx}
														className="pointer-events-none"
														variant="secondary"
													>
														{tag}
													</Badge>
												))}
											</div>

											<ArrowRight className="-rotate-45 text-3xl transition-transform duration-500 group-hover:rotate-0" />
										</div>

										<div>
											<div className="mb-4 inline-flex items-center gap-x-4">
												<Badge
													className="pointer-events-none"
													variant="secondary"
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

											<h3>
												<TextFlip value={title} />
											</h3>
										</div>
									</div>
								</motion.a>
							);
						})}
					</div>
				</div>

				<div className="mt-10 px-8 md:mt-20 md:px-8 lg:px-10 xl:px-10">
					<Callout
						className="bg-[#1D1D1E]"
						content={
							<h3 className="text-center text-lg font-medium tracking-wide md:flex md:flex-col md:text-start md:text-xl xl:flex-row xl:text-2xl">
								<span className="mr-1.5 text-zinc-200">
									Explore the Technical Foundations of
								</span>
								<span className="text-slate-400">
									My Smart Contract Development.
								</span>
							</h3>
						}
						cta={{ href: "/blog", label: "View All Posts" }}
					/>
				</div>
			</motion.section>
		</div>
	);
}

function TextFlip({ value }: { value: string }) {
	return value.split("").map((char, idx) => (
		<div
			key={idx}
			className="inline-block h-[36px] overflow-hidden text-3xl font-semibold"
		>
			<motion.span
				className="flex min-w-[4px] flex-col"
				transition={{ duration: 0.5 }}
				variants={{ hover: { y: "-50%" } }}
				style={{ y: "0%" }}
			>
				<span>{char}</span>
				<span>{char}</span>
			</motion.span>
		</div>
	));
}
