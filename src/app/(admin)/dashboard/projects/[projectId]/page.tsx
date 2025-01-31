// prisma
import prisma from "@/lib/prisma";
// packages
import { redirect } from "next/navigation";
// functions
import { sortTasks } from "@/lib/utils/projectTrackerUtils/sortTasks";
import { getProjectStateClass } from "@/lib/utils/projectTrackerUtils/getClassByState";
// components
import DueDateChange from "@/components/admin/projects/dueDateChange";
import NewTask from "@/components/admin/projects/newTaskButton";
import ProjectDeleteButton from "@/components/admin/projects/projectDeleteButton";
import ProjectStateChange from "@/components/admin/projects/projectStateChange";
import TaskCard from "@/components/admin/projects/taskCard";
// types
import { WorkingProjectWithTasksAndClient } from "@/lib/types";
import { ProjectTask } from "@prisma/client";

export default async function ProjectPage({
	params,
}: Readonly<{ params: Promise<{ projectId: string }> }>) {
	const { projectId } = await params;

	let project: WorkingProjectWithTasksAndClient | null = null;
	try {
		project = await prisma.workingProject.findUnique({
			where: {
				id: projectId,
			},
			include: {
				tasks: {},
				client: {},
			},
		});
	} catch (error) {
		redirect("/dashboard/projects");
	}

	if (!project) {
		redirect("/dashboard/projects");
	}

	const [noneTasks, workingTasks, reviewTasks, finishedTasks] = sortTasks(
		project.tasks
	);

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<div className="mb-6 pb-4 border-b-2">
				<div className="flex flex-col lg:flex-row lg:gap-10">
					<div className="mb-4 font-bold text-center lg:text-start  text-4xl lg:text-6xl ">
						{project.name}
					</div>
					<div
						className={`${getProjectStateClass(
							project.state
						)} font-bold text-4xl my-auto text-center`}
					>
						{project.state}
					</div>
				</div>
				<div className="flex w-full flex-col lg:flex-row justify-center lg:justify-start gap-2 mt-4 lg:mt-0">
					<div className="w-fit mx-auto lg:mx-0 flex">
						<ProjectStateChange
							state={project.state}
							id={project.id}
						/>
					</div>
					<div className="w-fit flex mx-auto lg:mx-0">
						<div className="grow">
							<DueDateChange
								dueDate={project.dateDue}
								id={project.id}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row gap-2 mt-4 justify-evenly lg:justify-start">
					<ProjectDeleteButton id={project.id} />
					<NewTask projectId={project.id} />
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-4">
				<div className="lg:border-e-2 lg:px-4">
					<div className="text-neutral-600 text-center font-bold text-2xl">
						Not Started
					</div>
					<div className="flex flex-col gap-2 mt-4">
						{noneTasks.map((task: ProjectTask) => {
							return <TaskCard key={task.id} task={task} />;
						})}
					</div>
				</div>
				<div className="lg:border-e-2 lg:px-4 mt-4 lg:mt-0">
					<div className="text-yellow-400 text-center font-bold text-2xl">
						Working
					</div>
					<div className="flex flex-col gap-2 mt-4">
						{workingTasks.map((task: ProjectTask) => {
							return <TaskCard key={task.id} task={task} />;
						})}
					</div>
				</div>
				<div className="lg:border-e-2 lg:px-4 mt-4 lg:mt-0">
					<div className=" text-orange-400 text-center font-bold text-2xl">
						Review
					</div>
					<div className="flex flex-col gap-2 mt-4">
						{reviewTasks.map((task: ProjectTask) => {
							return <TaskCard key={task.id} task={task} />;
						})}
					</div>
				</div>
				<div className="lg:px-4 mt-4 lg:mt-0">
					<div className="text-green-400 text-center font-bold text-2xl">
						Finished
					</div>
					<div className="flex flex-col gap-2 mt-4">
						{finishedTasks.map((task: ProjectTask) => {
							return <TaskCard key={task.id} task={task} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
