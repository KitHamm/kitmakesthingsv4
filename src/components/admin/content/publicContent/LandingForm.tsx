"use client";
// packages
import { useForm, useFieldArray, UseFormSetValue } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button, Chip, useDisclosure } from "@nextui-org/react";
// functions
import { updateLanding } from "@/server/contentActions/updateLanding";
// types
import { LandingContentForm, LandingWithTech } from "@/lib/types";
import { Images } from "@prisma/client";
import ParallaxSection from "@/components/main/ParallaxSection";
import ContentImageModal from "../../shared/ContentImageModal";
import { resizeTextArea } from "@/lib/functions";

export default function LandingForm(props: {
	landingContent: LandingWithTech | null;
	images: Images[];
}) {
	const { landingContent, images } = props;
	const { isOpen, onOpenChange } = useDisclosure();
	const [imageTarget, setImageTarget] =
		useState<keyof LandingContentForm>("imageUrl");
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
	const { fields, append, remove } = useFieldArray({ control, name: "tech" });
	const techParallaxImage = watch("techParallaxImage");
	const aboutParallaxImage = watch("aboutParallaxImage");
	const firstHighlightImage = watch("firstHighlightImage");
	const secondHighlightImage = watch("secondHighlightImage");
	const thirdHighlightImage = watch("thirdHighlightImage");

	const [newTech, setNewTech] = useState("");

	useEffect(() => {
		if (landingContent) {
			reset(landingContent);
		}
	}, [landingContent, reset]);

	// Copy
	const copy = watch("copy");
	const copyTextArea = useRef<HTMLTextAreaElement | null>(null);
	const { ref: landingCopy, ...landingCopyRest } = register("copy", {
		required: { value: true, message: "Copy is required" },
	});
	useEffect(() => {
		if (copyTextArea.current) {
			resizeTextArea(copyTextArea.current);
		}
	}, [copy]);

	// Short about
	const shortAboutText = watch("shortAbout");
	const shortAboutTextArea = useRef<HTMLTextAreaElement | null>(null);
	useEffect(() => {
		if (shortAboutTextArea.current) {
			resizeTextArea(shortAboutTextArea.current);
		}
	}, [shortAboutText]);
	const { ref: shortAbout, ...shortAboutRest } = register("shortAbout", {
		required: { value: true, message: "Short about is required" },
	});

	const onSubmit = (data: LandingContentForm) => {
		updateLanding(data)
			.then((res) => {
				if (res.status === 400) {
					console.log(res.message);
				}
			})
			.catch((err) => console.log(err));
	};

	function getLongImageUrl(image: string) {
		if (!image) {
			return "https://placehold.co/1000x500.png";
		}
		return process.env.NEXT_PUBLIC_BASE_IMAGE_URL + image;
	}

	function getPlaceHolderText(
		target: keyof LandingContentForm,
		placeholder: string
	) {
		if (errors[target]) {
			return errors[target].message;
		} else {
			return placeholder;
		}
	}

	function getClassName(target: keyof LandingContentForm) {
		if (errors[target]) {
			return "placeholder:text-red-400";
		}
		return undefined;
	}

	function HighlighInput(props: {
		image: string;
		imageTarget: keyof LandingContentForm;
		headerTarget: keyof LandingContentForm;
		copyTarget: keyof LandingContentForm;
	}) {
		const { image, imageTarget, headerTarget, copyTarget } = props;
		const highlightText = watch(copyTarget);
		const highlightTextArea = useRef<HTMLTextAreaElement | null>(null);
		const { ref: highlightRef, ...highlightRest } = register(copyTarget, {
			required: { value: true, message: "First highlight is required" },
		});

		useEffect(() => {
			if (highlightTextArea.current) {
				resizeTextArea(highlightTextArea.current);
			}
		}, [highlightText]);

		const imageUrl = image
			? process.env.NEXT_PUBLIC_BASE_IMAGE_URL + image
			: "https://placehold.co/500x500.png";
		return (
			<div className="flex flex-col gap-4 p-4">
				<Image
					src={imageUrl}
					alt="First"
					height={200}
					width={200}
					className="object-cover h-auto w-auto rounded-full"
				/>
				<Button
					onPress={() => {
						setImageTarget(imageTarget);
						onOpenChange();
					}}
					className="w-full bg-green-500 text-white text-md font-bold"
					type="button"
				>
					Change Image
				</Button>
				<input
					type="text"
					placeholder={
						errors.firstHighlightHeader
							? errors.firstHighlightHeader.message
							: "First Header"
					}
					{...register(headerTarget, {
						required: {
							value: true,
							message: "Header is required.",
						},
					})}
				/>
				<textarea
					ref={(e) => {
						highlightRef(e);
						highlightTextArea.current = e;
					}}
					placeholder={
						errors.firstHighlightHeader
							? errors.firstHighlightHeader.message
							: "First Text"
					}
					className={
						errors.firstHighlightHeader
							? "placeholder:text-red-400"
							: ""
					}
					{...highlightRest}
				/>
			</div>
		);
	}

	return (
		<>
			<form
				className="mt-6 flex flex-col gap-4 mx-auto w-full"
				onSubmit={handleSubmit(onSubmit)}
			>
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
						placeholder={getPlaceHolderText("title", "Title")}
						className={getClassName("title")}
					/>
				</div>
				<div>
					<label className="font-bold px-2" htmlFor="copy">
						Copy
					</label>
					<textarea
						ref={(e) => {
							landingCopy(e);
							copyTextArea.current = e;
						}}
						placeholder={getPlaceHolderText("copy", "Copy")}
						className={getClassName("copy")}
						{...landingCopyRest}
					/>
				</div>
				<div>
					<div className="font-bold px-2 mb-2">Tech Parallax</div>
					<ParallaxSection
						shift
						imageUrl={getLongImageUrl(techParallaxImage)}
					>
						<div className="flex justify-center items-center h-full px-4 lg:px-10">
							<div>
								<label className="font-bold" htmlFor="title">
									Tech{" "}
									<span className="text-sm font-light">
										(Click to remove)
									</span>
								</label>
								<div className="flex flex-wrap gap-2 my-4">
									{fields.map((field, index) => {
										return (
											<Chip
												onClick={() => {
													remove(index);
												}}
												classNames={{
													base: "bg-green-500 cursor-pointer text-white",
												}}
												key={field.id}
											>
												{field.name}
											</Chip>
										);
									})}
								</div>
							</div>
						</div>
					</ParallaxSection>
				</div>
				<div className="flex flex-col lg:flex-row w-full justify-between gap-4 lg:gap-10">
					<div className="flex w-full items-center">
						<Button
							onPress={() => {
								setImageTarget("techParallaxImage");
								onOpenChange();
							}}
							className="w-full bg-green-500 text-white text-md font-bold"
							type="button"
						>
							Change Image
						</Button>
					</div>
					<div className="flex w-full items-center gap-4">
						<input
							type="text"
							placeholder="Add Tech..."
							value={newTech}
							onChange={(e) => setNewTech(e.target.value)}
						/>
						<Button
							onPress={() => {
								if (newTech) {
									append({
										name: newTech,
										landingId: "landing",
										order: 0,
									});
									setNewTech("");
								}
							}}
							className="bg-green-500 text-white"
						>
							<i className="fa-solid fa-plus" />
						</Button>
					</div>
				</div>
				<div>
					<div className="font-bold px-2">Triple Highlight</div>
					<div className="flex flex-col lg:flex-row gap-4">
						<HighlighInput
							image={firstHighlightImage}
							imageTarget="firstHighlightImage"
							headerTarget="firstHighlightHeader"
							copyTarget="firstHighlightText"
						/>

						<HighlighInput
							image={secondHighlightImage}
							imageTarget="secondHighlightImage"
							headerTarget="secondHighlightHeader"
							copyTarget="secondHighlightText"
						/>
						<HighlighInput
							image={thirdHighlightImage}
							imageTarget="thirdHighlightImage"
							headerTarget="thirdHighlightHeader"
							copyTarget="thirdHighlightText"
						/>
					</div>
				</div>
				<div>
					<div className="font-bold px-2 mb-2">About Parallax</div>

					<ParallaxSection
						shift={false}
						imageUrl={getLongImageUrl(aboutParallaxImage)}
					>
						<div className="flex justify-center items-center h-full w-full px-4 lg:px-10">
							<Button
								onPress={() => {
									setImageTarget("aboutParallaxImage");
									onOpenChange();
								}}
								className="bg-green-500 text-white text-md font-bold"
							>
								Change Image
							</Button>
						</div>
					</ParallaxSection>
				</div>
				<div>
					<label htmlFor="shortAbout" className="font-bold px-2">
						Short About
					</label>
					<textarea
						id="shortAbout"
						ref={(e) => {
							shortAbout(e);
							shortAboutTextArea.current = e;
						}}
						placeholder={getPlaceHolderText(
							"shortAbout",
							"Short About"
						)}
						className={getClassName("shortAbout")}
						{...shortAboutRest}
					/>
				</div>
				<div className="flex justify-end gap-6">
					<Button
						color="warning"
						variant="light"
						type="button"
						className="text-md"
						onPress={() => {
							if (landingContent) {
								reset(landingContent);
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
				setValue={setValue as UseFormSetValue<LandingContentForm>}
			/>
		</>
	);
}
