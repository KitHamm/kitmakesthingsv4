import prisma from "@/lib/prisma";
import Markdown from "react-markdown";
import ContactButton from "@/components/main/ContactButton";
import AboutBoxes from "@/components/main/AboutBoxes";
import AnonVisitLogger from "@/components/main/AnonVisitLogger";
import Link from "next/link";

export default async function AboutPage() {
    const aboutContent = await prisma.about.findFirst();
    return (
        <main className="h-full grow flex justify-center">
            <section className="my-auto">
                <article className="fade-in flex flex-col xl:w-[75dvw] w-[90dvw] m-auto">
                    <div className="xl:grid xl:grid-cols-2 xl:gap-20">
                        <div className="my-auto">
                            <div className="mt-20 xl:mt-0 grid grid-cols-2 gap-0">
                                {aboutContent && (
                                    <AboutBoxes aboutContent={aboutContent} />
                                )}
                            </div>
                        </div>
                        <div className="my-auto">
                            <h1 className="fade-in-slow my-4 xl:my-0 text-center font-bold text-6xl xl:text-8xl">
                                {aboutContent?.title}
                            </h1>
                            <div className="flex flex-col xl:flex-row justify-center xl:gap-10">
                                <div className="slide-in-right font-bold text-center text-green-500 text-xl">
                                    {aboutContent?.text1}
                                </div>
                                <div className="slide-in-left font-bold text-center text-green-500 text-xl">
                                    {aboutContent?.text2}
                                </div>
                            </div>
                            <Markdown className="fade-in-slow mt-10 mx-auto text-lg">
                                {aboutContent?.copy}
                            </Markdown>
                            <div className="flex flex-col xl:flex-row justify-between my-6 gap-10">
                                <Link
                                    className={`${"slide-in-right"} transition-all xl:w-1/2 py-4 text-2xl text-center font-medium bg-white bg-opacity-25 backdrop-blur-sm border-2 border-black hover:bg-green-400 hover:border-white hover:text-white`}
                                    href={"/projects"}>
                                    <i className="fa-solid fa-diagram-project"></i>{" "}
                                    View Projects
                                </Link>
                                <ContactButton home={false} />
                            </div>
                            <AnonVisitLogger />
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
}
