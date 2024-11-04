"use client";

import { useEffect, useRef } from "react";

interface Props {
	className: string;
	value: string;
}

export default function Banner({ className, value }: Props) {
	const container = useRef<HTMLDivElement>(null);
	const text = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleResize = () => {
		if (!container.current || !text.current) return;

		const { offsetWidth } = container.current;
		let min = 1;
		let max = 2500;

		while (min <= max) {
			const mid = Math.floor((min + max) / 2);
			text.current.style.fontSize = mid + "px";

			if (text.current.offsetWidth <= offsetWidth) {
				min = mid + 1;
			} else {
				max = mid - 1;
			}
		}

		text.current.style.fontSize = max + "px";
	};

	return (
		<div className={className} ref={container}>
			<span
				className="mx-auto whitespace-nowrap pb-5 text-center font-orbiter font-bold text-gray-400 [line-height:0.8] md:pb-10 lg:pb-14 xl:pb-16"
				ref={text}
			>
				{value}
			</span>
		</div>
	);
}
