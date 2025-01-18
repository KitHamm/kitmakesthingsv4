"use client";
// packages
import { useForm, UseFormSetValue } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
// components
import ContentImageModal from "../../shared/ContentImageModal";
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
	const [imageTarget, setImageTarget] = useState<
		"image1Url" | "image2Url" | "image3Url" | "image4Url"
	>("image1Url");
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

	const aboutImage1Url = about1Image
		? process.env.NEXT_PUBLIC_BASE_IMAGE_URL + about1Image
		: "https://placehold.co/500x500.png";
	const aboutImage2Url = about2Image
		? process.env.NEXT_PUBLIC_BASE_IMAGE_URL + about2Image
		: "https://placehold.co/500x500.png";
	const aboutImage3Url = about3Image
		? process.env.NEXT_PUBLIC_BASE_IMAGE_URL + about3Image
		: "https://placehold.co/500x500.png";
	const aboutImage4Url = about4Image
		? process.env.NEXT_PUBLIC_BASE_IMAGE_URL + about4Image
		: "https://placehold.co/500x500.png";

	const imageTitle1Placeholder = errors.title1
		? errors.title1.message
		: "Title 1";
	const imageTitle1ClassName = errors.title1
		? "placeholder:text-red-400"
		: "";
	const imageTitle2Placeholder = errors.title2
		? errors.title2.message
		: "Title 2";
	const imageTitle2ClassName = errors.title2
		? "placeholder:text-red-400"
		: "";
	const imageTitle3Placeholder = errors.title3
		? errors.title3.message
		: "Title 3";
	const imageTitle3ClassName = errors.title3
		? "placeholder:text-red-400"
		: "";
	const imageTitle4Placeholder = errors.title4
		? errors.title4.message
		: "Title 4";
	const imageTitle4ClassName = errors.title4
		? "placeholder:text-red-400"
		: "";

	return (
		<>
			<form
				className="mt-6 flex flex-col gap-4 mx-auto w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-2 gap-0 w-2/3 mx-auto">
					<div className="relative mx-auto">
						<Image
							src={aboutImage1Url}
							height={500}
							width={500}
							alt="About 1 Image"
							className="w-full h-auto"
						/>
						<button
							onClick={() => {
								setImageTarget("image1Url");
								onOpenChange();
							}}
							className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center"
						>
							<div className="my-auto font-bold text-white text-4xl">
								Change
							</div>
						</button>
					</div>
					<div className="relative mx-auto">
						<Image
							src={aboutImage2Url}
							height={500}
							width={500}
							alt="About 2 Image"
							className="w-full h-auto"
						/>
						<button
							onClick={() => {
								setImageTarget("image2Url");
								onOpenChange();
							}}
							className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center"
						>
							<div className="my-auto font-bold text-white text-4xl">
								Change
							</div>
						</button>
					</div>
					<div className="relative mx-auto">
						<Image
							src={aboutImage3Url}
							height={500}
							width={500}
							alt="About 3 Image"
							className="w-full h-auto"
						/>
						<button
							onClick={() => {
								setImageTarget("image3Url");
								onOpenChange();
							}}
							className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center"
						>
							<div className="my-auto font-bold text-white text-4xl">
								Change
							</div>
						</button>
					</div>
					<div className="relative mx-auto">
						<Image
							src={aboutImage4Url}
							height={500}
							width={500}
							alt="About 4 Image"
							className="w-full h-auto"
						/>
						<button
							onClick={() => {
								setImageTarget("image4Url");
								onOpenChange();
							}}
							className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center"
						>
							<div className="my-auto font-bold text-white text-4xl">
								Change
							</div>
						</button>
					</div>
				</div>
				<div>
					<label className="font-bold px-2" htmlFor="title1">
						Image Titles
					</label>
					<div className="grid grid-cols-2 gap-4">
						<input
							type="text"
							{...register("title1", {
								required: {
									value: true,
									message: "Title is required.",
								},
							})}
							placeholder={imageTitle1Placeholder}
							className={imageTitle1ClassName}
						/>
						<input
							type="text"
							{...register("title2", {
								required: {
									value: true,
									message: "Title is required.",
								},
							})}
							placeholder={imageTitle2Placeholder}
							className={imageTitle2ClassName}
						/>
						<input
							type="text"
							{...register("title3", {
								required: {
									value: true,
									message: "Title is required.",
								},
							})}
							placeholder={imageTitle3Placeholder}
							className={imageTitle3ClassName}
						/>
						<input
							type="text"
							{...register("title4", {
								required: {
									value: true,
									message: "Title is required.",
								},
							})}
							placeholder={imageTitle4Placeholder}
							className={imageTitle4ClassName}
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
						placeholder={
							errors.title ? errors.title.message : "Title"
						}
						className={
							errors.title ? "placeholder:text-red-400" : ""
						}
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
							placeholder={
								errors.text1 ? errors.text1.message : "Text 1"
							}
							className={
								errors.text1 ? "placeholder:text-red-400" : ""
							}
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
							placeholder={
								errors.text2 ? errors.text2.message : "Text 2"
							}
							className={
								errors.text2 ? "placeholder:text-red-400" : ""
							}
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
						placeholder={errors.copy ? errors.copy.message : "Copy"}
						className={
							errors.copy ? "placeholder:text-red-400" : ""
						}
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
				target={imageTarget}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				setValue={setValue as UseFormSetValue<AboutContentForm>}
			/>
		</>
	);
}
