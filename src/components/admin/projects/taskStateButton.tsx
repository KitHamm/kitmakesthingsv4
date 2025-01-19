"use client";

import { updateTaskState } from "@/server/projectTrackerActions/updateTaskState";
import { Button } from "@nextui-org/react";
import { TaskState } from "@prisma/client";

export default function TaskStateButton(
	props: Readonly<{
		id: string;
		currentState: TaskState;
	}>
) {
	function updateTask(state: TaskState) {
		updateTaskState(props.id, state)
			.then((res) => {
				if (res.status === 400) console.log(res.message);
			})
			.catch((err) => console.log(err));
	}

	switch (props.currentState) {
		case TaskState.NONE:
			return (
				<Button
					onPress={() => updateTask(TaskState.WORKING)}
					className="w-full bg-green-500 text-lg font-bold text-white"
				>
					Start
				</Button>
			);
		case TaskState.WORKING:
			return (
				<div className="flex gap-4">
					<Button
						onPress={() => updateTask(TaskState.NONE)}
						className="w-full bg-green-500 text-lg font-bold text-white"
					>
						Not Started
					</Button>
					<Button
						onPress={() => updateTask(TaskState.REVIEW)}
						className="w-full bg-green-500 text-lg font-bold text-white"
					>
						Review
					</Button>
				</div>
			);
		case TaskState.REVIEW:
			return (
				<div className="flex gap-4">
					<Button
						onPress={() => updateTask(TaskState.WORKING)}
						className="w-full bg-green-500 text-lg font-bold text-white"
					>
						Working
					</Button>
					<Button
						onPress={() => updateTask(TaskState.FINISHED)}
						className="w-full bg-green-500 text-lg font-bold text-white"
					>
						Finished
					</Button>
				</div>
			);
		case TaskState.FINISHED:
			return (
				<Button
					onPress={() => updateTask(TaskState.REVIEW)}
					className="w-full bg-green-500 text-lg font-bold text-white"
				>
					Review
				</Button>
			);
	}
}
