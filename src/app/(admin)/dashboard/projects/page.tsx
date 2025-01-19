import ManageClientsButton from "@/components/admin/shared/ManageClients";
import NewProject from "@/components/admin/projects/newProject";
import { dateRender } from "@/lib/utils/dateUtils/dateRender";
import prisma from "@/lib/prisma";
import { WorkingProjectWithTasksAndClient } from "@/lib/types";
import { ProjectState } from "@prisma/client";

export default async function Projects() {
	const projects = await prisma.workingProject.findMany({
		orderBy: {
			name: "asc",
		},
		include: {
			tasks: {},
			client: {},
		},
	});

	const clients = await prisma.client.findMany();
	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<div className="flex flex-col lg:flex-row gap-6 mb-6 pb-4 border-b-2">
				<div className="text-6xl font-bold text-center lg:text-start">
					Projects.
				</div>
				<div className="flex gap-6 justify-center items-center">
					<ManageClientsButton clients={clients} />
					<NewProject clients={clients} />
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{projects.map((project: WorkingProjectWithTasksAndClient) => {
					const getProjectStateClass = (state: ProjectState) => {
						if (state === ProjectState.PROPOSED) {
							return "text-neutral-600";
						} else if (state === ProjectState.STARTED) {
							return "text-orange-400";
						} else {
							return "text-green-400";
						}
					};
					return (
						<a
							key={project.id}
							href={"/dashboard/projects/" + project.id}
							className="fade-in cursor-pointer hover:bg-green-200 flex bg-neutral-100 rounded-lg shadow p-4 transition-all"
						>
							<div>
								<div className="font-bold text-2xl">
									{project.name}
								</div>
								<div>{project.client.name}</div>

								<div>{dateRender(project.dateDue)}</div>
							</div>
							<div className="grow flex justify-center">
								<div>
									<div
										className={`${getProjectStateClass(
											project.state
										)} font-bold text-2xl`}
									>
										{project.state}
									</div>
									<div>
										<strong>Tasks: </strong>
										{project.tasks.length}
									</div>
								</div>
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
}
