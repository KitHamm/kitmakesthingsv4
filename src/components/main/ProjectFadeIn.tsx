"use client";

// Packages
import { useEffect, useRef } from "react";

export default function ProjectFadeIn({
	children,
	index,
}: Readonly<{
	children: React.ReactNode;
	index: number;
}>) {
	const el = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setTimeout(() => {
			if (el.current?.classList.contains("opacity-0")) {
				el.current.classList.replace("opacity-0", "fade-in");
			}
		}, 100 * index);
	}, [index]);

	return (
		<div ref={el} className="opacity-0">
			{children}
		</div>
	);
}
