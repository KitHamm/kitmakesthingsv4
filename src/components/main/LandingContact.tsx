"use client";

// Packages
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@nextui-org/react";
// Functions
import { sendMessage } from "../actions/MessageActions";
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

    return (
        <div
            id="contact"
            className="xl:w-[50dvw] w-[90dvw] mx-auto pt-10 xl:pb-0 pb-10">
            <div className="font-bold text-4xl xl:text-6xl flex gap-4 justify-center">
                {sendingState === MessageState.NONE ? (
                    <>
                        <i className="fade-in-slow fa-solid fa-paper-plane" />
                        <div className="fade-in-slow">Contact Me</div>
                    </>
                ) : sendingState === MessageState.SUCCESS ? (
                    <div className="fade-in-slow">Success!</div>
                ) : sendingState === MessageState.SENDING ? (
                    <div className="fade-in-slow">Sending...</div>
                ) : (
                    <div className="fade-in-slow">Oops!</div>
                )}
            </div>
            <div className="mt-4 h-72 xl:h-96 flex flex-col">
                {sendingState === MessageState.NONE && (
                    <form
                        className="mb-auto flex flex-col gap-2"
                        onSubmit={handleSubmit(OnSubmit)}>
                        <div className="flex flex-col xl:flex-row xl:gap-5">
                            <div className="xl:w-1/2">
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
                            <div className="xl:w-1/2">
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
                            } xl:h-44`}
                        />
                        <div className="flex w-full justify-center">
                            <button
                                type="submit"
                                className="transition-all w-2/3 xl:w-1/2 py-2 text-2xl text-center font-medium bg-white border-2 border-black hover:bg-green-400 hover:border-white hover:text-white">
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
