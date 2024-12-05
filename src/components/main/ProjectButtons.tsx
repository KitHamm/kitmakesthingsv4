"use client";

import { useDisclosure } from "@nextui-org/react";
import ContactModal from "./ContactModal";
import { useEffect } from "react";
import { Request } from "../actions/ServiceActions";

export default function ProjectButtons(props: { slug: string }) {
    const { onOpenChange, isOpen, onClose } = useDisclosure();
    useEffect(() => {
        Request("/" + props.slug);
    }, [props.slug]);

    return (
        <>
            <button
                onClick={() => onOpenChange()}
                className="xl:w-full py-2 transition-all rounded-none font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white">
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
