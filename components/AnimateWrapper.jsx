"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimateWrapper({ children }) {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				transition={{ delay: 0.4 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
