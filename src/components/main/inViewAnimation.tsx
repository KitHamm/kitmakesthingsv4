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
	const { ref, inView } = useInView({ threshold: 0.5 });

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
            lg:h-auto
            my-auto
            lg:p-10
            p-4
            bg-black
            bg-opacity-25
            lg:rounded-2xl
            overflow-hidden
            lg:backdrop-blur
            backdrop-blur-sm
        "
		>
			<div className="my-auto" ref={ref}>
				{children}
			</div>
		</div>
	);
}
