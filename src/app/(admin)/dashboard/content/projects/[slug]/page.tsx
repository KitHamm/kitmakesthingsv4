// prisma
import prisma from "@/lib/prisma";
import FormProvider from "@/components/admin/content/projectContent/formProvider";
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default async function ContentProject(
	props: Readonly<{ params: Params }>
) {
	const params = await props.params;

	const project = await prisma.contentProject.findUnique({
		where: {
			slug: params.slug,
		},
	});

	const images = await prisma.images.findMany();

	if (params.slug !== "new-project" && !project) {
		redirect("/projects");
	}

	return (
		<FormProvider
			classNames="flex flex-col lg:flex-row gap-10 lg:gap-0"
			images={images}
			project={project}
		/>
	);
}
