import prisma from "@/lib/prisma";
import { EmblaOptionsType } from "embla-carousel";
import ErrorButtons from "@/components/404Buttons";
import SingleProject from "@/components/SingleProject";
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
    if (project) {
        return (
            <main className="z-10 grow flex flex-col">
                <section className="flex flex-col my-auto">
                    <SingleProject project={project} />
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
