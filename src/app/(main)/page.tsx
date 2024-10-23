import prisma from "@/lib/prisma";
import Image from "next/image";
import HomeButtons from "@/components/HomeButtons";
import TechStackSection from "@/components/TechStackSection";
import TrippleHeader from "@/components/TrippleHeader";
import Markdown from "react-markdown";
import AboutMeSection from "@/components/AboutMeSection";
import LandingContact from "@/components/LandingContact";

export default async function Home() {
    const landingContent = await prisma.landing.findFirst();
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
                            <div className="xl:my-4 my-8 w-full text-center xl:text-left">
                                <a
                                    target="_blank"
                                    href={"Kit_Hamm_Developer_CV.pdf"}
                                    className="transition-all px-10 py-2 text-xl text-center font-medium bg-white border-2 border-black hover:bg-green-400 hover:border-white hover:text-white">
                                    <i className="mr-2 fa-solid fa-file" />
                                    CV
                                </a>
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
            <TechStackSection />
            <TrippleHeader landingContent={landingContent!} />
            <AboutMeSection short={landingContent!.shortAbout} />
            <LandingContact />
        </main>
    );
}
