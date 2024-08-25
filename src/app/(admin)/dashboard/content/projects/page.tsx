import { authOptions } from "@/authOptions";
import ProjectsMain from "@/components/admin/content/ProjectsMain";
import prisma from "@/lib/prisma";
import { ContentProject } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function ContentProjects() {
    const session = getServerSession(authOptions);

    const projects = await prisma.contentProject.findMany();
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
