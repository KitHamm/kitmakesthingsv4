"use client";

import { ContentProjectForm } from "@/lib/types";
import { ContentProject } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
import {
	useForm,
	useFieldArray,
	UseFormRegister,
	UseFormHandleSubmit,
	Control,
	FieldErrors,
	FieldArrayWithId,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFormWatch,
	UseFormSetValue,
} from "react-hook-form";

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
		console.log(data);
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
