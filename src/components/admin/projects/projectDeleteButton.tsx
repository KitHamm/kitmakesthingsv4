"use client";
// packages
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
// functions
import { deleteProject } from "@/server/projectTrackerActions/deleteProject";

const ProjectDeleteButton = ({ id }: Readonly<{ id: string }>) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onDelete = async () => {
		try {
			const res = await deleteProject(id);
			if (res.success) {
				window.location.href = "/dashboard/projects";
			} else {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	return (
		<>
			<Button
				onPress={onOpen}
				className="text-md"
				variant="light"
				color="danger"
			>
				Delete Project
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-red-500">
								WARNING
							</ModalHeader>
							<ModalBody>
								<p>
									Deleting the project will also delete all of
									the tasks associated with this project and
									cannot be undone.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									className="text-md rounded-lg"
									onPress={onDelete}
								>
									Delete
								</Button>
								<Button
									className="bg-green-500 text-white text-md rounded-lg"
									onPress={onClose}
								>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProjectDeleteButton;
