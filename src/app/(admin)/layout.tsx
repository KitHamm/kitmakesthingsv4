import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import SidePanel from "@/components/admin/SidePanel";

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kit Hamm | Developer",
    description:
        "Kit Hamm is a Web Developer, Digital Artist and Music creator from Devon in the South West.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.className} max-w-[100dvw] flex overflow-x-hidden`}>
                <SidePanel />
                <div className="w-1/6" />
                <div className="w-5/6">{children}</div>
            </body>
        </html>
    );
}
