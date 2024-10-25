import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import BulletPoints from "@/components/elements/BulletPoints";
import { Github } from "@/components/icons";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";
import { cn } from "@/lib/utils";

interface Props {
	className: string;
	index: number;
	item: Sanity.Project;
	offset: number;
	setter: React.Dispatch<React.SetStateAction<number>>;
}

export default function Panel({
	className,
	index,
	item,
	offset,
	setter,
}: Props) {
	const { bulletPoints, description, protocols, sourceCode, title } = item;

	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: `-${offset}px` });
	const builder = useImageUrlBuilder();

	useEffect(() => {
		if (isInView) {
			setter(index);
		}
	}, [isInView]);

	return (
		<div
			className={cn("relative z-0 md:h-screen", className)}
			ref={ref}
			style={{
				justifyContent: index % 2 ? "flex-end" : "flex-start",
			}}
		>
			<motion.div
				className="grid h-full w-full place-content-center space-y-3 md:w-2/5"
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			>
				<p className="text-balance font-orbiter font-bold md:text-2xl lg:text-5xl">
					{title}
				</p>

				<div className="flex w-full flex-row items-center gap-1 lg:gap-3">
					{protocols.map((protocol) => (
						<Link
							key={protocol.slug.current}
							href={protocol.link}
							rel="noopener noreferrer"
							target="_blank"
						>
							<img
								src={builder
									.image(protocol.icon)
									.width(30)
									.height(30)
									.url()}
								alt={protocol.label}
								height={30}
								width={30}
							/>
						</Link>
					))}
				</div>

				{sourceCode && (
					<Link
						className="group inline-flex items-center gap-x-2 transition-opacity duration-200 hover:opacity-80"
						href={sourceCode}
						rel="noopener noreferrer"
						target="_blank"
					>
						<Github size={30} />
						Source Code
					</Link>
				)}

				<p className="text-balance text-slate-600 md:hidden">
					{description}
				</p>

				<BulletPoints
					classNames={{ ul: "md:hidden items-center" }}
					items={bulletPoints}
				/>
			</motion.div>
		</div>
	);
}
