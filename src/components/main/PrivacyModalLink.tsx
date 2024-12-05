"use client";

import ContactModal from "./ContactModal";
import { useDisclosure } from "@nextui-org/react";

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
