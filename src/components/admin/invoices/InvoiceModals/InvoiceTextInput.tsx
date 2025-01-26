"use client";
// packages
import { UseFormRegister, FieldErrors } from "react-hook-form";
// types
import { InvoiceForm } from "@/lib/types";

const InvoiceTextInput = ({
	label,
	target,
	register,
	errors,
}: Readonly<{
	label: string;
	target: keyof InvoiceForm;
	register: UseFormRegister<InvoiceForm>;
	errors: FieldErrors<InvoiceForm>;
}>) => {
	return (
		<div className="lg:w-1/2">
			<label className="font-bold px-2" htmlFor={target}>
				{label}
			</label>
			<input
				type="text"
				id={target}
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

export default InvoiceTextInput;
