"use client";

// Packages
import { Chip } from "@nextui-org/react";
import { useEffect, useRef } from "react";

export default function ProjectTechStack(props: { stack: String[] }) {
	const { stack } = props;
	const techRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		techRefs.current.forEach((ref, i) => fadeTech(i));
	}, []);

	function fadeTech(i: number) {
		setTimeout(() => {
			if (
				techRefs.current[i] &&
				techRefs.current[i].classList.contains("opacity-0")
			) {
				techRefs.current[i].classList.replace("opacity-0", "fade-in");
			}
		}, 100 * i);
	}

	return (
		<div className="mt-6 flex flex-wrap text-center gap-2">
			{stack.map((tech: String, index: number) => {
				return (
					<div
						ref={(el: HTMLDivElement) => {
							techRefs.current[index] = el;
						}}
						className="opacity-0"
						key={tech + "-" + index}
					>
						<Chip className="bg-green-600 text-white">{tech}</Chip>
					</div>
				);
			})}
		</div>
	);
}
