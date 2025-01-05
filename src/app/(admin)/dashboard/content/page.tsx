import prisma from "@/lib/prisma";
import ContentMain from "@/components/admin/content/ContentMain";
import { About } from "@prisma/client";
import { LandingWithTech } from "@/lib/types";

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
		<div className="lg:py-10 lg:px-10 py-4">
			<ContentMain
				landingContent={landingContent as LandingWithTech}
				aboutContent={aboutContent as About}
				images={images}
			/>
		</div>
	);
}
