import { useEffect, useMemo } from "react";

import { cn, sluggify } from "@/lib/utils";

import styles from "./Navigation.module.css";

interface Props {
	className?: string;
	value: Sanity.Navigation;
}

export default function Navigation({ className, value }: Props) {
	if (!value.enabled) return null;

	const headings = useMemo(
		() =>
			value.headings.map(({ style, text }) => ({
				slug: sluggify(text),
				style,
				text,
			})),
		[value],
	);

	useEffect(() => {
		if (typeof document === "undefined") return;

		const height =
			document.querySelector("body > header")?.clientHeight || 0;

		headings.forEach(({ slug }) => {
			const target = document.getElementById(slug);
			if (!target) return;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const heading = document.querySelector(
							`[data-heading="${slug}"]`,
						);

						if (entry.isIntersecting) {
							heading?.classList.add(styles.inView);
						} else {
							heading?.classList.remove(styles.inView);
						}
					});
				},
				{
					rootMargin: `-${height}px 0px 0px 0px`,
				},
			);

			observer.observe(target);

			return () => observer.disconnect();
		});
	}, [headings]);

	return (
		<aside
			className={cn(
				"top-[calc(var(--header-height)_+_40px)] mx-auto hidden self-start bg-transparent md:sticky md:order-1 md:block md:w-[250px]",
				className,
			)}
		>
			<details className="space-y-2" open>
				<summary className="mb-4 grid font-orbiter text-xl font-semibold md:text-2xl">
					Table of Contents
				</summary>

				<ol className="leading-tight">
					{headings.map(({ slug, style, text }, idx) => (
						<li
							key={idx}
							className="border-l transition-all duration-200 ease-in-out"
							data-heading={slug}
						>
							<a
								className={cn(
									"block py-2 hover:underline",
									style == "h2" && "pl-4",
									style == "h3" && "pl-6",
									style == "h4" && "pl-8",
									style == "h5" && "pl-10",
									style == "h6" && "pl-12",
								)}
								href={`#${slug}`}
							>
								{text}
							</a>
						</li>
					))}
				</ol>
			</details>
		</aside>
	);
}
