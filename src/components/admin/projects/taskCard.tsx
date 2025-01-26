// components
import TaskStateButton from "./taskStateButton";
import DeleteTaskButton from "./deleteTaskButton";
import TaskCardPriority from "./taskCardPriority";
// types
import { ProjectTask } from "@prisma/client";

const TaskCard = ({ task }: Readonly<{ task: ProjectTask }>) => {
	return (
		<div className="fade-in bg-neutral-100 p-4 rounded-lg shadow">
			<div className="font-bold">Task:</div>
			<div>{task.description}</div>

			<div className="mt-2">
				<TaskCardPriority id={task.id} priority={task.priority} />
			</div>
			<div className="mt-2">
				<TaskStateButton id={task.id} currentState={task.status} />
			</div>
			<div className="mt-2">
				<DeleteTaskButton id={task.id} />
			</div>
		</div>
	);
};

export default TaskCard;
