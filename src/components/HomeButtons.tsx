"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import ContactModal from "./ContactModal";
import Link from "next/link";

export default function HomeButtons(props: { home: boolean }) {
    const { onOpenChange, isOpen, onClose } = useDisclosure();

    return (
        <div className="flex flex-col xl:flex-row justify-between my-6 gap-10">
            <Link
                className="transition-all xl:w-1/2 py-4 text-2xl text-center font-medium bg-white border-2 border-black rounded-full hover:bg-green-400 hover:border-white hover:text-white"
                href={"/projects"}>
                Projects
            </Link>
            {props.home ? (
                <Link
                    className="transition-all xl:w-1/2 py-4 text-2xl text-center font-medium bg-white border-2 border-black rounded-full hover:bg-green-400 hover:border-white hover:text-white"
                    href={"/about"}>
                    About Me
                </Link>
            ) : (
                <Button
                    onPress={() => onOpenChange()}
                    className="xl:w-1/2 py-8 text-2xl font-medium bg-white border-2 border-black rounded-full hover:bg-green-400 hover:border-white hover:text-white">
                    Contact me
                </Button>
            )}
            <ContactModal
                onClose={onClose}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
        </div>
    );
}
