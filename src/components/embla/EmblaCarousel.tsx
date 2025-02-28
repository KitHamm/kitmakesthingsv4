"use client";

import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
	Modal,
	ModalContent,
	ModalBody,
	useDisclosure,
} from "@nextui-org/react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import LightBoxEmblaCarousel from "../lightBoxEmbla/LightboxEmblaCarousel";

type PropType = {
	slides: string[];
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
	const { isOpen, onOpenChange } = useDisclosure();
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop;

		resetOrStop();
	}, []);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
		emblaApi,
		onNavButtonClick
	);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi, onNavButtonClick);

	return (
		<section className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{slides.map((slide: string) => (
						<div className="embla__slide" key={slide}>
							<Image
								onClick={() => {
									onOpenChange();
								}}
								src={
									process.env.NEXT_PUBLIC_BASE_IMAGE_URL! +
									slide
								}
								height={1200}
								width={1200}
								className="hidden lg:block cursor-pointer m-auto w-auto h-auto max-h-[66dvh]"
								alt={slide}
							/>
							<Image
								src={
									process.env.NEXT_PUBLIC_BASE_IMAGE_URL! +
									slide
								}
								height={1200}
								width={1200}
								className="lg:hidden cursor-pointer m-auto w-auto h-auto max-h-[66dvh]"
								alt={slide}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="embla__controls">
				<div className="embla__buttons">
					<PrevButton
						onClick={onPrevButtonClick}
						disabled={prevBtnDisabled}
					/>
					<NextButton
						onClick={onNextButtonClick}
						disabled={nextBtnDisabled}
					/>
				</div>

				<div className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={"dot-button-" + index}
							onClick={() => onDotButtonClick(index)}
							className={"embla__dot".concat(
								index === selectedIndex
									? " embla__dot--selected"
									: ""
							)}
						/>
					))}
				</div>
			</div>
			<Modal
				backdrop="blur"
				size="5xl"
				classNames={{ base: "lg:max-w-[75dvw]" }}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<ModalBody className="p-10">
							<LightBoxEmblaCarousel slides={slides} />
						</ModalBody>
					)}
				</ModalContent>
			</Modal>
		</section>
	);
};

export default EmblaCarousel;
