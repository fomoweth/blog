import { groq } from "next-sanity";

import fetch from "@/sanity/lib/fetch";
import Navigation from "./Navigation";
import Wrapper from "./Wrapper";

export default async function Header() {
	const { title, paths, contacts } = await fetch<{
		title: string;
		paths: Array<string>;
		contacts: Array<Sanity.Contact>;
	}>({
		query: groq`
			*[_type == "settings"][0] {
				title,
				paths[],
				"contacts": *[_type == "author"][0].contacts[] {
					...,
					"color": upper(color.hex)
				},
			}
		`,
	});

	return (
		<Wrapper className="border-b border-black/10 dark:border-slate-500">
			<div className="relative flex h-full w-full max-w-screen-2xl items-center justify-between lg:mx-auto">
				<Navigation
					paths={[
						{ href: "/projects", label: "projects" },
						{ href: "/blog", label: "blog" },
					]}
					title={title}
				/>
			</div>
		</Wrapper>
	);
}
