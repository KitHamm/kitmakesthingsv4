"use client";

import { useFormContext } from "./formProvider";

export default function FormTitle() {
	const { watch } = useFormContext();
	const title = watch("name");
	return (
		<div className="mx-4 font-bold text-4xl lg:text-6xl mb-6 pb-4 text-center lg:text-start border-b-2">
			{title}
		</div>
	);
}
