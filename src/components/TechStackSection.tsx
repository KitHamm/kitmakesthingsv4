"use client";

import { Tech } from "@prisma/client";
import ParallaxSection from "./ParallaxSection";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

export default function TechStackSection({
    landingTech,
}: {
    landingTech: Tech[];
}) {
    const { ref, inView } = useInView({ threshold: 1 });

    const techBoxRef = useRef<HTMLDivElement | null>(null);
    const chipRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (inView) {
            if (techBoxRef.current) {
                techBoxRef.current.classList.replace(
                    "opacity-0",
                    "slide-in-right"
                );
            }

            if (chipRefs.current.length > 0) {
                setTimeout(() => {
                    chipRefs.current.forEach((chip, i) => {
                        if (chip.classList.contains("opacity-0")) {
                            task(i);
                        }
                    });
                }, 500);
            }
        }
    }, [inView]);

    function task(i: number) {
        setTimeout(() => {
            chipRefs.current[i].classList.replace("opacity-0", "fade-in");
        }, 50 * i);
    }

    return (
        <ParallaxSection shift imageUrl="/me-code-paralax.png">
            <div className="xl:w-[75dvw] mx-auto flex gap-10 h-full">
                <div
                    ref={techBoxRef}
                    className={`
                        opacity-0
                        xl:basis-1/2
                        flex
                        h-full
                        xl:h-auto
                        my-auto
                        xl:p-10
                        p-4
                        bg-black
                        xl:bg-opacity-50
                        bg-opacity-25
                        xl:rounded-2xl
                        overflow-hidden
                        xl:backdrop-blur
                        backdrop-blur-sm
                    `}>
                    <div className="my-auto">
                        <div className="xl:text-6xl text-5xl text-center xl:text-left drop-shadow-2xl text-white font-bold">
                            Tech Stack.
                        </div>
                        <div
                            ref={ref}
                            className="flex flex-wrap justify-evenly xl:justify-normal xl:mt-4 mt-6 gap-4">
                            {landingTech.map((tech, index) => (
                                <div
                                    key={index}
                                    ref={(el: HTMLDivElement) => {
                                        chipRefs.current[index] = el;
                                    }}
                                    className="opacity-0 bg-green-500 shadow-lg rounded-2xl py-2 px-4 font-medium text-lg xl:text-xl text-white">
                                    {tech.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ParallaxSection>
    );
}
