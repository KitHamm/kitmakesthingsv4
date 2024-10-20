"use client";

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { Client } from "@prisma/client";
import { createClient, deleteClient } from "../actions/ClientActions";
import { useForm } from "react-hook-form";
import { ClientForm } from "@/lib/types";

export default function ManageClientsButton(props: { clients: Client[] }) {
    const {
        isOpen: isOpenManageClients,
        onOpen: onOpenManageClients,
        onOpenChange: onOpenChangeManageClients,
        onClose: onCloseManageClients,
    } = useDisclosure();
    const {
        isOpen: isOpenNewClient,
        onOpen: onOpenNewClient,
        onOpenChange: onOpenChangeNewClient,
        onClose: onCloseNewClient,
    } = useDisclosure();
    const clientForm = useForm<ClientForm>({
        defaultValues: {
            name: "",
            address: "",
        },
    });

    const {
        register: registerClient,
        reset: resetClient,
        handleSubmit: handleSubmitClient,
        formState: formStateClient,
    } = clientForm;
    const { errors: errorsClient } = formStateClient;

    function submitClient(data: ClientForm) {
        createClient(data)
            .then(() => {
                onCloseNewClient();
                resetClient();
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Button
                onClick={() => {
                    onOpenChangeManageClients();
                }}
                className="bg-green-500 w-full xl:w-auto">
                Manage Clients
            </Button>
            <Modal
                isDismissable={false}
                isOpen={isOpenManageClients}
                onOpenChange={onOpenChangeManageClients}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Manage Clients
                            </ModalHeader>
                            <div className="px-4">
                                {props.clients.map(
                                    (client: Client, index: number) => {
                                        return (
                                            <div
                                                className="border-b-2 py-2 flex justify-between"
                                                key={client.id}>
                                                <div className="font-bold my-auto">
                                                    {client.name}
                                                </div>
                                                <Button
                                                    onClick={() => {
                                                        onCloseManageClients();
                                                        deleteClient(client.id);
                                                    }}
                                                    color="danger"
                                                    variant="light">
                                                    Delete
                                                </Button>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <ModalBody></ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    color="danger"
                                    variant="light"
                                    onPress={() => {
                                        onClose();
                                        resetClient();
                                    }}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-green-500"
                                    onClick={() => {
                                        onOpenChangeNewClient();
                                    }}>
                                    New Client
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isDismissable={false}
                isOpen={isOpenNewClient}
                onOpenChange={onOpenChangeNewClient}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                New Client
                            </ModalHeader>
                            <form onSubmit={handleSubmitClient(submitClient)}>
                                <ModalBody>
                                    <div>
                                        <label
                                            className="font-bold"
                                            htmlFor="name">
                                            Client Name:
                                        </label>
                                        <input
                                            type="text"
                                            {...registerClient("name", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Client Name is required.",
                                                },
                                            })}
                                            placeholder={
                                                errorsClient.name
                                                    ? errorsClient.name.message
                                                    : "Client Name"
                                            }
                                            className={
                                                errorsClient.name
                                                    ? "placeholder:text-red-500"
                                                    : ""
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="font-bold"
                                            htmlFor="name">
                                            Client Address:
                                        </label>
                                        <textarea
                                            {...registerClient("address", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Address is required.",
                                                },
                                            })}
                                            placeholder={
                                                errorsClient.address
                                                    ? errorsClient.address
                                                          .message
                                                    : "Client address"
                                            }
                                            className={
                                                errorsClient.address
                                                    ? "placeholder:text-red-500"
                                                    : ""
                                            }
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        type="button"
                                        color="danger"
                                        variant="light"
                                        onPress={() => {
                                            onClose();
                                            resetClient();
                                        }}>
                                        Close
                                    </Button>
                                    <Button
                                        className="bg-green-500"
                                        type="submit">
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
