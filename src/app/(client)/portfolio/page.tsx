import View from "@/components/views/Portfolio";

import { constructMetadata } from "@/lib/utils";
import { loadAuthor, loadProjects, loadProtocols } from "@/sanity/lib/queries";

export const metadata = constructMetadata({
	title: "Portfolio",
	description: "Explore my hands-on work in smart contract development.",
});

export default async function Page() {
	const [author, projects, protocols] = await Promise.all([
		loadAuthor(),
		loadProjects(),
		loadProtocols(),
	]);

	return <View author={author} projects={projects} protocols={protocols} />;
}
