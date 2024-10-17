"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function TrippleHeader(props: {
    firstHeader: string;
    firstIcon: string;
    firstText: string;
    secondHeader: string;
    secondIcon: string;
    secondText: string;
    thirdHeader: string;
    thirdIcon: string;
    thirdText: string;
}) {
    const { ref: leftRef, inView: leftInView } = useInView({
        /* Optional options */
        threshold: 1,
    });
    const { ref: rightRef, inView: rightInView } = useInView({
        /* Optional options */
        threshold: 1,
    });

    const { ref: middleRef, inView: middleInView } = useInView({
        /* Optional options */
        threshold: 1,
    });

    const leftItem = useRef<HTMLDivElement | null>(null);
    const rightItem = useRef<HTMLDivElement | null>(null);
    const middleItem = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (leftInView) {
            if (leftItem.current) {
                if (leftItem.current.classList.contains("opacity-0")) {
                    leftItem.current.classList.replace(
                        "opacity-0",
                        "slide-in-right"
                    );
                }
            }
        }
    }, [leftInView]);

    useEffect(() => {
        if (rightInView) {
            if (rightItem.current) {
                if (rightItem.current.classList.contains("opacity-0")) {
                    rightItem.current.classList.replace(
                        "opacity-0",
                        "slide-in-left"
                    );
                }
            }
        }
    }, [rightInView]);

    useEffect(() => {
        if (middleInView) {
            if (middleItem.current) {
                if (middleItem.current.classList.contains("opacity-0")) {
                    middleItem.current.classList.replace(
                        "opacity-0",
                        "fade-in-slow"
                    );
                }
            }
        }
    }, [middleInView]);

    return (
        <section id="tripple-threat" className="flex fade-in justify-center">
            <div className="text-center w-[75dvw] grid grid-cols-1 xl:grid-cols-3 gap-20 py-20">
                <div ref={leftItem} className="opacity-0 flex flex-col gap-8">
                    <div className="xl:text-8xl text-6xl text-center text-green-500">
                        <i
                            style={{ lineHeight: 1 }}
                            className={`${props.firstIcon} fa-2xl`}
                        />
                    </div>
                    <div className="text-6xl font-bold">
                        {props.firstHeader}
                    </div>
                    <p ref={leftRef} className="xl:text-xl text-lg">
                        {props.firstText}
                    </p>
                </div>
                <div ref={middleItem} className="opacity-0 flex flex-col gap-8">
                    <div className="xl:text-8xl text-6xl text-green-500">
                        <i
                            style={{ lineHeight: 1 }}
                            className={`${props.secondIcon} fa-2xl`}
                        />
                    </div>
                    <div className="text-6xl font-bold">
                        {props.secondHeader}
                    </div>
                    <p ref={middleRef} className="xl:text-xl text-lg">
                        {props.secondText}
                    </p>
                </div>
                <div ref={rightItem} className="opacity-0 flex flex-col gap-8">
                    <div className="xl:text-8xl text-6xl text-green-500">
                        <i
                            style={{ lineHeight: 1 }}
                            className={`${props.thirdIcon} fa-2xl`}
                        />
                    </div>
                    <div className="text-6xl font-bold">
                        {props.thirdHeader}
                    </div>
                    <p ref={rightRef} className="xl:text-xl text-lg">
                        {props.thirdText}
                    </p>
                </div>
            </div>
        </section>
    );
}
