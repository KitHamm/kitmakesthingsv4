"use client";

import { deleteTask } from "@/server/projectTrackerActions/deleteTask";
import { Button } from "@nextui-org/react";

export default function DeleteTaskButton(props: Readonly<{ id: string }>) {
	return (
		<Button
			onPress={() =>
				deleteTask(props.id)
					.then((res) => {
						if (res.status === 400) console.log(res.message);
					})
					.catch((err) => console.log(err))
			}
			className="w-full"
			variant="light"
			color="danger"
		>
			Delete Task
		</Button>
	);
}
