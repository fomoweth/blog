import type { PortableTextBlock } from "next-sanity";
import type {
	Asset as SanityAsset,
	ImageAsset as SanityImage,
	SanityDocument,
	TypedObject,
} from "sanity";
import type { ColorValue } from "@sanity/color-input";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

declare global {
	namespace Sanity {
		// singletons

		interface Settings extends SanityDocument {
			_type: "settings";
			ogImage: Image;
			title: string;
			description: string;
			keywords: Array<string>;
			copyright: Array<Block>;
		}

		interface Author extends SanityDocument {
			_type: "author";
			name: string;
			position: { title: string; startDate: string };
			location: string;
			contacts: Array<Contact>;
			resume: Asset;
		}

		// documents

		interface Category extends SanityDocument {
			_type: "category";
			id: number;
			title: string;
			slug: Slug;
			numberOfPosts: number;
		}

		interface Experience extends SanityDocument {
			_type: "experience";
			logo: Image;
			title: string;
			description: string;
			link?: string;
			position: string;
			duration: Duration;
			roles: Array<string>;
		}

		interface Expertise extends SanityDocument {
			_type: "expertise";
			id: number;
			domain: Domain;
			skills: Array<Skill>;
		}

		interface Post extends SanityDocument {
			_type: "post";
			coverImage: Image;
			title: string;
			slug: Slug;
			excerpt: string;
			category: Category;
			tags: Array<string>;
			date: string;
			sourceCode?: string;
			content: Array<Block>;
			navigation: Navigation;
			featured?: boolean;
			relatedPosts: Array<PostPartial>;
		}

		interface PostPartial
			extends Pick<
				Post,
				| "coverImage"
				| "title"
				| "slug"
				| "excerpt"
				| "category"
				| "tags"
				| "date"
				| "sourceCode"
				| "featured"
			> {}

		interface Project extends SanityDocument {
			_type: "project";
			title: string;
			slug: Slug;
			description: string;
			tags: Array<string>;
			category: "personal" | "work";
			duration: Duration;
			sourceCode?: string;
			protocols: Array<Protocol>;
			bulletPoints: Array<string>;
			featured?: boolean;
		}

		interface Protocol extends SanityDocument {
			_type: "protocol";
			label: string;
			slug: Slug;
			ticker: string;
			link: string;
			logo: {
				default: Image;
				light?: Image;
				dark?: Image;
			};
			icon: Image;
		}

		// objects

		interface Contact {
			_key: string;
			label: string;
			href: string;
			color: string;
		}

		interface Duration {
			_type: "duration";
			start: string;
			end: string;
		}

		interface Navigation {
			enabled: boolean;
			position: "left" | "right";
			headings: Array<Heading>;
		}

		interface Skill extends TypedObject {
			_type: "skill";
			label: string;
			logo?: Image;
			link?: string;
		}

		interface Slug {
			_type: "slug";
			current: string;
		}

		interface Asset {
			_type: "file" | "image" | string;
			asset: SanityAsset;
		}

		interface Code extends TypedObject {
			_type: "code";
			language: string;
			code: string;
			filename?: string;
			highlightedLines?: Array<number>;
		}

		interface Image extends SanityImageObject {
			_type: "image";
			asset: SanityImage;
			alt?: string;
			caption?: string;
		}

		type Block = PortableTextBlock;

		type Domain =
			| "programming-languages"
			| "web3"
			| "front-end"
			| "back-end"
			| "database"
			| "spoken-languages";

		interface Heading {
			style: "h2" | "h3" | "h4" | "h5" | "h6";
			text: string;
		}
	}
}
