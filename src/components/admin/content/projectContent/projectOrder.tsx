"use client";

import { useFormContext } from "./formProvider";

export default function ProjectOrder() {
	const { register } = useFormContext();
	return (
		<div className="w-1/2">
			<label htmlFor="order" className="font-bold px-2">
				Order
			</label>
			<input
				type="number"
				{...register("order", {
					required: { value: true, message: "Required" },
				})}
			/>
		</div>
	);
}
