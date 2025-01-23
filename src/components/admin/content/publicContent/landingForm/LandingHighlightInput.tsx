"use client";
// packages
import Image from "next/image";
import { Button, useDisclosure } from "@nextui-org/react";
import { useEffect, useRef } from "react";
// context
import { useLandingFormContext } from "./LandingFormProvider";
// types
import { LandingContentForm } from "@/lib/types";
import ContentImageModal from "@/components/admin/shared/ContentImageModal";
import { resizeTextArea } from "@/lib/utils/miscUtils/resizeTextArea";

const LandingHighlightInput = ({
	imageTarget,
	headerTarget,
	copyTarget,
}: Readonly<{
	imageTarget: keyof LandingContentForm;
	headerTarget: keyof LandingContentForm;
	copyTarget: keyof LandingContentForm;
}>) => {
	const { watch, register, setValue, errors, images } =
		useLandingFormContext();
	const imageUrl = watch(imageTarget);
	const highlightText = watch(copyTarget);
	const { isOpen, onOpenChange } = useDisclosure();

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const { ref: landingTextarea, ...landingTextareaRest } = register(
		copyTarget,
		{
			required: { value: true, message: `Copy is required.` },
		}
	);

	useEffect(() => {
		if (textareaRef.current) {
			resizeTextArea(textareaRef.current);
		}
	}, [highlightText]);

	const getImageUrl = () => {
		if (imageUrl && typeof imageUrl === "string") {
			return process.env.NEXT_PUBLIC_BASE_IMAGE_URL + imageUrl;
		}
		return "https://placehold.co/500x500.png";
	};

	return (
		<div className="flex flex-col gap-4 p-4">
			<Image
				src={getImageUrl()}
				alt="First"
				height={200}
				width={200}
				className="object-cover h-auto w-auto rounded-full"
			/>
			<Button
				onPress={() => {
					onOpenChange();
				}}
				className="w-full bg-green-500 text-white text-md"
				type="button"
			>
				Change Image
			</Button>
			<input
				type="text"
				placeholder={
					errors[headerTarget]
						? errors[headerTarget].message
						: "First Header"
				}
				className={
					errors[headerTarget]
						? "!border-red-400 placeholder:text-red-400"
						: ""
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
					landingTextarea(e);
					textareaRef.current = e;
				}}
				placeholder={
					errors[copyTarget]
						? errors[copyTarget].message
						: "Copy Text"
				}
				className={
					errors[copyTarget]
						? "!border-red-400 placeholder:text-red-400"
						: "overflow-hidden"
				}
				{...landingTextareaRest}
			/>
			<ContentImageModal
				images={images}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				landingTarget={imageTarget}
				setValueLanding={setValue}
			/>
		</div>
	);
};

export default LandingHighlightInput;
