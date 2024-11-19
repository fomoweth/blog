"use client";

import Link from "next/link";

import Banner from "@/components/elements/Banner";
import DateTime from "@/components/elements/DateTime";
import Img from "@/components/elements/Img";
import ReadTime from "@/components/elements/ReadTime";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import { Github } from "@/components/icons";
import AppLayout from "@/components/layouts/AppLayout";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import Content from "./Content";
import Navigation from "./Navigation";
import Pagination from "./Pagination";
import RelatedPosts from "./RelatedPosts";

interface Props {
	post: Sanity.Post;
	prev?: Sanity.PostPartial;
	next?: Sanity.PostPartial;
}

export default function Post({ post, prev, next }: Props) {
	const {
		category,
		content,
		coverImage,
		date,
		navigation,
		relatedPosts,
		sourceCode,
		tags = [],
		title,
	} = post;

	return (
		<AppLayout className="w-screen pt-20">
			<Breadcrumbs className="my-5 max-w-screen-xl" title={title} />

			<div className="relative mx-auto max-w-screen-2xl">
				<div
					className={cn(
						"relative mx-auto max-w-screen-2xl",
						"grid grid-cols-1",
						!!navigation.enabled && "md:grid-cols-[1fr,auto]",
					)}
				>
					{!!navigation.enabled && !!navigation.headings.length && (
						<Navigation className="px-4 pb-14" value={navigation} />
					)}

					<article
						className="mx-auto w-full max-w-screen-lg px-4"
						title={title}
					>
						<Img
							className="mb-8 aspect-video rounded-3xl"
							source={coverImage}
							alt={title}
							width={1200}
						/>

						<div className="relative flex flex-col space-y-3 lg:px-4">
							<h1 className="text-balance text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-pretty lg:text-start lg:text-5xl">
								{title}
							</h1>

							<div className="flex flex-wrap items-start justify-center gap-x-2 md:gap-x-4 lg:justify-start xl:gap-x-6">
								<div className="my-2 inline-flex items-center gap-x-2 xl:gap-x-4">
									<Badge variant="outline">
										{category.title}
									</Badge>

									{tags.map((tag, idx) => (
										<Badge key={idx}>{tag}</Badge>
									))}
								</div>

								<div className="my-2 inline-flex items-center gap-x-3 xl:gap-x-5">
									{sourceCode && (
										<Link
											className="group inline-flex items-center gap-x-2 text-sm"
											href={sourceCode}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Github className="h-5 w-5" />
											<span className="hidden group-hover:underline md:block">
												Source Code
											</span>
										</Link>
									)}

									<ReadTime
										className="text-sm text-primary/70"
										content={content}
									/>

									<DateTime
										className="text-sm text-primary/70"
										month="short"
										day="numeric"
										year="numeric"
										value={date}
									/>
								</div>
							</div>
						</div>

						<Content value={content} />
					</article>
				</div>

				{!!relatedPosts && !!relatedPosts.length && (
					<RelatedPosts
						className="max-w-screen-xl pb-12"
						items={relatedPosts}
					/>
				)}

				<hr className="mx-auto h-0.5 max-w-screen-xl border-zinc-300" />

				<Pagination
					className="min-h-20 max-w-screen-lg px-10 py-5 md:py-10 xl:px-0"
					prev={prev}
					next={next}
				/>
			</div>

			<Banner
				className="bg-blue-500"
				content="Explore more posts"
				href="/blog"
			/>
		</AppLayout>
	);
}
