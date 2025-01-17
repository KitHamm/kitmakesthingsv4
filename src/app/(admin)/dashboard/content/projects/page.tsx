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

	// TODO less client for this

	return (
		<div className="lg:py-10 lg:px-10 py-4">
			<ProjectsMain
				projects={projects as ContentProject[]}
				images={images}
			/>
		</div>
	);
}
