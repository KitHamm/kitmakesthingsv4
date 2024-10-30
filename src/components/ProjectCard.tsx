"use client";
import { ContentProject } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectCard(props: {
    project: ContentProject;
    index: number;
}) {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFade(true);
        }, 200 * props.index);
    });

    return (
        <>
            <div
                className={`grid grid-cols-1 xl:grid-cols-2 xl:gap-20 gap-10 transition-all`}>
                <div
                    className={`${
                        fade ? "slide-in-right" : "opacity-0"
                    } w-full flex`}>
                    <div className="xl: w-4/5 mx-auto flex flex-col justify-center gap-6">
                        <div className="font-bold text-4xl">
                            {props.project.name}
                        </div>
                        <div className="text-lg">{props.project.short}</div>
                        <div className="flex flex-col xl:flex-row gap-4">
                            <Link
                                className="text-center transition-all xl:w-fit py-2 px-12 text-2xl font-medium border-2 border-black hover:bg-green-400 hover:border-white hover:text-white"
                                href={"/projects/" + props.project.slug}>
                                View Project
                            </Link>
                            {props.project.outLink &&
                                props.project.outLinkText && (
                                    <Link
                                        target="_blank"
                                        className="text-center transition-all xl:w-fit py-2 px-12 text-2xl font-medium border-2 border-black hover:bg-green-400 hover:border-white hover:text-white"
                                        href={props.project.outLink}>
                                        {props.project.outLinkText}
                                    </Link>
                                )}
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        fade ? "slide-in-left" : "opacity-0"
                    } order-first xl:order-last max-h-[40dvh] `}>
                    <Image
                        src={
                            process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                            props.project.images[0]
                        }
                        height={800}
                        width={800}
                        alt={props.project.name}
                        className="h-full w-auto m-auto"
                    />
                </div>
            </div>
            <hr />
        </>
    );
}
