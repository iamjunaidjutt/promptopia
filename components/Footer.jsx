"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/profile", label: "Profile" },
	{ href: "/create-prompt", label: "Create Post" },
];

const Footer = () => {
	const path = usePathname();
	return (
		<footer className="bg-white text-gray-700 mt-10 py-8 w-full relative">
			<div className="mx-auto">
				<h2 className="text-center text-lg font-semibold mb-4">
					Site Map
				</h2>
				<div className="flex flex-wrap gap-5 justify-center">
					{links.map(({ href, label }) => (
						<motion.div key={href} whileHover={{ scale: 1.1 }}>
							<Link
								href={href}
								className={
									href === path
										? " text-black font-semibold"
										: ""
								}
							>
								{label}
							</Link>
						</motion.div>
					))}
				</div>

				<hr className="my-6 border-t-1 border-gray-300" />

				<p className="text-center mt-4">
					All rights reserved &copy; {new Date().getFullYear()}{" "}
					Promptopia
				</p>
			</div>
		</footer>
	);
};

export default Footer;
