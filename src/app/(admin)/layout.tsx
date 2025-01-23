import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import SidePanel from "@/components/admin/layout/SidePanel";
import prisma from "@/lib/prisma";
import MobileNav from "@/components/admin/layout/MobileNav";
import { getMetaData } from "@/data/metaData";

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
	const messages = await prisma.messages.findMany();
	return (
		<html lang="en">
			<body
				className={`${roboto.className} max-w-[100dvw] flex flex-col lg:flex-row overflow-x-hidden`}
			>
				<SidePanel messages={messages} />
				<MobileNav messages={messages} />
				<div className="hidden lg:block w-1/6" />
				<main className="w-full lg:w-5/6">{children}</main>
			</body>
		</html>
	);
}
