"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function Wrapper({
	className,
	children,
}: React.ComponentProps<"header">) {
	const [direction, setDirection] = useState<"up" | "down">("up");
	const [prevScrollY, setPrevScrollY] = useState<number>(0);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const setHeight = () => {
			if (!ref.current) return;

			document.documentElement.style.setProperty(
				"--header-height",
				`${ref.current.offsetHeight ?? 0}px`,
			);
		};

		setHeight();

		window.addEventListener("resize", setHeight);

		return () => window.removeEventListener("resize", setHeight);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollY } = window;

			if (scrollY > prevScrollY) {
				setDirection("down");
			} else if (scrollY < prevScrollY) {
				setDirection("up");
			}

			setPrevScrollY(scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollY]);

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-30 inline-flex h-20 w-screen overflow-hidden bg-white",
				"transition-transform duration-300 ease-in-out",
				direction === "down" && "[transform:translateY(-150%)]",
				className,
			)}
			ref={ref}
		>
			{children}
		</header>
	);
}
