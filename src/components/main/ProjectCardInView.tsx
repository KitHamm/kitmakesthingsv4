"use client";

// Packages
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProjectCardInView({
    children,
    image,
    projectName,
}: {
    children: React.ReactNode;
    image: string;
    projectName: string;
}) {
    const { ref, inView } = useInView({ threshold: 1 });

    const [fadeClassLeft, setFadeClassLeft] = useState<
        "opacity-0" | "slide-in-right"
    >("opacity-0");
    const [fadeClassRight, setFadeClassRight] = useState<
        "opacity-0" | "slide-in-left"
    >("opacity-0");

    useEffect(() => {
        if (inView) {
            setFadeClassLeft("slide-in-right");
            setFadeClassRight("slide-in-left");
        }
    }, [inView]);

    return (
        <>
            <div
                ref={ref}
                className="grid grid-cols-1 xl:grid-cols-2 xl:gap-20 gap-10 transition-all">
                <div className={`${fadeClassLeft} w-full flex`}>{children}</div>
                <div
                    className={`${fadeClassRight} order-first xl:order-last max-h-[40dvh] `}>
                    <Image
                        src={process.env.NEXT_PUBLIC_BASE_IMAGE_URL + image}
                        height={800}
                        width={800}
                        alt={projectName}
                        className="h-full w-auto m-auto"
                    />
                </div>
            </div>
            <hr />
        </>
    );
}