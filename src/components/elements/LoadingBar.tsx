import { motion, Variants } from "framer-motion";

const variants = {
	initial: {
		opacity: 0,
		scaleY: 0.5,
	},
	animate: {
		opacity: 1,
		scaleY: 1,
		transition: {
			duration: 1,
			ease: "circIn",
			repeat: Infinity,
			repeatType: "mirror",
		},
	},
} as Variants;

export default function LoadingBar() {
	return (
		<motion.div
			className="flex gap-1"
			initial="initial"
			animate="animate"
			transition={{ staggerChildren: 0.25 }}
		>
			<motion.div className="h-12 w-2 bg-white" variants={variants} />
			<motion.div className="h-12 w-2 bg-white" variants={variants} />
			<motion.div className="h-12 w-2 bg-white" variants={variants} />
			<motion.div className="h-12 w-2 bg-white" variants={variants} />
			<motion.div className="h-12 w-2 bg-white" variants={variants} />
		</motion.div>
	);
}
