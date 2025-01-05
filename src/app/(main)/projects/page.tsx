// Prisma
import prisma from "@/lib/prisma";
// Components
import ProjectCardInView from "@/components/main/ProjectCardInView";
import DataError from "@/components/main/DataError";
// Packages
import Link from "next/link";
// Functions
import AnonVisitLogger from "@/components/main/AnonVisitLogger";
// Types
import { ContentProject } from "@prisma/client";

export default async function Projects() {
	const projects = await prisma.contentProject.findMany({
		orderBy: {
			order: "asc",
		},
	});

	if (!projects) {
		return <DataError />;
	}

	return (
		<main className="bg-neutral-300">
			<section id="projects">
				<header className="min-h-auto mb-20 mt-40 flex justify-center">
					<h1 className="text-center font-bold text-6xl lg:text-8xl mt-auto">
						PROJECTS
					</h1>
				</header>
				<article className="fade-in-slow flex flex-col lg:w-[75dvw] w-[90dvw] mx-auto mt-20">
					<div className="lg:my-auto">
						<div className="flex flex-col gap-20">
							{projects.map(
								(project: ContentProject, index: number) => {
									return (
										<ProjectCardInView
											index={index}
											key={index}
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
							)}
						</div>
					</div>
				</article>
			</section>
			<AnonVisitLogger />
		</main>
	);
}
