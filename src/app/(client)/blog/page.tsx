import View from "@/components/views/Blog";

import { loadCategories, loadPosts } from "@/sanity/lib/queries";

export default async function Page() {
	const [categories, posts] = await Promise.all([
		loadCategories(),
		loadPosts(),
	]);

	return <View categories={categories} posts={posts.reverse()} />;
}
