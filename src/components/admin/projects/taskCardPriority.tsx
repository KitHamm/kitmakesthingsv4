"use client";

import { updateTaskPriority } from "@/server/projectTrackerActions/updateTaskPriority";
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";
import { PriorityType } from "@/lib/types";
import { TaskPriority } from "@prisma/client";
import { useEffect, useState } from "react";

const priorities: PriorityType[] = [
	{
		label: "Low",
		key: TaskPriority.LOW,
	},
	{
		label: "Medium",
		key: TaskPriority.MEDIUM,
	},
	{
		label: "High",
		key: TaskPriority.HIGH,
	},
];

export default function TaskCardPriority(
	props: Readonly<{
		id: string;
		priority: TaskPriority;
	}>
) {
	const [value, setValue] = useState(new Set([props.priority]));

	useEffect(() => {
		setValue(new Set([props.priority]));
	}, [props.priority]);

	function handleChange(e: SharedSelection) {
		if (!e.anchorKey || !Object.keys(TaskPriority).includes(e.anchorKey))
			return;

		const taskPriority =
			TaskPriority[e.anchorKey as keyof typeof TaskPriority];

		updateTaskPriority(props.id, taskPriority)
			.then((res) => {
				if (res.status === 400) console.log(res.message);
			})
			.catch((err) => console.log(err));
	}

	return (
		<Select
			classNames={{ trigger: "bg-white" }}
			selectedKeys={value}
			onSelectionChange={(e) => handleChange(e)}
			label="Priority"
			placeholder="Select a priority"
		>
			{priorities.map((p: PriorityType) => (
				<SelectItem key={p.key}>{p.label}</SelectItem>
			))}
		</Select>
	);
}
