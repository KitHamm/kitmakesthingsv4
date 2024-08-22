"use client";

import { Button, Chip, useDisclosure } from "@nextui-org/react";
import { ContentProject } from "@prisma/client";
import Image from "next/image";
import Markdown from "react-markdown";
import ContactModal from "./ContactModal";
import { useEffect } from "react";
import { Request } from "./actions/ServiceActions";
import { Session } from "next-auth";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./embla/EmblaCarousel";

export default function ProjectContent(props: {
    project: ContentProject;
    session: Session;
}) {
    const { onOpenChange, isOpen, onClose } = useDisclosure();
    useEffect(() => {
        ServiceRequest();
    }, []);

    const OPTIONS: EmblaOptionsType = { loop: true };

    async function ServiceRequest() {
        if (!props.session) {
            await Request(window.location.pathname);
        }
    }
    return (
        <article className="fade-in min-h-screen xl:w-[75dvw] w-[90dvw] grid xl:grid-cols-2 xl:gap-20 mx-auto">
            <header className="flex">
                <div className="my-auto">
                    <div className="my-auto">
                        <h1 className="xl:text-6xl text-4xl font-bold ">
                            {props.project.name}
                        </h1>
                        <div className="font-bold text-xl mt-2">
                            {props.project.role}
                        </div>
                        <div>{props.project.date}</div>
                        <div className="mt-6 flex flex-wrap text-center gap-2">
                            {props.project.stack.map(
                                (stack: String, index: number) => {
                                    return (
                                        <Chip
                                            key={stack + "-" + index}
                                            className="bg-green-500 text-white">
                                            {stack}
                                        </Chip>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <Markdown className="mt-6 font-bold">
                        {props.project.description as string}
                    </Markdown>
                    <div className="flex justify-evenly my-6">
                        <Button
                            onPress={() => (window.location.href = "/projects")}
                            className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                            Back
                        </Button>
                        <Button
                            onPress={() => onOpenChange()}
                            className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                            Contact
                        </Button>
                    </div>
                </div>
            </header>
            <figure className="flex order-first mt-24 xl:mt-0 mb-10 xl:order-last">
                {/* <Image
                    src={
                        process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                        props.project.images[0]
                    }
                    height={1200}
                    width={1200}
                    className="my-auto w-auto h-auto"
                    alt={props.project.images[0]}
                /> */}
                <EmblaCarousel
                    slides={props.project.images}
                    options={OPTIONS}
                />
            </figure>
            <ContactModal
                onClose={onClose}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
        </article>
    );
}
