import { Landing, Tech } from "@prisma/client";
import HomeContent from "../../components/HomeContent";
import prisma from "@/lib/prisma";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const landingContent = await prisma.landing.findFirst();
    const landingTech = await prisma.tech.findMany({
        orderBy: {
            order: "asc",
        },
    });
    return (
        <main className="z-10">
            <section className="xl:absolute top-0 left-0 min-w-[100dvw]">
                <HomeContent
                    session={session as Session}
                    landingContent={landingContent as Landing}
                    landingTech={landingTech as Tech[]}
                />
            </section>
        </main>
    );
}
