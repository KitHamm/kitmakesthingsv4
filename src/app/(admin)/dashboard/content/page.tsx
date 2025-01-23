import prisma from "@/lib/prisma";
import LandingFormProvider from "@/components/admin/content/publicContent/landingForm/LandingFormProvider";
import AboutForm from "@/components/admin/content/publicContent/aboutForm/AboutForm";
import LandingFormTextInput from "@/components/admin/content/publicContent/landingForm/LandingFormTextInput";
import LandingFormTextareaInput from "@/components/admin/content/publicContent/landingForm/LandingFormTextareaInput";
import LandingParallaxImageInput from "@/components/admin/content/publicContent/landingForm/LandingParallaxImageInput";
import LandingStackInput from "@/components/admin/content/publicContent/landingForm/LandingStackInput";
import LandingHighlightInput from "@/components/admin/content/publicContent/landingForm/LandingHighlightInput";
import { LandingContentForm } from "@/lib/types";
import LandingFormButtons from "@/components/admin/content/publicContent/landingForm/LandingFormButtons";

const highlightKeys: {
	imageTarget: keyof LandingContentForm;
	headerTarget: keyof LandingContentForm;
	copyTarget: keyof LandingContentForm;
}[] = [
	{
		imageTarget: "firstHighlightImage",
		headerTarget: "firstHighlightHeader",
		copyTarget: "firstHighlightText",
	},
	{
		imageTarget: "secondHighlightImage",
		headerTarget: "secondHighlightHeader",
		copyTarget: "secondHighlightText",
	},
	{
		imageTarget: "thirdHighlightImage",
		headerTarget: "thirdHighlightHeader",
		copyTarget: "thirdHighlightText",
	},
];

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
				<div className="h-auto lg:basis-1/2 bg-neutral-100 mx-4 p-4 rounded-lg">
					<div className="font-bold text-4xl border-b-2 pb-2">
						Landing
					</div>
					<LandingFormProvider
						landingContent={landingContent}
						images={images}
					>
						<LandingFormTextInput
							target="title"
							label="Title"
							required
						/>
						<LandingFormTextareaInput
							target="copy"
							label="Copy"
							required
						/>
						<LandingParallaxImageInput
							target="techParallaxImage"
							label="Tech Parallax"
						/>
						<LandingStackInput label="Tech Stack" />
						<div>
							<div className="font-bold px-2">
								Triple Highlight
							</div>
							<div className="h-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
								{highlightKeys.map((highlight) => (
									<LandingHighlightInput
										key={highlight.headerTarget}
										imageTarget={highlight.imageTarget}
										headerTarget={highlight.headerTarget}
										copyTarget={highlight.copyTarget}
									/>
								))}
							</div>
						</div>
						<LandingParallaxImageInput
							target="aboutParallaxImage"
							label="About Parallax"
						/>
						<LandingFormTextareaInput
							target="shortAbout"
							label="Short About"
							required
						/>
						<LandingFormButtons />
					</LandingFormProvider>
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
