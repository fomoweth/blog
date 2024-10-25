import Link from "next/link";

import { loadAuthor } from "@/sanity/lib/queries";

import Banner from "./Banner";
import Navigation from "./Navigation";

export default async function Footer() {
	const author = await loadAuthor();

	return (
		<footer className="sticky inset-x-0 bottom-0 z-0 w-screen overflow-hidden pt-20">
			<div className="mx-auto max-w-screen-xl px-5 md:px-8">
				<div className="mx-auto flex h-full w-full flex-col pb-10 md:flex-row">
					<div className="flex w-full flex-col items-center gap-y-2 pt-8 md:w-1/2 md:items-start lg:gap-y-5">
						<span className="mt-0.5 text-xl text-zinc-200 lg:text-3xl">
							Ryan Kim's Portfolio | Dev Blog.
						</span>
						<span className="ml-1 text-lg text-neutral-500">
							Built with{" "}
							<Link
								className="transition-all duration-200 hover:text-zinc-200 hover:underline"
								href="https://nextjs.org/docs"
								rel="noopener noreferrer"
								target="_blank"
							>
								NextJS
							</Link>{" "}
							and{" "}
							<Link
								className="transition-all duration-200 hover:text-zinc-200 hover:underline"
								href="https://www.sanity.io/docs"
								rel="noopener noreferrer"
								target="_blank"
							>
								Sanity
							</Link>
							.
						</span>
					</div>
					<Navigation
						className="mx-auto w-full gap-y-5 py-8 md:w-1/2"
						author={author}
						paths={[
							{ href: "/", label: "home" },
							{ href: "/projects", label: "projects" },
							{ href: "/blog", label: "blog" },
						]}
					/>
				</div>
				<Banner
					className="relative mx-auto flex h-full w-full items-center justify-center overflow-hidden"
					text="rkim.xyz"
				/>
			</div>
			<div className="mx-auto flex h-20 w-full items-center justify-center border-t border-zinc-500 bg-transparent text-sm text-zinc-500 backdrop-blur-md">
				&copy; 2024 &bull; Ryan Kim &bull; v2.0.0
			</div>
		</footer>
	);
}
