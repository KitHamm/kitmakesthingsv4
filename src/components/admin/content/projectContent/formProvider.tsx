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

const FormProvider = ({
	children,
	project,
	classNames,
}: Readonly<{
	children: React.ReactNode;
	project: ContentProject | null;
	classNames?: string;
}>) => {
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

	const onSubmit = async (data: ContentProjectForm) => {
		try {
			const res = await updateCreateContentProject(
				data,
				project?.slug ?? ""
			);
			if (res.status === 200) {
				window.location.href = "/dashboard/content/projects";
			} else {
				console.log(res.message);
			}
		} catch (error) {
			console.log(error);
		}
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
				{children}
			</form>
		</FormContext.Provider>
	);
};
export const useFormContext = () => useContext(FormContext);
export default FormProvider;
