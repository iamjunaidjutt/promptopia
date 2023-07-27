import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-white text-gray-700 mt-10 py-8 w-full relative">
			<div className="mx-auto">
				<h2 className="text-center text-lg font-semibold mb-4">
					Site Map
				</h2>
				<div className="flex flex-wrap gap-4 justify-center">
					<Link href="/" className="hover:text-black">
						Home
					</Link>
					<Link href="/profile" className="hover:text-black">
						Profile
					</Link>
					<Link href="/create-prompt" className="hover:text-black">
						Create Post
					</Link>
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
