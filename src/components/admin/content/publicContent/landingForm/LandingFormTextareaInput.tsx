"use client";
// context
import { useLandingFormContext } from "./LandingFormProvider";
// packages
import { useEffect, useRef } from "react";
// functions
import { resizeTextArea } from "@/lib/utils/miscUtils/resizeTextArea";
// types
import { LandingContentForm } from "@/lib/types";

const LandingFormTextareaInput = ({
	target,
	label,
	required,
}: Readonly<{
	target: keyof LandingContentForm;
	label: string;
	required: boolean;
}>) => {
	const { register, watch, errors } = useLandingFormContext();
	const value = watch(target);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const { ref: landingTextarea, ...landingTextareaRest } = register(target, {
		required: { value: required, message: `${label} is required.` },
	});

	useEffect(() => {
		if (textareaRef.current) {
			resizeTextArea(textareaRef.current);
		}
	}, [value]);

	return (
		<div>
			<label className="font-bold px-2" htmlFor="copy">
				{label}
			</label>
			<textarea
				ref={(e) => {
					landingTextarea(e);
					textareaRef.current = e;
				}}
				placeholder={errors[target] ? errors[target].message : label}
				className={`${
					errors[target]
						? "!border-red-400 placeholder:text-red-400"
						: ""
				} overflow-hidden`}
				{...landingTextareaRest}
			/>
		</div>
	);
};

export default LandingFormTextareaInput;
