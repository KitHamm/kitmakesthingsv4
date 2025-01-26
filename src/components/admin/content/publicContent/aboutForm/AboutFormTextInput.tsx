"use client";
// context
import { useAboutFormContext } from "./AboutFormProvider";
// types
import { AboutContentForm } from "@/lib/types";

const AboutFormTextInput = ({
	target,
	label,
	classNames,
}: Readonly<{
	target: keyof AboutContentForm;
	label: string;
	classNames?: string;
}>) => {
	const { register, errors } = useAboutFormContext();
	return (
		<div className={classNames}>
			<label className="font-bold px-2" htmlFor="title">
				{label}
			</label>
			<input
				type="text"
				{...register(target, {
					required: {
						value: true,
						message: `${label} is required.`,
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

export default AboutFormTextInput;
