import { motion } from "framer-motion";

export default function PageTransition() {
	return (
		<>
			<motion.div
				className="fixed bottom-0 right-full top-0 z-50 h-screen w-screen bg-[#0847F7]"
				initial={{ x: "100%", width: "100%" }}
				animate={{ x: "0%", width: "0%" }}
				exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
				transition={{ ease: "easeInOut", duration: 0.8 }}
			/>
			<motion.div
				className="fixed bottom-0 right-full top-0 z-40 h-screen w-screen bg-white"
				initial={{ x: "100%", width: "100%" }}
				animate={{ x: "0%", width: "0%" }}
				transition={{ ease: "easeInOut", delay: 0.2, duration: 0.8 }}
			/>
			<motion.div
				className="fixed bottom-0 right-full top-0 z-30 h-screen w-screen bg-black"
				initial={{ x: "100%", width: "100%" }}
				animate={{ x: "0%", width: "0%" }}
				transition={{ ease: "easeInOut", delay: 0.4, duration: 0.8 }}
			/>
		</>
	);
}
