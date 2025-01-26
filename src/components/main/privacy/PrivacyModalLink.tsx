"use client";

// Packages
import { useDisclosure } from "@nextui-org/react";
// Components
import ContactModal from "../shared/ContactModal";

const PrivacyModalLink = () => {
	const { onClose, isOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<button
				onClick={() => {
					onOpenChange();
				}}
				className="text-green-500 cursor-pointer"
			>
				Contact Form
			</button>
			<ContactModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
			/>
		</>
	);
};

export default PrivacyModalLink;
