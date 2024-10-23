import prisma from "@/lib/prisma";
import { ContentProject } from "@prisma/client";
import VisitsTracker from "@/components/VisitsTracker";
import ProjectCard from "@/components/ProjectCard";

export default async function Projects() {
    const projects = await prisma.contentProject.findMany({
        orderBy: {
            order: "asc",
        },
    });
    return (
        <main>
            <section className="">
                <header className="min-h-auto my-20 flex justify-center">
                    <h1 className="text-center font-bold text-6xl xl:text-8xl mt-auto">
                        Projects.
                    </h1>
                </header>
                <article className="fade-in-slow flex flex-col xl:w-[75dvw] w-[90dvw] mx-auto mt-20">
                    <div className="xl:my-auto">
                        <div className="flex flex-col gap-20">
                            {projects.map(
                                (project: ContentProject, index: number) => {
                                    return (
                                        <ProjectCard
                                            index={index}
                                            key={project.slug}
                                            project={project}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                </article>
            </section>
            <VisitsTracker />
        </main>
    );
}
