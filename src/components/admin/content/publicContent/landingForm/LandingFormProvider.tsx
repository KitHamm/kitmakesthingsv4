"use client";
// packages
import {
	useForm,
	UseFormSetValue,
	UseFormWatch,
	UseFormRegister,
	FieldErrors,
	UseFormHandleSubmit,
	Control,
} from "react-hook-form";
import { useEffect, createContext, useContext, useCallback } from "react";
// functions
import { updateLanding } from "@/server/contentActions/updateLanding";
// types
import { LandingContentForm, LandingWithTech } from "@/lib/types";
import { Images } from "@prisma/client";

type LandingFormContextType = {
	register: UseFormRegister<LandingContentForm>;
	handleSubmit: UseFormHandleSubmit<LandingContentForm, undefined>;
	control: Control<LandingContentForm, any>;
	handleReset: () => void;
	watch: UseFormWatch<LandingContentForm>;
	setValue: UseFormSetValue<LandingContentForm>;
	errors: FieldErrors<LandingContentForm>;
	isDirty: boolean;
	images: Images[];
};

const LandingFormContext = createContext<LandingFormContextType>(
	{} as LandingFormContextType
);

const LandingFormProvider = ({
	children,
	landingContent,
	images,
}: Readonly<{
	children: React.ReactNode;
	landingContent: LandingWithTech | null;
	images: Images[];
}>) => {
	const form = useForm<LandingContentForm>();
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
		if (landingContent) {
			reset(landingContent);
		}
	}, [landingContent, reset]);

	const handleReset = () => {
		if (landingContent) {
			reset(landingContent);
		} else {
			reset();
		}
	};

	const onSubmit = async (data: LandingContentForm) => {
		try {
			const res = await updateLanding(data);
			if (res.status !== 200) {
				console.log(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const landingFormContextValue = useCallback(
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
		<LandingFormContext.Provider value={landingFormContextValue()}>
			<form
				className="mt-6 flex flex-col gap-4 mx-auto w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				{children}
			</form>
		</LandingFormContext.Provider>
	);
};

export default LandingFormProvider;
export const useLandingFormContext = () => useContext(LandingFormContext);
