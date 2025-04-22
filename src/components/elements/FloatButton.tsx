"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FiArrowDown as ArrowDown, FiArrowUp as ArrowUp } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {}

export default function FloatButton({}: Props) {
	const [hidden, setHidden] = useState<boolean>(true);

	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", () => {
		if (scrollY.get() > 300) {
			setHidden(false);
		} else {
			setHidden(true);
		}
	});

	const handleScrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth",
		});
	};

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div
			className={cn(
				"fixed bottom-10 right-10 z-50 hidden flex-col items-center justify-center gap-y-2",
				!hidden && "md:flex",
			)}
		>
			<Button
				className={cn("rounded-full p-1")}
				onClick={handleScrollToTop}
			>
				<ArrowUp className={cn("!size-8")} />
			</Button>
			<Button
				className={cn("rounded-full p-1")}
				onClick={handleScrollToBottom}
			>
				<ArrowDown className={cn("!size-8")} />
			</Button>
		</div>
	);
}
