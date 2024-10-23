"use client";

import ParallaxSection from "./ParallaxSection";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import Link from "next/link";

export default function AboutMeSection(props: { short: string }) {
    const { ref, inView } = useInView({ threshold: 1 });

    const techBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inView) {
            if (techBoxRef.current) {
                techBoxRef.current.classList.replace(
                    "opacity-0",
                    "slide-in-left"
                );
            }
        }
    }, [inView]);

    return (
        <ParallaxSection shift={false} imageUrl="/drums-parallax-3.png">
            <div className="xl:w-[75dvw] mx-auto flex gap-10 h-full">
                <div
                    ref={techBoxRef}
                    className={`
                        opacity-0
                        xl:basis-1/2
                        flex
                        h-full
                        xl:h-auto
                        xl:ms-auto
                        my-auto
                        xl:p-10
                        p-4
                        bg-black
                        xl:bg-opacity-50
                        bg-opacity-60
                        xl:rounded-2xl
                        overflow-hidden
                        xl:backdrop-blur
                        backdrop-blur-sm
                    `}>
                    <div className="my-auto flex flex-col gap-2">
                        <div className="xl:text-6xl text-3xl text-center xl:text-left drop-shadow-2xl text-white font-bold">
                            A little about me.
                        </div>

                        <Markdown className={"text-white text-base xl:text-lg"}>
                            {props.short}
                        </Markdown>
                        <Link
                            className="transition-all xl:w-1/2 py-2 text-base xl:text-lg text-white text-center font-medium bg-black border-2 border-white hover:bg-green-400 "
                            href={"/about"}>
                            Learn More
                        </Link>
                        <div className="h-0" ref={ref} />
                    </div>
                </div>
            </div>
        </ParallaxSection>
    );
}
