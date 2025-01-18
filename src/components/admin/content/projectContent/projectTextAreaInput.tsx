"use client";

import { ContentTextAreaProps } from "@/lib/types";
import { useFormContext } from "./formProvider";
import { useEffect, useRef } from "react";
import { resizeTextArea } from "@/lib/functions";

export default function ProjectTextAreaInput(props: ContentTextAreaProps) {
	const { register, watch, errors } = useFormContext();
	const { target, label, required, message, placeholder } = props;
	const content = watch(target);
	const textArea = useRef<HTMLTextAreaElement | null>(null);
	const { ref: landingCopy, ...landingCopyRest } = register(target, {
		required: { value: required, message: message },
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
				placeholder={
					errors[target] ? errors[target].message : placeholder
				}
				className={errors[target] ? "placeholder:text-red-400" : ""}
				{...landingCopyRest}
			/>
		</div>
	);
}
