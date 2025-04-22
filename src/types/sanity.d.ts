import type { PortableTextBlock } from "next-sanity";
import type {
	Asset as SanityAsset,
	ImageAsset as SanityImage,
	SanityDocument,
	TypedObject,
} from "sanity";
import { CodeInputValue } from "@sanity/code-input";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { TableRow } from "@sanity/table";

declare global {
	namespace Sanity {
		// documents

		interface Settings extends SanityDocument {
			_type: "settings";
			ogImage: Image;
			title: string;
			description: string;
			keywords: Array<string>;
			paths: Array<{ label: string; href: string }>;
			copyright: Array<PortableTextBlock>;
			numberOfProjects: number;
			numberOfPosts: number;
			contacts: Array<Contact>;
			location: string;
			resume: Asset;
		}

		interface Category extends SanityDocument {
			_type: "category";
			title: string;
			slug: Slug;
			numberOfPosts: number;
		}

		interface Chain extends SanityDocument {
			_type: "chain";
			chainId: number;
			label: string;
			slug: Slug;
			etherscan: string;
			isTestnet: boolean;
			icon: Image;
			logo: Logo;
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
			featured: boolean;
			navigation: Navigation;
			content: Array<PortableTextBlock>;
			relatedPosts: Array<PostPartial>;
		}

		type PostPartial = Pick<
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
		>;

		interface Project extends SanityDocument {
			_type: "project";
			title: string;
			slug: Slug;
			description: string;
			tags: Array<string>;
			category: "personal" | "work";
			duration: Duration;
			deployments?: Array<Deployment>;
			sourceCode?: string;
			stacks: Array<string>;
			protocols?: Array<Protocol>;
			bulletPoints: Array<string>;
			featured: boolean;
		}

		interface Protocol extends SanityDocument {
			_type: "protocol";
			label: string;
			slug: Slug;
			ticker: string;
			link: string;
			icon: Image;
		}

		// objects

		interface Asset {
			_type: "file" | "image" | string;
			asset: SanityAsset;
		}

		interface Code extends TypedObject {
			_type: "code";
			code: string;
			filename?: string;
			language: string;
			highlightedLines?: Array<number>;
		}

		interface Contact {
			_key: string;
			label: string;
			href: string;
			color: string;
		}

		interface Deployment extends TypedObject {
			_type: "deployment";
			label: string;
			address?: string;
			addresses?: Array<{
				chain: Chain;
				address: string;
			}>;
		}

		type Domain =
			| "programming-languages"
			| "web3"
			| "front-end"
			| "back-end"
			| "database"
			| "spoken-languages";

		interface Duration {
			_type: "duration";
			start: string;
			end: string;
		}

		interface Heading {
			style: "h2" | "h3" | "h4" | "h5" | "h6";
			text: string;
		}

		interface Image extends SanityImageObject {
			_type: "image";
			asset: SanityImage;
			alt?: string;
			caption?: string;
			float?: "left" | "right" | "none";
		}

		interface Logo extends TypedObject {
			_type: "logo";
			default: SanityImageObject;
			light?: SanityImageObject;
			dark?: SanityImageObject;
		}

		interface Navigation {
			enabled: boolean;
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

		interface Table extends TypedObject {
			_key: string;
			_type: "table";
			caption?: string;
			label?: string;
			schema: { rows: TableRow[] };
		}
	}
}
