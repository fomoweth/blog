import Link from "next/link";
import { FiArrowRight as ArrowRight } from "react-icons/fi";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { cn, isExternal } from "@/lib/utils";

interface Props {
	className?: string;
	title: React.ReactNode;
	subtitle?: React.ReactNode;
	content?: React.ReactNode;
	id?: string;
	level: 1 | 2;
	links: Array<{
		href: string;
		text: string;
		size?: "default" | "sm" | "lg" | "icon";
		variant?: "default" | "outline" | "secondary" | "ghost" | "link";
	}>;
}

export default function Callout({
	content,
	className,
	id,
	level,
	links,
	subtitle,
	title,
}: Props) {
	const resolve = (
		children: React.ReactNode | undefined,
		wrapped: React.ReactNode,
	) => {
		return typeof children !== "string" ? children : wrapped;
	};

	switch (level) {
		case 1:
			return (
				<section id={id} className={className}>
					<div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
						<div className="mx-auto space-y-4 py-6 text-center">
							{resolve(
								subtitle,
								<h2 className="font-mono text-[14px] font-medium tracking-tight text-primary">
									{subtitle}
								</h2>,
							)}
							{resolve(
								title,
								<h4 className="mx-auto mb-2 max-w-3xl text-balance text-[42px] font-medium tracking-tighter">
									{title}
								</h4>,
							)}
						</div>
						<div className="space-y-4 text-center">
							{resolve(
								content,
								<p className="mx-auto max-w-[700px] text-balance text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									{content}
								</p>,
							)}

							<div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
								{links.map(
									(
										{ href, text, variant = "default" },
										index,
									) => (
										<Button
											key={index}
											variant={variant}
											asChild
										>
											<Link
												href={href}
												prefetch={false}
												{...(isExternal(href) && {
													target: "_blank",
													rel: "noopener noreferrer",
												})}
											>
												{text}
											</Link>
										</Button>
									),
								)}
							</div>
						</div>
					</div>
				</section>
			);

		case 2:
			const { href, text, variant = "default" } = links[0];

			return (
				<section id={id}>
					<Card
						className={cn(
							"mx-auto max-w-5xl border-none shadow-none",
							className,
						)}
					>
						<CardContent className="p-7">
							<div className="flex flex-col items-center justify-between gap-y-3.5 md:flex-row">
								<div className="flex flex-col items-center gap-y-3 md:items-start">
									{resolve(
										title,
										<h3 className="text-center text-3xl font-bold leading-[1.15] md:text-left md:text-3xl lg:text-4xl">
											{title}
										</h3>,
									)}

									{resolve(
										content,
										<p className="mx-auto max-w-xs text-center text-muted-foreground md:mx-0 md:max-w-full md:text-left">
											{content}
										</p>,
									)}
								</div>

								<Link
									href={href}
									className={cn(
										buttonVariants({ variant }),
										"group z-10 inline-flex min-w-36 items-center space-x-2 rounded-full p-1.5 pr-2.5",
									)}
									{...(isExternal(href) && {
										target: "_blank",
										rel: "noopener noreferrer",
									})}
								>
									<div className="rounded-full bg-primary p-2 text-primary-foreground">
										<ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
									</div>

									{text}
								</Link>
							</div>
						</CardContent>
					</Card>
				</section>
			);
	}
}
