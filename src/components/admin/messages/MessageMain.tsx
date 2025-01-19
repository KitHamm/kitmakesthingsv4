"use client";

import { deleteMessage } from "@/server/messageActions/deleteMessage";
import { updateMessageRead } from "@/server/messageActions/updateMessageRead";
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

export default function MessagesMain(
	props: Readonly<{ messages: Messages[] }>
) {
	const { messages } = props;
	const { isOpen, onOpenChange, onClose } = useDisclosure();
	const [selectedMessage, setSelectedMessage] = useState(-1);

	function UpdateMessage(messageId: string, read: boolean) {
		updateMessageRead(messageId, read)
			.then((res) => {
				if (res.status === 400) console.log(res.message);
			})
			.catch((err) => console.log(err));
	}

	function handleDelete(messageId: string) {
		deleteMessage(messageId)
			.then((res) => {
				if (res.status === 200) {
					onClose();
					setSelectedMessage(-1);
				} else {
					console.log(res.message);
				}
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<div className="font-bold text-6xl mb-6 pb-4 text-center lg:text-start lg:w-1/4 border-b-2">
				Messages.
			</div>
			<div className="flex fade-in gap-10">
				<div className="lg:w-1/4 w-full flex flex-col gap-4">
					{messages.map((message: Messages, index: number) => {
						return (
							<div key={message.id}>
								<button
									className="w-full text-start lg:block"
									onClick={() => {
										setSelectedMessage(index);
										if (!message.read) {
											UpdateMessage(message.id, true);
										}
									}}
								>
									<MessageRepeat message={message} />
								</button>
							</div>
						);
					})}
				</div>
				<div className="hidden lg:block w-[60%] fixed h-screen top-0 right-0 p-10">
					<div className="bg-neutral-100 h-full w-full rounded-lg shadow-lg p-10">
						{selectedMessage === -1 ? (
							<div className="fade-in font-bold text-xl">
								Select a message...
							</div>
						) : (
							<div className="fade-in flex flex-col h-full">
								<div className="flex gap-2">
									<div className="font-bold">From:</div>
									<div>{messages[selectedMessage].name}</div>
								</div>
								<div className="flex gap-2 border-b pb-2">
									<div className="font-bold">Email:</div>
									<div>{messages[selectedMessage].email}</div>
								</div>
								<div className="flex grow gap-2 pt-2">
									<div className="">
										{messages[selectedMessage].message}
									</div>
								</div>
								<div className="flex justify-end gap-4">
									<Button
										onPress={() => {
											handleDelete(
												messages[selectedMessage].id
											);
										}}
										color="danger"
										variant="light"
									>
										Delete
									</Button>
									<Button
										onPress={() => setSelectedMessage(-1)}
										color="danger"
									>
										Cose
									</Button>
									<Button
										onPress={() => {
											UpdateMessage(
												messages[selectedMessage].id,
												false
											);
											setSelectedMessage(-1);
										}}
										className="bg-green-500"
									>
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
										{messages[selectedMessage].name}
									</div>
									<div className="font-normal text-base">
										{messages[selectedMessage].email}
									</div>
								</ModalHeader>
								<ModalBody>
									<p>{messages[selectedMessage].message}</p>
								</ModalBody>
								<ModalFooter>
									<Button
										color="danger"
										variant="light"
										onPress={() => {
											handleDelete(
												messages[selectedMessage].id
											);
										}}
									>
										Delete
									</Button>
									<Button
										color="danger"
										onPress={() => {
											onClose();
											setSelectedMessage(-1);
										}}
									>
										Close
									</Button>
									<Button
										className="bg-green-500"
										onPress={() => {
											onClose();
											UpdateMessage(
												messages[selectedMessage].id,
												false
											);
											setSelectedMessage(-1);
										}}
									>
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

function MessageRepeat(props: Readonly<{ message: Messages }>) {
	const { message } = props;
	return (
		<div
			className={`${
				message.read ? "bg-neutral-100" : "bg-green-500"
			} flex flex-col lg:hover:bg-green-300 transition-colors cursor-pointer shadow p-2 rounded-lg`}
		>
			<div className="font-bold text-xl">{message.name}</div>
			<div className="font-bold mb-2">{message.email}</div>
			<div className="overflow-hidden truncate text-nowrap">
				{message.message}
			</div>
		</div>
	);
}
