import prisma from "@/lib/prisma";

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
    return <div className="mt-40">{project?.name}</div>;
}
