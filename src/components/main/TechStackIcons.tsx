"use client";

// Packages
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import Image from "next/image";
// Data
import { techLogos } from "@/data/techLogos";
// Types
import { LogoList } from "@/lib/types";

export default function TechStackIcons() {
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
		<div
			ref={ref}
			className="flex flex-wrap justify-evenly lg:mt-8 mt-6 gap-6 lg:gap-10"
		>
			{techLogos.map((logo: LogoList, index: number) => (
				<div
					key={index}
					ref={(el: HTMLDivElement) => {
						chipRefs.current[index] = el;
					}}
					className="basis-1/6 lg:basis-auto opacity-0 text-white flex flex-col gap-4"
				>
					<Image
						className="mx-auto w-8 lg:w-14 lg:h-14"
						src={"/logos/" + logo.url}
						width={75}
						height={75}
						alt={logo.name}
					/>
					<div className="text-center lg:text-lg font-medium">
						{logo.name}
					</div>
				</div>
			))}
		</div>
	);
}
