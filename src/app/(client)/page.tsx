import View from "@/components/views/LandingPage";

import { loadLandingPage } from "@/sanity/lib/queries";

export default async function Page() {
	const { author, expertise, experiences, projects, posts } =
		await loadLandingPage();

	return (
		<View
			author={author}
			expertise={expertise}
			experiences={experiences}
			projects={projects}
			posts={posts.slice(posts.length - 4).reverse()}
		/>
	);
}
