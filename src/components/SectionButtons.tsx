"use client";

import { useDisclosure } from "@nextui-org/react";
import ContactModal from "./ContactModal";
import Link from "next/link";

export default function SectionButtons() {
    const { onOpenChange, isOpen, onClose } = useDisclosure();

    return (
        <div
            className={`bg-white bg-opacity-10 duration-700 transition-all w-full mx-auto h-full flex justify-center`}>
            <div className="w-[75dvw] my-auto gap-20 grid xl:grid-cols-3 grid-cols-1">
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
                <button
                    onClick={() => onOpenChange()}
                    className="transition-all py-4 text-2xl font-medium border-5 text-white border-white rounded-full hover:bg-green-500 backdrop-blur hover:text-white">
                    Contact
                </button>
            </div>
            <ContactModal
                onClose={onClose}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
        </div>
    );
}
