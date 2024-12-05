"use client";

// Packages
import { useDisclosure } from "@nextui-org/react";
// Components
import ContactModal from "./ContactModal";

export default function PrivacyModalLink() {
    const { onClose, isOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <span
                onClick={() => {
                    onOpenChange();
                }}
                className="text-green-500 cursor-pointer">
                Contact Form
            </span>
            <ContactModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />
        </>
    );
}
