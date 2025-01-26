"use client";
import { ContentProjectForm } from "@/lib/types";
import { useFormContext } from "./formProvider";

const ProjectTextInput = ({
	target,
	label,
	required,
}: Readonly<{
	target: keyof ContentProjectForm;
	label: string;
	required: boolean;
}>) => {
	const { register, errors } = useFormContext();
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
						message: `${label} is required.`,
					},
				})}
				placeholder={errors[target] ? errors[target].message : label}
				className={errors[target] ? "placeholder:text-red-400" : ""}
			/>
		</div>
	);
};

export default ProjectTextInput;
