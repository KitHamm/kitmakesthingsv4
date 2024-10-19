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
    slides: String[];
    options?: EmblaOptionsType;
};

const OPTIONS: EmblaOptionsType = { loop: true };

const LightBoxEmblaCarousel: React.FC<PropType> = (props) => {
    const { slides } = props;
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
                    {slides.map((slide: String, index: number) => (
                        <div className="lb-embla__slide" key={index}>
                            {/* <div className="lb-embla__slide__number">
                                {index + 1}
                            </div> */}
                            <Image
                                onLoad={(e) => {
                                    setLoaded(true);
                                    console.log("loaded");
                                }}
                                src={
                                    process.env.NEXT_PUBLIC_BASE_IMAGE_URL! +
                                    slide
                                }
                                height={2000}
                                width={2000}
                                className="cursor-pointer m-auto w-auto h-auto"
                                alt={slide as string}
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
