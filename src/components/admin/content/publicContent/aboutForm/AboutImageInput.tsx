"use client";
// context
import { useAboutFormContext } from "./AboutFormProvider";
// packages
import { useDisclosure } from "@nextui-org/react";
// components
import ContentImageModal from "@/components/admin/shared/ContentImageModal";
// types
import { AboutContentForm } from "@/lib/types";
import Image from "next/image";

const AboutImageInput = ({
	target,
}: Readonly<{ target: keyof AboutContentForm }>) => {
	const { watch, images, setValue } = useAboutFormContext();
	const { isOpen, onOpenChange } = useDisclosure();
	const imageUrl = watch(target);

	const getImageUrl = () => {
		if (imageUrl && typeof imageUrl === "string") {
			return process.env.NEXT_PUBLIC_BASE_IMAGE_URL + imageUrl;
		}
		return "https://placehold.co/500x500.png";
	};

	return (
		<div className="relative mx-auto">
			<Image
				src={getImageUrl()}
				height={500}
				width={500}
				alt="About 1 Image"
				className="w-full h-auto"
			/>
			<button
				onClick={onOpenChange}
				className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center"
			>
				<div className="my-auto font-bold text-white text-4xl">
					Change
				</div>
			</button>
			<ContentImageModal
				images={images}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				aboutTarget={target}
				setValueAbout={setValue}
			/>
		</div>
	);
};

export default AboutImageInput;
