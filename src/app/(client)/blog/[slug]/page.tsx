import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import View from "@/components/views/Post";

import siteConfig from "@/config";
import { constructMetadata } from "@/lib/utils";
import client from "@/sanity/lib/client";
import { loadPost } from "@/sanity/lib/queries";

interface Props {
	params: { slug: string };
}

export async function generateMetadata({
	params: { slug },
}: Props): Promise<Metadata | undefined> {
	const { post } = await loadPost(slug);

	const {
		coverImage: {
			asset: { url: image },
		},
		title,
		date: publishedTime,
		excerpt: description,
	} = post;

	return constructMetadata({
		title,
		description,
		image,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `${siteConfig.url}/blog/${post.slug.current}`,
			images: [
				{
					url: image,
				},
			],
		},
	});
}

export async function generateStaticParams() {
	const slugs = await client
		.withConfig({
			perspective: "published",
			useCdn: false,
			stega: false,
		})
		.fetch<Array<string>>(
			groq`*[_type == "post" && defined(slug.current)].slug.current`,
			{ type: "post" },
			{
				next: {
					tags: ["post"],
				},
			},
		);

	return slugs;
}

export default async function Page({ params: { slug } }: Props) {
	const { post, prev, next } = await loadPost(slug);

	if (!post) notFound();

	return <View post={post} prev={prev} next={next} />;
}
