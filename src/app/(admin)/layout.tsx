import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import SidePanel from "@/components/admin/SidePanel";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

const roboto = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Kit Hamm | Developer",
	description:
		"Kit Hamm is a Web Developer, Digital Artist and Music creator from Devon in the South West.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = getServerSession(authOptions);
	const messages = await prisma.messages.findMany();
	return (
		<html lang="en">
			<body
				className={`${roboto.className} max-w-[100dvw] flex overflow-x-hidden`}
			>
				<SidePanel messages={messages} />
				<div className="hidden lg:block w-1/6" />
				<div className="w-full lg:w-5/6">{children}</div>
			</body>
		</html>
	);
}
