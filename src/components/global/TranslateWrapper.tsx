import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	className?: boolean;
	reverse?: boolean;
}

export default function TranslateWrapper({
	children,
	className,
	reverse,
}: Props) {
	return (
		<motion.div
			className={cn("flex", className)}
			initial={{ translateX: reverse ? "-100%" : "0%" }}
			animate={{ translateX: reverse ? "0%" : "-100%" }}
			transition={{ ease: "linear", duration: 75, repeat: Infinity }}
		>
			{children}
		</motion.div>
	);
}
