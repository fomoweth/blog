"use client";

import Banner from "@/components/elements/Banner";
import Img from "@/components/elements/Img";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import AppLayout from "@/components/layouts/AppLayout";

import { cn } from "@/lib/utils";

import Content from "./Content";
import Navigation from "./Navigation";
import Pagination from "./Pagination";
import RelatedPosts from "./RelatedPosts";
import Title from "./Title";

interface Props {
	post: Sanity.Post;
	prev?: Sanity.PostPartial;
	next?: Sanity.PostPartial;
}

export default function Post({ post, prev, next }: Props) {
	const { content, coverImage, navigation, relatedPosts, slug, title } = post;

	return (
		<AppLayout className="w-screen bg-zinc-50 pt-20 dark:bg-[#161617]">
			<Breadcrumbs className="my-5 max-w-screen-lg" title={title} />

			<div className="relative mx-auto max-w-screen-2xl">
				<div
					className={cn(
						"relative mx-auto max-w-screen-xl",
						"grid grid-cols-1",
						navigation.enabled && "md:grid-cols-[1fr,auto]",
					)}
				>
					<Navigation
						className="px-4 pb-14"
						value={post.navigation}
					/>

					<article
						id={slug.current}
						className="mx-auto w-full px-4 md:max-w-[486px] lg:max-w-[732px] xl:max-w-[792px]"
						title={title}
					>
						<Img
							className="mb-8 aspect-video rounded-3xl"
							source={coverImage}
							alt={title}
							width={1200}
						/>

						<Title {...post} />

						<Content value={content} />
					</article>
				</div>

				<RelatedPosts
					className="max-w-screen-lg pb-12"
					items={relatedPosts || []}
				/>

				<hr className="mx-auto h-0.5 max-w-screen-xl border-zinc-300" />

				<Pagination
					className="min-h-20 max-w-screen-lg px-10 py-5 md:py-10 xl:px-0"
					prev={prev}
					next={next}
				/>
			</div>

			<Banner
				className="bg-blue-500 text-zinc-50"
				content="Explore more posts"
				href="/blog"
			/>
		</AppLayout>
	);
}
