"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import ContactModal from "./ContactModal";
import { useEffect } from "react";
import { Request } from "./actions/ServiceActions";

export default function ProjectButtons(props: { slug: string }) {
    const { onOpenChange, isOpen, onClose } = useDisclosure();
    useEffect(() => {
        Request("/" + props.slug);
    }, [props.slug]);

    return (
        <div className="flex justify-evenly my-6">
            <Button
                onPress={() => (window.location.href = "/projects")}
                className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                Back
            </Button>
            <Button
                onPress={() => onOpenChange()}
                className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                Contact
            </Button>
            <ContactModal
                onClose={onClose}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
        </div>
    );
}
