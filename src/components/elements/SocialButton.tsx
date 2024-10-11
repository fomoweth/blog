import { useCallback, useMemo } from "react";
import Link from "next/link";

import { Github, Google, LinkedIn, TG, X } from "@/components/icons";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"a"> {
	href: string;
	transition: "scale" | "slide";
	variant: "circle" | "logo" | "square";
}

export default function SocialButton({
	className,
	color,
	href,
	transition,
	variant,
	...props
}: Props) {
	if (!href || !URL.canParse(href)) return null;

	const icon = useMemo(() => {
		const url = new URL(href);

		switch (url.host) {
			case "github.com":
				return <Github />;

			case "linkedin.com":
				return <LinkedIn />;

			case "t.me":
				return <TG />;

			case "twitter.com":
			case "x.com":
				return <X />;

			default:
				if (url.protocol === "mailto:") {
					return <Google />;
				}
		}
	}, [href]);

	const renderItem = useCallback(() => {
		switch (variant) {
			case "logo":
				return <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>;

			case "circle":
			case "square":
				return transition === "slide" ? (
					<>
						<span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center text-white duration-500 group-hover:translate-x-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								height={24}
								width={24}
								fill="none"
								focusable="false"
								aria-hidden="true"
							>
								<path
									d="M14 5l7 7m0 0l-7 7m7-7H3"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
								/>
							</svg>
						</span>

						<span className="absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full [&>svg]:h-4 [&>svg]:w-4">
							{icon}
						</span>

						<span className="invisible relative [&>svg]:h-4 [&>svg]:w-4">
							{icon}
						</span>
					</>
				) : (
					<span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
				);
		}
	}, [icon, transition, variant]);

	return (
		<Link
			className={cn(
				variant === "logo"
					? cn([
							"inline-block shadow-xl transition duration-150 ease-in-out hover:shadow-xl focus:shadow-xl active:shadow-xl",
							transition === "scale" &&
								"transition-transform ease-out hover:scale-110",
						])
					: cn([
							"fill-white text-xs font-medium uppercase leading-normal text-white outline-none",
							variant === "circle" && "rounded-full p-3",
							variant === "square" && "rounded px-6 py-2.5",
							transition === "scale" &&
								"inline-block transition-transform duration-150 ease-out hover:scale-110",
							transition === "slide" &&
								"group relative inline-flex items-center justify-center overflow-hidden transition duration-300 ease-out",
						]),
				className,
			)}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
			style={
				variant !== "logo"
					? { backgroundColor: color }
					: { fill: color, color }
			}
			{...props}
		>
			{renderItem()}
		</Link>
	);
}
