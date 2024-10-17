"use client";
import { Button } from "@nextui-org/react";
import { ContentProject } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjectCard(props: { project: ContentProject }) {
    const [hover, setHover] = useState(false);

    return (
        <>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className={`grid grid-cols-1 xl:grid-cols-2 xl:gap-20 gap-10 transition-all`}>
                <div className="flex flex-col justify-center gap-6">
                    <div className="font-bold text-4xl">
                        {props.project.name}
                    </div>
                    <div className="text-lg">{props.project.short}</div>
                    <Link
                        className="text-center transition-all xl:w-fit py-4 px-12 text-2xl font-medium border-2 border-black rounded-full hover:bg-green-400 hover:border-white hover:text-white"
                        href={"/projects/" + props.project.slug}>
                        View Project
                    </Link>
                </div>
                <div className="order-first xl:order-last">
                    <Image
                        src={
                            process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                            props.project.images[0]
                        }
                        height={800}
                        width={800}
                        alt={props.project.name}
                        className="h-full w-auto ml-auto xl:ml-0 mr-auto"
                    />
                </div>
            </div>
            <hr />
        </>
    );
}
