import prisma from "@/lib/prisma";
import Image from "next/image";
import HomeButtons from "@/components/HomeButtons";
import ParallaxSection from "@/components/ParallaxSection";
import SectionButtons from "@/components/SectionButtons";
import TechStackSection from "@/components/TechStackSection";
import TrippleHeader from "@/components/TrippleHeader";
import Markdown from "react-markdown";

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
                    <header className="slide-in-right flex flex-col justify-evenly grow">
                        <div className="xl:my-auto">
                            <div className="xl:my-auto">
                                <h1 className="xl:text-8xl text-6xl font-bold">
                                    {landingContent?.title}
                                </h1>
                            </div>
                            <div className="mt-4 xl:mt-4 text-lg">
                                <Markdown>{landingContent?.copy}</Markdown>
                            </div>
                            <div className="mt-4 xl:mt-4 italic font-bold text-lg">
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
                            <HomeButtons home={true} />
                        </div>
                    </header>
                    <figure className="fade-in-slow flex order-first xl:order-last xl:mt-0 mt-10 h-2/3 xl:h-auto">
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
            <TechStackSection landingTech={landingTech} />
            <TrippleHeader landingContent={landingContent!} />
            <ParallaxSection
                shift={false}
                imageUrl="/climate-wall-parallax-2.png">
                <SectionButtons />
            </ParallaxSection>
        </main>
    );
}
