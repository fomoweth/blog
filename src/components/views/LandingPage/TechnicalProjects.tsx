import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import Terminal from "@/components/global/Terminal";

interface Props {
	className: string;
	items: Array<Sanity.Project>;
}

export default function TechnicalProjects({ className, items }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const step = 1 / (items.length || 1);

	const renderedItems = items.map((item, idx) => {
		const end = step * (idx + 1);
		const start = end - step;

		const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

		const scale = useTransform(scrollYProgress, [start, end], [1, 0.75]);

		return (
			<Terminal
				key={item._id}
				className="mx-auto w-full max-w-screen-md"
				value={item}
				style={{ opacity, scale }}
			/>
		);
	});

	return (
		<div className={className}>
			<motion.section className="relative mx-auto grid h-full w-[95%] max-w-screen-2xl grid-cols-1 lg:grid-cols-5 lg:gap-5">
				<div className="top-0 mx-auto my-20 flex w-[85%] flex-col items-center justify-center space-y-8 text-center lg:sticky lg:col-span-2 lg:my-0 lg:h-screen lg:w-[95%]">
					<h2 className="title h2 inline-block tracking-tight text-gray-700">
						Technical Projects
						<span className="ml-1 inline-block size-2 bg-cobalt-blue md:size-2.5 lg:size-3" />
					</h2>

					<p className="text-pretty text-center text-lg font-medium leading-relaxed tracking-wide text-gray-600 md:text-xl lg:text-2xl xl:text-3xl">
						Building smart contracts to shape a decentralized
						future.
					</p>

					<Link
						className="btn transform bg-gray-900 px-5 py-2 tracking-wider transition-colors duration-300 hover:bg-gray-700"
						href="/portfolio"
					>
						View All Projects
					</Link>
				</div>

				<div className="relative lg:col-span-3">
					<div className="sticky top-0 z-10 hidden h-24 w-full bg-gradient-to-b lg:block" />

					<div
						className="relative z-0 mx-auto flex flex-col gap-6 lg:gap-12"
						ref={ref}
					>
						{renderedItems}
					</div>

					<div className="h-24 w-full lg:h-48" />
				</div>
			</motion.section>
		</div>
	);
}
