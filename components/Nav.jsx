"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function Nav() {
	// Get the user session using NextAuth.js useSession hook
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Function to handle scroll event
	const handleScroll = () => {
		if (window.scrollY > 10) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	// Fetch providers on component mount
	useEffect(() => {
		const fetchProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		fetchProviders();
	}, []);

	// Add event listener to handle scroll event
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Function to show a toast message when signing in
	const handleSignIn = async (providerId) => {
		const response = await signIn(providerId, { callbackUrl: "/" });

		// Check if the sign-in was successful
		if (response?.error) {
			toast.error("Sign In failed!");
		} else {
			toast.success("Sign In successfully!");
		}
	};

	// Function to show a toast message when signing out
	const handleSignOut = async () => {
		const response = await signOut();

		// Check if the sign-out was successful
		if (response?.error) {
			toast.error("Sign Out failed!");
		} else {
			toast.success("Sign Out successfully!");
		}
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 py-4 sm:px-[21.7rem] px-6 flex-between transition-all ${
				scrolled ? "bg-white shadow" : "bg-transparent"
			}`}
		>
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="promptopia logo"
					width="30"
					height="30"
					className="object-contain"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop Navigation */}
			<div className="hidden sm:flex gap-3 md:gap-5">
				{session?.user ? (
					<div className="flex items-center gap-3">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button
							type="button"
							onClick={handleSignOut}
							className="outline_btn"
						>
							Sign Out
						</button>
						<Link href="/profile">
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className="rounded-full cursor-pointer"
								alt="profile"
								onClick={() =>
									setToggleDropdown((prev) => !prev)
								}
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									onClick={() => handleSignIn(provider.id)}
									key={provider.name}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex items-center gap-3">
				{session?.user ? (
					<Image
						src={session?.user.image}
						width={37}
						height={37}
						className="rounded-full cursor-pointer"
						alt="profile"
						onClick={() => setToggleDropdown((prev) => !prev)}
					/>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									onClick={() => handleSignIn(provider.id)}
									key={provider.name}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}

				{toggleDropdown && (
					<div className="dropdown">
						{session?.user ? (
							<>
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										handleSignOut();
									}}
									className="w-full mt-3 black_btn"
								>
									Sign Out
								</button>
							</>
						) : null}
					</div>
				)}
			</div>
		</nav>
	);
}
