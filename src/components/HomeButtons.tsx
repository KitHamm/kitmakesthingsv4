"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { Request } from "./actions/ServiceActions";
import ContactModal from "./ContactModal";

export default function HomeButtons() {
    const { onOpenChange, isOpen, onClose } = useDisclosure();
    useEffect(() => {
        Request(window.location.pathname);
    }, []);
    return (
        <div className="flex justify-evenly mt-6">
            <Button
                onPress={() => (window.location.href = "/projects")}
                className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                Projects
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
