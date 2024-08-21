import prisma from "@/lib/prisma";
import ProjectContent from "@/components/ProjectContent";
import { ContentProject } from "@prisma/client";
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
    return (
        <main className="z-10">
            <section className="absolute top-0 left-0 min-w-[100dvw]">
                <ProjectContent project={project as ContentProject} />
            </section>
        </main>
    );
}
