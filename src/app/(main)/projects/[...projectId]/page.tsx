import prisma from "@/lib/prisma";
import Markdown from "react-markdown";
import EmblaCarousel from "@/components/embla/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Chip } from "@nextui-org/react";
import ProjectButtons from "@/components/ProjectButtons";
import ErrorButtons from "@/components/404Buttons";
import Link from "next/link";
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
    const OPTIONS: EmblaOptionsType = { loop: true };
    if (project) {
        return (
            <main className="z-10">
                <section className="">
                    <article className="fade-in min-h-screen xl:w-[75dvw] w-[90dvw] grid xl:grid-cols-2 xl:gap-20 mx-auto">
                        <header className="flex">
                            <div className="my-auto">
                                <div className="my-auto">
                                    <h1 className="xl:text-6xl text-4xl font-bold ">
                                        {project.name}
                                    </h1>
                                    <div className="font-bold text-xl mt-2">
                                        {project.role}
                                    </div>
                                    <div className="mt-6 flex flex-wrap text-center gap-2">
                                        {project.stack.map(
                                            (stack: String, index: number) => {
                                                return (
                                                    <Chip
                                                        key={
                                                            stack + "-" + index
                                                        }
                                                        className="bg-green-500 text-white">
                                                        {stack}
                                                    </Chip>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <Markdown className="mt-6 font-bold text-lg">
                                    {project.description as string}
                                </Markdown>
                                <div className="flex flex-col xl:flex-row justify-evenly my-6 xl:gap-20 gap-10">
                                    {project.outLink && project.outLinkText ? (
                                        <Link
                                            target="_blank"
                                            className="w-full py-4 text-center rounded-full transition-all font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                                            href={project.outLink}>
                                            {project.outLinkText}
                                        </Link>
                                    ) : (
                                        ""
                                    )}
                                    <ProjectButtons slug={project.slug} />
                                    <Link
                                        className="xl:w-full py-4 text-center rounded-full transition-all font-bold text-2xl bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                                        href={"/projects"}>
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </header>
                        <figure className="flex order-first mt-24 xl:mt-0 mb-10 xl:order-last">
                            <EmblaCarousel
                                slides={project.images}
                                options={OPTIONS}
                            />
                        </figure>
                    </article>
                </section>
            </main>
        );
    } else {
        return (
            <main className="z-10">
                <section className="xl:absolute top-0 left-0 min-w-[100dvw]">
                    <article className="fade-in flex justify-center min-h-screen xl:w-[75dvw] w-[90dvw] mx-auto">
                        <div className="my-auto flex flex-col gap-4">
                            <h1 className="xl:text-6xl text-center text-4xl font-bold ">
                                Oops!
                            </h1>
                            <div className="text-center text-3xl">
                                Looks like you made a wrong turn.
                            </div>
                            <ErrorButtons />
                        </div>
                    </article>
                </section>
            </main>
        );
    }
}
