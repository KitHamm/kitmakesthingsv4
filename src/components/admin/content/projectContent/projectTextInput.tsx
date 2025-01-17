"use client";
import { ContentTextInputProps } from "@/lib/types";
import { useFormContext } from "./formProvider";

export default function ProjectTextInput(props: ContentTextInputProps) {
	const { register, errors } = useFormContext();
	const { target, label, required, message, placeholder } = props;
	return (
		<div className="w-full">
			<label htmlFor="name" className="font-bold px-2">
				{label}
			</label>
			<input
				type="text"
				id="name"
				{...register(target, {
					required: {
						value: required,
						message: message,
					},
				})}
				placeholder={
					errors[target] ? errors[target].message : placeholder
				}
				className={errors[target] ? "placeholder:text-red-400" : ""}
			/>
		</div>
	);
}
