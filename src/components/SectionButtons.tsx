"use client";

import { useDisclosure } from "@nextui-org/react";
import ContactModal from "./ContactModal";
import Link from "next/link";

export default function SectionButtons() {
    const { onOpenChange, isOpen, onClose } = useDisclosure();

    return (
        <div
            className={`bg-white bg-opacity-10 duration-700 transition-all w-full mx-auto h-full flex justify-center`}>
            <div className="xl:w-[50dvw] w-[90dvw] my-auto gap-20 grid xl:grid-cols-2 grid-cols-1">
                <Link
                    className={`transition-all text-center py-4 text-2xl font-medium border-5 text-white border-white rounded-full backdrop-blur hover:bg-green-500 hover:text-white`}
                    href={"/projects"}>
                    Projects
                </Link>
                <Link
                    target="_blank"
                    className="transition-all text-center py-4 text-2xl font-medium border-5 text-white border-white rounded-full backdrop-blur hover:bg-green-500 hover:text-white"
                    href={"https://github.com/KitHamm/"}>
                    GitHub
                </Link>
            </div>
            <ContactModal
                onClose={onClose}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
        </div>
    );
}
