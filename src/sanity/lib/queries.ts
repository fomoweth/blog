import { groq } from "next-sanity";

import fetch from "./fetch";

const ASSET = groq`
	...,
	asset ->,
`;

const DOCUMENT = groq`
	_id,
	_type,
	_createdAt,
	_updatedAt,
	_rev
`;

const POST_PARTIAL = groq`
	${DOCUMENT},
	coverImage { ${ASSET} },
	title,
	slug,
	excerpt,
	category ->,
	"tags": coalesce(tags[featured == true].label, []) [0...3],
	date,
	sourceCode,
	featured
`;

const POST = groq`
	${POST_PARTIAL},
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
	"navigation": { 
		"enabled": navigated,
		"headings": select(
			navigated => content[style in ["h2", "h3", "h4", "h5", "h6"]] {
				style,
				"text": pt::text(@)
			}
		),
	},
	relatedPosts[] -> { ${POST_PARTIAL} }
`;

const PROJECT = groq`
	${DOCUMENT},
	title,
	slug,
	description,
	category,
	duration,
	sourceCode,
	deployments[] {
		label,
		address,
		addresses[] {
			chain ->,
			address,
		},
	},
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
		expertise: Array<Sanity.Expertise>;
		experiences: Array<Sanity.Experience>;
		projects: Array<Sanity.Project>;
		posts: Array<Sanity.PostPartial>;
	}>({
		query: groq`{
			"settings": *[_type == "settings"][0] {
				${DOCUMENT},
				ogImage { ${ASSET} },
				title,
				description,
				keywords[],
				paths[],
				copyright,
				contacts[] { ..., "color": upper(color.hex) },
				location,
				resume { ${ASSET} }
			},
			"expertise": *[_type == "expertise"] | order(id asc) {
				${DOCUMENT},
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
				${DOCUMENT},
				logo { ${ASSET} },
				title,
				description,
				link,
				position,
				duration,
				roles[]
			},
			"projects": *[_type == "project" && defined(slug.current) && featured == true] | order(duration.start desc) [0...4] {
				${PROJECT}
			},
			"posts": *[_type == "post" && defined(slug.current) && category -> slug.current != "misc"] | order(date desc) [0...4] {
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
				${DOCUMENT},
				ogImage { ${ASSET} },
				title,
				description,
				keywords[],
				paths[],
				copyright,
				contacts[] { ..., "color": upper(color.hex) },
				location,
				resume { ${ASSET} }
			}
		`,
		params: {},
		tags: ["settings"],
	});
}

export async function loadProjects() {
	return await fetch<Array<Sanity.Project>>({
		query: groq`
			*[_type == "project" && defined(slug.current)] | order(duration.start desc) {
				${PROJECT}
			}
		`,
		params: {},
		tags: ["project"],
	});
}

export async function loadPosts() {
	return await fetch<Array<Sanity.PostPartial>>({
		query: groq`
			*[_type == "post" && defined(slug.current)] | order(date desc) {
				${POST_PARTIAL}
			}
		`,
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
				_type,
				title,
				slug,
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
			*[_type == "protocol" && defined(slug.current)] | order(label) {
				${DOCUMENT},
				label,
				slug,
				ticker,
				icon { ${ASSET} },
				link
			}
		`,
		params: {},
		tags: ["protocol"],
	});
}
