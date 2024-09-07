import ManageClientsButton from "@/components/admin/ManageClients";
import NewProject from "@/components/admin/projects/newProject";
import { dateRender } from "@/components/functions/dateRender";
import prisma from "@/lib/prisma";
import {
    WorkingProject,
    ProjectTask,
    Client,
    ProjectState,
} from "@prisma/client";

export interface ExtendedWorkingProject extends WorkingProject {
    tasks: ProjectTask[];
    client: Client;
}

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
        <div className="xl:py-10 xl:px-10 py-4 px-4">
            <div className="font-bold flex flex-col xl:flex-row gap-6 text-6xl mb-6 pb-4 text-center xl:text-start border-b-2">
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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {projects.map((project: ExtendedWorkingProject) => {
                    return (
                        <a
                            key={project.id}
                            href={"/dashboard/projects/" + project.id}
                            className="fade-in cursor-pointer hover:bg-green-200 flex bg-neutral-100 rounded-lg shadow p-4 transition-all">
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
                                        className={`${
                                            project.state ===
                                            ProjectState.PROPOSED
                                                ? "text-neutral-600"
                                                : project.state ===
                                                  ProjectState.STARTED
                                                ? "text-orange-400"
                                                : "text-green-400"
                                        } font-bold text-2xl`}>
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
