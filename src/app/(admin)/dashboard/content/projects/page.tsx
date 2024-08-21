import ProjectsMain from "@/components/admin/content/ProjectsMain";
import prisma from "@/lib/prisma";
import { ContentProject } from "@prisma/client";

export default async function ContentProjects() {
    const projects = await prisma.contentProject.findMany();
    const images = await prisma.images.findMany();
    return (
        <div className="p-10">
            <ProjectsMain
                projects={projects as ContentProject[]}
                images={images}
            />
        </div>
    );
}
