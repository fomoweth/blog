"use client";

import { useMemo, useState } from "react";

import AppLayout from "@/components/layouts/AppLayout";

import Callout from "@/components/global/Callout";
import IconCloud from "@/components/global/IconCloud";
import Terminal from "@/components/global/Terminal";

import { cn } from "@/lib/utils";

import Panel from "./Panel";
import SlidingDisplay from "./SlidingDisplay";

interface Props {
	contacts: Array<Sanity.Contact>;
	projects: Array<Sanity.Project>;
	protocols: Array<Sanity.Protocol>;
}

export default function Portfolio({ contacts, projects, protocols }: Props) {
	const [current, setCurrent] = useState<number>(0);

	const github = useMemo(
		() => contacts.find(({ label }) => label.toLowerCase() === "github")!,
		[contacts],
	);

	const icons = useMemo(
		() =>
			protocols.map(({ icon, label, link }) => ({
				href: link,
				label,
				src: icon.asset.url,
			})),
		[protocols],
	);

	return (
		<AppLayout className="w-screen bg-background pb-20">
			<div className="pointer-events-none fixed inset-0 z-0 !m-0 mx-auto grid h-screen w-full place-content-center overflow-hidden bg-background lg:px-20">
				<IconCloud items={icons} />
			</div>

			<section className="relative top-10 mx-auto max-w-6xl px-4 lg:top-0 lg:px-10">
				<SlidingDisplay
					className="w-[65%] max-w-screen-md"
					index={current}
				>
					<Terminal
						className="mx-auto w-full max-w-screen-lg"
						keys={[
							"title",
							"description",
							"duration",
							"deployments",
							"sourceCode",
							"bulletPoints",
						]}
						value={projects[current]}
					/>
				</SlidingDisplay>

				<div className="-mt-[100vh] hidden lg:block" />

				{projects.map((project, idx) => (
					<Panel
						key={project._id}
						className={cn(
							"top-14 w-full lg:-top-10 lg:w-[30%]",
							idx === projects.length - 1 &&
								"mb-20 lg:mb-0 lg:mt-20",
						)}
						index={idx}
						project={project}
						offset={400}
						setter={setCurrent}
					/>
				))}
			</section>

			<Callout
				className="relative w-4/5 max-w-screen-xl bg-[#1D1D1E] text-primary-foreground md:w-full"
				level={2}
				title={
					<h3 className="text-balance text-center text-lg font-medium tracking-wide md:text-start md:text-xl lg:text-pretty xl:text-2xl">
						Explore My GitHub for Source Code and More Details of My
						Projects.
					</h3>
				}
				links={[
					{
						href: github.href,
						text: "Go to GitHub",
						variant: "secondary",
					},
				]}
			/>
		</AppLayout>
	);
}
