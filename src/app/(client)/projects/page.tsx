import View from "@/components/views/Projects";

import { loadAuthor, loadProjects } from "@/sanity/lib/queries";

export default async function Page() {
	const [author, projects] = await Promise.all([
		loadAuthor(),
		loadProjects(),
	]);

	return <View author={author} projects={projects} />;
}
