"use client";
// packages
import {
	Control,
	FieldErrors,
	useForm,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import { useEffect, createContext, useContext, useCallback } from "react";
// functions
import { updateAbout } from "@/server/contentActions/updateAbout";
// types
import { About, Images } from "@prisma/client";
import { AboutContentForm } from "@/lib/types";

type AboutFormContextType = {
	register: UseFormRegister<AboutContentForm>;
	handleSubmit: UseFormHandleSubmit<AboutContentForm, undefined>;
	control: Control<AboutContentForm, any>;
	handleReset: () => void;
	watch: UseFormWatch<AboutContentForm>;
	setValue: UseFormSetValue<AboutContentForm>;
	errors: FieldErrors<AboutContentForm>;
	isDirty: boolean;
	images: Images[];
};

const AboutFormContext = createContext<AboutFormContextType>(
	{} as AboutFormContextType
);

const AboutFormProvider = ({
	children,
	aboutContent,
	images,
}: Readonly<{
	children: React.ReactNode;
	aboutContent: About | null;
	images: Images[];
}>) => {
	const form = useForm<AboutContentForm>();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
		setValue,
		control,
		watch,
	} = form;

	useEffect(() => {
		if (aboutContent) {
			reset(aboutContent);
		}
	}, [aboutContent, reset]);

	const handleReset = () => {
		if (aboutContent) {
			reset(aboutContent);
		} else {
			reset();
		}
	};

	const onSubmit = async (data: AboutContentForm) => {
		try {
			const res = await updateAbout(data);
			if (!res.success) {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	const aboutFormContextValue = useCallback(
		() => ({
			register,
			handleSubmit,
			control,
			handleReset,
			watch,
			setValue,
			errors,
			isDirty,
			images,
		}),
		[
			register,
			handleSubmit,
			control,
			handleReset,
			setValue,
			errors,
			isDirty,
			images,
		]
	);

	return (
		<AboutFormContext.Provider value={aboutFormContextValue()}>
			<form
				className="mt-6 flex flex-col gap-4 mx-auto w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				{children}
			</form>
		</AboutFormContext.Provider>
	);
};

export default AboutFormProvider;
export const useAboutFormContext = () => useContext(AboutFormContext);
