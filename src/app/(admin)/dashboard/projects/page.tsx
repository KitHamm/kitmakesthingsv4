import ManageClientsButton from "@/components/admin/ManageClients";
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
			<div className="font-bold flex flex-col lg:flex-row gap-6 text-6xl mb-6 pb-4 text-center lg:text-start border-b-2">
				<div>Projects.</div>
				<div className="flex gap-6 justify-center">
					<div className="flex flex-col justify-center">
						<ManageClientsButton clients={clients} />
					</div>
					<div className="flex flex-col justify-center">
						<NewProject clients={clients} />
					</div>
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
