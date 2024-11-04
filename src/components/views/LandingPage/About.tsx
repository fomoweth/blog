import { useCallback, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { parseYears } from "@/lib/utils";

interface Props {
	items: Array<Sanity.Expertise>;
}

export default function About({ items }: Props) {
	// const skills = useMemo(
	// 	() =>
	// 		items
	// 			.flatMap(({ skills }) => skills)
	// 			.filter(
	// 				({ label, link }) =>
	// 					!!link &&
	// 					!["english", "korean"].includes(label.toLowerCase()),
	// 			) as Array<Required<Sanity.Skill>>,
	// 	[items],
	// );

	// const renderItem = useCallback(
	// 	(target: string) => {
	// 		const skill = skills.find(
	// 			({ label }) => label.toLowerCase() === target.toLowerCase(),
	// 		);

	// 		if (!skill) return null;

	// 		return (
	// 			<Link
	// 				className="z-10 text-cobalt-blue decoration-[0.1em] underline-offset-2 hover:underline"
	// 				href={skill.link}
	// 				rel="noopener noreferrer"
	// 				target="_blank"
	// 			>
	// 				{skill.label}
	// 			</Link>
	// 		);
	// 	},
	// 	[skills],
	// );

	return (
		<div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col space-y-4 p-8 md:p-16">
			<div className="mb-4 inline-flex items-center md:mb-8 md:after:ml-4 md:after:block md:after:h-[1px] md:after:w-[75%] md:after:bg-black/80">
				<h2 className="title h2 inline-block text-gray-700">
					About
					<span className="bg-cobalt-blue ml-1 inline-block size-2 md:size-2.5 lg:size-3" />
				</h2>
			</div>

			<motion.div className="mx-auto flex h-full flex-col gap-4 text-pretty text-base tracking-tight text-gray-600 md:gap-2 md:px-8 md:text-lg md:tracking-normal lg:gap-4 lg:text-xl lg:tracking-wide xl:text-2xl [&>p]:leading-relaxed">
				<motion.p
					initial={{ translateX: 200, opacity: 0 }}
					whileInView={{ translateX: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.3 }}
					viewport={{ once: true }}
				>
					I am a California-based Smart Contract Engineer with
					{parseYears("06-01-2021")} years of professional experience
					in designing and developing decentralized finance
					applications and blockchain-related projects. Proficient in
					developing EVM-based smart contracts and well-versed in
					programming languages such as{" "}
					{
						<CTA
							href="https://docs.soliditylang.org"
							text="Solidity"
						/>
					}{" "}
					and{" "}
					{
						<CTA
							href="https://www.typescriptlang.org/docs"
							text="TypeScript"
						/>
					}
					, and skilled in smart contract development tools such as{" "}
					{<CTA href="https://book.getfoundry.sh" text="Foundry" />}{" "}
					and {<CTA href="https://hardhat.org/docs" text="Hardhat" />}
					.
				</motion.p>

				<motion.p
					initial={{ translateX: 200, opacity: 0 }}
					whileInView={{ translateX: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.3 }}
					viewport={{ once: true }}
				>
					From on-clay to on-paper to online to onchain, the evolution
					of record-keeping has reached its most secure and
					transparent form with blockchain technology. My expertise
					lies in creating robust, efficient, and secure smart
					contracts that form the backbone of decentralized
					applications. I am committed to pushing the boundaries of
					smart contract development, constantly exploring new ways to
					leverage its revolutionary potential.
				</motion.p>

				<motion.p
					initial={{ translateX: 200, opacity: 0 }}
					whileInView={{ translateX: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.3 }}
					viewport={{ once: true }}
				>
					Explore my portfolio to see how my expertise can drive
					innovation and enhance your projects.
				</motion.p>
			</motion.div>
		</div>
	);
}

function CTA({ href, text }: { href: string; text: string }) {
	return (
		<Link
			className="link text-cobalt-blue z-10 decoration-[0.1em] underline-offset-2 hover:underline"
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			{text}
		</Link>
	);
}
