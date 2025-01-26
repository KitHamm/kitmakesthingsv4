"use client";
// Packages
import { Button, useDisclosure } from "@nextui-org/react";
// Components
import ContactModal from "./ContactModal";

const ContactButton = ({ about }: Readonly<{ about: boolean }>) => {
	const { onOpenChange, isOpen, onClose } = useDisclosure();

	return (
		<>
			<Button
				onPress={() => onOpenChange()}
				className={`${
					about ? "lg:h-auto py-6 lg:py-0 slide-in-left" : "py-6"
				} lg:w-full transition-all rounded-xl font-medium text-xl bg-white border-2 border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white`}
			>
				Contact me
			</Button>
			<ContactModal
				onClose={onClose}
				onOpenChange={onOpenChange}
				isOpen={isOpen}
			/>
		</>
	);
};

export default ContactButton;
