// prisma
import prisma from "@/lib/prisma";
// packages
import Link from "next/link";
// components
import DeleteProjectButton from "@/components/admin/content/projectContent/deleteProjectButton";
// types
import { ContentProject } from "@prisma/client";

export default async function ContentProjects() {
	let projects: ContentProject[] = [];

	try {
		projects = await prisma.contentProject.findMany({
			orderBy: {
				order: "asc",
			},
		});
	} catch (error) {
		console.log("Error fetching data:", error);
	}

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<div className="mx-4">
				<div className="font-bold text-6xl mb-6 pb-4 text-center lg:text-start border-b-2">
					Projects.
				</div>
			</div>
			<div className="flex">
				<Link
					className="hover:bg-green-400 w-full text-center lg:w-auto bg-green-500 transition-colors px-8 py-2 rounded text-md text-white"
					href={"projects/new-project"}
				>
					Add New Project
				</Link>
			</div>
			<div className="mt-8 flex flex-col gap-4 w-fit">
				{projects.length > 0 ? (
					projects.map((project: ContentProject) => (
						<div
							key={`project-${project.slug}`}
							className="bg-neutral-100 shadow rounded-lg px-4 py-2 grid lg:grid-cols-[1fr_1fr_auto_auto] gap-2 lg:gap-10"
						>
							<div className="flex flex-col">
								<div className="font-normal">Project Name</div>
								<div className="font-bold text-xl my-auto">
									{project.name}
								</div>
							</div>
							<div className="flex flex-col">
								<div className="font-normal">Client</div>
								<div className="font-bold my-auto">
									{project.client}
								</div>
							</div>
							<div className="flex justify-center items-center grow-0">
								<DeleteProjectButton id={project.slug} />
							</div>
							<div className="flex justify-center items-center grow-0">
								<Link
									className="hover:bg-green-400 w-full text-center lg:w-auto bg-green-500 transition-colors px-4 py-2 rounded text-md text-white"
									href={"projects/" + project.slug}
								>
									View Project
								</Link>
							</div>
						</div>
					))
				) : (
					<div className="bg-neutral-100 shadow rounded-lg px-4 py-2">
						<div className="font-bold">No Projects added.</div>
						<div className="mt-2">
							Use the Add New Project button to get started
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
