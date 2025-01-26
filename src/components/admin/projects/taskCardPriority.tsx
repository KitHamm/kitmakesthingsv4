"use client";
// packages
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";
// functions
import { updateTaskPriority } from "@/server/projectTrackerActions/updateTaskPriority";
// types
import { PriorityType } from "@/lib/types";
import { TaskPriority } from "@prisma/client";

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

const TaskCardPriority = ({
	id,
	priority,
}: Readonly<{
	id: string;
	priority: TaskPriority;
}>) => {
	const handleChange = async (e: SharedSelection) => {
		if (!e.anchorKey || !Object.keys(TaskPriority).includes(e.anchorKey))
			return;
		try {
			const taskPriority =
				TaskPriority[e.anchorKey as keyof typeof TaskPriority];
			const res = await updateTaskPriority(id, taskPriority);
			if (!res.success) {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	return (
		<Select
			classNames={{ trigger: "bg-white" }}
			selectedKeys={new Set([priority])}
			onSelectionChange={(e) => handleChange(e)}
			label="Priority"
			placeholder="Select a priority"
		>
			{priorities.map((p: PriorityType) => (
				<SelectItem key={p.key}>{p.label}</SelectItem>
			))}
		</Select>
	);
};

export default TaskCardPriority;
