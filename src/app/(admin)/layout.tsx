// packages
import type { Metadata } from "next";
// fonts
import { Roboto } from "next/font/google";
// styles
import "../globals.css";
// functions
import { getMetaData } from "@/data/metaData";
// components
import SidePanel from "@/components/admin/layout/SidePanel";
import MobileNav from "@/components/admin/layout/MobileNav";

const roboto = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = getMetaData("Kit Hamm | Dashboard");

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${roboto.className} max-w-[100dvw] flex flex-col lg:flex-row overflow-x-hidden`}
			>
				<SidePanel />
				<MobileNav />
				<div className="hidden lg:block w-1/6" />
				<main className="w-full lg:w-5/6">{children}</main>
			</body>
		</html>
	);
}
