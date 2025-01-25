"use client";
// packages
import { Button } from "@nextui-org/react";
// functions
import { updateTaskState } from "@/server/projectTrackerActions/updateTaskState";
// types
import { TaskState } from "@prisma/client";

const TaskStateButton = ({
	id,
	currentState,
}: Readonly<{
	id: string;
	currentState: TaskState;
}>) => {
	const updateTask = async (state: TaskState) => {
		try {
			const res = await updateTaskState(id, state);
			if (res.status === 400) console.log(res.message);
		} catch (error) {
			console.log(error);
		}
	};

	switch (currentState) {
		case TaskState.NONE:
			return (
				<Button
					onPress={() => updateTask(TaskState.WORKING)}
					className="w-full bg-green-500 text-md text-white"
				>
					Start
				</Button>
			);
		case TaskState.WORKING:
			return (
				<div className="flex gap-4">
					<Button
						onPress={() => updateTask(TaskState.NONE)}
						className="w-full bg-green-500 text-md text-white"
					>
						Not Started
					</Button>
					<Button
						onPress={() => updateTask(TaskState.REVIEW)}
						className="w-full bg-green-500 text-md text-white"
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
						className="w-full bg-green-500 text-md text-white"
					>
						Working
					</Button>
					<Button
						onPress={() => updateTask(TaskState.FINISHED)}
						className="w-full bg-green-500 text-md text-white"
					>
						Finished
					</Button>
				</div>
			);
		case TaskState.FINISHED:
			return (
				<Button
					onPress={() => updateTask(TaskState.REVIEW)}
					className="w-full bg-green-500 text-md text-white"
				>
					Review
				</Button>
			);
	}
};

export default TaskStateButton;
