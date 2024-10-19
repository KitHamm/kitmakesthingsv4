"use client";

import {
    deleteMessage,
    updateMessageRead,
} from "@/components/actions/MessageActions";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { Messages } from "@prisma/client";
import { useState } from "react";

export default function MessagesMain(props: { messages: Messages[] }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedMessage, setSelectedMessage] = useState(-1);

    function UpdateMessage(messageId: string, read: boolean) {
        updateMessageRead(messageId, read).catch((err) => console.log(err));
    }

    return (
        <>
            <div className="font-bold text-6xl mb-6 pb-4 text-center xl:text-start xl:w-1/4 border-b-2">
                Messages.
            </div>
            <div className="flex fade-in gap-10">
                <div className="xl:w-1/4 w-full flex flex-col gap-4">
                    {props.messages.map((message: Messages, index: number) => {
                        return (
                            <div key={message.id}>
                                {/* Desktop */}
                                <div
                                    className="hidden  xl:block"
                                    onClick={() => {
                                        setSelectedMessage(index);
                                        if (!message.read) {
                                            UpdateMessage(message.id, true);
                                        }
                                    }}>
                                    <MessageRepeat message={message} />
                                </div>
                                {/* Mobile */}
                                <div
                                    className="xl:hidden"
                                    onClick={() => {
                                        setSelectedMessage(index);
                                        if (!message.read) {
                                            UpdateMessage(message.id, true);
                                        }
                                        onOpenChange();
                                    }}>
                                    <MessageRepeat message={message} />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="hidden xl:block w-[60%] fixed h-screen top-0 right-0 p-10">
                    <div className="bg-neutral-100 h-full w-full rounded-lg shadow-lg p-10">
                        {selectedMessage === -1 ? (
                            <div className="fade-in font-bold text-xl">
                                Select a message...
                            </div>
                        ) : (
                            <div className="fade-in flex flex-col h-full">
                                <div className="flex gap-2">
                                    <div className="font-bold">From:</div>
                                    <div>
                                        {props.messages[selectedMessage].name}
                                    </div>
                                </div>
                                <div className="flex gap-2 border-b pb-2">
                                    <div className="font-bold">Email:</div>
                                    <div>
                                        {props.messages[selectedMessage].email}
                                    </div>
                                </div>
                                <div className="flex grow gap-2 pt-2">
                                    <div className="">
                                        {
                                            props.messages[selectedMessage]
                                                .message
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4">
                                    <Button
                                        onPress={() => {
                                            deleteMessage(
                                                props.messages[selectedMessage]
                                                    .id
                                            )
                                                .then(() => {
                                                    setSelectedMessage(-1);
                                                })
                                                .catch((err) =>
                                                    console.log(err)
                                                );
                                        }}
                                        color="danger"
                                        variant="light">
                                        Delete
                                    </Button>
                                    <Button
                                        onPress={() => setSelectedMessage(-1)}
                                        color="danger">
                                        Cose
                                    </Button>
                                    <Button
                                        onPress={() => {
                                            UpdateMessage(
                                                props.messages[selectedMessage]
                                                    .id,
                                                false
                                            );
                                            setSelectedMessage(-1);
                                        }}
                                        className="bg-green-500">
                                        Mark Unread
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    <div className="text-xl">
                                        {props.messages[selectedMessage].name}
                                    </div>
                                    <div className="font-normal text-base">
                                        {props.messages[selectedMessage].email}
                                    </div>
                                </ModalHeader>
                                <ModalBody>
                                    <p>
                                        {
                                            props.messages[selectedMessage]
                                                .message
                                        }
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={() => {
                                            deleteMessage(
                                                props.messages[selectedMessage]
                                                    .id
                                            )
                                                .then(() => {
                                                    onClose();
                                                    setSelectedMessage(-1);
                                                })
                                                .catch((err) =>
                                                    console.log(err)
                                                );
                                        }}>
                                        Delete
                                    </Button>
                                    <Button
                                        color="danger"
                                        onPress={() => {
                                            onClose();
                                            setSelectedMessage(-1);
                                        }}>
                                        Close
                                    </Button>
                                    <Button
                                        className="bg-green-500"
                                        onPress={() => {
                                            onClose();
                                            UpdateMessage(
                                                props.messages[selectedMessage]
                                                    .id,
                                                false
                                            );
                                            setSelectedMessage(-1);
                                        }}>
                                        Mark Unread
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}

function MessageRepeat(props: { message: Messages }) {
    return (
        <div
            className={`${
                props.message.read ? "bg-neutral-100" : "bg-green-500"
            } flex flex-col xl:hover:bg-green-300 transition-colors cursor-pointer shadow p-2 rounded-lg`}>
            <div className="font-bold text-xl">{props.message.name}</div>
            <div className="font-bold mb-2">{props.message.email}</div>
            <div className="overflow-hidden truncate text-nowrap">
                {props.message.message}
            </div>
        </div>
    );
}
