"use client";

import { Button } from "@nextui-org/react";
import { useFormContext } from "./formProvider";

const ProjectButtons = () => {
	const { handleReset, isDirty } = useFormContext();
	return (
		<div className="flex justify-end items-center gap-4">
			<Button
				onPress={() => handleReset()}
				type="button"
				color="warning"
				variant="light"
				className="text-md"
			>
				Reset
			</Button>
			<Button
				isDisabled={!isDirty}
				type="submit"
				className="bg-green-500 text-white text-md"
			>
				Save Project
			</Button>
		</div>
	);
};

export default ProjectButtons;
