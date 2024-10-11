"use client";

import { useEffect, useState } from "react";

export type ScreenSize = "mobile" | "tablet" | "desktop";

export default function useScreenSize() {
	const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");

	useEffect(() => {
		const getScreenSize = () => {
			const width = window.innerWidth;

			if (width >= 1280) {
				return "desktop";
			} else if (width >= 640) {
				return "tablet";
			} else {
				return "mobile";
			}
		};

		const handleResize = () => {
			setScreenSize(getScreenSize());
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return screenSize;
}
