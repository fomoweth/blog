import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	className: string;
	index: number;
}

export default function SlidingDisplay({ children, className, index }: Props) {
	return (
		<div
			className="pointer-events-none sticky top-0 z-10 mx-auto hidden h-screen w-full max-w-screen-2xl items-center justify-center md:flex"
			style={{
				justifyContent: index % 2 ? "flex-start" : "flex-end",
			}}
		>
			<motion.div
				className={className}
				layout
				transition={{
					type: "spring",
					damping: 25,
					stiffness: 400,
				}}
			>
				{children}
			</motion.div>
		</div>
	);
}
