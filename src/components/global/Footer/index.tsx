import Link from "next/link";
import { groq } from "next-sanity";

import fetch from "@/sanity/lib/fetch";

import Banner from "./Banner";
import Navigation from "./Navigation";

export default async function Footer() {
	const { contacts, resume } = await fetch<{
		contacts: Array<Sanity.Contact>;
		resume: Sanity.Asset;
	}>({
		query: groq`
			*[_type == "author"][0] {
				contacts[] { ... },
				resume { ..., asset -> }
			}
		`,
	});

	return (
		<footer className="relative inset-0 z-10 w-screen bg-black md:pt-10">
			<div className="relative mx-auto max-w-screen-xl px-5 md:px-8">
				<div className="mx-auto flex h-full w-full flex-col gap-y-5 pb-10 md:flex-row">
					<div className="mx-auto flex flex-col items-start gap-y-2 pt-8 lg:gap-y-4">
						<span className="mt-0.5 text-xl text-primary-foreground lg:text-3xl">
							Ryan Kim's Portfolio | Dev Blog.
						</span>

						<span className="text-lg text-gray-400 md:ml-1">
							Built with{" "}
							<Link
								className="text-primary-foreground underline-offset-2 transition-all duration-200 hover:underline"
								href="https://nextjs.org/docs"
								rel="noopener noreferrer"
								target="_blank"
							>
								NextJS
							</Link>{" "}
							and{" "}
							<Link
								className="text-primary-foreground underline-offset-2 transition-all duration-200 hover:underline"
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
						contacts={contacts}
						resume={resume}
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
