"use client";

// Packages
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@nextui-org/react";
// Functions
import { sendMessage } from "../actions/MessageActions";
// Types
import { MessageState, ContactForm } from "@/lib/types";

export default function ContactModal(props: {
    onOpenChange: any;
    isOpen: any;
    onClose: any;
}) {
    const [sendingState, setSendingState] = useState<MessageState>(
        MessageState.NONE
    );
    const contactForm = useForm<ContactForm>();
    const { handleSubmit, register, formState, reset } = contactForm;
    const { errors } = formState;

    function OnSubmit(data: ContactForm) {
        setSendingState(MessageState.SENDING);
        sendMessage(data)
            .then(() => {
                setTimeout(() => {
                    setSendingState(MessageState.SUCCESS);
                    setTimeout(() => {
                        setSendingState(MessageState.NONE);
                        reset();
                    }, 2000);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                setTimeout(() => {
                    setSendingState(MessageState.ERROR);
                }, 2000);
            });
    }

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

    return (
        <Modal
            id="modal"
            backdrop="blur"
            size="4xl"
            scrollBehavior="inside"
            classNames={{ base: "transition-all", closeButton: "hidden" }}
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex text-center text-4xl flex-col gap-1">
                            {sendingState === MessageState.NONE
                                ? "Contact"
                                : sendingState === MessageState.SUCCESS
                                ? "Success!"
                                : sendingState === MessageState.SENDING
                                ? "Sending..."
                                : "Oops!"}
                        </ModalHeader>
                        <ModalBody>
                            {sendingState === MessageState.NONE && (
                                <form
                                    className="fade-in"
                                    onSubmit={handleSubmit(OnSubmit)}>
                                    <div className="flex flex-col xl:flex-row xl:gap-10">
                                        <div className="xl:w-1/2">
                                            <label
                                                className="font-bold"
                                                htmlFor="firstName">
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
                                        <div className="xl:w-1/2">
                                            <label
                                                className="font-bold"
                                                htmlFor="lastName">
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
                                        htmlFor="message">
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
                                        } xl:h-44`}
                                    />
                                    <p className="text-sm">
                                        By using this service you agree to the
                                        terms set out in our{" "}
                                        <span
                                            onClick={() => {
                                                onClose();
                                                window.location.href =
                                                    "/privacy";
                                            }}
                                            className="text-green-500 cursor-pointer">
                                            Privacy Policy
                                        </span>
                                        .
                                    </p>

                                    <div className="flex justify-end my-2 gap-2">
                                        <Button
                                            type="button"
                                            color="danger"
                                            variant="light"
                                            onPress={() => {
                                                handleClose();
                                            }}>
                                            Close
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-green-500 text-white">
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
