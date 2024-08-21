"use client";

import { Button } from "@nextui-org/react";
import { Landing, Tech } from "@prisma/client";
import Image from "next/image";

export default function HomeContent(props: {
    landingContent: Landing;
    landingTech: Tech[];
}) {
    return (
        <article className="fade-in min-h-screen xl:w-[75dvw] w-[90dvw] grid xl:grid-cols-2 xl:gap-20 mx-auto">
            <header className="flex">
                <div className="my-auto">
                    <div className="my-auto">
                        <h1 className="xl:text-8xl text-4xl font-bold text-center">
                            {props.landingContent.title}
                        </h1>
                        <div className="mt-6 grid grid-cols-4 text-center justify-evenly gap-2">
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
                    <div className="mt-6 font-bold text-center">
                        {props.landingContent.Copy}
                    </div>
                    <div className="flex justify-evenly mt-6">
                        <Button className="font-bold bg-white border-2 border-black rounded-none hover:bg-green-500 hover:border-white hover:text-white">
                            Projects
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
                        props.landingContent.imageUrl
                    }
                    height={1200}
                    width={1200}
                    className="my-auto w-auto h-auto"
                    alt={props.landingContent.imageUrl}
                />
            </figure>
        </article>
    );
}

function Highlight(props: { text: string }) {
    return (
        <div className="font-bold text-2xl text-green-500">{props.text}</div>
    );
}
