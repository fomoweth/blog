import { groq } from "next-sanity";

import { cn } from "@/lib/utils";

import Navigation from "./Navigation";
import Wrapper from "./Wrapper";

export default async function Header() {
	return (
		<Wrapper
			className={cn(
				"fixed inset-x-0 top-0 z-30 inline-flex h-20 w-screen overflow-hidden",
				"border-b border-zinc-300 bg-transparent backdrop-blur-sm backdrop-saturate-100",
			)}
		>
			<div className="relative mx-auto inline-flex h-full w-full max-w-screen-2xl items-center justify-between p-5 pr-10">
				<Navigation
					className="hidden h-full w-full items-center justify-between gap-x-10 md:inline-flex"
					paths={[
						{ href: "/projects", label: "projects" },
						{ href: "/blog", label: "blog" },
					]}
					title="rkim.xyz"
				/>
			</div>
		</Wrapper>
	);
}
