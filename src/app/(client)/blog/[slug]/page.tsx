import { notFound } from "next/navigation";
import { groq } from "next-sanity";

import View from "@/components/views/Post";

import fetch from "@/sanity/lib/fetch";
import { loadPost } from "@/sanity/lib/queries";

interface Props {
	params: { slug: string };
}

// export async function generateStaticParams() {
// 	const slugs = await fetch<Array<string>>({
// 		query: groq`*[_type == "post" && defined(slug.current)].slug.current`,
// 		params: {},
// 		tags: ["post"],
// 	});

// 	return slugs.map((slug) => ({ slug }));
// }

export default async function Page({ params: { slug } }: Props) {
	const { post, prev, next } = await loadPost(slug);

	return <View post={post} prev={prev} next={next} />;
}
