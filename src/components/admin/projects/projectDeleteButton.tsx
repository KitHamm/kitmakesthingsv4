"use client";

import { DeleteProject } from "@/components/actions/WorkingProjectActions";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

export default function ProjectDeleteButton(props: { id: string }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    function onDelete() {
        DeleteProject(props.id).then((res) => {
            if (res.status === 200) {
                window.location.href = "/dashboard/projects";
            } else {
                console.log(res.message);
            }
        });
    }

    return (
        <>
            <Button onPress={onOpen} variant="light" color="danger">
                Delete Project
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Are you sure?
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
                                    onPress={onDelete}>
                                    Delete
                                </Button>
                                <Button
                                    className="bg-green-500"
                                    onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
