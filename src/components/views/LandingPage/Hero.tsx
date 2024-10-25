import Link from "next/link";
import { motion, Variants } from "framer-motion";

import TypeAnimation from "@/components/elements/TypeAnimation";
import { cn } from "@/lib/utils";

const TYPE_TEXT = ["ON CLAY", "ON PAPER", "ONLINE", "ONCHAIN"] as const;
const GOLD_BAR_TEXT = ["1 OUNCE", "GOLD", "999.9"] as const;
const GOLD_BINARY = "01000111010011110100110001000100" as const;
const WBTC_ADDRESS = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" as const;

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

export default function Hero() {
	const slice = (text: string) => {
		let length = 1;
		let offset = text.length;

		for (let i = 1; i <= Math.sqrt(text.length); i++) {
			if (text.length % i === 0 && i > length) {
				length = i;
				offset = text.length / i;
			}
		}

		return Array.from({ length }, (_, i) =>
			text.slice(i * offset, i * offset + offset),
		);
	};

	return (
		<motion.div
			className="mx-auto flex h-full w-full max-w-screen-xl flex-col rounded-2xl py-12 md:justify-between md:px-8 md:py-16 lg:px-14 xl:px-16"
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
						staggerChildren: 0.5,
					},
				},
			}}
		>
			<TypeAnimation
				className="h1 text-center font-roboto-mono font-medium md:text-start"
				speed={20}
				deletionSpeed={20}
				intro={2000}
				outro={10000}
				value={[...TYPE_TEXT]}
			/>

			<motion.div className="flex flex-col items-center justify-around gap-10 p-8 md:flex-row md:gap-0 md:px-0">
				<GoldBar
					className="font-inter text-lg uppercase"
					value={[...GOLD_BAR_TEXT]}
				/>

				<Arrow />

				<GoldBar
					className="font-roboto-mono text-base"
					value={slice(GOLD_BINARY)}
				/>

				<Arrow />

				<Link
					className="group"
					href={`https://etherscan.io/token/${WBTC_ADDRESS}`}
					rel="noopener noreferrer"
					target="_blank"
				>
					<GoldBar
						className="link font-roboto-mono text-base group-hover:underline"
						value={slice(WBTC_ADDRESS)}
					/>
				</Link>
			</motion.div>

			<Link
				className="link text-center font-inter text-xl font-semibold md:text-end md:text-4xl lg:text-5xl"
				href="https://www.linkedin.com/posts/chainlink-labs_the-future-runs-on-tokens-activity-7232131282103590912-4Zim"
				rel="noopener noreferrer"
				target="_blank"
			>
				<motion.span
					variants={{
						hidden: { opacity: 0, y: 100 },
						visible: {
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.5,
								ease: [0.455, 0.03, 0.515, 0.955],
							},
						},
					}}
				>
					The future runs on tokens.
				</motion.span>
			</Link>
		</motion.div>
	);
}

function GoldBar({
	className,
	value,
}: {
	className: string;
	value: Array<string>;
}) {
	return (
		<motion.div
			className="flex h-64 w-36 items-center justify-center rounded-2xl border border-white lg:h-72 lg:w-40"
			variants={variants}
		>
			<div className="mx-auto flex h-[94%] w-[90%] flex-col justify-between rounded-2xl border border-white text-center">
				<div className="flex flex-col">
					<div className="ml-auto mr-3 mt-4 flex h-0 w-[10%] rotate-45 border-t border-white" />
					<div className="ml-auto mr-2 mt-1 flex h-0 w-1/4 rotate-45 border-b border-white" />
				</div>

				<div
					className={cn(
						"flex flex-col [&>span]:leading-relaxed [&>span]:tracking-widest",
						className,
					)}
				>
					{value.map((segment, idx) => (
						<span key={idx}>{segment}</span>
					))}
				</div>

				<div className="flex flex-col">
					<div className="mb-1 ml-1 mr-auto mt-2 flex h-0 w-1/4 rotate-45 border-t border-white" />
					<div className="mb-4 ml-2 mr-auto flex h-0 w-[10%] rotate-45 border-t border-white" />
				</div>
			</div>
		</motion.div>
	);
}

function Arrow() {
	return (
		<motion.span variants={variants}>
			<svg
				className="h-12 w-12 rotate-90 md:rotate-0 xl:h-16 xl:w-16"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				focusable="false"
				aria-hidden="true"
			>
				<path
					d="M14 5l7 7m0 0l-7 7m7-7H3"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={0.7}
				/>
			</svg>
		</motion.span>
	);
}
