// prisma
import prisma from "@/lib/prisma";
// packages
import { redirect } from "next/navigation";
// provider
import FormProvider from "@/components/admin/content/projectContent/formProvider";
// components
import FormTitle from "@/components/admin/content/projectContent/formTitle";
import ProjectTextInput from "@/components/admin/content/projectContent/projectTextInput";
import ProjectTextAreaInput from "@/components/admin/content/projectContent/projectTextAreaInput";
import ProjectTechStackInput from "@/components/admin/content/projectContent/projectTechStackInput";
import ProjectImageSelect from "@/components/admin/content/projectContent/projectImageSelect";
import ProjectOrder from "@/components/admin/content/projectContent/projectOrder";
import ProjectButtons from "@/components/admin/content/projectContent/projectButtons";
// types
import { ContentProjectForm } from "@/lib/types";
import { ContentProject as ContentProjectType, Images } from "@prisma/client";

const textInputs: {
	target: keyof ContentProjectForm;
	label: string;
	required: boolean;
}[] = [
	{
		target: "name",
		label: "Project Name",
		required: true,
	},
	{
		target: "slug",
		label: "Slug",
		required: true,
	},
	{
		target: "role",
		label: "My Role",
		required: true,
	},
	{
		target: "where",
		label: "Where",
		required: true,
	},
	{
		target: "date",
		label: "Date",
		required: true,
	},
	{
		target: "client",
		label: "Client",
		required: true,
	},
	{
		target: "outLink",
		label: "Out Link",
		required: false,
	},
	{
		target: "outLinkText",
		label: "Out Link Text",
		required: false,
	},
];

export default async function ContentProject({
	params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
	const { slug } = await params;

	let project: ContentProjectType | null = null;
	let images: Images[] = [];

	try {
		const [projectResult, imagesResult] = await Promise.all([
			prisma.contentProject.findUnique({
				where: { slug },
			}),
			prisma.images.findMany(),
		]);
		project = projectResult;
		images = imagesResult;
	} catch (error) {
		console.log("Error fetching data:", error);
		if (!project) {
			return redirect("/projects");
		}
	}

	if (slug !== "new-project" && !project) {
		return redirect("/projects");
	}

	return (
		<FormProvider
			classNames="flex flex-col lg:flex-row gap-10 lg:gap-0"
			project={project}
		>
			<div className="lg:basis-3/4">
				<FormTitle />
				<div className="lg:px-8 flex flex-col gap-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
						{textInputs.map((input) => (
							<ProjectTextInput
								key={input.target}
								target={input.target}
								label={input.label}
								required={input.required}
							/>
						))}
					</div>
					<ProjectTextAreaInput
						target="short"
						label="Short"
						required
					/>
					<ProjectTextAreaInput
						target="description"
						label="Description"
						required
					/>
					<ProjectTechStackInput />
					<ProjectImageSelect images={images} />
				</div>
			</div>
			<div className="lg:basis-1/4 relative">
				<div className="rounded-lg sticky top-20 left-0 bg-neutral-100 shadow p-4">
					<div className="font-bold text-4xl mb-4">Controls</div>
					<div className="font-bold">Checklist:</div>
					<div className="mx-5">
						<ul className="list-disc mx-5 mb-4">
							<li>All Details</li>
							<li>Spelling</li>
							<li>Working Links</li>
							<li>Correct Order</li>
						</ul>
					</div>
					<ProjectOrder />
					<ProjectButtons />
				</div>
			</div>
		</FormProvider>
	);
}
