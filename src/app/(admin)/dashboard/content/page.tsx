import prisma from "@/lib/prisma";
import LandingForm from "@/components/admin/content/publicContent/LandingForm";
import AboutForm from "@/components/admin/content/publicContent/AboutForm";

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
			<div className="font-bold text-6xl mx-4 lg:mx-0 mb-6 pb-4 text-center lg:text-start border-b-2">
				Content.
			</div>
			<div className="flex flex-col lg:flex-row fade-in gap-10 lg:gap-0">
				<div className="h-fit lg:basis-1/2 bg-neutral-100 mx-4 p-4 rounded-lg">
					<div className="font-bold text-4xl border-b-2 pb-2">
						Landing
					</div>
					<LandingForm
						landingContent={landingContent}
						images={images}
					/>
				</div>
				<div className="h-fit basis-1/2 bg-neutral-100 mx-4 p-4 rounded-lg">
					<div className="font-bold text-4xl border-b-2 pb-2">
						About
					</div>
					<AboutForm aboutContent={aboutContent} images={images} />
				</div>
			</div>
		</div>
	);
}
