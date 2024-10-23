"use client";

import { Tech } from "@prisma/client";
import ParallaxSection from "./ParallaxSection";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { techLogos } from "@/data/techLogos";
import { LogoList } from "@/lib/types";

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
        <ParallaxSection shift imageUrl="/me-code-parallax.png">
            <div className="xl:w-[95dvw] mx-auto flex gap-10 justify-center h-full">
                <div
                    ref={techBoxRef}
                    className={`
                        opacity-0
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
                        <div className="xl:text-6xl text-4xl text-center drop-shadow-2xl text-white font-bold">
                            Tech Stack.
                        </div>
                        <div
                            ref={ref}
                            className="flex flex-wrap justify-evenly justify-evenly xl:mt-8 mt-6 gap-6 xl:gap-10">
                            {techLogos.map((logo: LogoList, index: number) => (
                                <div
                                    key={index}
                                    ref={(el: HTMLDivElement) => {
                                        chipRefs.current[index] = el;
                                    }}
                                    className="basis-1/6 xl:basis-auto opacity-0 text-white flex flex-col gap-4">
                                    <Image
                                        className="mx-auto w-8 xl:w-14 xl:h-14"
                                        src={logo.url}
                                        width={75}
                                        height={75}
                                        alt={logo.name}
                                    />
                                    <div className="text-center xl:text-lg font-medium">
                                        {logo.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ParallaxSection>
    );
}
