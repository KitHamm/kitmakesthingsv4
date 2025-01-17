"use client";
// packages
import { Button, Chip } from "@nextui-org/react";
import { useFormContext } from "./formProvider";
import { useFieldArray } from "react-hook-form";
import { useState } from "react";

export default function ProjectTechStackInput() {
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "stack",
	});
	const [newStack, setNewStack] = useState("");

	return (
		<div>
			<div className="font-bold px-2 mb-2">
				Tech Stack{" "}
				<em className="font-normal text-sm">(click to remove)</em>
			</div>
			<div className="flex flex-wrap gap-2">
				{fields.map((stack: { name: string }, index: number) => {
					return (
						<div key={stack.name}>
							<Chip
								onClick={() => remove(index)}
								classNames={{
									base: "bg-green-500 text-white cursor-pointer",
								}}
							>
								{stack.name}
							</Chip>
						</div>
					);
				})}
			</div>
			<div className="mt-4 w-72">
				<label htmlFor="newStack" className="font-bold px-2">
					New Tech
				</label>
				<div className="flex items-center gap-4">
					<input
						type="text"
						id="newStack"
						value={newStack}
						onChange={(e) => setNewStack(e.target.value)}
					/>
					<Button
						onPress={() => {
							if (newStack) {
								append({
									name: newStack,
								});
								setNewStack("");
							}
						}}
						className="bg-green-500 text-white"
					>
						<i className="fa-solid fa-plus" />
					</Button>
				</div>
			</div>
		</div>
	);
}
