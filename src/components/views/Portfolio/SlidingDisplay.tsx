import { motion } from "framer-motion";

interface Props {
	children: React.ReactNode;
	className: string;
	index: number;
}

export default function SlidingDisplay({ children, className, index }: Props) {
	return (
		<div
			className="sticky top-0 z-10 mx-auto hidden h-screen w-full items-center justify-center lg:flex"
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
