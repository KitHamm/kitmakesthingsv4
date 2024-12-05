// Prisma
import prisma from "@/lib/prisma";
// Components
import ProjectFadeIn from "@/components/main/ProjectFadeIn";
import EmblaCarousel from "@/components/embla/EmblaCarousel";
import ProjectTechStack from "@/components/main/ProjectTechStack";
import DataError from "@/components/main/DataError";
// Packages
import Link from "next/link";
import Markdown from "react-markdown";
// Types
import { EmblaOptionsType } from "embla-carousel";
import ContactButton from "@/components/main/ContactButton";
// Constants
const OPTIONS: EmblaOptionsType = { loop: true };

export default async function ProjectPage({
    params,
}: {
    params: { projectId: string };
}) {
    const project = await prisma.contentProject.findUnique({
        where: {
            slug: params.projectId[0],
        },
    });

    if (!project) {
        return <DataError />;
    }

    return (
        <main className="z-10 pt-20 grow flex flex-col">
            <section className="flex flex-col my-auto">
                <article className="grow xl:w-[75dvw] w-[90dvw] grid xl:grid-cols-2 xl:gap-20 mx-auto py-10">
                    <header className="flex">
                        <div className="my-auto">
                            <ProjectFadeIn index={0}>
                                <h1 className="xl:text-6xl text-4xl font-bold ">
                                    {project.name}
                                </h1>
                            </ProjectFadeIn>
                            <ProjectFadeIn index={1}>
                                <div className="font-bold text-xl mt-2">
                                    {project.role}
                                </div>
                            </ProjectFadeIn>
                            <ProjectTechStack stack={project.stack} />
                            <ProjectFadeIn index={2}>
                                <Markdown className="mt-6 font-bold text-lg">
                                    {project.description}
                                </Markdown>
                            </ProjectFadeIn>
                            <ProjectFadeIn index={3}>
                                <div className="flex flex-col xl:flex-row justify-evenly my-6 xl:gap-20 gap-10">
                                    {project.outLink && project.outLinkText && (
                                        <Link
                                            target="_blank"
                                            className="xl:w-full py-2 text-center transition-all font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                                            href={project.outLink}>
                                            {project.outLinkText}
                                        </Link>
                                    )}
                                    <ContactButton about={false} />
                                    <Link
                                        className="xl:w-full py-2 text-center transition-all font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                                        href={"/projects"}>
                                        Back
                                    </Link>
                                </div>
                            </ProjectFadeIn>
                        </div>
                    </header>
                    <figure className="slide-in-left flex order-first mb-10 xl:mb-0 xl:order-last">
                        <EmblaCarousel
                            slides={project.images}
                            options={OPTIONS}
                        />
                    </figure>
                </article>
            </section>
        </main>
    );
}
