import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

import Terminal from "@/components/global/Terminal";
import { Github } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { capitalize, cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/utils";

interface Props {
	className: string;
	index: number;
	project: Sanity.Project;
	offset: number;
	setter: React.Dispatch<React.SetStateAction<number>>;
}

function Item({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-2 rounded-md border px-4 py-3 text-slate-600">
				<TerminalIcon size={20} />
				<div className="flex-1 space-y-1">
					<p className="text-lg font-medium leading-none">
						{capitalize(title)}:
					</p>
				</div>
			</div>

			{children}
		</div>
	);
}

export default function Panel({
	className,
	index,
	project,
	offset,
	setter,
}: Props) {
	const { deployments, protocols, sourceCode, stacks } = project;

	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: `${-offset}px` });

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
							<Item title="Built With">
								<div className="ml-4 flex w-full flex-wrap items-start gap-1 lg:gap-3">
									{stacks.map((stack) => (
										<Badge key={stack} variant="default">
											{stack}
										</Badge>
									))}
								</div>
							</Item>
						)}

						{protocols && (
							<Item title="Protocols Integrated">
								<div className="ml-4 flex w-full flex-col items-start gap-1 lg:gap-3">
									{protocols.map(
										({ icon, label, link, slug }) => (
											<Link
												key={slug.current}
												className="group inline-flex items-center gap-x-2"
												href={link}
												target="_blank"
												rel="noopener noreferrer"
											>
												<img
													src={urlForImage(icon.asset)
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
							</Item>
						)}

						{deployments && (
							<Item title="Deployments">
								<div className="ml-4 flex w-full flex-col items-start gap-1 lg:gap-3">
									{deployments.map(
										({ address, addresses, label }) => {
											if (addresses) {
												return addresses.map(
													({
														chain: {
															etherscan,
															label,
														},
														address,
													}) => {
														return (
															<Link
																key={address}
																className="inline-flex items-center gap-x-2 underline-offset-2 hover:underline"
																href={`${etherscan}/address/${address}`}
																target="_blank"
																rel="noopener noreferrer"
															>
																{label}
															</Link>
														);
													},
												);
											} else if (address) {
												return (
													<Link
														key={address}
														className="group inline-flex items-center gap-x-2"
														href={`https://contractscan.xyz/contract/${address}`}
														target="_blank"
														rel="noopener noreferrer"
													>
														{label}
													</Link>
												);
											}
										},
									)}
								</div>
							</Item>
						)}
					</CardContent>
					<CardFooter className="flex">
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
					<Terminal className="mx-auto" value={project} />
				</motion.div>
			</div>
		</div>
	);
}
