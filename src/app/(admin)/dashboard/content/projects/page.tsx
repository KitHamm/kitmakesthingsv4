import ProjectsMain from "@/components/admin/content/ProjectsMain";
import prisma from "@/lib/prisma";
import { ContentProject } from "@prisma/client";

export default async function ContentProjects() {
    const projects = await prisma.contentProject.findMany({
        orderBy: {
            order: "asc",
        },
    });
    const images = await prisma.images.findMany();
    return (
        <div className="xl:py-10 xl:px-10 py-4">
            <ProjectsMain
                projects={projects as ContentProject[]}
                images={images}
            />
        </div>
    );
}
