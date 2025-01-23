import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import NavbarComp from "@/components/main/layout/Navbar";
import { getMetaData } from "@/data/metaData";

const roboto = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = getMetaData("Kit Hamm | Developer");

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
