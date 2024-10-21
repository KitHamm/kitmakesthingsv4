"use client";
import { Link, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import ContactModal from "./ContactModal";
import { useEffect, useState } from "react";

export default function NavbarComp() {
    const { isOpen, onClose, onOpenChange } = useDisclosure();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [contactFrom, setContactForm] = useState<HTMLDivElement | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        setIsNavOpen(false);
        if (pathname === "/") {
            const el: HTMLDivElement | null = document.getElementById(
                "contact"
            ) as HTMLDivElement;
            setContactForm(el);
        }
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
            <nav className="z-30 w-full">
                <div className="px-4 py-3 xl:py-4 mx-auto flex justify-between grow xl:max-w-[75dvw]">
                    <div className="xl:w-1/4">
                        <Link
                            color="foreground"
                            className="font-bold xl:text-5xl text-3xl hover:text-green-500 transition-colors"
                            href="/">
                            {"{Kit:Hamm}"}
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
                                className="text-xl"
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
                                className="text-xl"
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
                                className="text-xl"
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
                                    pathname === "/about"
                                        ? "text-green-500"
                                        : ""
                                } text-2xl transition-colors font-bold hover:text-green-500`}
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
                                } text-2xl transition-colors font-bold hover:text-green-500`}
                                color="foreground"
                                href="/projects">
                                Projects
                            </a>
                        </div>

                        <div
                            onClick={() => {
                                pathname === "/"
                                    ? contactFrom?.scrollIntoView({
                                          behavior: "smooth",
                                      })
                                    : onOpenChange();
                            }}
                            className="cursor-pointer text-2xl hover:text-green-500 transition-colors font-bold"
                            color="foreground">
                            Contact
                        </div>
                    </div>
                    <ContactModal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        onClose={onClose}
                    />
                </div>
            </nav>
            {isNavOpen && (
                <div className="fade-in z-20 absolute h-full w-full top-0 left-0 bg-white/30 backdrop-blur-lg pt-20">
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
                                pathname === "/"
                                    ? contactFrom?.scrollIntoView({
                                          behavior: "smooth",
                                      })
                                    : onOpenChange();
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
