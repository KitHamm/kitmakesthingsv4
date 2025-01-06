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
	metadataBase: new URL("https://kitmakesthings.co.uk/"),
	title: "Kit Hamm | Dashboard",
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
