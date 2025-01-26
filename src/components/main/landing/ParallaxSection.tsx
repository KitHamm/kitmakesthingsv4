"use client";

// Packages
import { useEffect, useState, useRef, ReactNode } from "react";
import Image from "next/image";
// Functions
import { onScroll } from "@/lib/utils/pageUtils/onScroll";

const ParallaxSection = ({
	children,
	imageUrl,
	shift,
}: Readonly<{ children?: ReactNode; imageUrl: string; shift: boolean }>) => {
	const headerImageContainer = useRef<HTMLDivElement | null>(null);
	const headerImage = useRef<HTMLImageElement | null>(null);
	const [parallaxValue, setParallaxValue] = useState(-100);
	const [containerHeight, setContainerHeight] = useState(500);

	useEffect(() => {
		const image = headerImage.current;
		if (!image) return;
		const handleImageLoad = () => {
			handleScroll();
		};
		if (image.complete) {
			handleImageLoad();
		} else {
			image.addEventListener("load", handleImageLoad);
		}
		return () => {
			image.removeEventListener("load", handleImageLoad);
		};
	}, []);

	useEffect(() => {
		handleScroll();
		window.addEventListener("scroll", handleScroll);
	}, []);

	function handleScroll() {
		if (headerImageContainer.current && headerImage.current) {
			const { newContainerHeight, newParallaxValue } = onScroll(
				headerImageContainer.current,
				headerImage.current
			);
			setContainerHeight(newContainerHeight);
			setParallaxValue(newParallaxValue);
		}
	}

	return (
		<div
			style={{ height: containerHeight + "px" }}
			ref={headerImageContainer}
			className="inset-shadow relative bg-neutral-100 overflow-hidden lg:max-h-[600px] z-10"
		>
			<Image
				ref={headerImage}
				style={{ top: parallaxValue + "px", maxWidth: "none" }}
				width={2560}
				height={1196}
				className={`${
					shift ? "right-[-100%] lg:right-auto" : ""
				} opacity-0 absolute w-[400%] lg:w-full h-auto`}
				alt="image"
				src={imageUrl}
			/>
			<div className="relative z-20 flex w-full h-full">{children}</div>
		</div>
	);
};

export default ParallaxSection;
