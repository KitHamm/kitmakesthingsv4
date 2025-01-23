"use client";

import { ContentProjectForm } from "@/lib/types";
import { useFormContext } from "./formProvider";
import { useEffect, useRef } from "react";
import { resizeTextArea } from "@/lib/utils/miscUtils/resizeTextArea";

const ProjectTextAreaInput = ({
	target,
	label,
	required,
}: Readonly<{
	target: keyof ContentProjectForm;
	label: string;
	required: boolean;
}>) => {
	const { register, watch, errors } = useFormContext();

	const content = watch(target);
	const textArea = useRef<HTMLTextAreaElement | null>(null);
	const { ref: landingCopy, ...landingCopyRest } = register(target, {
		required: { value: required, message: `${label} is required.` },
	});
	useEffect(() => {
		if (textArea.current) {
			resizeTextArea(textArea.current);
		}
	}, [content]);

	return (
		<div className="w-full">
			<label htmlFor="name" className="font-bold px-2">
				{label}
			</label>
			<textarea
				ref={(e) => {
					landingCopy(e);
					textArea.current = e;
				}}
				placeholder={errors[target] ? errors[target].message : label}
				className={errors[target] ? "placeholder:text-red-400" : ""}
				{...landingCopyRest}
			/>
		</div>
	);
};

export default ProjectTextAreaInput;
