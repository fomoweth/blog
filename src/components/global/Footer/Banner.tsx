"use client";

import { useEffect, useRef } from "react";

interface Props {
	className: string;
	text: string;
}

export default function Banner({ className, text }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleResize = () => {
		if (!containerRef.current || !textRef.current) return;

		const { offsetWidth } = containerRef.current;
		let min = 1;
		let max = 2500;

		while (min <= max) {
			const mid = Math.floor((min + max) / 2);
			textRef.current.style.fontSize = mid + "px";

			if (textRef.current.offsetWidth <= offsetWidth) {
				min = mid + 1;
			} else {
				max = mid - 1;
			}
		}

		textRef.current.style.fontSize = max + "px";
	};

	return (
		<div className={className} ref={containerRef}>
			<span
				className="mx-auto whitespace-nowrap pb-5 text-center font-orbiter font-bold text-zinc-800 [line-height:0.8] md:pb-10 lg:pb-14 xl:pb-16"
				ref={textRef}
			>
				{text}
			</span>
		</div>
	);
}
