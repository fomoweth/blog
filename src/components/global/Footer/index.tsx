import Link from "next/link";

import { loadAuthor } from "@/sanity/lib/queries";

import Banner from "./Banner";
import Navigation from "./Navigation";

export default async function Footer() {
	const author = await loadAuthor();

	return (
		<footer className="relative inset-0 z-10 w-screen bg-black pt-20">
			<div className="relative mx-auto max-w-screen-xl px-5 md:px-8">
				<div className="mx-auto flex h-full w-full flex-col gap-y-5 pb-10 md:flex-row">
					<div className="mx-auto flex flex-col items-start gap-y-2 pt-8 lg:gap-y-4">
						<span className="mt-0.5 text-xl text-zinc-50 lg:text-3xl">
							Ryan Kim's Portfolio | Dev Blog.
						</span>

						<span className="text-lg text-gray-400 md:ml-1">
							Built with{" "}
							<Link
								className="text-zinc-50 underline-offset-2 transition-all duration-200 hover:underline"
								href="https://nextjs.org/docs"
								rel="noopener noreferrer"
								target="_blank"
							>
								NextJS
							</Link>{" "}
							and{" "}
							<Link
								className="text-zinc-50 underline-offset-2 transition-all duration-200 hover:underline"
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
					value="rkim.xyz"
				/>
			</div>

			<div className="mx-auto flex h-20 w-full items-center justify-center border-t border-zinc-400 bg-transparent text-sm text-zinc-400 backdrop-blur-md">
				&copy; 2024 &bull; Ryan Kim &bull; v2.0.0
			</div>
		</footer>
	);
}
