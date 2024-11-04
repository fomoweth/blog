import { useCallback, useMemo } from "react";
import Link from "next/link";

import {
	CV,
	Download,
	Github,
	Google,
	LinkedIn,
	TG,
	X,
} from "@/components/icons";

import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"a"> {
	href: string;
	transition?: "scale" | "slide";
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
	const icon = useMemo(() => {
		if (!!URL.canParse(href)) {
			const url = new URL(href);

			switch (url.host) {
				case "cdn.sanity.io":
					if (url.pathname.endsWith(".pdf")) {
						return <CV />;
					}

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
		}
	}, [href]);

	if (!icon) return null;

	const renderItem = useCallback(() => {
		switch (variant) {
			case "circle":
			case "square":
				return transition === "slide" ? (
					<>
						<span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center duration-500 group-hover:translate-x-0">
							{!href.endsWith(".pdf") ? (
								<Forward />
							) : (
								<Download />
							)}
						</span>

						<span
							className={cn(
								"absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full [&>svg]:h-4 [&>svg]:w-4",
							)}
						>
							{icon}
						</span>

						<span
							className={cn(
								"invisible relative [&>svg]:h-4 [&>svg]:w-4",
							)}
						>
							{icon}
						</span>
					</>
				) : (
					<span className={cn("[&>svg]:h-4 [&>svg]:w-4")}>
						{icon}
					</span>
				);

			default:
				return <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>;
		}
	}, [icon, transition, variant]);

	return (
		<Link
			className={cn(
				"btn",
				variant !== "logo" &&
					cn([
						variant === "circle" && "rounded-full p-3",
						variant === "square" && "rounded px-6 py-2.5",
						transition === "slide" &&
							"group relative transition duration-300 ease-out",
					]),
				transition === "scale" &&
					"transition-transform duration-150 ease-out hover:scale-110",
				className,
			)}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
			style={
				variant !== "logo"
					? { backgroundColor: color, color: "#FFFFFF" }
					: { color }
			}
			{...props}
		>
			{renderItem()}
		</Link>
	);
}

function Forward({ className, size }: { className?: string; size?: number }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height={size || 24}
			width={size || 24}
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
	);
}
