"use client";

import { Button } from "@nextui-org/react";
import { Landing, Tech } from "@prisma/client";
import Image from "next/image";
import ContactModal from "./ContactModal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { Request } from "./actions/ServiceActions";
import { Session } from "next-auth";

export default function HomeContent(props: {
    landingContent: Landing;
    landingTech: Tech[];
    session: Session;
}) {
    const { onOpenChange, isOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (!props.session) {
            Request(window.location.pathname);
        }
    }, [props.session]);

    return (
        <article className="fade-in mb-8 xl:mb-0 min-h-screen xl:w-[75dvw] w-[90dvw] flex flex-col xl:grid xl:grid-cols-2 xl:gap-20 mx-auto">
            <header className="flex flex-col justify-evenly grow">
                <div className="xl:my-auto">
                    <div className="xl:my-auto">
                        <h1 className="xl:text-8xl text-4xl font-bold text-center">
                            {props.landingContent
                                ? props.landingContent.title
                                : ""}
                        </h1>
                        <div className="xl:mt-6 mt-4 grid grid-cols-2 xl:grid-cols-4 text-center justify-evenly xl:gap-2">
                            {props.landingTech.map((tech: Tech) => {
                                return (
                                    <Highlight
                                        key={tech.name}
                                        text={tech.name}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-4 xl:mt-6 font-bold text-center">
                        {props.landingContent ? props.landingContent.Copy : ""}
                    </div>
                    <div className="flex justify-evenly mt-6">
                        <Button
                            onPress={() => (window.location.href = "/projects")}
                            className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                            Projects
                        </Button>
                        <Button
                            onPress={() => onOpenChange()}
                            className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                            Contact
                        </Button>
                    </div>
                </div>
            </header>
            <figure className="flex order-first xl:order-last xl:mt-0 mt-10 h-2/3 xl:h-auto">
                {props.landingContent && (
                    <Image
                        src={
                            process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                            props.landingContent.imageUrl
                        }
                        height={1200}
                        width={1200}
                        className="xl:my-auto w-auto mx-auto xl:h-auto"
                        alt={props.landingContent.imageUrl}
                    />
                )}
            </figure>
            <ContactModal
                onClose={onClose}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
            />
        </article>
    );
}

function Highlight(props: { text: string }) {
    return (
        <div className="font-bold text-xl xl:text-2xl text-green-500">
            {props.text}
        </div>
    );
}
