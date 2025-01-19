"use client";

// Packages
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@nextui-org/react";
// Functions
import { createMessage } from "@/server/messageActions/createMessage";
// Types
import { ContactForm, MessageState } from "@/lib/types";

export default function LandingContact() {
	const [sendingState, setSendingState] = useState<MessageState>(
		MessageState.NONE
	);
	const contactForm = useForm<ContactForm>();
	const { handleSubmit, register, formState, reset } = contactForm;
	const { errors } = formState;

	function OnSubmit(data: ContactForm) {
		setSendingState(MessageState.SENDING);
		createMessage(data)
			.then((res) => {
				const nextState =
					res.status === 200
						? MessageState.SUCCESS
						: MessageState.ERROR;
				updateSendingState(nextState);
			})
			.catch((err) => {
				console.error(err);
				updateSendingState(MessageState.ERROR);
			});
	}

	const updateSendingState = (state: MessageState) => {
		setTimeout(() => {
			setSendingState(state);
			if (state === MessageState.SUCCESS) {
				resetStateWithDelay();
			}
		}, 2000);
	};

	const resetStateWithDelay = () => {
		setTimeout(() => {
			reset();
			setSendingState(MessageState.NONE);
		}, 2000);
	};

	const sendingStateToTitle = [
		"Contact Me",
		"Sending...",
		"Success!",
		"Oops!",
	];

	return (
		<div
			id="contact"
			className="lg:w-[60dvw] w-[90dvw] mx-auto pt-10 lg:pb-0 pb-10"
		>
			<div className="font-bold text-4xl lg:text-6xl flex gap-4 mb-8 justify-center">
				{sendingStateToTitle[sendingState]}
			</div>
			<div className="mt-4 h-72 lg:h-96 flex flex-col">
				{sendingState === MessageState.NONE && (
					<form
						className="mb-auto flex flex-col gap-2"
						onSubmit={handleSubmit(OnSubmit)}
					>
						<div className="flex flex-col lg:flex-row lg:gap-5">
							<div className="lg:w-1/2">
								<input
									type="text"
									{...register("name", {
										required: {
											value: true,
											message: "Name is required.",
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
								<input
									type="email"
									{...register("email", {
										required: {
											value: true,
											message: "Email is required.",
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
								errors.message ? "placeholder:text-red-400" : ""
							} lg:h-44`}
						/>
						<div className="flex w-full justify-center">
							<button
								type="submit"
								className="transition-all rounded-xl w-2/3 lg:w-1/2 py-2 text-2xl text-center font-medium bg-white border-2 border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white"
							>
								Send Message
							</button>
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
							Something appears to have gone wrong. Please try
							again later.
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
