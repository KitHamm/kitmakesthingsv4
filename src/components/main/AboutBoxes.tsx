"use client";

import { About } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutBoxes(props: { aboutContent: About }) {
    const boxRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        setTimeout(() => {
            boxRefs.current.forEach((ref, i) => {
                fadeBox(i);
            });
        }, 10);
    }, []);

    function fadeBox(i: number) {
        setTimeout(() => {
            if (
                boxRefs.current[i] &&
                boxRefs.current[i].classList.contains("opacity-0")
            ) {
                boxRefs.current[i].classList.replace("opacity-0", "fade-in");
            }
        }, 75 * i);
    }

    return (
        <>
            <div
                ref={(el: HTMLDivElement) => {
                    boxRefs.current[0] = el;
                }}
                className="opacity-0 relative">
                <Image
                    src={
                        process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                        props.aboutContent.image1Url
                    }
                    height={500}
                    width={500}
                    alt="Kit Hamm"
                    className="w-full h-auto"
                />
                <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full hidden xl:flex justify-center">
                    <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                        {props.aboutContent.title1}
                    </div>
                </div>
            </div>
            <div
                ref={(el: HTMLDivElement) => {
                    boxRefs.current[1] = el;
                }}
                className="opacity-0 relative">
                <Image
                    src={
                        process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                        props.aboutContent.image2Url
                    }
                    height={500}
                    width={500}
                    alt="Kit Hamm"
                    className="w-full h-auto"
                />
                <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full hidden xl:flex justify-center">
                    <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                        {props.aboutContent.title2}
                    </div>
                </div>
            </div>
            <div
                ref={(el: HTMLDivElement) => {
                    boxRefs.current[3] = el;
                }}
                className="opacity-0 relative">
                <Image
                    src={
                        process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                        props.aboutContent.image3Url
                    }
                    height={500}
                    width={500}
                    alt="Kit Hamm"
                    className="w-full h-auto"
                />
                <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full hidden xl:flex justify-center">
                    <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                        {props.aboutContent.title3}
                    </div>
                </div>
            </div>
            <div
                ref={(el: HTMLDivElement) => {
                    boxRefs.current[2] = el;
                }}
                className="opacity-0 relative">
                <Image
                    src={
                        process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                        props.aboutContent.image4Url
                    }
                    height={500}
                    width={500}
                    alt="Kit Hamm"
                    className="w-full h-auto"
                />
                <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full hidden xl:flex justify-center">
                    <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                        {props.aboutContent.title4}
                    </div>
                </div>
            </div>
        </>
    );
}
