"use client";
// packages
import {
	FieldErrors,
	useForm,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
// components
import ContentImageModal from "@/components/admin/shared/ContentImageModal";
// types
import { About, Images } from "@prisma/client";
import { AboutContentForm } from "@/lib/types";
import { updateAbout } from "@/server/contentActions/updateAbout";

interface AboutFormProps {
	aboutContent: About | null;
	images: Images[];
}

export default function AboutForm({
	aboutContent,
	images,
}: Readonly<AboutFormProps>) {
	const { isOpen, onOpenChange } = useDisclosure();
	const [imageTarget, setImageTarget] =
		useState<keyof AboutContentForm>("image1Url");
	const form = useForm<AboutContentForm>();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
		setValue,
		watch,
	} = form;

	useEffect(() => {
		if (aboutContent) {
			reset(aboutContent);
		}
	}, [aboutContent, reset]);

	const about1Image = watch("image1Url");
	const about2Image = watch("image2Url");
	const about3Image = watch("image3Url");
	const about4Image = watch("image4Url");

	const copy = watch("copy");
	const copyTextArea = useRef<HTMLTextAreaElement | null>(null);
	const { ref: copyRef, ...copyRest } = register("copy", {
		required: {
			value: true,
			message: "Copy is required.",
		},
	});
	useEffect(() => {
		if (copyTextArea.current) {
			copyTextArea.current.style.height = "auto";
			copyTextArea.current.style.height = `${Math.max(
				copyTextArea.current.scrollHeight,
				32
			)}px`;
		}
	}, [copy]);

	const onSubmit = (data: AboutContentForm) => {
		updateAbout(data)
			.then((res) => {
				if (res.status === 400) {
					console.log(res.message);
				}
			})
			.catch((err) => console.log(err));
	};

	function getPlaceholderText(
		target: "title" | "text1" | "text2" | "copy",
		placeholder: string
	) {
		if (errors[target]) {
			return errors[target].message;
		}
		return placeholder;
	}

	function getClassName(target: keyof AboutContentForm) {
		if (errors[target]) {
			return "placeholder:text-red-400";
		}
		return undefined;
	}

	return (
		<>
			<form
				className="mt-6 flex flex-col gap-4 mx-auto w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-2 gap-0 w-2/3 mx-auto">
					<ImageContentInput
						image={about1Image}
						target="image1Url"
						onOpenChange={onOpenChange}
						setImageTarget={setImageTarget}
					/>
					<ImageContentInput
						image={about2Image}
						target="image2Url"
						onOpenChange={onOpenChange}
						setImageTarget={setImageTarget}
					/>
					<ImageContentInput
						image={about3Image}
						target="image3Url"
						onOpenChange={onOpenChange}
						setImageTarget={setImageTarget}
					/>
					<ImageContentInput
						image={about4Image}
						target="image4Url"
						onOpenChange={onOpenChange}
						setImageTarget={setImageTarget}
					/>
				</div>
				<div>
					<label className="font-bold px-2" htmlFor="title1">
						Image Titles
					</label>
					<div className="grid grid-cols-2 gap-4">
						<TitleInput
							target="title1"
							placeholder="Title 1"
							errors={errors}
							register={register}
						/>
						<TitleInput
							target="title2"
							placeholder="Title 2"
							errors={errors}
							register={register}
						/>
						<TitleInput
							target="title3"
							placeholder="Title 3"
							errors={errors}
							register={register}
						/>
						<TitleInput
							target="title4"
							placeholder="Title 4"
							errors={errors}
							register={register}
						/>
					</div>
				</div>
				<div>
					<label className="font-bold px-2" htmlFor="title">
						Title
					</label>
					<input
						type="text"
						{...register("title", {
							required: {
								value: true,
								message: "Title is required.",
							},
						})}
						placeholder={getPlaceholderText("title", "Title")}
						className={getClassName("title")}
					/>
				</div>
				<div className="flex justify-between gap-8">
					<div className="w-1/2">
						<label className="font-bold px-2" htmlFor="title">
							Text 1
						</label>
						<input
							type="text"
							{...register("text1", {
								required: {
									value: true,
									message: "Text is required.",
								},
							})}
							placeholder={getPlaceholderText("text1", "Text 1")}
							className={getClassName("text1")}
						/>
					</div>
					<div className="w-1/2">
						<label className="font-bold px-2" htmlFor="title">
							Text 2
						</label>
						<input
							type="text"
							{...register("text2", {
								required: {
									value: true,
									message: "Text is required.",
								},
							})}
							placeholder={getPlaceholderText("text2", "Text 2")}
							className={getClassName("text2")}
						/>
					</div>
				</div>
				<div>
					<label className="font-bold" htmlFor="copy">
						Copy
					</label>
					<textarea
						ref={(e) => {
							copyRef(e);
							copyTextArea.current = e;
						}}
						placeholder={getPlaceholderText("copy", "Copy")}
						className={getClassName("copy")}
						{...copyRest}
					/>
				</div>
				<div className="flex justify-end gap-6">
					<Button
						color="warning"
						variant="light"
						type="button"
						className="text-md"
						onPress={() => {
							if (aboutContent) {
								reset(aboutContent);
							} else {
								reset();
							}
						}}
					>
						Reset
					</Button>
					<Button
						isDisabled={!isDirty}
						type="submit"
						className="text-md bg-green-500 text-white"
					>
						Save Content
					</Button>
				</div>
			</form>
			<ContentImageModal
				images={images}
				aboutTarget={imageTarget}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				setValueAbout={setValue}
			/>
		</>
	);
}

function ImageContentInput(
	props: Readonly<{
		image: string;
		target: keyof AboutContentForm;
		setImageTarget: Dispatch<SetStateAction<keyof AboutContentForm>>;
		onOpenChange: () => void;
	}>
) {
	const { image, target, setImageTarget, onOpenChange } = props;
	const imageUrl = image
		? process.env.NEXT_PUBLIC_BASE_IMAGE_URL + image
		: "https://placehold.co/500x500.png";

	return (
		<div className="relative mx-auto">
			<Image
				src={imageUrl}
				height={500}
				width={500}
				alt="About 1 Image"
				className="w-full h-auto"
			/>
			<button
				onClick={() => {
					setImageTarget(target);
					onOpenChange();
				}}
				className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center"
			>
				<div className="my-auto font-bold text-white text-4xl">
					Change
				</div>
			</button>
		</div>
	);
}

function TitleInput(
	props: Readonly<{
		target: keyof AboutContentForm;
		placeholder: string;
		errors: FieldErrors<AboutContentForm>;
		register: UseFormRegister<AboutContentForm>;
	}>
) {
	const { target, placeholder, errors, register } = props;
	const placeholderText = errors[target]
		? errors[target].message
		: placeholder;

	return (
		<input
			type="text"
			{...register(target, {
				required: {
					value: true,
					message: "Title is required.",
				},
			})}
			placeholder={placeholderText}
			className={errors[target] ? "placeholder:text-red-400" : ""}
		/>
	);
}
