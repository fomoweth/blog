import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FiArrowDown as ArrowDown } from "react-icons/fi";
import { Terminal as TerminalIcon } from "lucide-react";

import Terminal from "@/components/global/Terminal";
import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
	const { protocols, sourceCode, title } = item;

	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: `${-offset}px` });
	const builder = useImageUrlBuilder();

	useEffect(() => {
		if (isInView) {
			setter(index);
		}
	}, [isInView]);

	return (
		<div
			className={cn(
				"relative mx-auto flex h-fit w-full max-w-screen-2xl items-center lg:h-screen",
				// "border border-red-500",
			)}
			ref={ref}
			style={{
				justifyContent: index % 2 ? "flex-end" : "flex-start",
			}}
		>
			<div
				className={cn(
					"relative grid h-full w-full",
					// "overflow-hidden",
					// "h-1/2",
					// "h-1/3",
					"place-items-center",
					// "place-content-center",
					className,
				)}
			>
				{/* <motion.div
					className={cn(
						"hidden md:block",
						// "",
						// "border border-yellow-500",
					)}
					initial={{ opacity: 0, y: 25 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					<TerminalIcon className="h-12 w-12 rotate-90" />
					<span
						className={cn(
							// "mt-1 font-semibold tracking-tight md:text-2xl lg:text-5xl",
							"mt-1 text-5xl font-semibold tracking-tight",
						)}
						style={{
							writingMode: "vertical-lr",
						}}
					>
						{item.title}
					</span>
				</motion.div> */}

				<Card className="relative z-10 hidden w-full bg-transparent backdrop-blur-sm lg:block">
					<CardHeader>
						{/* <CardTitle className="text-pretty leading-snug">
							{title}
						</CardTitle> */}
						<div className="flex items-center space-x-2 rounded-md border p-4 text-slate-600">
							<TerminalIcon size={20} />
							<div className="flex-1 space-y-1">
								<p className="text-lg font-medium leading-none">
									Protocols Integrated:
								</p>
							</div>
						</div>
						{/* <CardDescription>Protocols Integrated:</CardDescription> */}
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="ml-4 flex w-full flex-col items-start gap-1 lg:gap-3">
							{protocols.map(({ icon, label, link, slug }) => (
								<Link
									key={slug.current}
									className="group inline-flex items-center gap-x-2"
									href={link}
									rel="noopener noreferrer"
									target="_blank"
								>
									<img
										src={builder
											.image(icon)
											.width(30)
											.height(30)
											.url()}
										alt={label}
										height={30}
										width={30}
									/>
									<span className="underline-offset-2 group-hover:underline">
										{label}
									</span>
								</Link>
							))}
						</div>
					</CardContent>
					<CardFooter>
						{sourceCode && (
							<Button className="w-full" asChild>
								<Link
									className="ml-1 inline-flex items-center gap-x-2"
									href={sourceCode}
									rel="noopener noreferrer"
									target="_blank"
								>
									<Github size={30} />
									Source Code
								</Link>
							</Button>
						)}
					</CardFooter>
				</Card>

				<motion.div
					className={cn(
						"relative mx-auto mb-8 block w-full max-w-screen-md overflow-hidden lg:hidden",
						// "border border-red-500",
					)}
					initial={{ opacity: 0, y: 25 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					<Terminal className="mx-auto" value={item} />
				</motion.div>
			</div>
		</div>
	);
}
