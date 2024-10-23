"use client";

import Image from "next/image";
// React Components
import { useEffect, useState, useRef } from "react";
import { LayoutProps } from "@/lib/types";

export default function ParallaxSection({ children, ...props }: LayoutProps) {
    // Parallax element ref
    const headerImageContainer = useRef<HTMLDivElement | null>(null);
    const headerImage = useRef<HTMLImageElement | null>(null);
    //  Parallax States
    const [parallaxValue, setParallaxValue] = useState(-100);
    const [containerHeight, setContainerHeight] = useState(500);

    useEffect(() => {
        onScroll();
        window.addEventListener("scroll", onScroll);
    }, []);

    function onScroll() {
        if (headerImageContainer.current && headerImage.current) {
            headerImage.current.classList.replace("opacity-0", "fade-in");
            const containerHeight = headerImageContainer.current.offsetHeight;
            const imageHeight = headerImage.current.offsetHeight;
            setContainerHeight((imageHeight / 8) * 6);
            if (
                headerImageContainer.current.getBoundingClientRect().top <
                    window.innerHeight &&
                headerImageContainer.current.getBoundingClientRect().top >
                    0 - containerHeight
            ) {
                setParallaxValue(
                    0 -
                        mapNumRange(
                            headerImageContainer.current.getBoundingClientRect()
                                .top,
                            window.innerHeight,
                            0,
                            imageHeight - containerHeight,
                            0
                        )
                );
            }
        }
    }

    return (
        <div
            style={{ height: containerHeight + "px" }}
            ref={headerImageContainer}
            className="inset-shadow relative bg-neutral-100 overflow-hidden xl:max-h-[600px]">
            <Image
                ref={headerImage}
                style={{ top: parallaxValue + "px", maxWidth: "none" }}
                width={2560}
                height={1196}
                className={`${
                    props.shift ? "right-[-100%] xl:right-auto" : ""
                } opacity-0 absolute w-[400%] xl:w-full h-auto`}
                alt="image"
                src={props.imageUrl}
            />
            <div className="relative z-20 flex w-full h-full">{children}</div>
        </div>
    );
}

const mapNumRange = (
    num: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
