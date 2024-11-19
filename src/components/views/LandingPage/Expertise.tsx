import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import { urlForImage } from "@/sanity/lib/utils";

interface Props {
	className?: string;
	items: Array<Sanity.Expertise>;
	range: [string, string];
}

export default function Expertise({ className, items, range }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({ target: ref });

	const x = useTransform(scrollYProgress, [0, 1], range);

	const format = (domain: Sanity.Domain) => {
		switch (domain) {
			case "web3":
				return (
					<>
						WEB<sup>3</sup>
					</>
				);

			case "database":
				return "DB";

			case "programming-languages":
			case "spoken-languages":
				return domain.replace("-", " ");

			default:
				return domain;
		}
	};

	const resolveColor = (domain: Sanity.Domain) => {
		switch (domain) {
			case "programming-languages":
				return {
					backgroundColor: "#F2F2F2",
					color: "black",
				};

			case "web3":
				return {
					backgroundColor: "#0F61FF",
					color: "white",
				};

			case "front-end":
				return {
					backgroundColor: "#E1F5EB",
					color: "black",
				};

			case "back-end":
				return {
					backgroundColor: "#E8E8E8",
					color: "black",
				};

			case "database":
				return {
					backgroundColor: "#E9D9F5",
					color: "black",
				};

			case "spoken-languages":
				return {
					backgroundColor: "#FF5625",
					color: "white",
				};
		}
	};

	return (
		<div className={className} ref={ref}>
			<section className="sticky top-0 mx-auto flex h-screen max-w-screen-2xl flex-col place-content-center items-start space-y-8 overflow-hidden p-8 md:space-y-12">
				<h2 className="title h2 inline-block text-zinc-200">
					Expertise
					<span className="ml-2 inline-block size-2 bg-cobalt-blue md:size-2.5 lg:size-3" />
				</h2>

				<motion.div className="flex gap-5 px-5 md:px-10" style={{ x }}>
					{items.map(({ domain, skills }, idx) => (
						<motion.div
							key={idx}
							id={domain}
							className="relative flex h-[350px] w-[350px] flex-col gap-y-8 rounded-2xl p-8"
							style={{ ...resolveColor(domain) }}
						>
							<h3 className="relative font-roboto-mono text-3xl uppercase leading-snug tracking-wide">
								{format(domain)}
							</h3>

							<div className="relative flex flex-col items-start justify-center gap-y-8">
								{skills.map(({ label, link, logo }) =>
									link && logo ? (
										<Link
											key={label}
											className="group flex items-center gap-x-4 px-2"
											href={link}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												src={urlForImage(logo.asset)
													.width(32)
													.height(32)
													.fit("crop")
													.url()}
												alt={label}
												height={32}
												width={32}
											/>
											<span className="font-roboto-mono text-2xl font-light group-hover:underline">
												{label}
											</span>
										</Link>
									) : (
										<span
											key={label}
											className="flex items-center gap-x-2 font-roboto-mono text-2xl font-light"
										>
											<span className="text-4xl">
												&bull;
											</span>{" "}
											{label}
										</span>
									),
								)}
							</div>
						</motion.div>
					))}
				</motion.div>
			</section>
		</div>
	);
}
