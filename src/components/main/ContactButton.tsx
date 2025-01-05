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
					about ? "py-6 slide-in-left" : "py-6"
				} lg:w-full transition-all rounded-xl font-medium text-xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white`}
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
}
