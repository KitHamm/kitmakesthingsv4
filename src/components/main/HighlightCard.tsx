"use client";

// Packages
import { Avatar } from "@nextui-org/react";
// Functions
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
// Constants
import { highlightAnimations } from "@/lib/constants";

export default function HighlightCard(props: {
    header: string;
    text: string;
    avatar: string;
    index: number;
}) {
    const { header, text, index, avatar } = props;

    const { ref, inView } = useInView({ threshold: 1 });
    const card = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inView && card.current) {
            card.current.classList.replace(
                "opacity-0",
                highlightAnimations[index]
            );
        }
    }, [inView, highlightAnimations[index]]);

    return (
        <div
            ref={card}
            className="opacity-0 bg-black/75 rounded-xl shadow-2xl p-4 xl:p-10 flex flex-col gap-8">
            <div className="xl:text-6xl text-6xl flex justify-center text-green-500">
                <Avatar
                    isBordered
                    color="success"
                    src={props.avatar}
                    className="w-56 h-56 text-large"
                />
            </div>
            <div
                ref={ref}
                className="text-5xl xl:text-6xl text-white font-bold">
                {props.header}
            </div>
            <div className="xl:text-xl my-auto xl:text-lg text-white">
                {props.text}
            </div>
        </div>
    );
}
