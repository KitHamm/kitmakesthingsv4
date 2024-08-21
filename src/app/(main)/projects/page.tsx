import prisma from "@/lib/prisma";
import { ContentProject } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Projects() {
    const projects = await prisma.contentProject.findMany();
    return (
        <main>
            <section className="absolute top-0 left-0 min-w-[100dvw]">
                <header className="min-h-[25dvh] flex justify-center">
                    <h1 className="text-center font-bold text-8xl mt-auto">
                        Projects.
                    </h1>
                </header>
                <article className="fade-in min-h-[50dvh] flex flex-col xl:w-[75dvw] w-[90dvw] mx-auto">
                    <div className="my-auto">
                        <div className="grid grid-cols-3">
                            {projects.map(
                                (project: ContentProject, index: number) => {
                                    return (
                                        <Link
                                            href={"/projects/" + project.slug}
                                            key={project.slug}
                                            className="relative">
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    project.images[0]
                                                }
                                                height={500}
                                                width={500}
                                                alt={project.name}
                                                className="max-h-96 w-auto mx-auto"
                                            />
                                            <div className="rounded-xl cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-green-400 bg-opacity-75 border-2 border-black backdrop-blur-sm flex justify-center">
                                                <div className="text-center w-3/4 my-auto font-bold text-4xl text-white">
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
        </main>
    );
}
