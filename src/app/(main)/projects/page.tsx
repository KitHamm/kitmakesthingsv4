import prisma from "@/lib/prisma";
import { ContentProject } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ProjectsContent from "@/components/ProjectsContent";

export default async function Projects() {
    const projects = await prisma.contentProject.findMany({
        orderBy: {
            date: "desc",
        },
    });
    return (
        <main>
            <section className="xl:absolute top-0 left-0 min-w-[100dvw]">
                <header className="min-h-auto mt-24 xl:mt-0 xl:min-h-[25dvh] flex justify-center mb-8">
                    <h1 className="text-center font-bold text-6xl xl:text-8xl mt-auto">
                        Projects.
                    </h1>
                </header>
                <article className="fade-in min-h-[75dvh] xl:min-h-[50dvh] flex flex-col xl:w-[75dvw] w-[90dvw] mx-auto">
                    <div className="xl:my-auto">
                        <div className="grid grid-cols-1 xl:grid-cols-3">
                            {projects.map(
                                (project: ContentProject, index: number) => {
                                    return (
                                        <Link
                                            href={"/projects/" + project.slug}
                                            key={project.slug}
                                            className="relative p-4 shadow xl:shadow-none bg-neutral-100 xl:bg-white rounded-lg mb-4">
                                            <div className="xl:hidden w-full font-bold text-center mb-2">
                                                {project.name}
                                            </div>
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    project.images[0]
                                                }
                                                height={500}
                                                width={500}
                                                alt={project.name}
                                                className="h-auto w-auto mx-auto"
                                            />

                                            <div className="rounded-xl cursor-pointer opacity-0 xl:hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400/60 hover:shadow-lg backdrop-blur-sm hidden xl:flex justify-center">
                                                <div className="text-center w-3/4 my-auto font-bold text-4xl text-white drop-shadow">
                                                    {project.name}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </article>
            </section>
            <ProjectsContent />
        </main>
    );
}
