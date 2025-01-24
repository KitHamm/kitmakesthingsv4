"use client";
// context
import { useAboutFormContext } from "./AboutFormProvider";
// packages
import { useEffect, useRef } from "react";
// types
import { AboutContentForm } from "@/lib/types";
import { resizeTextArea } from "@/lib/utils/miscUtils/resizeTextArea";

const AboutFormTextareaInput = ({
	target,
	label,
}: Readonly<{ target: keyof AboutContentForm; label: string }>) => {
	const { register, errors, watch } = useAboutFormContext();

	const value = watch("copy");
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const { ref: aboutTextarea, ...aboutTextareaRest } = register(target, {
		required: {
			value: true,
			message: `${label} is required.`,
		},
	});

	useEffect(() => {
		if (textareaRef.current) {
			resizeTextArea(textareaRef.current);
		}
	}, [value]);

	return (
		<div>
			<label className="font-bold" htmlFor="copy">
				Copy
			</label>
			<textarea
				ref={(e) => {
					aboutTextarea(e);
					textareaRef.current = e;
				}}
				placeholder={errors[target] ? errors[target].message : label}
				className={`${
					errors[target]
						? "!border-red-400 placeholder:text-red-400"
						: ""
				} overflow-hidden`}
				{...aboutTextareaRest}
			/>
		</div>
	);
};

export default AboutFormTextareaInput;
