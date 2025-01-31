"use client";

// Packages
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@nextui-org/react";
// Functions
import { createMessage } from "@/server/messageActions/createMessage";
// Types
import { MessageState, ContactForm } from "@/lib/types";

export default function ContactModal(
	props: Readonly<{
		onOpenChange: () => void;
		isOpen: boolean;
		onClose: () => void;
	}>
) {
	const [sendingState, setSendingState] = useState<MessageState>(
		MessageState.NONE
	);
	const contactForm = useForm<ContactForm>();
	const { handleSubmit, register, formState, reset } = contactForm;
	const { errors } = formState;

	const OnSubmit = async (data: ContactForm) => {
		try {
			const res = await createMessage(data);
			if (res.success) {
				setSendingState(MessageState.SUCCESS);
				resetStateWithDelay();
			} else {
				setSendingState(MessageState.ERROR);
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.error("Unexpected error:", error);
			setSendingState(MessageState.ERROR);
		}
	};

	const resetStateWithDelay = () => {
		setTimeout(() => {
			reset();
			setSendingState(MessageState.NONE);
		}, 2000);
	};

	function handleClose() {
		reset();
		setSendingState(MessageState.NONE);
		props.onOpenChange();
	}

	useEffect(() => {
		if (!props.isOpen) {
			reset();
			setSendingState(MessageState.NONE);
		}
	}, [props.isOpen, reset]);

	const sendingStateToTitle = [
		"Contact Me",
		"Sending...",
		"Success!",
		"Oops!",
	];

	return (
		<Modal
			id="modal"
			backdrop="blur"
			size="4xl"
			scrollBehavior="inside"
			classNames={{ base: "transition-all", closeButton: "hidden" }}
			isOpen={props.isOpen}
			onOpenChange={props.onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex text-center text-4xl flex-col gap-1">
							{sendingStateToTitle[sendingState]}
						</ModalHeader>
						<ModalBody>
							{sendingState === MessageState.NONE && (
								<form
									className="fade-in"
									onSubmit={handleSubmit(OnSubmit)}
								>
									<div className="flex flex-col lg:flex-row lg:gap-10">
										<div className="lg:w-1/2">
											<label
												className="font-bold"
												htmlFor="firstName"
											>
												Name
											</label>
											<input
												type="text"
												{...register("name", {
													required: {
														value: true,
														message:
															"Name is required.",
													},
												})}
												placeholder={
													errors.name
														? errors.name.message
														: "Name"
												}
												className={
													errors.name
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
										<div className="lg:w-1/2">
											<label
												className="font-bold"
												htmlFor="lastName"
											>
												Email
											</label>
											<input
												type="email"
												{...register("email", {
													required: {
														value: true,
														message:
															"Email is required.",
													},
												})}
												placeholder={
													errors.email
														? errors.email.message
														: "Email"
												}
												className={
													errors.email
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
									</div>
									<label
										className="font-bold"
										htmlFor="message"
									>
										Message:
									</label>
									<textarea
										{...register("message", {
											required: {
												value: true,
												message: "Message is required.",
											},
										})}
										placeholder={
											errors.message
												? errors.message.message
												: "Type your message..."
										}
										className={`${
											errors.message
												? "placeholder:text-red-400"
												: ""
										} lg:h-44`}
									/>
									<p className="text-sm">
										By using this service you agree to the
										terms set out in our{" "}
										<button
											onClick={() => {
												onClose();
												window.location.href =
													"/privacy";
											}}
											className="text-green-500 cursor-pointer"
										>
											Privacy Policy
										</button>
										{/*
										 */}
										.
									</p>

									<div className="flex justify-end my-2 gap-2">
										<Button
											type="button"
											color="danger"
											variant="light"
											onPress={() => {
												handleClose();
											}}
										>
											Close
										</Button>
										<Button
											type="submit"
											className="bg-green-600 text-white"
										>
											Send
										</Button>
									</div>
								</form>
							)}
							{sendingState === MessageState.SENDING && (
								<div className="fade-in flex justify-center my-20">
									<CircularProgress
										aria-label="Loading Landing Image"
										classNames={{
											svg: "w-36 h-36 ",
											indicator: "stroke-green-500",
											track: "stroke-neutral-400/50",
											value: "text-3xl font-semibold text-white",
										}}
									/>
								</div>
							)}
							{sendingState === MessageState.SUCCESS && (
								<div className="fade-in text-center justify-center my-20">
									<div className="font-bold text-2xl">
										Thank you for your message.
									</div>
								</div>
							)}
							{sendingState === MessageState.ERROR && (
								<div className="fade-in text-center justify-center my-20">
									<div className="font-bold text-2xl">
										Something appears to have gone wrong.
										Please try again later.
									</div>
								</div>
							)}
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
