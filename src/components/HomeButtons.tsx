"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import ContactModal from "./ContactModal";
import Link from "next/link";

export default function HomeButtons(props: { home: boolean }) {
    const { onOpenChange, isOpen, onClose } = useDisclosure();

    return (
        <div className="flex flex-col xl:flex-row justify-between my-6 gap-10">
            <Link
                className={`${
                    props.home ? "" : "slide-in-right"
                } transition-all xl:w-1/2 py-4 text-2xl text-center font-medium bg-white border-2 border-black hover:bg-green-400 hover:border-white hover:text-white`}
                href={"/projects"}>
                <i className="fa-solid fa-diagram-project"></i> View Projects
            </Link>
            {props.home ? (
                <>
                    <Link
                        target="_blank"
                        className="transition-all xl:w-1/2 py-4 text-2xl text-center font-medium bg-white border-2 border-black hover:bg-green-400 hover:border-white hover:text-white"
                        href={"https://github.com/KitHamm/kitmakesthingsv4"}>
                        {"<SourceCode />"}
                    </Link>
                </>
            ) : (
                <Button
                    onPress={() => onOpenChange()}
                    className="slide-in-left xl:w-1/2 py-8 text-2xl font-medium bg-white border-2 border-black rounded-none hover:bg-green-400 hover:border-white hover:text-white">
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
