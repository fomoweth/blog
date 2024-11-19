import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import View from "@/components/views/Post";

import siteConfig from "@/config";
import { absoluteUrl, constructMetadata } from "@/lib/utils";
import client from "@/sanity/lib/client";
import fetch from "@/sanity/lib/fetch";
import { loadPost } from "@/sanity/lib/queries";

interface Props {
	params: { slug: string };
}

export async function generateMetadata({
	params: { slug },
}: Props): Promise<Metadata | undefined> {
	const {
		coverImage: image,
		description,
		modifiedTime,
		publishedTime,
		tags = [],
		title,
	} = await fetch<{
		coverImage: string;
		description: string;
		modifiedTime: string;
		publishedTime: string;
		tags: Array<string>;
		title: string;
	}>({
		query: groq`*[_type == "post" && slug.current == $slug][0] {
			"coverImage": coverImage.asset -> url,
			title,
			"description": excerpt,
			"tags": tags[].label,
			"publishedTime": date,
			"modifiedTime": _updatedAt,
		}`,
		params: { slug },
		tags: ["post"],
	});

	return constructMetadata({
		title,
		description,
		tags,
		image,
		openGraph: {
			type: "article",
			url: absoluteUrl(`/blog/${slug}`),
			authors: siteConfig.author,
			publishedTime,
			modifiedTime,
			tags: siteConfig.keywords.concat(tags),
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
