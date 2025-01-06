import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import NavbarComp from "@/components/main/Navbar";

const roboto = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://kitmakesthings.co.uk/"),
	title: "Kit Hamm | Developer",
	description:
		"Kit Hamm is a Freelance Developer from the South West. Open to contract and full time opportunities.",
	openGraph: {
		title: "Kit Hamm | Developer",
		description:
			"Kit Hamm is a Freelance Developer from the South West. Open to contract and full time opportunities.",
		url: "https://kitmakesthings.co.uk/",
		siteName: "KitMakesThings",
		locale: "en-US",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${roboto.className} flex flex-col min-h-screen max-w-[100dvw] overflow-x-hidden`}
			>
				<NavbarComp />
				{children}
			</body>
		</html>
	);
}
