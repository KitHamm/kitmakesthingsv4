import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
    PrevButton,
    NextButton,
    usePrevNextButtons,
} from "./LightboxEmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropType = {
    slides: String[];
    options?: EmblaOptionsType;
};

const OPTIONS: EmblaOptionsType = { loop: true };

const LightBoxEmblaCarousel: React.FC<PropType> = (props) => {
    const { slides } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

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
                    {slides.map((slide: String, index: number) => (
                        <div className="lb-embla__slide" key={index}>
                            {/* <div className="lb-embla__slide__number">
                                {index + 1}
                            </div> */}
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_BASE_IMAGE_URL! +
                                    slide
                                }
                                height={2000}
                                width={2000}
                                className="cursor-pointer m-auto w-auto h-auto"
                                alt={slide as string}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
            />

            {/* <div className="lb-embla__controls">
                <div className="lb-embla__buttons">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div> */}
        </section>
    );
};

export default LightBoxEmblaCarousel;
