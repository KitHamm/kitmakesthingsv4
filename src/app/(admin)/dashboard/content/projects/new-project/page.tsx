import FormProvider from "@/components/admin/content/projectContent/formProvider";
import FormTitle from "@/components/admin/content/projectContent/formTitle";
import ProjectButtons from "@/components/admin/content/projectContent/projectButtons";
import ProjectImageSelect from "@/components/admin/content/projectContent/projectImageSelect";
import ProjectOrder from "@/components/admin/content/projectContent/projectOrder";
import ProjectTechStackInput from "@/components/admin/content/projectContent/projectTechStackInput";
import ProjectTextAreaInput from "@/components/admin/content/projectContent/projectTextAreaInput";
import ProjectTextInput from "@/components/admin/content/projectContent/projectTextInput";
import prisma from "@/lib/prisma";

export default async function NewProject() {
	const images = await prisma.images.findMany();

	return (
		<FormProvider
			classNames="flex flex-col lg:flex-row gap-10 lg:gap-0"
			project={null}
		>
			<div className="lg:basis-3/4">
				<FormTitle />
				<div className="lg:px-8 flex flex-col gap-4">
					<div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
						<ProjectTextInput
							target="name"
							label="Project Name"
							required
							message="Project Name is required"
							placeholder="Project Name"
						/>
						<ProjectTextInput
							target="slug"
							label="Slug"
							required
							message="Slug is required"
							placeholder="Slug"
						/>
					</div>
					<div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
						<ProjectTextInput
							target="role"
							label="My Role"
							required
							message="Role is required"
							placeholder="My Role"
						/>
						<ProjectTextInput
							target="where"
							label="Where"
							required
							message="Where is required"
							placeholder="Where"
						/>
					</div>
					<div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
						<ProjectTextInput
							target="date"
							label="Date"
							required
							message="Date is required"
							placeholder="Date"
						/>
						<ProjectTextInput
							target="client"
							label="Client"
							required
							message="Client is required"
							placeholder="Client"
						/>
					</div>
					<div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
						<ProjectTextInput
							target="outLink"
							label="Out Link"
							required={false}
							message="na"
							placeholder="Out Link"
						/>
						<ProjectTextInput
							target="outLinkText"
							label="Out Link Text"
							required={false}
							message="na"
							placeholder="Out Link Text"
						/>
					</div>
					<ProjectTextAreaInput
						target="short"
						label="Short"
						required
						message="Short is required"
						placeholder="Short"
					/>
					<ProjectTextAreaInput
						target="description"
						label="Description"
						required
						message="Description is required"
						placeholder="Description"
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
