"use client";

import { Badge } from "@nextui-org/react";
import { Messages } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SidePanel(props: { messages: Messages[] }) {
    const [dropIsOpen, setDropIsOpen] = useState(false);
    const dropContainer = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [newMessages, setNewMessages] = useState(0);

    useEffect(() => {
        if (dropContainer.current) {
            const scrollHeight = dropContainer.current?.scrollHeight;

            if (dropIsOpen) {
                dropContainer.current!.style.height = scrollHeight + "px";
            } else {
                dropContainer.current!.style.height = "0px";
            }
        }
    }, [dropIsOpen]);

    useEffect(() => {
        var count = 0;
        for (let i = 0; i < props.messages.length; i++) {
            if (!props.messages[i].read) {
                count = count + 1;
            }
        }
        setNewMessages(count);
    }, [props.messages]);

    const pathName = usePathname();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    useEffect(() => {
        if (!pathName.includes("content")) {
            setDropIsOpen(false);
        }
        setIsOpen(false);
    }, [pathName]);
    return (
        <>
            <div
                className={`${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full xl:translate-x-0"
                } transition-all fixed top-0 left-0 w-auto xl:w-1/6 h-screen bg-neutral-100 border-e-2 z-40`}>
                <div className="font-bold text-5xl text-center py-6 border-b-2 mx-4">
                    <Link
                        className="xl:hover:text-green-500 transition-colors"
                        href={"/"}>
                        {"<Kit:Hamm/>"}
                    </Link>
                </div>
                <div
                    className={`${
                        isOpen ? "opacity-100" : "opacity-0"
                    } flex flex-col my-8 transition-all xl:opacity-100`}>
                    <NavLink
                        link="/dashboard"
                        text="Statistics"
                        active={pathName === "/dashboard"}
                        newMessages={newMessages}
                    />
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            setDropIsOpen(!dropIsOpen);
                        }}
                        className={`cursor-pointer py-2 ps-8 font-bold text-lg me-16 rounded-tr-full rounded-br-full transition-all hover:bg-neutral-400 hover:text-white`}>
                        Content
                    </div>
                    <div
                        style={{ height: "0px" }}
                        className="transition-all overflow-hidden"
                        ref={dropContainer}>
                        <div
                            className={`${
                                pathName === "/dashboard/content"
                                    ? "border-s-4 border-neutral-600 bg-green-500"
                                    : ""
                            } font-bold ps-12 py-1 me-24 hover:bg-neutral-400 hover:text-white rounded-tr-full rounded-br-full`}>
                            <Link href={"/dashboard/content"}>Pages</Link>
                        </div>
                        <div
                            className={`${
                                pathName === "/dashboard/content/projects"
                                    ? "border-s-4 border-neutral-600 bg-green-500"
                                    : ""
                            } font-bold ps-12 py-1 me-24 hover:bg-neutral-400 hover:text-white rounded-tr-full rounded-br-full`}>
                            <Link href={"/dashboard/content/projects"}>
                                Projects
                            </Link>
                        </div>
                    </div>
                    <NavLink
                        link="/dashboard/messages"
                        text="Messages"
                        active={pathName === "/dashboard/messages"}
                        newMessages={newMessages}
                    />

                    <NavLink
                        link="/dashboard/invoices"
                        text="Invoices"
                        active={pathName === "/dashboard/invoices"}
                        newMessages={newMessages}
                    />
                    {/* <NavLink
                        link="/dashboard/accounts"
                        text="Accounts"
                        active={pathName === "/dashboard/accounts"}
                        newMessages={newMessages}
                    /> */}
                    <NavLink
                        link="/dashboard/projects"
                        text="Projects"
                        active={pathName.includes("/dashboard/projects")}
                        newMessages={newMessages}
                    />
                    <NavLink
                        link="/dashboard/media"
                        text="Media"
                        active={pathName === "/dashboard/media"}
                        newMessages={newMessages}
                    />
                </div>
            </div>
            <div className="xl:hidden fixed bottom-3 left-3 z-40 bg-neutral-300 p-3 rounded-full border-2 shadow">
                <div onClick={() => setIsOpen(!isOpen)} className="my-auto">
                    <i
                        className={`${
                            isOpen ? "-rotate-90" : "rotate-0"
                        } fa-solid fa-bars fa-2xl mt-auto transition-transform`}
                    />
                </div>
            </div>
        </>
    );
}

function NavLink(props: {
    link: string;
    text: string;
    active: boolean;
    newMessages: number;
}) {
    return (
        <Link
            className={`${
                props.active ? "bg-green-500 border-s-4 border-neutral-600" : ""
            } py-2 ps-8 font-bold text-lg me-16 rounded-tr-full rounded-br-full transition-all hover:bg-neutral-400 hover:text-white`}
            href={props.link}>
            <Badge
                classNames={{ badge: "-right-1 top-" }}
                showOutline={false}
                isInvisible={
                    props.text !== "Messages"
                        ? true
                        : props.newMessages === 0
                        ? true
                        : false
                }
                placement="top-right"
                content={props.newMessages}
                color="danger">
                {props.text}
            </Badge>
        </Link>
    );
}
