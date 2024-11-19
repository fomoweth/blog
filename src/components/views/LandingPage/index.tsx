"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

import AppLayout from "@/components/layouts/AppLayout";
import Parallax from "@/components/layouts/Parallax";

import About from "./About";
import Experience from "./Experience";
import Expertise from "./Expertise";
import Hero from "./Hero";
import LatestPosts from "./LatestPosts";
import Profile from "./Profile";
import TechnicalProjects from "./TechnicalProjects";

interface Props {
	settings: Sanity.Settings;
	experiences: Array<Sanity.Experience>;
	expertise: Array<Sanity.Expertise>;
	posts: Array<Sanity.PostPartial>;
	projects: Array<Sanity.Project>;
}

export default function LandingPage({
	settings,
	experiences,
	expertise,
	posts,
	projects,
}: Props) {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});

	return (
		<AppLayout className="w-screen space-y-40">
			<motion.div
				className="relative mx-auto max-w-screen-2xl md:h-[400vh] md:space-y-40 md:px-5 md:py-10"
				ref={ref}
			>
				<Parallax
					className="bg-cobalt-blue text-white"
					index={0}
					progress={scrollYProgress}
					total={4}
				>
					<Hero />
				</Parallax>
				<Parallax
					className="bg-slate-200"
					index={1}
					progress={scrollYProgress}
					total={4}
				>
					<Profile
						contacts={settings.contacts}
						resume={settings.resume}
					/>
				</Parallax>
				<Parallax
					className="bg-slate-100"
					index={2}
					progress={scrollYProgress}
					total={4}
				>
					<About />
				</Parallax>
				<Parallax
					className="bg-[#E4EAFB]"
					index={3}
					progress={scrollYProgress}
					total={4}
				>
					<Experience items={experiences} />
				</Parallax>
			</motion.div>

			<motion.div className="relative mx-auto bg-black">
				<Expertise
					className="relative h-[200vh] bg-[#0C162C] md:px-10"
					items={expertise}
					range={["0%", "-85%"]}
				/>
				<TechnicalProjects
					className="relative bg-[#E4EAFB] pb-10"
					items={projects}
				/>
				<LatestPosts
					className="relative rounded-b-6xl bg-[#161617] pt-8 md:pt-8 lg:pt-10"
					items={posts}
				/>
			</motion.div>
		</AppLayout>
	);
}
