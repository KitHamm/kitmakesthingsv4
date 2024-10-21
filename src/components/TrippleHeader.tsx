"use client";

import { Landing } from "@prisma/client";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function TrippleHeader({
    landingContent,
}: {
    landingContent: Landing;
}) {
    const { ref: firstRef, inView: firstInView } = useInView({ threshold: 1 });
    const { ref: secondRef, inView: secondInView } = useInView({
        threshold: 1,
    });
    const { ref: thirdRef, inView: thirdInView } = useInView({ threshold: 1 });

    const firstItem = useRef<HTMLDivElement | null>(null);
    const secondItem = useRef<HTMLDivElement | null>(null);
    const thirdItem = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (firstInView && firstItem.current) {
            firstItem.current.classList.replace("opacity-0", "slide-in-right");
        }
    }, [firstInView]);

    useEffect(() => {
        if (secondInView && secondItem.current) {
            secondItem.current.classList.replace("opacity-0", "fade-in-slow");
        }
    }, [secondInView]);

    useEffect(() => {
        if (thirdInView && thirdItem.current) {
            thirdItem.current.classList.replace("opacity-0", "slide-in-left");
        }
    }, [thirdInView]);

    return (
        <section id="tripple-threat" className="flex fade-in justify-center">
            <div className="text-center w-[75dvw] grid grid-cols-1 xl:grid-cols-3 gap-20 py-20">
                <div ref={firstItem} className="opacity-0 flex flex-col gap-8">
                    <div className="xl:text-6xl text-6xl text-center text-green-500">
                        <i
                            style={{ lineHeight: 1 }}
                            className={`${landingContent.firstHighlightIcon} fa-2xl`}
                        />
                    </div>
                    <div className="text-6xl font-bold">
                        {landingContent.firstHighlightHeader}
                    </div>
                    <p ref={firstRef} className="xl:text-xl text-lg">
                        {landingContent.firstHighlightText}
                    </p>
                </div>
                <div ref={secondItem} className="opacity-0 flex flex-col gap-8">
                    <div className="xl:text-6xl text-6xl text-green-500">
                        <i
                            style={{ lineHeight: 1 }}
                            className={`${landingContent.secondHighlightIcon} fa-2xl`}
                        />
                    </div>
                    <div className="text-6xl font-bold">
                        {landingContent.secondHighlightHeader}
                    </div>
                    <p ref={secondRef} className="xl:text-xl text-lg">
                        {landingContent.secondHighlightText}
                    </p>
                </div>
                <div ref={thirdItem} className="opacity-0 flex flex-col gap-8">
                    <div className="xl:text-6xl text-6xl text-green-500">
                        <i
                            style={{ lineHeight: 1 }}
                            className={`${landingContent.thirdHighlightIcon} fa-2xl`}
                        />
                    </div>
                    <div className="text-6xl font-bold">
                        {landingContent.thirdHighlightHeader}
                    </div>
                    <p ref={thirdRef} className="xl:text-xl text-lg">
                        {landingContent.thirdHighlightText}
                    </p>
                </div>
            </div>
        </section>
    );
}
