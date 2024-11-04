import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

import Terminal from "@/components/global/Terminal";
import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";

import useImageUrlBuilder from "@/hooks/useImageUrlBuilder";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
	const { protocols, sourceCode, stacks } = item;

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
			className="relative mx-auto flex h-fit w-full max-w-screen-2xl items-center lg:h-screen"
			ref={ref}
			style={{
				justifyContent: index % 2 ? "flex-end" : "flex-start",
			}}
		>
			<div
				className={cn(
					"relative grid h-full w-full place-items-center",
					className,
				)}
			>
				<Card className="relative z-10 hidden w-full bg-transparent backdrop-blur-sm lg:block">
					<CardContent className="grid gap-y-5 p-6">
						{stacks && (
							<div className="space-y-4">
								<div className="flex items-center space-x-2 rounded-md border px-4 py-3 text-slate-600">
									<TerminalIcon size={20} />
									<div className="flex-1 space-y-1">
										<p className="text-lg font-medium leading-none">
											Built With:
										</p>
									</div>
								</div>

								<div className="ml-4 flex w-full flex-wrap items-start gap-1 lg:gap-3">
									{stacks.map((stack) => (
										<Badge key={stack} variant="default">
											{stack}
										</Badge>
									))}
								</div>
							</div>
						)}

						{protocols && (
							<div className="space-y-4">
								<div className="flex items-center space-x-2 rounded-md border px-4 py-3 text-slate-600">
									<TerminalIcon size={20} />
									<div className="flex-1 space-y-1">
										<p className="text-lg font-medium leading-none">
											Protocols Integrated:
										</p>
									</div>
								</div>

								<div className="ml-4 flex w-full flex-col items-start gap-1 lg:gap-3">
									{protocols.map(
										({ icon, label, link, slug }) => (
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
										),
									)}
								</div>
							</div>
						)}
					</CardContent>
					<CardFooter className="flex justify-center">
						{sourceCode && (
							<Button asChild>
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
					className="relative mx-auto mb-8 block w-full max-w-screen-md overflow-hidden lg:hidden"
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
