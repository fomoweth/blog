"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import Breadcrumbs from "@/components/global/Breadcrumbs";
import AppLayout from "@/components/layouts/AppLayout";

import Callout from "@/components/global/Callout";
import Terminal from "@/components/global/Terminal";

import { cn } from "@/lib/utils";

import Panel from "./Panel";
import SlidingDisplay from "./SlidingDisplay";

interface Props {
	author: Sanity.Author;
	projects: Array<Sanity.Project>;
}

export default function Projects({ author, projects }: Props) {
	const [current, setCurrent] = useState<number>(0);

	const github = useMemo(
		() =>
			author.contacts.find(
				(value) => value.label.toLowerCase() === "github",
			)!,
		[author],
	);

	return (
		<AppLayout className="w-screen bg-[#E4EAFB]">
			<Breadcrumbs className="top-20 mx-auto w-full max-w-screen-2xl md:px-10" />

			<section className="relative inset-x-0 top-20 mx-auto w-full px-4 md:-top-20 md:px-10">
				<div className="-mt-[100vh] hidden md:block" />

				<SlidingDisplay className="w-3/5 py-8" index={current}>
					<Terminal
						className="mx-auto w-full max-w-screen-md"
						keys={[
							"title",
							"description",
							"duration",
							"protocols",
							"bulletPoints",
						]}
						value={projects[current]}
					/>
				</SlidingDisplay>

				{projects.map((project, idx) => (
					<Panel
						key={project._id}
						className="mx-auto flex w-full max-w-screen-2xl items-center"
						index={idx}
						item={project}
						offset={400}
						setter={setCurrent}
					/>
				))}

				<hr className="mx-auto max-w-screen-2xl border-zinc-300" />
			</section>

			<div className="relative inset-x-0 bottom-10 mx-auto w-full">
				<Callout
					className="max-w-screen-xl bg-[#1D1D1E]"
					content={
						<h3 className="text-lg font-medium tracking-wide text-zinc-200 md:text-xl lg:text-xl">
							Explore My GitHub for Source Code and More Details
							of My Projects.
						</h3>
					}
					cta={{ href: github.href, label: "Go to GitHub" }}
				/>
			</div>
		</AppLayout>
	);
}
