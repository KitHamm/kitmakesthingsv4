"use client";
import { Link, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import ContactModal from "./ContactModal";
import { useEffect, useState } from "react";

export default function NavbarComp() {
    const { isOpen, onClose, onOpenChange } = useDisclosure();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsNavOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isNavOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isNavOpen]);

    return (
        <>
            <nav className="absolute top-0 left-0 z-20 w-full flex justify-between px-4 py-3 xl:px-20 xl:py-4 bg-neutral-100 shadow">
                <div className="xl:w-1/4">
                    <Link
                        color="foreground"
                        className="font-bold text-4xl hover:text-green-500 transition-colors"
                        href="/">
                        {"<Kit:Hamm/>"}
                    </Link>
                </div>
                <div
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="my-auto py-2 px-4 xl:hidden">
                    <i
                        className={`${
                            isNavOpen ? "-rotate-90" : "rotate-0"
                        } fa-solid fa-bars fa-2xl mt-auto transition-transform`}
                    />
                </div>

                <div className="xl:flex hidden flex gap-4 justify-center mt-auto">
                    <div>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/KitHamm/">
                            <i
                                aria-hidden
                                className="transition-colors text-black hover:text-green-500 fa-brands fa-github fa-2xl"
                            />
                        </Link>
                    </div>
                    <div>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/kit_makes_things/">
                            <i
                                aria-hidden
                                className="transition-colors text-black hover:text-green-500 fa-brands fa-instagram fa-2xl"
                            />
                        </Link>
                    </div>
                    <div>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.linkedin.com/in/kit-hamm/">
                            <i
                                aria-hidden
                                className="transition-colors text-black hover:text-green-500 fa-brands fa-linkedin fa-2xl"
                            />
                        </Link>
                    </div>
                </div>
                <div className="hidden xl:flex justify-end gap-10 w-1/4 my-auto">
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
            {isNavOpen && (
                <div className="fade-in z-10 absolute h-full w-full top-0 left-0 bg-white/30 backdrop-blur-lg pt-20">
                    <div
                        className={`${
                            pathname === "/" ? "bg-green-500" : ""
                        } py-2 ps-8`}>
                        <Link
                            className={`${
                                pathname === "/" ? "text-white" : ""
                            } text-2xl transition-colors font-bold hover:text-green-500`}
                            color="foreground"
                            href="/">
                            Home
                        </Link>
                    </div>
                    <div
                        className={`${
                            pathname === "/about" ? "bg-green-500" : ""
                        } py-2 ps-8`}>
                        <Link
                            className={`${
                                pathname === "/about" ? "text-white" : ""
                            } text-2xl transition-colors font-bold hover:text-green-500`}
                            color="foreground"
                            href="/about">
                            About
                        </Link>
                    </div>
                    <div
                        className={`${
                            pathname.includes("projects") ? "bg-green-500" : ""
                        } py-2 ps-8`}>
                        <Link
                            className={`${
                                pathname === "/projects" ? "text-white" : ""
                            } text-2xl transition-colors font-bold hover:text-green-500`}
                            color="foreground"
                            href="/projects">
                            Projects
                        </Link>
                    </div>
                    <div className={`py-2 ps-8`}>
                        <div
                            onClick={() => {
                                onOpenChange();
                                setIsNavOpen(false);
                            }}
                            className={` text-2xl transition-colors font-bold hover:text-green-500`}
                            color="foreground">
                            Contact
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
