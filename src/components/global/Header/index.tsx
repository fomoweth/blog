import { groq } from "next-sanity";

import { cn } from "@/lib/utils";
import fetch from "@/sanity/lib/fetch";
import Navigation from "./Navigation";

export default async function Header() {
	const { title, paths } = await fetch<{
		title: string;
		paths: Array<string>;
	}>({
		query: groq`
			*[_type == "settings"][0] {
				title,
				paths[]
			}
		`,
	});

	return (
		<header
			className={cn(
				"border-divider sticky inset-x-0 top-0 z-30 h-16 w-full border-b bg-transparent text-zinc-300 backdrop-blur-xl backdrop-saturate-150",
			)}
		>
			<div
				className={cn(
					"flex h-full max-w-screen-2xl items-center justify-between lg:mx-auto",
				)}
			>
				<Navigation
					paths={paths || ["/projects", "/blog"]}
					title={title}
				/>
			</div>
		</header>
	);
}
