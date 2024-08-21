import { About } from "@prisma/client";
import Image from "next/image";
import Markdown from "react-markdown";

export default function AboutContent(props: { aboutContent: About }) {
    return (
        <article className="fade-in min-h-screen flex flex-col xl:w-[75dvw] w-[90dvw] mx-auto">
            <div className="grid grid-cols-2 xl:gap-20 min-h-screen">
                <div className="my-auto">
                    <div className="grid grid-cols-2 gap-0">
                        <div className="relative">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                                    props.aboutContent.image1Url
                                }
                                height={500}
                                width={500}
                                alt="Kit Hamm"
                            />
                            <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full flex justify-center">
                                <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                                    {props.aboutContent.title1}
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                                    props.aboutContent.image2Url
                                }
                                height={500}
                                width={500}
                                alt="Kit Hamm"
                            />
                            <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full flex justify-center">
                                <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                                    {props.aboutContent.title2}
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                                    props.aboutContent.image3Url
                                }
                                height={500}
                                width={500}
                                alt="Kit Hamm"
                            />
                            <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full flex justify-center">
                                <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                                    {props.aboutContent.title3}
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
                                    props.aboutContent.image4Url
                                }
                                height={500}
                                width={500}
                                alt="Kit Hamm"
                            />
                            <div className="absolute opacity-0 hover:opacity-100 transition-all top-0 left-0 bg-green-400 backdrop-blur bg-opacity-50 w-full h-full flex justify-center">
                                <div className="pointer-events-none my-auto font-bold text-white text-4xl">
                                    {props.aboutContent.title4}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-auto">
                    <h1 className="text-center font-bold text-8xl">
                        {props.aboutContent.title}
                    </h1>
                    <div className="flex justify-center gap-10">
                        <div className="font-bold text-green-500 text-xl">
                            {props.aboutContent.text1}
                        </div>
                        <div className="font-bold text-green-500 text-xl">
                            {props.aboutContent.text2}
                        </div>
                    </div>
                    <Markdown className="mt-10 mx-auto">
                        {props.aboutContent.Copy as string}
                    </Markdown>
                </div>
            </div>
        </article>
    );
}
