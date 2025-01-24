"use client";
// context
import { useAboutFormContext } from "./AboutFormProvider";
// types
import { AboutContentForm } from "@/lib/types";

const AboutImageTitleInput = ({
	target,
}: Readonly<{ target: keyof AboutContentForm }>) => {
	const { register, errors } = useAboutFormContext();
	return (
		<input
			type="text"
			{...register(target, {
				required: {
					value: true,
					message: "Title is required.",
				},
			})}
			placeholder={errors[target] ? errors[target].message : "Title"}
			className={
				errors[target] ? "!border-red-400 placeholder:text-red-400" : ""
			}
		/>
	);
};

export default AboutImageTitleInput;
