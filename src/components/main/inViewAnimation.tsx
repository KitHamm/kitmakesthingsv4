"use client";

// Packages
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
// Constants
import { highlightAnimations } from "@/lib/constants";

export default function InViewAnimation({
    children,
    animation,
}: {
    children: React.ReactNode;
    animation: number;
}) {
    const { ref, inView } = useInView({ threshold: 1 });

    const el = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (inView) {
            if (el.current) {
                el.current.classList.replace(
                    "opacity-0",
                    highlightAnimations[animation]
                );
            }
        }
    }, [inView, animation]);
    return (
        <div
            ref={el}
            className="
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
        ">
            <div ref={ref}>{children}</div>
        </div>
    );
}
