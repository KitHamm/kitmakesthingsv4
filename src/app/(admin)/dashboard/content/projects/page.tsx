import prisma from "@/lib/prisma";
import { ContentProject } from "@prisma/client";
import Link from "next/link";

export default async function ContentProjects() {
	const projects = await prisma.contentProject.findMany({
		orderBy: {
			order: "asc",
		},
	});

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
				{projects.map((project: ContentProject) => {
					return (
						<div key={`project-${project.slug}`}>
							<div className="bg-neutral-100 shadow rounded-lg px-4 py-2 grid lg:grid-cols-[1fr_1fr_auto] gap-2 lg:gap-10">
								<div className="flex flex-col">
									<div className="font-bold">
										Project Name
									</div>
									<div className="font-bold text-xl my-auto">
										{project.name}
									</div>
								</div>
								<div className="flex flex-col">
									<div className="font-bold">Client</div>
									<div className="font-bold my-auto">
										{project.client}
									</div>
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
						</div>
					);
				})}
			</div>
		</div>
	);
}
