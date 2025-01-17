import { ProjectTask } from "@prisma/client";

export function sortTasks(tasks: ProjectTask[]) {
	const priorityOrder: Record<ProjectTask["priority"], number> = {
		HIGH: 1,
		MEDIUM: 2,
		LOW: 3,
	};

	const sortedTasksByStatus = {
		NONE: [] as ProjectTask[],
		WORKING: [] as ProjectTask[],
		REVIEW: [] as ProjectTask[],
		FINISHED: [] as ProjectTask[],
	};

	for (const task of tasks) {
		sortedTasksByStatus[task.status]?.push(task);
	}

	for (const status in sortedTasksByStatus) {
		sortedTasksByStatus[status as keyof typeof sortedTasksByStatus].sort(
			(a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
		);
	}

	return [
		sortedTasksByStatus.NONE,
		sortedTasksByStatus.WORKING,
		sortedTasksByStatus.REVIEW,
		sortedTasksByStatus.FINISHED,
	];
}
