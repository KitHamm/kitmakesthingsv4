import prisma from "@/lib/prisma";
import ContentMain from "@/components/admin/content/ContentMain";
import { About, Landing, Tech } from "@prisma/client";

export interface ExtendedLanding extends Landing {
    tech: Tech[];
}

export default async function Content() {
    const landingContent = await prisma.landing.findFirst({
        include: {
            tech: {
                orderBy: {
                    order: "asc",
                },
            },
        },
    });
    const aboutContent = await prisma.about.findFirst();
    const images = await prisma.images.findMany();

    return (
        <div className="xl:py-10 xl:px-10 py-4">
            <ContentMain
                landingContent={landingContent as ExtendedLanding}
                aboutContent={aboutContent as About}
                images={images}
            />
        </div>
    );
}
