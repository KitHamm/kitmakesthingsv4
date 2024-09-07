import { ProjectTask } from "@prisma/client";
import TaskStateButton from "./taskStateButton";
import DeleteTaskButton from "./deleteTaskButton";
import TaskCardPriority from "./taskCardPriority";

export default function TaskCard(props: { task: ProjectTask }) {
    return (
        <div className="fade-in bg-neutral-100 p-4 rounded-lg shadow">
            <div className="font-bold">Task:</div>
            <div>{props.task.description}</div>

            <div className="mt-2">
                <TaskCardPriority
                    id={props.task.id}
                    priority={props.task.priority}
                />
            </div>
            <div className="mt-2">
                <TaskStateButton
                    id={props.task.id}
                    currentState={props.task.status}
                />
            </div>
            <div className="mt-2">
                <DeleteTaskButton id={props.task.id} />
            </div>
        </div>
    );
}
