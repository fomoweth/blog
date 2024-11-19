import type { Metadata } from "next";

import View from "@/components/views/LandingPage";

import { loadLandingPage } from "@/sanity/lib/queries";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({});

export default async function Page() {
	const { settings, expertise, experiences, projects, posts } =
		await loadLandingPage();

	return (
		<View
			settings={settings}
			expertise={expertise}
			experiences={experiences}
			projects={projects}
			posts={posts}
		/>
	);
}
