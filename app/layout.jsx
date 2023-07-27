import Footer from "@components/Footer";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
	title: "Promptopia",
	description: "Discover & Share AI Prompts",
	icons: {
		icon: ["/favicon.ico?v=4"],
		apple: ["/apple-touch-icon.png?v=4"],
		shortcut: ["/apple-touch-icon.png"],
		manifest: "/site.webmanifest",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						{children}
						<Toaster />
					</main>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
