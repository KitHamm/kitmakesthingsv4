"use client";

import { Button, Chip } from "@nextui-org/react";
import { ContentProject } from "@prisma/client";
import Image from "next/image";
import Markdown from "react-markdown";

export default function ProjectContent(props: { project: ContentProject }) {
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
                        <div className="mt-6 flex flex-wrap text-center justify-evenly gap-2">
                            {props.project.stack.map((stack: String) => {
                                return (
                                    <Chip className="bg-green-500 text-white">
                                        {stack}
                                    </Chip>
                                );
                            })}
                        </div>
                    </div>
                    <Markdown className="mt-6 font-bold">
                        {props.project.description as string}
                    </Markdown>
                    <div className="flex justify-evenly mt-6">
                        <Button className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                            Image Gallery
                        </Button>
                        <Button className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                            Contact
                        </Button>
                    </div>
                </div>
            </header>
            <figure className="flex order-first xl:order-last">
                <Image
                    src={
                        process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                        props.project.images[0]
                    }
                    height={1200}
                    width={1200}
                    className="my-auto w-auto h-auto"
                    alt={props.project.images[0]}
                />
            </figure>
        </article>
    );
}
