"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

interface Props {
	settings: Sanity.Settings;
}

export default function Header({ settings }: Props) {
	const { contacts, paths, title } = settings;

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
		<motion.header
			className="fixed inset-x-0 top-0 z-30 inline-flex h-20 w-screen bg-transparent backdrop-blur-sm backdrop-saturate-100 md:overflow-hidden"
			ref={ref}
		>
			<div className="container relative inline-flex items-center justify-between p-5">
				<Navigation
					className="hidden h-full w-full items-center justify-between gap-x-10 md:inline-flex"
					paths={paths}
					title={title}
				/>

				<MobileNavigation
					className="absolute right-4 top-4 flex h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] md:hidden"
					contacts={contacts}
					paths={[{ href: "/", label: "home" }, ...paths]}
					title={title}
				/>
			</div>

			<motion.hr
				className="absolute bottom-0 w-full border-border opacity-0"
				animate={hidden ? "hidden" : "visible"}
				transition={{ duration: 0.35, ease: "easeInOut" }}
				variants={{ hidden: { opacity: 0 }, visible: { opacity: 100 } }}
			/>
		</motion.header>
	);
}
