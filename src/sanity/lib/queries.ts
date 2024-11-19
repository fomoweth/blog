import { groq } from "next-sanity";

import fetch from "./fetch";

const ASSET = groq`
	...,
	asset ->,
`;

const NAVIGATION = groq`
	enabled,
	"headings": select(
		enabled => ^.content[style in ["h2", "h3"]] {
			style,
			"text": pt::text(@)
		}
	),
`;

const POST_PARTIAL = groq`
	coverImage { ${ASSET} },
	title,
	slug,
	excerpt,
	category ->,
	tags[],
	date,
	sourceCode,
	featured,
`;

const POST = groq`
	coverImage { ${ASSET} },
	title,
	slug,
	excerpt,
	tags[],
	category ->,
	date,
	sourceCode,
	content[] {
		...,
		asset ->,
		markDefs[] {
			...,
			_type == "internalLink" => {
				"slug": @.reference -> slug
			}
		}
	},
	navigation { ${NAVIGATION} },
	featured,
	relatedPosts[] -> { ${POST_PARTIAL} }
`;

const PROJECT = groq`
	title,
	slug,
	description,
	category,
	duration,
	sourceCode,
	stacks[],
	protocols[] -> {
		icon { ${ASSET} },
		label,
		slug,
		ticker,
		link
	},
	bulletPoints[],
	featured
`;

export async function loadLandingPage() {
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
			"projects": *[_type == "project" && defined(slug.current) && featured == true] | order(duration.start desc) {
				...,
				${PROJECT}
			},
			"posts": *[_type == "post" && defined(slug.current) && category.slug != "misc"] | order(date, asc) {
				${POST_PARTIAL}
			}
		}`,
		params: {},
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

export async function loadPosts() {
	const query = groq`
			*[_type == "post" && defined(slug.current)] | order(date, desc) {
				...,
				${POST}
			}
		`;

	return await fetch<Array<Sanity.Post>>({
		query,
		params: {},
		tags: ["post"],
	});
}

export async function loadPost(slug: string) {
	return await fetch<{
		post: Sanity.Post;
		prev?: Sanity.PostPartial;
		next?: Sanity.PostPartial;
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
			*[_type == "category" && defined(slug.current)] | order(title) {
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
				icon { ${ASSET} }
			}
		`,
		params: {},
		tags: ["protocol"],
	});
}
