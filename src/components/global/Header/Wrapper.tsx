"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const HEADER_OFFSET = 20;

export default function Wrapper({
	className,
	children,
}: React.ComponentProps<"header">) {
	const ref = useRef<HTMLDivElement>(null);

	const [hidden, setHidden] = useState<boolean>(false);

	const { scrollY } = useScroll();

	useEffect(() => {
		if (typeof window === "undefined") return;

		const setHeight = () => {
			if (!ref.current) return;

			document.documentElement.style.setProperty(
				"--header-height",
				`${ref.current.offsetHeight + HEADER_OFFSET ?? 0}px`,
			);
		};

		setHeight();

		window.addEventListener("resize", setHeight);

		return () => window.removeEventListener("resize", setHeight);
	}, []);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() || 0;

		if (previous && latest > 150 && latest > previous) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	return (
		<motion.header
			className={className}
			ref={ref}
			animate={hidden ? "hidden" : "visible"}
			transition={{ duration: 0.35, ease: "easeInOut" }}
			variants={{ hidden: { y: "-100%" }, visible: { y: 0 } }}
		>
			{children}
		</motion.header>
	);
}
