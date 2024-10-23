"use client";

import { Avatar } from "@nextui-org/react";
import { Landing } from "@prisma/client";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function TrippleHeader({
    landingContent,
}: {
    landingContent: Landing;
}) {
    return (
        <section id="tripple-threat" className="flex fade-in justify-center">
            <div className="text-center w-[90dvw] xl:w-[75dvw] grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-20 py-10 xl:py-20">
                <HighlightCard
                    icon={landingContent.firstHighlightIcon}
                    header={landingContent.firstHighlightHeader}
                    text={landingContent.firstHighlightText}
                    fadeClass="slide-in-right"
                    avatar="ai.jpeg"
                />
                <HighlightCard
                    icon={landingContent.secondHighlightIcon}
                    header={landingContent.secondHighlightHeader}
                    text={landingContent.secondHighlightText}
                    fadeClass="fade-in-slow"
                    avatar="ai3.jpeg"
                />
                <HighlightCard
                    icon={landingContent.thirdHighlightIcon}
                    header={landingContent.thirdHighlightHeader}
                    text={landingContent.thirdHighlightText}
                    fadeClass="slide-in-left"
                    avatar="ai4.jpeg"
                />
            </div>
        </section>
    );
}

function HighlightCard(props: {
    icon: string;
    header: string;
    text: string;
    fadeClass: string;
    avatar: string;
}) {
    const { ref, inView } = useInView({ threshold: 1 });
    const card = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inView && card.current) {
            card.current.classList.replace("opacity-0", props.fadeClass);
        }
    }, [inView]);

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
