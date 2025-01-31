"use client";

// Packages
import Image from "next/image";
import { useEffect, useState } from "react";

const ProjectCardInView = ({
	children,
	image,
	projectName,
	index,
}: Readonly<{
	children: React.ReactNode;
	image: string;
	projectName: string;
	index: number;
}>) => {
	const [fadeClassLeft, setFadeClassLeft] = useState<
		"opacity-0" | "slide-in-right"
	>("opacity-0");
	const [fadeClassRight, setFadeClassRight] = useState<
		"opacity-0" | "slide-in-left"
	>("opacity-0");

	useEffect(() => {
		setTimeout(() => {
			setFadeClassLeft("slide-in-right");
			setFadeClassRight("slide-in-left");
		}, 200 * index);
	}, [index]);

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-10 transition-all">
				<div className={`${fadeClassLeft} w-full flex`}>{children}</div>
				<div
					className={`${fadeClassRight} order-first lg:order-last max-h-[40dvh] `}
				>
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
};

export default ProjectCardInView;
