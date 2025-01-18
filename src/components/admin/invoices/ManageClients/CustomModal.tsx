import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";

const CustomModal = ({
	isOpen,
	onClose,
	title,
	children,
	footerButtons,
}: {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	footerButtons: React.ReactNode;
}) => (
	<Modal isDismissable={false} isOpen={isOpen} onOpenChange={onClose}>
		<ModalContent>
			<>
				<ModalHeader className="flex flex-col gap-1">
					{title}
				</ModalHeader>
				<ModalBody>{children}</ModalBody>
				<ModalFooter>{footerButtons}</ModalFooter>
			</>
		</ModalContent>
	</Modal>
);

export default CustomModal;
