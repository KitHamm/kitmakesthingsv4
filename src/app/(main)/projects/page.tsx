// Prisma
import prisma from "@/lib/prisma";
// Packages
import Link from "next/link";
// Components
import ProjectCardInView from "@/components/main/projects/ProjectCardInView";
import DataError from "@/components/main/shared/DataError";
import AnonVisitLogger from "@/components/main/shared/AnonVisitLogger";

// Types
import { ContentProject } from "@prisma/client";

export default async function Projects() {
	let projects: ContentProject[] = [];
	try {
		projects = await prisma.contentProject.findMany({
			orderBy: {
				order: "asc",
			},
		});
	} catch (error) {
		return <DataError />;
	}

	return (
		<main className="grow bg-neutral-300">
			<section id="projects">
				<header className="min-h-auto mb-20 mt-40 flex justify-center">
					<h1 className="text-center font-bold text-6xl lg:text-8xl mt-auto">
						PROJECTS
					</h1>
				</header>
				<article className="fade-in-slow flex flex-col lg:w-[75dvw] w-[90dvw] mx-auto mt-20">
					<div className="lg:my-auto">
						<div className="flex flex-col gap-20">
							{projects.length > 0 ? (
								projects.map(
									(
										project: ContentProject,
										index: number
									) => {
										return (
											<ProjectCardInView
												index={index}
												key={project.slug}
												image={project.images[0]}
												projectName={project.name}
											>
												<div className="lg: w-4/5 mx-auto flex flex-col justify-center gap-6">
													<div className="font-bold text-4xl">
														{project.name}
													</div>
													<div className="text-lg">
														{project.short}
													</div>
													<div className="flex flex-col lg:flex-row gap-4">
														<Link
															className="text-center rounded-xl transition-all lg:w-fit py-2 px-12 text-xl font-medium border-2 bg-white border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white"
															href={
																"/projects/" +
																project.slug
															}
														>
															Details
														</Link>
														{project.outLink &&
															project.outLinkText && (
																<Link
																	target="_blank"
																	className="text-center rounded-xl transition-all lg:w-fit py-2 px-12 text-xl font-medium border-2 bg-white border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white"
																	href={
																		project.outLink
																	}
																>
																	{
																		project.outLinkText
																	}
																</Link>
															)}
													</div>
												</div>
											</ProjectCardInView>
										);
									}
								)
							) : (
								<div className="flex justify-center">
									No projects found.
								</div>
							)}
						</div>
					</div>
				</article>
			</section>
			<AnonVisitLogger />
		</main>
	);
}
