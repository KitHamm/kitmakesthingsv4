"use client";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function NavbarComp() {
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
                <div>
                    <a
                        className="text-lg hover:text-green-500 transition-colors font-bold"
                        color="foreground"
                        href="#">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
        // <Navbar
        //     position="sticky"
        //     classNames={{
        //         wrapper: "xl:max-w-[75dvw]",
        //         base: "bg-neutral-100",
        //     }}
        //     isBordered
        //     onMenuOpenChange={setIsMenuOpen}>
        //     <NavbarBrand>
        //         <Link
        //             color="foreground"
        //             className="font-bold text-4xl hover:text-green-500 transition-colors"
        //             href="/">
        //             {"<Kit:Hamm/>"}
        //         </Link>
        //     </NavbarBrand>
        //     <NavbarMenuToggle
        //         aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        //         className="sm:hidden"
        //     />

        //     <NavbarContent className="hidden sm:flex gap-10" justify="center">
        //         <NavbarItem isActive>
        //             <Link
        //                 className={`${
        //                     props.page === "about" ? "text-green-400" : ""
        //                 } text-lg transition-colors font-bold`}
        //                 color="foreground"
        //                 href="/about">
        //                 About
        //             </Link>
        //         </NavbarItem>
        //         <NavbarItem>
        //             <Link
        //                 className={`${
        //                     props.page === "projects" ? "text-green-400" : ""
        //                 } text-lg transition-colors font-bold`}
        //                 color="foreground"
        //                 href="/projects">
        //                 Projects
        //             </Link>
        //         </NavbarItem>
        //         <NavbarItem>
        //             <Link
        //                 className="text-lg hover:text-green-500 transition-colors font-bold"
        //                 color="foreground"
        //                 href="#">
        //                 Contact
        //             </Link>
        //         </NavbarItem>
        //         <div className="flex gap-4">
        //             <NavbarItem>
        //                 <a href="#">
        //                     <i
        //                         aria-hidden
        //                         className="transition-colors text-black hover:text-green-500 fa-brands fa-github fa-2xl"
        //                     />
        //                 </a>
        //             </NavbarItem>
        //             <NavbarItem>
        //                 <a href="#">
        //                     <i
        //                         aria-hidden
        //                         className="transition-colors text-black hover:text-green-500 fa-brands fa-instagram fa-2xl"
        //                     />
        //                 </a>
        //             </NavbarItem>
        //             <NavbarItem>
        //                 <a href="#">
        //                     <i
        //                         aria-hidden
        //                         className="transition-colors text-black hover:text-green-500 fa-brands fa-linkedin fa-2xl"
        //                     />
        //                 </a>
        //             </NavbarItem>
        //         </div>
        //     </NavbarContent>
        //     <NavbarMenu>
        //         <NavbarMenuItem>
        //             <Link color="foreground" href="#">
        //                 About
        //             </Link>
        //         </NavbarMenuItem>
        //         <NavbarMenuItem isActive>
        //             <Link href="#" aria-current="page">
        //                 Projects
        //             </Link>
        //         </NavbarMenuItem>
        //         <NavbarMenuItem>
        //             <Link color="foreground" href="#">
        //                 Contact
        //             </Link>
        //         </NavbarMenuItem>
        //     </NavbarMenu>
        // </Navbar>
    );
}
