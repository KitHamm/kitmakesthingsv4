// prisma
import prisma from "@/lib/prisma";
// packages
import Link from "next/link";
import { Divider } from "@nextui-org/react";
// functions
import { dateRender } from "@/lib/utils/dateUtils/dateRender";
import { getProjectStateClass } from "@/lib/utils/projectTrackerUtils/getClassByState";
// components
import PageTitle from "@/components/admin/shared/PageTitle";
import ManageClientsButton from "@/components/admin/shared/ManageClients";
import NewProject from "@/components/admin/projects/newProject";
// types
import { WorkingProjectWithTasksAndClient } from "@/lib/types";
import { Client } from "@prisma/client";

export default async function ProjectTrackerPage() {
	let projects: WorkingProjectWithTasksAndClient[] = [];
	let clients: Client[] = [];
	try {
		clients = await prisma.client.findMany();
		projects = await prisma.workingProject.findMany({
			orderBy: {
				name: "asc",
			},
			include: {
				tasks: {},
				client: {},
			},
		});
	} catch (error) {
		console.log(error);
	}

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<PageTitle title="WIP Projects." />
			<div className="bg-neutral-100 lg:w-fit p-4 mb-4 rounded-xl shadow">
				<div className="font-bold text-xl">Project Actions</div>
				<Divider className="mb-4" />
				<div className="flex gap-6 items-center">
					<ManageClientsButton clients={clients} />
					<NewProject clients={clients} />
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{projects.map((project: WorkingProjectWithTasksAndClient) => {
					return (
						<Link
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
						</Link>
					);
				})}
			</div>
		</div>
	);
}
