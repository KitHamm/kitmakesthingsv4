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
import { get } from "http";

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

	function getImageUrl(image: string) {
		if (!image) return "https://placehold.co/500x500.png";
		return process.env.NEXT_PUBLIC_BASE_IMAGE_URL + image;
	}

	function getPlaceholderText(
		target:
			| "title1"
			| "title2"
			| "title3"
			| "title4"
			| "title"
			| "text1"
			| "text2"
			| "copy",
		placeholder: string
	) {
		if (errors[target]) {
			return errors[target].message;
		}
		return placeholder;
	}

	function getClassName(
		target:
			| "title1"
			| "title2"
			| "title3"
			| "title4"
			| "title"
			| "text1"
			| "text2"
			| "copy"
	) {
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
					<div className="relative mx-auto">
						<Image
							src={getImageUrl(about1Image)}
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
							src={getImageUrl(about2Image)}
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
							src={getImageUrl(about3Image)}
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
							src={getImageUrl(about4Image)}
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
							placeholder={getPlaceholderText(
								"title1",
								"Title 1"
							)}
							className={getClassName("title1")}
						/>
						<input
							type="text"
							{...register("title2", {
								required: {
									value: true,
									message: "Title is required.",
								},
							})}
							placeholder={getPlaceholderText(
								"title2",
								"Title 2"
							)}
							className={getClassName("title2")}
						/>
						<input
							type="text"
							{...register("title3", {
								required: {
									value: true,
									message: "Title is required.",
								},
							})}
							placeholder={getPlaceholderText(
								"title3",
								"Title 3"
							)}
							className={getClassName("title3")}
						/>
						<input
							type="text"
							{...register("title4", {
								required: {
									value: true,
									message: "Title is required.",
								},
							})}
							placeholder={getPlaceholderText(
								"title4",
								"Title 4"
							)}
							className={getClassName("title4")}
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
				target={imageTarget}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				setValue={setValue as UseFormSetValue<AboutContentForm>}
			/>
		</>
	);
}
