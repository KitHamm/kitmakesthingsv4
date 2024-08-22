import prisma from "@/lib/prisma";
import ProjectContent from "@/components/ProjectContent";
import { ContentProject } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/authOptions";
export default async function ProjectPage({
    params,
}: {
    params: { projectId: string };
}) {
    const session = await getServerSession(authOptions);
    const project = await prisma.contentProject.findUnique({
        where: {
            slug: params.projectId[0],
        },
    });
    return (
        <main className="z-10">
            <section className="xl:absolute top-0 left-0 min-w-[100dvw]">
                <ProjectContent
                    session={session as Session}
                    project={project as ContentProject}
                />
            </section>
        </main>
    );
}
