"use client";
// packages
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
} from "react";
import {
	useForm,
	UseFormRegister,
	UseFormHandleSubmit,
	Control,
	FieldErrors,
	UseFormWatch,
	UseFormSetValue,
} from "react-hook-form";
// functions
import { updateCreateContentProject } from "@/server/contentActions/updateCreateContentProject";
// types
import { ContentProjectForm } from "@/lib/types";
import { ContentProject, Images } from "@prisma/client";
import FormTitle from "./formTitle";
import ProjectTextInput from "./projectTextInput";
import ProjectTextAreaInput from "./projectTextAreaInput";
import ProjectTechStackInput from "./projectTechStackInput";
import ProjectImageSelect from "./projectImageSelect";
import ProjectOrder from "./projectOrder";
import ProjectButtons from "./projectButtons";

type FormContextType = {
	register: UseFormRegister<ContentProjectForm>;
	handleSubmit: UseFormHandleSubmit<ContentProjectForm, undefined>;
	control: Control<ContentProjectForm, any>;
	handleReset: () => void;
	watch: UseFormWatch<ContentProjectForm>;
	setValue: UseFormSetValue<ContentProjectForm>;
	errors: FieldErrors<ContentProjectForm>;
	isDirty: boolean;
};

const FormContext = createContext<FormContextType>({} as FormContextType);

export const useFormContext = () => useContext(FormContext);

export default function FormProvider({
	project,
	images,
	classNames,
}: Readonly<{
	project: ContentProject | null;
	images: Images[];
	classNames?: string;
}>) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		watch,
		setValue,
		formState: { errors, isDirty },
	} = useForm<ContentProjectForm>();

	const handleReset = useCallback(() => {
		if (project) {
			const stack = project.stack.map((stack: string) => ({
				name: stack,
			}));
			const images = project.images.map((image: string) => ({
				url: image,
			}));
			reset({
				name: project.name,
				slug: project.slug,
				role: project.role,
				stack: stack,
				description: project.description,
				date: project.date ?? "",
				where: project.where,
				images: images,
				client: project.client ?? "",
				short: project.short,
				outLink: project.outLink ?? "",
				outLinkText: project.outLinkText ?? "",
				order: project.order,
			});
		} else {
			reset({
				name: "New Project",
			});
		}
	}, [project, reset]);

	useEffect(() => {
		handleReset();
	}, [project, handleReset]);

	const onSubmit = (data: ContentProjectForm) => {
		updateCreateContentProject(data, project?.slug ?? "")
			.then((res) => {
				if (res.status === 400) {
					console.log(res.message);
				}
			})
			.catch((err) => console.log(err));
	};

	const formContextValue = useMemo(
		() => ({
			register,
			handleSubmit,
			control,
			handleReset,
			watch,
			setValue,
			errors,
			isDirty,
		}),
		[
			register,
			handleSubmit,
			control,
			handleReset,
			watch,
			setValue,
			errors,
			isDirty,
		]
	);

	return (
		<FormContext.Provider value={formContextValue}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${classNames} lg:py-10 lg:px-10 py-4 px-4`}
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
			</form>
		</FormContext.Provider>
	);
}
