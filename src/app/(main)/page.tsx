import prisma from "@/lib/prisma";
import Image from "next/image";
import HomeButtons from "@/components/HomeButtons";
import TechStackSection from "@/components/TechStackSection";
import TrippleHeader from "@/components/TrippleHeader";
import Markdown from "react-markdown";
import AboutMeSection from "@/components/AboutMeSection";
import LandingContact from "@/components/LandingContact";
import VisitsTracker from "@/components/AnonVisitLogger";

export default async function Home() {
    const landingContent = await prisma.landing.findFirst();
    return (
        <main className="w-full bg-neutral-300  min-h-screen flex flex-col">
            <section id="hero" className="fade-in grow h-screen flex relative">
                <div className="xl:w-[75dvw] w-[90dvw] flex flex-col xl:grid xl:grid-cols-2 gap-10 xl:gap-20 mx-auto z-10">
                    <header className="slide-in-right flex flex-col justify-evenly grow">
                        <div className="xl:my-auto">
                            <div className="xl:my-auto">
                                <h1 className="xl:text-8xl text-white xl:text-black drop-shadow-3xl xl:drop-shadow-none rounded-xl py-8 text-center xl:text-start text-6xl font-bold">
                                    {landingContent?.title}
                                </h1>
                            </div>
                            <div className="hidden xl:block xl:my-4 my-8 w-full text-center xl:text-left">
                                <a
                                    target="_blank"
                                    href={"Kit_Hamm_Developer_CV.pdf"}
                                    className="transition-all px-10 py-2 text-xl text-center font-medium bg-white bg-opacity-25 backdrop-blur-sm border-2 border-black hover:bg-green-400 hover:border-white hover:text-white">
                                    <i className="mr-2 fa-solid fa-file" />
                                    CV
                                </a>
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

                            <HomeButtons home={true} />
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
            <TechStackSection />
            <TrippleHeader landingContent={landingContent!} />
            <AboutMeSection short={landingContent!.shortAbout} />
            <LandingContact />
            <VisitsTracker />
        </main>
    );
}
