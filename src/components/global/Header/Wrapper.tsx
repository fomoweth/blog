"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Wrapper({
	className,
	children,
}: React.ComponentProps<"header">) {
	const ref = useRef<HTMLDivElement>(null);

	const [hidden, setHidden] = useState<boolean>(true);

	const { scrollY } = useScroll();

	useEffect(() => {
		if (typeof window === "undefined") return;

		setHeight();

		window.addEventListener("resize", setHeight);

		return () => window.removeEventListener("resize", setHeight);
	}, []);

	useMotionValueEvent(scrollY, "change", () => {
		if (scrollY.get() > 20) {
			setHidden(false);
		} else {
			setHidden(true);
		}
	});

	const setHeight = () => {
		if (!ref.current) return;

		document.documentElement.style.setProperty(
			"--header-height",
			`${ref.current.offsetHeight}px`,
		);
	};

	return (
		<motion.header className={className} ref={ref}>
			{children}

			<motion.hr
				className="absolute bottom-0 w-full border-border opacity-0"
				animate={hidden ? "hidden" : "visible"}
				transition={{ duration: 0.35, ease: "easeInOut" }}
				variants={{ hidden: { opacity: 0 }, visible: { opacity: 100 } }}
			/>
		</motion.header>
	);
}
