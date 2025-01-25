"use client";
// packages
import { Button } from "@nextui-org/react";
// functions
import { deleteTask } from "@/server/projectTrackerActions/deleteTask";

const DeleteTaskButton = ({ id }: Readonly<{ id: string }>) => {
	const onDelete = async () => {
		try {
			const res = await deleteTask(id);
			if (res.status === 400) console.log(res.message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Button
			onPress={onDelete}
			className="w-full text-md"
			variant="light"
			color="danger"
		>
			Delete Task
		</Button>
	);
};

export default DeleteTaskButton;
