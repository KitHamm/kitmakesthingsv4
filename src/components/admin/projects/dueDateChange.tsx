"use client";
// packages
import { Button } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
// functions
import { updateDueDate } from "@/server/projectTrackerActions/updateDueDate";

const DueDateChange = ({
	dueDate,
	id,
}: Readonly<{ dueDate: Date; id: string }>) => {
	const [dateValue, setDateValue] = useState<Date>(dueDate);

	useEffect(() => {
		setDateValue(dueDate);
	}, [dueDate]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.valueAsDate) {
			const date = e.target.valueAsDate;
			date.setUTCHours(0, 0, 0, 0);
			setDateValue(e.target.valueAsDate);
		}
	};
	const onSubmit = async () => {
		if (!dateValue) {
			return;
		}
		try {
			const res = await updateDueDate(id, dateValue);
			if (res.status === 400) console.log(res.message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="h-full flex gap-2">
			<input
				type="date"
				value={dateValue ? dateValue.toISOString().split("T")[0] : ""}
				onChange={(e) => handleChange(e)}
			/>
			<Button
				isDisabled={dueDate === dateValue}
				onPress={onSubmit}
				className="bg-green-500 px-8 my-auto text-white text-md"
			>
				Save Date
			</Button>
		</div>
	);
};

export default DueDateChange;
