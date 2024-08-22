import prisma from "@/lib/prisma";
import AboutContent from "@/components/AboutContent";
import { About } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/authOptions";

export default async function AboutPage() {
    const session = await getServerSession(authOptions);
    const aboutContent = await prisma.about.findFirst();
    return (
        <main>
            <section className="xl:absolute top-0 left-0 min-w-[100dvw]">
                <AboutContent
                    session={session as Session}
                    aboutContent={aboutContent as About}
                />
            </section>
        </main>
    );
}
