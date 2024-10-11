import { groq } from "next-sanity";

import fetch from "./fetch";

const ASSET = groq`
	...,
	asset ->,
`;

const NAVIGATION = groq`
	enabled,
	position,
	"headings": select(
		enabled => ^.content[style in ["h1", "h2", "h3", "h4"]] {
			style,
			"text": pt::text(@)
		}
	),
`;

export const POSTS_COUNT = groq`
	count(*[_type == "post" && references(^._id) && !(_id in path("drafts.**"))])
`;

export const POST_PARTIAL = groq`
	coverImage { ${ASSET} },
	title,
	slug,
	excerpt,
	tags[],
	category ->,
	date,
	sourceCode,
	featured
`;

export const POST = groq`
	coverImage { ${ASSET} },
	title,
	slug,
	excerpt,
	tags[],
	category ->,
	date,
	sourceCode,
	"content": select(_type == "image" => asset ->, content),
	navigation { ${NAVIGATION} },
	featured
`;

export const PROJECT = groq`
	title,
	slug,
	description,
	category,
	duration,
	sourceCode,
	protocols[] -> {
		...,
		logo {
			default { ${ASSET} },
			light { ${ASSET} },
			dark { ${ASSET} },
		},
		icon { ${ASSET} }
	},
	bulletPoints[],
	featured
`;

const DRAFT_FILTER = groq`
	!(_id in path("drafts.**"))
`;

const SLUG_FILTER = groq`
	defined(slug.current)
`;

export async function loadLandingPage({
	slice = { start: 0, end: 5 },
}: {
	slice?: { start: number; end: number };
} = {}) {
	return await fetch<{
		settings: Sanity.Settings;
		author: Sanity.Author;
		expertise: Array<Sanity.Expertise>;
		experiences: Array<Sanity.Experience>;
		projects: Array<Sanity.Project>;
		posts: Array<Sanity.Post>;
	}>({
		query: groq`{
			"settings": *[_type == "settings"][0] {
				...,
				ogImage { ${ASSET} },
				title,
				description,
				keywords[],
				copyright,
			},
			"author": *[_type == "author"][0] {
				...,
				name,
				position,
				location,
				contacts[] { ..., "color": upper(color.hex) },
				resume { ${ASSET} }
			},
			"expertise": *[_type == "expertise"] | order(id asc) {
				...,
				id,
				domain,
				skills[] {
					...,
					label,
					logo { ${ASSET} },
					link
				}
			},
			"experiences": *[_type == "experience"] | order(duration.start desc) {
				...,
				logo { ${ASSET} },
				title,
				description,
				link,
				position,
				duration,
				roles[]
			},
			"projects": *[_type == "project" && defined(slug.current)] | order(duration.start desc) {
				...,
				${PROJECT}
			},
			"posts": *[_type == "post" && defined(slug.current)] | order(date, desc)[$start...$end] {
				${POST_PARTIAL}
			}
		}`,
		params: { ...slice },
		tags: [
			"settings",
			"author",
			"expertise",
			"experience",
			"project",
			"post",
		],
	});
}

export async function loadSettings() {
	return await fetch<Sanity.Settings>({
		query: groq`
			*[_type == "settings"][0] {
				...,
				ogImage { ${ASSET} },
				title,
				description,
				keywords[],
				copyright,
			}
		`,
		params: {},
		tags: ["settings"],
	});
}

export async function loadAuthor() {
	return await fetch<Sanity.Author>({
		query: groq`
			*[_type == "author"][0] {
				...,
				name,
				position,
				location,
				contacts[] { ..., "color": upper(color.hex) },
				resume { ${ASSET} },
			}
		`,
		params: {},
		tags: ["author"],
	});
}

export async function loadProjects() {
	return await fetch<Array<Sanity.Project>>({
		query: groq`
			*[_type == "project" && defined(slug.current)] | order(duration.start desc) {
				...,
				${PROJECT}
			}
		`,
		params: {},
		tags: ["project"],
	});
}

export async function loadProject(slug: string) {
	return await fetch<Array<Sanity.Project>>({
		query: groq`
			*[_type == "project" && slug.current == $slug][0] {
				...,
				${PROJECT}
			}
		`,
		params: { slug },
		tags: [`project:${slug}`],
	});
}

interface QueryOption {
	order?: { field: string; direction: "asc" | "desc" };
	slice?: { start: number; end: number };
}

export async function loadPosts({
	order = { field: "date", direction: "desc" },
	slice,
}: {
	order?: { field: string; direction: "asc" | "desc" };
	slice?: { start: number; end: number };
} = {}) {
	const query = slice
		? groq`
			*[_type == "post" && defined(slug.current)] | order($field, $direction)[$start...$end] {
				...,
				${POST}
			}
		`
		: groq`
			*[_type == "post" && defined(slug.current)] | order($field, $direction) {
				...,
				${POST}
			}
		`;

	return await fetch<Array<Sanity.Post>>({
		query,
		params: { ...order, ...(slice || {}) },
		tags: ["post"],
	});
}

export async function loadPost(slug: string) {
	return await fetch<{
		post: Sanity.Post;
		prev?: Sanity.Post;
		next?: Sanity.Post;
	}>({
		query: groq`
			*[_type == "post" && slug.current == $slug][0] {
				"post": {
					...,
					${POST}
				},
				"prev": *[_type == "post" && ^.date > date] | order(date desc)[0] { 
					${POST_PARTIAL}
				},
				"next": *[_type == "post" && ^.date < date] | order(date asc)[0] { 
					${POST_PARTIAL}
				},
			}
		`,
		params: { slug },
		tags: [`post:${slug}`],
	});
}

export async function loadCategories() {
	return await fetch<Array<Sanity.Category>>({
		query: groq`
			*[_type == "category" && defined(slug.current)] | order(id asc) {
				...,
				"numberOfPosts": count(*[_type == "post" && references(^._id)]),
			}
		`,
		params: {},
		tags: ["category"],
	});
}

export async function loadProtocols() {
	return await fetch<Array<Sanity.Protocol>>({
		query: groq`
			*[_type == "protocol" && defined(slug.current)] {
				...,
				label,
				slug,
				ticker,
				link,
				logo {
					default { ${ASSET} },
					light { ${ASSET} },
					dark { ${ASSET} },
				},
				icon { ${ASSET} }
			}
		`,
		params: {},
		tags: ["protocol"],
	});
}
