"use client";

import { deleteProject } from "@/server/contentActions/deleteContentProject";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";

const DeleteProjectButton = ({ id }: Readonly<{ id: string }>) => {
	const { isOpen, onOpenChange } = useDisclosure();

	const onDelete = async () => {
		try {
			const res = await deleteProject(id);
			if (res.status === 200) {
				onOpenChange();
			} else {
				console.log(res.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Button
				onPress={onOpenChange}
				className="rounded"
				variant="light"
				color="danger"
			>
				Delete Project
			</Button>
			<Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex text-2xl text-red-500 flex-col gap-1">
								WARNING
							</ModalHeader>
							<ModalBody>
								<p>
									Are you sure you want to delete this
									project?
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									className="rounded-md"
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									className="rounded-md bg-red-500 text-white text-md"
									onPress={onDelete}
								>
									Confirm Delete
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteProjectButton;
