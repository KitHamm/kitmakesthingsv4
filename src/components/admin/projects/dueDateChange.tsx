"use client";
import { Button } from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useState } from "react";
import { updateDueDate as updateDueDataAction } from "@/components/actions/WorkingProjectActions";
export default function DueDateChange(
	props: Readonly<{ dueDate: Date; id: string }>
) {
	const [dateValue, setDateValue] = useState<Date>(props.dueDate);
	function updateDueDate() {
		if (dateValue) {
			const date = dateValue;
			date.setUTCHours(0, 0, 0, 0);
			updateDueDataAction(props.id, date).catch((err) =>
				console.log(err)
			);
		}
	}
	return (
		<div className="h-full flex gap-2">
			<input
				type="date"
				value={dateValue ? dateValue.toISOString().split("T")[0] : ""}
				onChange={(e) => {
					if (e.target.valueAsDate)
						setDateValue(e.target.valueAsDate);
				}}
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
