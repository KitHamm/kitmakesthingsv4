"use client";
import { Link, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import ContactModal from "./ContactModal";

export default function NavbarComp() {
    const { isOpen, onClose, onOpenChange } = useDisclosure();
    const pathname = usePathname();
    return (
        <nav className="absolute top-0 left-0 z-20 min-w-[100dvw] flex justify-between px-20 py-4 bg-neutral-100 shadow">
            <div className="w-1/4 ">
                <Link
                    color="foreground"
                    className="font-bold text-4xl hover:text-green-500 transition-colors"
                    href="/">
                    {"<Kit:Hamm/>"}
                </Link>
            </div>
            <div className="flex gap-4 justify-center mt-auto">
                <div>
                    <Link href="#">
                        <i
                            aria-hidden
                            className="transition-colors text-black hover:text-green-500 fa-brands fa-github fa-2xl"
                        />
                    </Link>
                </div>
                <div>
                    <Link href="#">
                        <i
                            aria-hidden
                            className="transition-colors text-black hover:text-green-500 fa-brands fa-instagram fa-2xl"
                        />
                    </Link>
                </div>
                <div>
                    <Link href="#">
                        <i
                            aria-hidden
                            className="transition-colors text-black hover:text-green-500 fa-brands fa-linkedin fa-2xl"
                        />
                    </Link>
                </div>
            </div>
            <div className=" flex justify-end gap-10 w-1/4 my-auto">
                <div>
                    <Link
                        className={`${
                            pathname === "/about" ? "text-green-500" : ""
                        } text-lg transition-colors font-bold hover:text-green-500`}
                        color="foreground"
                        href="/about">
                        About
                    </Link>
                </div>
                <div>
                    <a
                        className={`${
                            pathname.includes("projects")
                                ? "text-green-500"
                                : ""
                        } text-lg transition-colors font-bold hover:text-green-500`}
                        color="foreground"
                        href="/projects">
                        Projects
                    </a>
                </div>
                <div
                    onClick={() => onOpenChange()}
                    className="cursor-pointer text-lg hover:text-green-500 transition-colors font-bold"
                    color="foreground">
                    Contact
                </div>
            </div>
            <ContactModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />
        </nav>
    );
}
