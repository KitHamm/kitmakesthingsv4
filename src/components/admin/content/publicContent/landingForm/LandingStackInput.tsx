"use client";
// packages
import { useFieldArray } from "react-hook-form";
import { Button, Chip } from "@nextui-org/react";
import { useState } from "react";
// context
import { useLandingFormContext } from "./LandingFormProvider";

const LandingStackInput = ({ label }: Readonly<{ label: string }>) => {
	const { control } = useLandingFormContext();
	const { fields, append, remove } = useFieldArray({ control, name: "tech" });
	const [newTech, setNewTech] = useState("");

	const handleAddTech = () => {
		if (newTech) {
			append({
				name: newTech,
				landingId: "landing",
				order: 0,
			});
			setNewTech("");
		}
	};

	return (
		<div>
			<label className="flex gap-2 items-center" htmlFor="title">
				<span className="font-bold">{label}</span>
				<span className="text-sm font-light">(Click to remove)</span>
			</label>
			<div className="flex flex-wrap gap-2 my-4">
				{fields.map((field, index) => {
					return (
						<Chip
							onClick={() => {
								remove(index);
							}}
							classNames={{
								base: "bg-green-500 cursor-pointer text-white",
							}}
							key={field.id}
						>
							{field.name}
						</Chip>
					);
				})}
			</div>
			<div className="flex w-full items-center gap-4">
				<input
					type="text"
					placeholder="Add Tech..."
					value={newTech}
					onChange={(e) => setNewTech(e.target.value)}
				/>
				<Button
					onPress={handleAddTech}
					className="bg-green-500 text-white"
				>
					<i className="fa-solid fa-plus" />
				</Button>
			</div>
		</div>
	);
};

export default LandingStackInput;
