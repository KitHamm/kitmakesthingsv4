"use client";
import { Button } from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useState } from "react";
import { updateDueDate } from "@/server/projectTrackerActions/updateDueDate";
export default function DueDateChange(
	props: Readonly<{ dueDate: Date; id: string }>
) {
	const [dateValue, setDateValue] = useState<Date>(props.dueDate);
	function handleUpdateDueDate() {
		if (dateValue) {
			const date = dateValue;
			date.setUTCHours(0, 0, 0, 0);
			updateDueDate(props.id, date)
				.then((res) => {
					if (res.status === 400) console.log(res.message);
				})
				.catch((err) => console.log(err));
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
					onPress={handleUpdateDueDate}
					className="bg-green-500 my-auto"
				>
					Save
				</Button>
			)}
		</div>
	);
}
