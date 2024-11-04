import { useRef } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	className: string;
	index: number;
	progress: MotionValue<number>;
	total: number;
}

export default function Parallax({
	children,
	className,
	index,
	progress,
	total,
}: Props & React.ComponentProps<typeof motion.section>) {
	const ref = useRef<HTMLDivElement>(null);

	const target = 1 - (total - index) * 0.05;

	const scale = useTransform(progress, [index * 0.25, 1], [1, target]);

	return (
		<div
			className="relative inset-x-0 top-[calc(var(--header-height)_+_40px)] flex items-center justify-center md:sticky md:top-40 md:h-[calc(100vh_-_192px)] md:max-h-[900px]"
			ref={ref}
		>
			<motion.section
				className={cn(
					"relative mx-auto h-full w-full overflow-hidden md:origin-top md:rounded-6xl",
					className,
				)}
				style={{
					scale,
					top: `calc(-5vh + ${index * 25}px)`,
				}}
			>
				{children}
			</motion.section>
		</div>
	);
}
