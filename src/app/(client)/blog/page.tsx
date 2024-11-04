import View from "@/components/views/Blog";

import { constructMetadata } from "@/lib/utils";
import { loadCategories, loadPosts } from "@/sanity/lib/queries";

export const metadata = constructMetadata({
	title: "Blog",
	description:
		"Stay up-to-date with my latest projects and insights into smart contract engineering.",
});

export default async function Page() {
	const [categories, posts] = await Promise.all([
		loadCategories(),
		loadPosts(),
	]);

	return <View categories={categories} posts={posts.reverse()} />;
}
