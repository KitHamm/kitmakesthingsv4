"use client";
// packages
import { Button, useDisclosure } from "@nextui-org/react";
// context
import { useLandingFormContext } from "./LandingFormProvider";
// components
import ParallaxSection from "@/components/main/landing/ParallaxSection";
import ContentImageModal from "@/components/admin/shared/ContentImageModal";
// types
import { LandingContentForm } from "@/lib/types";

const LandingParallaxImageInput = ({
	target,
	label,
}: Readonly<{ target: keyof LandingContentForm; label: string }>) => {
	const { watch, images, setValue } = useLandingFormContext();
	const parallaxImage = watch(target);
	const { isOpen, onOpenChange } = useDisclosure();

	const getImageUrl = () => {
		if (parallaxImage && typeof parallaxImage === "string") {
			return process.env.NEXT_PUBLIC_BASE_IMAGE_URL + parallaxImage;
		}
		return "https://placehold.co/1000x500.png";
	};

	return (
		<div>
			<div className="font-bold px-2 mb-2">{label}</div>
			<ParallaxSection shift imageUrl={getImageUrl()}>
				<div className="flex w-full justify-center items-center">
					<Button
						onPress={onOpenChange}
						className="bg-green-400 text-md text-white"
					>
						Change Parallax Image
					</Button>
				</div>
			</ParallaxSection>
			<ContentImageModal
				images={images}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				landingTarget={target}
				setValueLanding={setValue}
			/>
		</div>
	);
};

export default LandingParallaxImageInput;
