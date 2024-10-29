"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageDimensions } from "@sanity/asset-utils";

import Breadcrumbs from "@/components/global/Breadcrumbs";
import { Chevron } from "@/components/icons";
import AppLayout from "@/components/layouts/AppLayout";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";
import { cn } from "@/lib/utils";

import Content from "./Content";
import Navigation from "./Navigation";
import RelatedPosts from "./RelatedPosts";
import Title from "./Title";

interface Props {
	post: Sanity.Post;
	prev?: Sanity.PostPartial;
	next?: Sanity.PostPartial;
}

export default function Post({ post, prev, next }: Props) {
	const {
		content,
		coverImage: { asset },
		navigation,
		relatedPosts,
		slug,
		title,
	} = post;

	const builder = useImageUrlBuilder();

	const { src, height, width } = useMemo(() => {
		const { height, width } = getImageDimensions(asset);

		const src = builder.image(asset).width(width).height(height).url();

		return { src, height, width };
	}, [post]);

	return (
		<AppLayout className="w-screen bg-zinc-50 pt-20 dark:bg-[#161617]">
			<Breadcrumbs
				className="my-5 max-w-screen-lg overflow-hidden text-ellipsis"
				pathname={`/blog/${title}`}
			/>
			<div className="relative mx-auto max-w-screen-2xl">
				<div
					className={cn(
						"relative mx-auto max-w-screen-xl",
						"grid grid-cols-1",
						navigation.enabled && "md:grid-cols-[1fr,auto]",
					)}
				>
					<Navigation className="pb-14" value={post.navigation} />

					<article
						id={slug.current}
						className="mx-auto w-full px-4 md:max-w-[486px] lg:max-w-[732px] xl:max-w-[792px]"
						title={title}
					>
						<Image
							className="mb-8 aspect-video rounded-3xl object-cover"
							src={src}
							alt={title}
							height={height}
							width={width}
						/>

						<Title {...post} />

						<Content value={content} />
					</article>
				</div>

				<RelatedPosts
					className="mx-auto w-full max-w-screen-lg"
					items={relatedPosts || []}
				/>

				<hr className="mx-auto h-0.5 max-w-screen-xl border-zinc-300" />

				<div
					className={cn(
						"mx-auto flex w-full max-w-screen-lg flex-row items-center justify-between px-10 py-5 md:py-10 xl:px-0",
					)}
				>
					<CallToAction className="justify-start" post={prev}>
						<Chevron direction="left" variant="single" />
						<span className="overflow-hidden truncate text-ellipsis">
							{prev?.title}
						</span>
					</CallToAction>

					<CallToAction className="justify-end" post={next}>
						<span className="overflow-hidden truncate text-ellipsis">
							{next?.title}
						</span>
						<Chevron direction="right" variant="single" />
					</CallToAction>
				</div>
			</div>

			<Link
				className={cn(
					"flex h-20 w-full items-center justify-center text-center text-xl",
					"bg-blue-500 text-zinc-50 hover:opacity-90",
				)}
				href="/blog"
			>
				Explore more posts
			</Link>
		</AppLayout>
	);
}

function CallToAction({
	children,
	className,
	post,
}: {
	children: React.ReactNode;
	className?: string;
	post?: Sanity.PostPartial;
}) {
	const Tag: JSX.ElementType = !!post ? Link : "div";

	return (
		<Tag
			className={cn(
				"inline-flex w-1/2 items-center space-x-2 text-lg font-semibold hover:opacity-80",
				"[&>span]:hidden [&>span]:md:block",
				className,
			)}
			href={post && `/blog/${post.slug.current}`}
		>
			{children}
		</Tag>
	);
}
