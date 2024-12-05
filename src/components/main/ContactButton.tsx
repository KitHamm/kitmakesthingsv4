"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import ContactModal from "./ContactModal";

export default function ContactButton(props: { home: boolean }) {
    const { onOpenChange, isOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                onPress={() => onOpenChange()}
                className="slide-in-left xl:w-1/2 py-8 text-2xl font-medium bg-white bg-opacity-25 backdrop-blur-sm border-2 border-black rounded-none hover:bg-green-400 hover:border-white hover:text-white">
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
