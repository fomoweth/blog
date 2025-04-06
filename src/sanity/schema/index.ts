import category from "./documents/category";
import chain from "./documents/chain";
import experience from "./documents/experience";
import expertise from "./documents/expertise";
import post from "./documents/post";
import project from "./documents/project";
import protocol from "./documents/protocol";

import content from "./objects/content";
import deployment from "./objects/deployment";
import duration from "./objects/duration";
import logo from "./objects/logo";

import author from "./singletons/author";
import settings from "./singletons/settings";

const schema = {
	singletons: { author, settings },
	documents: {
		category,
		chain,
		experience,
		expertise,
		post,
		project,
		protocol,
	},
	objects: {
		content,
		deployment,
		duration,
		logo,
	},
	types: [
		// singletons
		author,
		settings,

		// documents
		category,
		chain,
		experience,
		expertise,
		post,
		project,
		protocol,

		// objects
		content,
		deployment,
		duration,
		logo,
	],
};

export default schema;
