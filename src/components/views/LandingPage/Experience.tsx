import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import BulletPoints from "@/components/elements/BulletPoints";
import Duration from "@/components/elements/Duration";
import { Chevron, External } from "@/components/icons";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";
import { cn } from "@/lib/utils";

interface Props {
	items: Array<Sanity.Experience>;
}

export default function Experience({ items }: Props) {
	const [current, setCurrent] = useState<number>(0);

	const builder = useImageUrlBuilder();

	const shiftLeft = () => {
		if (current > 0) setCurrent((prev) => prev - 1);
	};

	const shiftRight = () => {
		if (current < items.length - 1) setCurrent((prev) => prev + 1);
	};

	const translate = (idx: number) =>
		current >= idx ? idx * 100 : idx * 100 - 100 * (idx - current);

	const renderItem = useCallback(
		(item: Sanity.Experience, textColor: string) => {
			const {
				description,
				duration,
				link,
				logo,
				position,
				roles,
				title,
			} = item;

			const source = builder
				.image(logo)
				.width(30)
				.height(30)
				.fit("crop")
				.url();

			return (
				<>
					<Duration
						className={textColor}
						month="short"
						day="numeric"
						year="numeric"
						value={duration}
					/>

					{link ? (
						<Link
							className="group z-10 flex items-center gap-x-2.5 hover:opacity-80"
							href={link}
							rel="noopener noreferrer"
							target="_blank"
						>
							<Image
								className="h-[30px] w-[30px] rounded-full object-cover"
								src={source}
								alt={title}
								height={30}
								width={30}
							/>

							<h3 className="font-orbiter text-2xl font-bold md:text-3xl">
								{title}
							</h3>

							<External />
						</Link>
					) : (
						<div className="flex items-center gap-x-2.5">
							<Image
								className="h-[30px] w-[30px] rounded-full object-cover"
								src={source}
								alt={title}
								height={30}
								width={30}
							/>

							<h3 className="font-orbiter text-2xl font-bold md:text-3xl">
								{title}
							</h3>
						</div>
					)}

					<p
						className={cn(
							"text-pretty text-sm md:text-base",
							textColor,
						)}
					>
						{description}
					</p>

					<h4 className="font-orbiter text-xl font-semibold md:text-2xl">
						{position}
					</h4>

					<BulletPoints
						classNames={{
							li: textColor,
						}}
						items={roles}
					/>
				</>
			);
		},
		[items],
	);

	return (
		<div className="relative mx-auto flex h-full w-full max-w-screen-2xl flex-col p-8 md:p-16">
			<div className="mb-8 flex items-center justify-between gap-4 md:mb-16">
				<h2 className="title h2 inline-block text-gray-700">
					Experience
					<span className="bg-cobalt-blue ml-1 inline-block size-2 md:size-2.5 lg:size-3" />
				</h2>

				<div className="hidden gap-2 md:flex lg:hidden">
					<CTA
						level={2}
						direction="left"
						disabled={current === 0}
						handleClick={shiftLeft}
					/>

					<CTA
						level={2}
						direction="right"
						disabled={current === items.length - 1}
						handleClick={shiftRight}
					/>
				</div>
			</div>

			<div className="mx-auto flex h-full w-full flex-col gap-4 md:flex-row md:justify-between">
				<CTA
					level={1}
					direction="left"
					disabled={current === 0}
					handleClick={shiftLeft}
				/>

				<div className="flex h-full w-full flex-col gap-5 md:flex-row md:overflow-hidden lg:w-[90%]">
					{items.map((item, idx) => (
						<motion.div
							key={idx}
							className={cn(
								"relative flex min-h-[300px] w-full shrink-0 flex-col justify-start gap-y-2.5 overflow-hidden rounded-lg p-4 shadow-md md:w-[80%] md:p-8 lg:w-[90%]",
								idx % 2
									? "bg-background text-gray-700"
									: "bg-[#121212] text-primary-foreground",
							)}
							animate={{ x: `${-translate(idx)}%` }}
							transition={{
								ease: "easeInOut",
								duration: 0.35,
							}}
						>
							{renderItem(
								item,
								idx % 2 ? "text-zinc-800" : "text-gray-400",
							)}
						</motion.div>
					))}
				</div>

				<CTA
					level={1}
					direction="right"
					disabled={current === items.length - 1}
					handleClick={shiftRight}
				/>
			</div>
		</div>
	);
}

function CTA({
	direction,
	disabled,
	handleClick,
	level,
}: {
	direction: "left" | "right";
	disabled: boolean;
	handleClick: () => void;
	level: 1 | 2;
}) {
	return (
		<button
			type="button"
			className={cn(
				"group",
				level === 1 &&
					cn([
						"hidden bg-transparent p-1.5 text-4xl text-gray-700 lg:block",
						!disabled ? "hover:opacity-70" : "opacity-50",
					]),
				level === 2 &&
					cn([
						"h-fit bg-primary p-1.5 text-2xl text-primary-foreground transition-colors",
						!disabled ? "hover:opacity-80" : "opacity-70",
					]),
			)}
			disabled={disabled}
			onClick={handleClick}
		>
			<Chevron
				className={!disabled ? "group-hover:opacity-80" : "opacity-50"}
				direction={direction}
				variant="single"
			/>
		</button>
	);
}
