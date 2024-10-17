"use client";

import { Tech } from "@prisma/client";
import ParallaxSection from "./ParallaxSection";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

export default function TechStackSection(props: { landingTech: Tech[] }) {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 1,
    });

    const techBox = useRef<HTMLDivElement | null>(null);
    const chips = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (inView) {
            if (techBox.current) {
                if (techBox.current.classList.contains("opacity-0")) {
                    techBox.current.classList.replace(
                        "opacity-0",
                        "slide-in-right"
                    );
                }
            }
            if (chips.current.length > 0) {
                setTimeout(() => {
                    for (let i = 0; i < chips.current.length; i++) {
                        if (chips.current[i].classList.contains("opacity-0")) {
                            task(i);
                        }
                    }
                }, 500);
            }
        }
    }, [inView]);

    function task(i: number) {
        setTimeout(() => {
            chips.current[i].classList.replace("opacity-0", "fade-in");
        }, 50 * i);
    }

    return (
        <ParallaxSection shift={true} imageUrl="/me-code-paralax.png">
            <div className="xl:w-[75dvw] mx-auto flex gap-10 h-full">
                <div
                    ref={techBox}
                    className={`opacity-0 xl:basis-1/2 flex h-full xl:h-auto my-auto xl:p-10 p-4 bg-black xl:bg-opacity-50 bg-opacity-25 xl:rounded-2xl overflow-hidden xl:backdrop-blur backdrop-blur-sm`}>
                    <div className={`my-auto`}>
                        <div
                            className={` xl:text-6xl text-5xl text-center xl:text-left drop-shadow-2xl text-white font-bold`}>
                            Tech Stack.
                        </div>
                        <div
                            ref={ref}
                            className="flex flex-wrap justify-evenly xl:justify-normal xl:mt-4 mt-6 gap-4">
                            {props.landingTech.map(
                                (tech: Tech, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            ref={(el: HTMLDivElement) => {
                                                chips.current![index] = el;
                                            }}
                                            className="opacity-0 bg-green-500 shadow-lg rounded-2xl p-2 px-4 font-medium text-xl xl:text-2xl text-white">
                                            {tech.name}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ParallaxSection>
    );
}
