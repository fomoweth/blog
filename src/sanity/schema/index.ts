import category from "./documents/category";
import experience from "./documents/experience";
import expertise from "./documents/expertise";
import post from "./documents/post";
import project from "./documents/project";
import protocol from "./documents/protocol";

import content from "./objects/content";
import duration from "./objects/duration";

import settings from "./singletons/settings";

const schema = {
	singletons: { settings },
	documents: {
		category,
		experience,
		expertise,
		post,
		project,
		protocol,
	},
	objects: {
		content,
		duration,
	},
	types: [
		// singletons
		settings,

		// documents
		category,
		experience,
		expertise,
		post,
		project,
		protocol,

		// objects
		content,
		duration,
	],
};

export default schema;
