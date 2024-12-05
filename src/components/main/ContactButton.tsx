"use client";

// Components
import ContactModal from "./ContactModal";
// Packages
import { Button, useDisclosure } from "@nextui-org/react";

export default function ContactButton(props: { about: boolean }) {
    const { about } = props;
    const { onOpenChange, isOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                onPress={() => onOpenChange()}
                className={`${
                    about ? "py-8 slide-in-left" : "py-6"
                } xl:w-full transition-all rounded-none font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white`}>
                Contact me
            </Button>
            <ContactModal
                onClose={onClose}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
        </>
    );
}
