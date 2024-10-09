import {
	defineDocuments,
	defineLocations,
	PresentationPluginOptions,
} from "sanity/presentation";

const resolve: PresentationPluginOptions["resolve"] = {
	mainDocuments: defineDocuments([
		{
			route: "/blog/:slug",
			filter: `_type == "post" && slug.current == $slug`,
		},
	]),
	locations: {
		settings: defineLocations({
			message: "This document is used on all pages",
			tone: "caution",
		}),
		project: defineLocations({
			locations: [
				{
					title: "Projects",
					href: "/projects",
				},
			],
		}),
		post: defineLocations({
			select: { title: "title", slug: "slug.current" },
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title!,
						href: `/blog/${doc?.slug!}`,
					},
					{
						title: "Posts",
						href: "/blog",
					},
				],
			}),
		}),
	},
};

export default resolve;
