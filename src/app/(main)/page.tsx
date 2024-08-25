import { Tech } from "@prisma/client";
import prisma from "@/lib/prisma";
import Image from "next/image";
import HomeButtons from "@/components/HomeButtons";

export default async function Home() {
    const landingContent = await prisma.landing.findFirst();
    const landingTech = await prisma.tech.findMany({
        orderBy: {
            order: "asc",
        },
    });
    return (
        <main className="z-10">
            <section className="xl:absolute top-0 left-0 min-w-[100dvw]">
                <article className="fade-in mb-8 xl:mb-0 min-h-screen xl:w-[75dvw] w-[90dvw] flex flex-col xl:grid xl:grid-cols-2 xl:gap-20 mx-auto">
                    <header className="flex flex-col justify-evenly grow">
                        <div className="xl:my-auto">
                            <div className="xl:my-auto">
                                <h1 className="xl:text-8xl text-4xl font-bold text-center">
                                    {landingContent ? landingContent.title : ""}
                                </h1>
                                <div className="xl:mt-6 mt-4 grid grid-cols-2 xl:grid-cols-4 text-center justify-evenly xl:gap-2">
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
                            <div className="mt-4 xl:mt-6 font-bold text-center">
                                {landingContent ? landingContent.Copy : ""}
                            </div>
                            <HomeButtons />
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
                </article>
            </section>
        </main>
    );
}

function Highlight(props: { text: string }) {
    return (
        <div className="font-bold text-xl xl:text-2xl text-green-500">
            {props.text}
        </div>
    );
}
