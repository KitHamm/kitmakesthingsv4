import React, { useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./LightboxEmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { CircularProgress } from "@nextui-org/react";

type PropType = {
	slides: string[];
};

const OPTIONS: EmblaOptionsType = { loop: true };

const LightBoxEmblaCarousel: React.FC<PropType> = ({ slides }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
	const [loaded, setLoaded] = useState(false);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	return (
		<section className="lb-embla">
			<PrevButton
				onClick={onPrevButtonClick}
				disabled={prevBtnDisabled}
			/>
			<div className="lb-embla__viewport" ref={emblaRef}>
				<div className="lb-embla__container">
					{slides.map((slide: string) => (
						<div className="lb-embla__slide" key={slide}>
							<Image
								onLoad={(e) => {
									setLoaded(true);
								}}
								src={
									process.env.NEXT_PUBLIC_BASE_IMAGE_URL! +
									slide
								}
								height={2000}
								width={2000}
								className="cursor-pointer m-auto w-auto h-auto max-h-[80dvh]"
								alt={slide}
							/>
							{!loaded && (
								<div className="absolute top-0 bottom-0 left-0 right-0 z-30 m-auto w-[20dvw] h-[20dvh]">
									<CircularProgress
										classNames={{
											base: "m-auto",
											svg: "w-36 h-36",
											indicator: "stroke-green-500",
										}}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<NextButton
				onClick={onNextButtonClick}
				disabled={nextBtnDisabled}
			/>
		</section>
	);
};

export default LightBoxEmblaCarousel;
