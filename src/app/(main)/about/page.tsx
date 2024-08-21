import prisma from "@/lib/prisma";
import AboutContent from "@/components/AboutContent";
import { About } from "@prisma/client";

export default async function AboutPage() {
    const aboutContent = await prisma.about.findFirst();
    return (
        <main>
            <section className="absolute top-0 left-0 min-w-[100dvw]">
                <AboutContent aboutContent={aboutContent as About} />
            </section>
        </main>
    );
}
