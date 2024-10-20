"use client";

import { Chip } from "@nextui-org/react";
import { ContentProject } from "@prisma/client";
import Link from "next/link";
import Markdown from "react-markdown";
import ProjectButtons from "./ProjectButtons";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/embla/EmblaCarousel";
import { useEffect, useRef } from "react";

const OPTIONS: EmblaOptionsType = { loop: true };

export default function SingleProject(props: { project: ContentProject }) {
    const fadeRefs = useRef<HTMLDivElement[]>([]);
    const techRefs = useRef<HTMLDivElement[]>([]);
    useEffect(() => {
        fadeRefs.current.forEach((ref, i) => fade(i));
        techRefs.current.forEach((ref, i) => fadeTech(i));
    }, []);

    function fade(i: number) {
        setTimeout(() => {
            if (
                fadeRefs.current[i] &&
                fadeRefs.current[i].classList.contains("opacity-0")
            ) {
                fadeRefs.current[i].classList.replace("opacity-0", "fade-in");
            }
        }, 100 * i);
    }

    function fadeTech(i: number) {
        setTimeout(() => {
            if (
                techRefs.current[i] &&
                techRefs.current[i].classList.contains("opacity-0")
            ) {
                techRefs.current[i].classList.replace("opacity-0", "fade-in");
            }
        }, 100 * i);
    }

    return (
        <article className="grow xl:w-[75dvw] w-[90dvw] grid xl:grid-cols-2 xl:gap-20 mx-auto py-10">
            <header className="flex">
                <div className="my-auto">
                    <div className="my-auto">
                        <h1
                            ref={(el: HTMLDivElement) => {
                                fadeRefs.current[0] = el;
                            }}
                            className="opacity-0 xl:text-6xl text-4xl font-bold ">
                            {props.project.name}
                        </h1>
                        <div
                            ref={(el: HTMLDivElement) => {
                                fadeRefs.current[1] = el;
                            }}
                            className="opacity-0 font-bold text-xl mt-2">
                            {props.project.role}
                        </div>
                        <div className="mt-6 flex flex-wrap text-center gap-2">
                            {props.project.stack.map(
                                (stack: String, index: number) => {
                                    return (
                                        <div
                                            ref={(el: HTMLDivElement) => {
                                                techRefs.current[index] = el;
                                            }}
                                            className="opacity-0"
                                            key={stack + "-" + index}>
                                            <Chip className="bg-green-500 text-white">
                                                {stack}
                                            </Chip>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div
                        ref={(el: HTMLDivElement) => {
                            fadeRefs.current[2] = el;
                        }}
                        className="opacity-0">
                        <Markdown className="mt-6 font-bold text-lg">
                            {props.project.description as string}
                        </Markdown>
                    </div>
                    <div
                        ref={(el: HTMLDivElement) => {
                            fadeRefs.current[3] = el;
                        }}
                        className="opacity-0 flex flex-col xl:flex-row justify-evenly my-6 xl:gap-20 gap-10">
                        {props.project.outLink && props.project.outLinkText ? (
                            <Link
                                target="_blank"
                                className="w-full py-4 text-center rounded-full transition-all font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                                href={props.project.outLink}>
                                {props.project.outLinkText}
                            </Link>
                        ) : (
                            ""
                        )}
                        <ProjectButtons slug={props.project.slug} />
                        <Link
                            className="xl:w-full py-4 text-center rounded-full transition-all font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                            href={"/projects"}>
                            Back
                        </Link>
                    </div>
                </div>
            </header>
            <figure className="slide-in-left flex order-first mb-10 xl:mb-0 xl:order-last">
                <EmblaCarousel
                    slides={props.project.images}
                    options={OPTIONS}
                />
            </figure>
        </article>
    );
}
