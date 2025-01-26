"use client";
// context
import { useLandingFormContext } from "./LandingFormProvider";
// types
import { LandingContentForm } from "@/lib/types";

const LandingFormTextInput = ({
	target,
	label,
	required,
}: Readonly<{
	target: keyof LandingContentForm;
	label: string;
	required: boolean;
}>) => {
	const { register, errors } = useLandingFormContext();

	return (
		<div>
			<label className="font-bold px-2" htmlFor="title">
				{label}
			</label>
			<input
				type="text"
				{...register(target, {
					required: {
						value: required,
						message: "Title is required.",
					},
				})}
				placeholder={errors[target] ? errors[target].message : label}
				className={
					errors[target]
						? "!border-red-400 placeholder:text-red-400"
						: ""
				}
			/>
		</div>
	);
};

export default LandingFormTextInput;
