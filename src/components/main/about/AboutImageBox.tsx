"use client";

// packages
import Image from "next/image";
import { useEffect, useRef } from "react";

const AboutImageBox = ({
	image,
	title,
	index,
}: Readonly<{
	image: string;
	title: string;
	index: number;
}>) => {
	const boxRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setTimeout(() => {
			if (boxRef.current?.classList.contains("opacity-0")) {
				boxRef.current.classList.replace("opacity-0", "fade-in");
			}
		}, 75 * index);
	}, [index]);

	return (
		<div ref={boxRef} className="opacity-0 relative">
			<Image
				src={process.env.NEXT_PUBLIC_BASE_IMAGE_URL + image}
				height={500}
				width={500}
				alt="Kit Hamm"
				className="w-full h-auto"
			/>
			<div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-600 backdrop-blur bg-opacity-50 w-full h-full hidden lg:flex justify-center">
				<div className="pointer-events-none my-auto font-bold text-white text-4xl">
					{title}
				</div>
			</div>
		</div>
	);
};

export default AboutImageBox;
