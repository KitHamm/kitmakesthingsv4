import { Tech } from "@prisma/client";
import prisma from "@/lib/prisma";
import Image from "next/image";
import HomeButtons from "@/components/HomeButtons";
import ParallaxSection from "@/components/actions/ParallaxSection";
import SectionButtons from "@/components/SectionButtons";

export default async function Home() {
    const landingContent = await prisma.landing.findFirst();
    const landingTech = await prisma.tech.findMany({
        orderBy: {
            order: "asc",
        },
    });
    return (
        <main className="w-full flex flex-col">
            <section id="hero" className="fade-in xl:my-20">
                <div className="xl:w-[75dvw] w-[90dvw] flex flex-col xl:grid xl:grid-cols-2 gap-10 xl:gap-20 mx-auto">
                    <header className="flex flex-col justify-evenly grow">
                        <div className="xl:my-auto">
                            <div className="xl:my-auto">
                                <h1 className="xl:text-8xl text-6xl font-bold">
                                    {landingContent ? landingContent.title : ""}
                                </h1>
                            </div>
                            <div className="mt-4 xl:mt-4 text-lg">
                                {landingContent ? landingContent.Copy : ""}
                            </div>
                            <HomeButtons home={true} />
                        </div>
                    </header>
                    <figure className="flex order-first xl:order-last xl:mt-0 mt-10 h-2/3 xl:h-auto">
                        {landingContent && (
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                                    landingContent.imageUrl
                                }
                                height={1200}
                                width={1200}
                                className="xl:my-auto w-auto mx-auto xl:h-auto"
                                alt={landingContent.imageUrl}
                            />
                        )}
                    </figure>
                </div>
            </section>
            <ParallaxSection shift={true} imageUrl="/me-code-paralax.png">
                <div className="xl:w-[75dvw] mx-auto flex gap-10 h-full">
                    <div className="xl:basis-1/2 flex h-full xl:h-auto my-auto xl:p-10 p-4 bg-black xl:bg-opacity-50 bg-opacity-25 xl:rounded-2xl overflow-hidden xl:backdrop-blur backdrop-blur-sm">
                        <div className="my-auto">
                            <div className="xl:text-6xl text-5xl text-center xl:text-left drop-shadow-2xl text-white font-bold">
                                Tech Stack.
                            </div>
                            <div className="flex flex-wrap justify-evenly xl:justify-normal xl:mt-4 mt-6 gap-4">
                                {landingTech.map((tech: Tech) => {
                                    return (
                                        <Highlight
                                            key={tech.name}
                                            text={tech.name}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxSection>
            <section
                id="tripple-threat"
                className="flex fade-in justify-center">
                <div className="text-center w-[75dvw] grid grid-cols-1 xl:grid-cols-3 gap-20 py-20">
                    <div className="flex flex-col gap-8">
                        <div className="xl:text-8xl text-6xl text-center text-green-500">
                            <i
                                style={{ lineHeight: 1 }}
                                className={`${landingContent?.firstHighlightIcon} fa-2xl`}
                            />
                        </div>
                        <div className="text-6xl font-bold">
                            {landingContent?.firstHighlightHeader}
                        </div>
                        <p className="xl:text-xl text-lg">
                            {landingContent?.firstHighlightText}
                        </p>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="xl:text-8xl text-6xl text-green-500">
                            <i
                                style={{ lineHeight: 1 }}
                                className={`${landingContent?.secondHighlightIcon} fa-2xl`}
                            />
                        </div>
                        <div className="text-6xl font-bold">
                            {landingContent?.secondHighlightHeader}
                        </div>
                        <p className="xl:text-xl text-lg">
                            {landingContent?.secondHighlightText}
                        </p>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="xl:text-8xl text-6xl text-green-500">
                            <i
                                style={{ lineHeight: 1 }}
                                className={`${landingContent?.thirdHighlightIcon} fa-2xl`}
                            />
                        </div>
                        <div className="text-6xl font-bold">
                            {landingContent?.thirdHighlightHeader}
                        </div>
                        <p className="xl:text-xl text-lg">
                            {landingContent?.thirdHighlightText}
                        </p>
                    </div>
                </div>
            </section>
            <ParallaxSection
                shift={false}
                imageUrl="/climate-wall-parallax-2.png">
                <SectionButtons />
            </ParallaxSection>
        </main>
    );
}

function Highlight(props: { text: string }) {
    return (
        <div className="bg-green-500 shadow-lg rounded-2xl p-2 px-4 font-medium text-xl xl:text-2xl text-white">
            {props.text}
        </div>
    );
}
