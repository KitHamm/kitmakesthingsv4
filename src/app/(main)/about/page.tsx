import prisma from "@/lib/prisma";
import Markdown from "react-markdown";
import Image from "next/image";
import HomeButtons from "@/components/HomeButtons";

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
                                    <>
                                        <div className="relative">
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    aboutContent.image1Url
                                                }
                                                height={500}
                                                width={500}
                                                alt="Kit Hamm"
                                                className="w-full h-auto"
                                            />
                                            <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full hidden xl:flex justify-center">
                                                <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                                                    {aboutContent.title1}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    aboutContent.image2Url
                                                }
                                                height={500}
                                                width={500}
                                                alt="Kit Hamm"
                                                className="w-full h-auto"
                                            />
                                            <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full hidden xl:flex justify-center">
                                                <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                                                    {aboutContent.title2}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    aboutContent.image3Url
                                                }
                                                height={500}
                                                width={500}
                                                alt="Kit Hamm"
                                                className="w-full h-auto"
                                            />
                                            <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full hidden xl:flex justify-center">
                                                <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                                                    {aboutContent.title3}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    aboutContent.image4Url
                                                }
                                                height={500}
                                                width={500}
                                                alt="Kit Hamm"
                                                className="w-full h-auto"
                                            />
                                            <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full hidden xl:flex justify-center">
                                                <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                                                    {aboutContent.title4}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="my-auto">
                            <h1 className="my-4 xl:my-0 text-center font-bold text-6xl xl:text-8xl">
                                {aboutContent ? aboutContent.title : ""}
                            </h1>
                            <div className="flex flex-col xl:flex-row justify-center xl:gap-10">
                                <div className="font-bold text-center text-green-500 text-xl">
                                    {aboutContent ? aboutContent.text1 : ""}
                                </div>
                                <div className="font-bold text-center text-green-500 text-xl">
                                    {aboutContent ? aboutContent.text2 : ""}
                                </div>
                            </div>
                            <Markdown className="mt-10 mx-auto text-lg">
                                {aboutContent
                                    ? (aboutContent.Copy as string)
                                    : ""}
                            </Markdown>
                            <HomeButtons home={false} />
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
}
