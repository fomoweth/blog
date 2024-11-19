import { useCallback } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import SocialButton from "@/components/elements/SocialButton";
import TranslateWrapper from "@/components/global/TranslateWrapper";
import { CV, Download } from "@/components/icons";

import { cn } from "@/lib/utils";

interface Props {
	contacts: Array<Sanity.Contact>;
	resume: Sanity.Asset;
}

const variants = {
	hidden: { opacity: 0, x: -100 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: [0.455, 0.03, 0.515, 0.955],
		},
	},
} as Variants;

export default function Profile({ contacts, resume }: Props) {
	const renderItems = useCallback(
		() => (
			<motion.div
				className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-12"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={{
					hidden: {
						opacity: 0,
					},
					visible: {
						opacity: 1,
						transition: {
							staggerChildren: 0.25,
						},
					},
				}}
			>
				<nav className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:justify-start">
					{contacts.map(({ _key, color, href, label }) => (
						<motion.div key={_key} variants={variants}>
							<SocialButton
								color={color}
								href={href}
								title={label}
								transition="slide"
								variant="circle"
							/>
						</motion.div>
					))}
				</nav>

				<motion.div className="lg:w-1/5" variants={variants}>
					<Link
						className={cn(
							"btn group relative min-h-[40px] min-w-[135px] rounded-full bg-[#006FEE] px-8 transition duration-500 ease-in-out dark:bg-cobalt-blue",
							"[&>span]:inline-flex [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&>span]:text-white",
						)}
						href={resume.asset.url}
						media={resume.asset.mimeType}
						download={resume.asset.originalFilename}
					>
						<span className="absolute inset-0 h-full w-full -translate-x-full duration-500 group-hover:translate-x-0">
							<Download />
							Download
						</span>

						<span className="absolute h-full w-full transform transition-all duration-500 group-hover:translate-x-full">
							<CV size={20} />
							Resume
						</span>

						<span className="invisible relative">
							<CV size={20} />
							Resume
						</span>
					</Link>
				</motion.div>
			</motion.div>
		),
		[contacts, resume],
	);

	return (
		<div className="relative overflow-hidden">
			<div className="absolute inset-x-0 top-[15%] z-30 xl:top-[7%]">
				<div className="mx-auto flex max-w-screen-2xl flex-col gap-y-4 p-8 md:p-16 lg:px-24">
					<h1 className="title h1 text-center text-gray-700 lg:text-start">
						Ryan Kim
					</h1>

					<h3 className="title h3 md:h2 text-center text-cobalt-blue lg:text-start">
						Smart Contract Engineer
					</h3>

					<h5 className="h5 mb-4 text-pretty text-center font-medium leading-tight text-gray-700 lg:text-start">
						I craft the building blocks of a decentralized future.
					</h5>

					{renderItems()}
				</div>
			</div>

			<Background />
		</div>
	);
}

function Background() {
	return (
		<>
			<TextSlide value="blockchain ethereum" />
			<TextSlide value="smart contract solidity" reverse />
			<TextSlide value="decentralization web3" />
			<TextSlide value="blockchain ethereum" reverse />
			<TextSlide value="smart contract solidity" />
			<TextSlide value="decentralization web3" reverse />
		</>
	);
}

function TextSlide({ reverse, value }: { reverse?: boolean; value: string }) {
	return (
		<div className="flex -translate-y-12 select-none overflow-hidden">
			<TranslateWrapper reverse={reverse}>
				<span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
					{value}{" "}
				</span>
			</TranslateWrapper>

			<TranslateWrapper reverse={reverse}>
				<span className="ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
					{value}{" "}
				</span>
			</TranslateWrapper>
		</div>
	);
}
