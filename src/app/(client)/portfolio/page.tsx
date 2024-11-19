import View from "@/components/views/Portfolio";

import { constructMetadata } from "@/lib/utils";
import {
	loadProjects,
	loadProtocols,
	loadSettings,
} from "@/sanity/lib/queries";

export const metadata = constructMetadata({
	title: "Portfolio",
	description: "Explore my hands-on work in smart contract development.",
});

export default async function Page() {
	const [projects, protocols, settings] = await Promise.all([
		loadProjects(),
		loadProtocols(),
		loadSettings(),
	]);

	return (
		<View
			contacts={settings.contacts}
			projects={projects}
			protocols={protocols}
		/>
	);
}
