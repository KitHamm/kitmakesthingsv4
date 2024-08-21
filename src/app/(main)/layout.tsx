import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import NavbarComp from "@/components/Navbar";
import Footer from "@/components/Footer";

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
                className={`${roboto.className} max-w-[100dvw] overflow-x-hidden`}>
                <NavbarComp />
                {children}
                <Footer />
            </body>
        </html>
    );
}
