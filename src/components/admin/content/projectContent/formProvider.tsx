"use client";
// packages
import { createContext, useContext, useEffect } from "react";
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
import { ContentProject } from "@prisma/client";

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
	classNames,
	children,
}: {
	project: ContentProject | null;
	classNames?: string;
	children: React.ReactNode;
}) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		watch,
		setValue,
		formState: { errors, isDirty },
	} = useForm<ContentProjectForm>();

	const handleReset = () => {
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
	};

	useEffect(() => {
		handleReset();
	}, [project]);

	const onSubmit = (data: ContentProjectForm) => {
		updateCreateContentProject(data, project?.slug ?? "")
			.then((res) => {
				if (res.status === 400) {
					console.log(res.message);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<FormContext.Provider
			value={{
				register,
				handleSubmit,
				control,
				handleReset,
				watch,
				setValue,
				errors,
				isDirty,
			}}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${classNames} lg:py-10 lg:px-10 py-4 px-4`}
			>
				{children}
			</form>
		</FormContext.Provider>
	);
}
