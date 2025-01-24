"use client";
// packages
import { Button } from "@nextui-org/react";
// context
import { useAboutFormContext } from "./AboutFormProvider";

const AboutFormButtons = () => {
	const { isDirty, handleReset } = useAboutFormContext();
	return (
		<div className="flex justify-end gap-6">
			<Button
				isDisabled={!isDirty}
				color="warning"
				variant="light"
				type="button"
				className="text-md"
				onPress={handleReset}
			>
				Reset
			</Button>
			<Button
				isDisabled={!isDirty}
				type="submit"
				className="text-md bg-green-500 text-white"
			>
				Save Content
			</Button>
		</div>
	);
};

export default AboutFormButtons;
