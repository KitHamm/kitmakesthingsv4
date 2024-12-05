// Prisma
import prisma from "@/lib/prisma";
// COmponents
import ParallaxSection from "@/components/main/ParallaxSection";
import InViewAnimation from "@/components/main/inViewAnimation";
import TechStackIcons from "@/components/main/TechStackIcons";
import LandingContact from "@/components/main/LandingContact";
import HighlightCard from "@/components/main/HighlightCard";
// Packages
import Image from "next/image";
import Markdown from "react-markdown";
// Functions
import VisitsTracker from "@/components/main/AnonVisitLogger";
import Link from "next/link";

export default async function Home() {
    const landingContent = await prisma.landing.findFirst();

    if (!landingContent) {
        return <div>404</div>;
    }

    return (
        <main className="w-full bg-neutral-300  min-h-screen flex flex-col">
            <section id="hero" className="fade-in grow h-screen flex relative">
                <div className="xl:w-[75dvw] w-[90dvw] flex flex-col xl:grid xl:grid-cols-2 gap-10 xl:gap-20 mx-auto z-10">
                    <header className="slide-in-right flex flex-col justify-evenly grow">
                        <div className="xl:my-auto">
                            <div className="xl:my-auto">
                                <h1 className="xl:text-8xl text-white xl:text-black drop-shadow-3xl xl:drop-shadow-none rounded-xl py-8 text-center xl:text-start text-6xl font-bold">
                                    {landingContent.title}
                                </h1>
                            </div>
                            <div className="hidden xl:block xl:my-4 my-8 w-full text-center xl:text-left">
                                <Link
                                    target="_blank"
                                    href={"Kit_Hamm_Developer_CV.pdf"}
                                    className="transition-all px-10 py-2 text-xl text-center font-medium bg-white bg-opacity-25 backdrop-blur-sm border-2 border-black hover:bg-green-400 hover:border-white hover:text-white">
                                    <i className="mr-2 fa-solid fa-file" />
                                    CV
                                </Link>
                            </div>
                            <div className="hidden xl:block mt-4 xl:mt-4 text-lg">
                                <Markdown>{landingContent?.copy}</Markdown>
                            </div>
                            <div className="hidden xl:block mt-4 xl:mt-4 italic font-bold text-lg">
                                You can view the{" "}
                                <span className="text-green-500 ">
                                    <a
                                        target="_blank"
                                        href="https://github.com/KitHamm/kitmakesthingsv4">
                                        source code
                                    </a>
                                </span>{" "}
                                for this site via the button below.
                            </div>
                            <div className="flex flex-col xl:flex-row justify-between my-6 gap-10">
                                <Link
                                    className="transition-all xl:w-1/2 py-4 text-2xl text-center font-medium bg-white bg-opacity-25 backdrop-blur-sm border-2 border-black hover:bg-green-400 hover:border-white hover:text-white"
                                    href={"/projects"}>
                                    <i className="fa-solid fa-diagram-project"></i>{" "}
                                    View Projects
                                </Link>
                                <Link
                                    target="_blank"
                                    className="transition-all xl:w-1/2 py-4 text-2xl text-center font-medium bg-white bg-opacity-25 backdrop-blur-sm border-2 border-black hover:bg-green-400 hover:border-white hover:text-white"
                                    href={
                                        "https://github.com/KitHamm/kitmakesthingsv4"
                                    }>
                                    {"<SourceCode />"}
                                </Link>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="absolute flex h-full w-full justify-end items-center overflow-hidden">
                    <Image
                        className="h-full translate-x-1/4 xl:-translate-x-0 max-w-none w-auto xl:w-full xl:object-cover"
                        src={"/render4k.webp"}
                        width={3840}
                        height={2160}
                        alt="this"
                        unoptimized
                        quality={100}
                    />
                </div>
            </section>
            <ParallaxSection shift imageUrl="/me-code-parallax.png">
                <div className="xl:w-[95dvw] mx-auto flex gap-10 justify-center h-full">
                    <InViewAnimation animation={0}>
                        <div className="my-auto">
                            <div className="xl:text-6xl text-4xl text-center drop-shadow-2xl text-white font-bold">
                                Tech Stack.
                            </div>
                        </div>
                        <TechStackIcons />
                    </InViewAnimation>
                </div>
            </ParallaxSection>
            <section
                id="tripple-threat"
                className="flex fade-in justify-center">
                <div className="text-center w-[90dvw] xl:w-[75dvw] grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-20 py-10 xl:py-20">
                    <HighlightCard
                        header={landingContent.firstHighlightHeader}
                        text={landingContent.firstHighlightText}
                        avatar="ai.jpeg"
                        index={0}
                    />
                    <HighlightCard
                        header={landingContent.secondHighlightHeader}
                        text={landingContent.secondHighlightText}
                        avatar="ai3.jpeg"
                        index={1}
                    />
                    <HighlightCard
                        header={landingContent.thirdHighlightHeader}
                        text={landingContent.thirdHighlightText}
                        avatar="ai4.jpeg"
                        index={2}
                    />
                </div>
            </section>
            <ParallaxSection shift={false} imageUrl="/drums-parallax-3.png">
                <div className="xl:w-[75dvw] mx-auto flex gap-10 h-full">
                    <div className="xl:basis-1/2 xl:ms-auto flex">
                        <InViewAnimation animation={2}>
                            <div className="my-auto flex flex-col gap-2">
                                <div className="xl:text-6xl text-3xl text-center xl:text-left drop-shadow-2xl text-white font-bold">
                                    A little about me.
                                </div>
                                <Markdown
                                    className={
                                        "text-white text-base xl:text-lg"
                                    }>
                                    {landingContent.shortAbout}
                                </Markdown>
                                <Link
                                    className="transition-all xl:w-1/2 py-2 text-base xl:text-lg text-white text-center font-medium bg-black border-2 border-white hover:bg-green-400 "
                                    href={"/about"}>
                                    Learn More
                                </Link>
                            </div>
                        </InViewAnimation>
                    </div>
                </div>
            </ParallaxSection>
            <LandingContact />
            <VisitsTracker />
        </main>
    );
}
