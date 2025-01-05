"use client";
import { Button, DatePicker } from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useState } from "react";
import { updateDueDate as updateDueDataAction } from "@/components/actions/WorkingProjectActions";
export default function DueDateChange(props: { dueDate: Date; id: string }) {
	const [dateValue, setDateValue] = useState(
		parseAbsoluteToLocal(props.dueDate.toISOString())
	);

	function updateDueDate() {
		const date = new Date(
			dateValue.year,
			dateValue.month - 1,
			dateValue.day
		);
		date.setUTCHours(0, 0, 0, 0);
		updateDueDataAction(props.id, date).catch((err) => console.log(err));
	}
	return (
		<div className="h-full flex gap-2">
			<DatePicker
				size="lg"
				classNames={{
					timeInput: "hidden",
					timeInputLabel: "hidden",
					base: "my-auto",
				}}
				showMonthAndYearPickers
				hideTimeZone
				value={dateValue}
				onChange={(e) => {
					if (e) {
						const date = new Date(e.year, e.month - 1, e.day);
						date.setUTCHours(0, 0, 0, 0);
						setDateValue(parseAbsoluteToLocal(date.toISOString()));
					}
				}}
				aria-label="due date"
			/>
			{JSON.stringify(dateValue) !==
				JSON.stringify(
					parseAbsoluteToLocal(props.dueDate.toISOString())
				) && (
				<Button
					onPress={updateDueDate}
					className="bg-green-500 my-auto"
				>
					Save
				</Button>
			)}
		</div>
	);
}
