import { groq } from "next-sanity";

import siteConfig from "@/config";
import fetch from "@/sanity/lib/fetch";

import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import Wrapper from "./Wrapper";

export default async function Header() {
	const { contacts } = await fetch<{ contacts: Array<Sanity.Contact> }>({
		query: groq`
			*[_type == "author"][0] {
				contacts[] { ... },
			}
		`,
	});

	return (
		<Wrapper className="fixed inset-x-0 top-0 z-30 inline-flex h-20 w-screen bg-transparent backdrop-blur-sm backdrop-saturate-100 md:overflow-hidden">
			<div className="container relative inline-flex items-center justify-between p-5">
				<Navigation
					className="hidden h-full w-full items-center justify-between gap-x-10 md:inline-flex"
					paths={siteConfig.paths}
					title={siteConfig.title}
				/>

				<MobileNavigation
					className="absolute right-4 top-4 flex h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] md:hidden"
					contacts={contacts}
					paths={[{ href: "/", label: "home" }, ...siteConfig.paths]}
					title={siteConfig.title}
				/>
			</div>
		</Wrapper>
	);
}
