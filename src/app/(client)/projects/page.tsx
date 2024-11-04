import View from "@/components/views/Projects";

import { loadAuthor, loadProjects, loadProtocols } from "@/sanity/lib/queries";

export default async function Page() {
	const [author, projects, protocols] = await Promise.all([
		loadAuthor(),
		loadProjects(),
		loadProtocols(),
	]);

	return <View author={author} projects={projects} protocols={protocols} />;
}
