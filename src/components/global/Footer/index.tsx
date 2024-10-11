import { groq, toPlainText } from "next-sanity";

import fetch from "@/sanity/lib/fetch";
import Side from "./Side";

export default async function Footer() {
	const { copyright, email, socialMedia } = await fetch<{
		email: string;
		socialMedia: Array<string>;
		copyright: Array<Sanity.Block>;
	}>({
		query: groq`
			*[_type == "author"][0] {
				"email": contacts[href match "mailto*"][0].href,
				"socialMedia": contacts[href match "https*"].href,
				"copyright": *[_type == "settings"][0].copyright
			}
		`,
	});

	return (
		<footer className="z-10 h-16 bg-transparent">
			<Side content={socialMedia} position="left" />
			<Side content={email} position="right" />

			<div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
				{toPlainText(copyright)}
			</div>
		</footer>
	);
}
