"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import ContactModal from "./ContactModal";
import { useEffect } from "react";
import { Request } from "./actions/ServiceActions";
import Link from "next/link";

export default function ProjectButtons(props: { slug: string }) {
    const { onOpenChange, isOpen, onClose } = useDisclosure();
    useEffect(() => {
        Request("/" + props.slug);
    }, [props.slug]);

    return (
        <>
            {/* <Link
                className="xl:w-1/2 py-4 text-center rounded-full transition-all font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                href={"/projects"}>
                Back
            </Link> */}
            <button
                onClick={() => onOpenChange()}
                className="xl:w-full py-4 transition-all rounded-full font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white">
                Contact
            </button>
            <ContactModal
                onClose={onClose}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
        </>
    );
}
