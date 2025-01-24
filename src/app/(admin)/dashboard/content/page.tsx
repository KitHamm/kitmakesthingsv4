// prisma
import prisma from "@/lib/prisma";
// components
import LandingFormProvider from "@/components/admin/content/publicContent/landingForm/LandingFormProvider";
import AboutFormProvider from "@/components/admin/content/publicContent/aboutForm/AboutFormProvider";
import LandingFormTextInput from "@/components/admin/content/publicContent/landingForm/LandingFormTextInput";
import LandingFormTextareaInput from "@/components/admin/content/publicContent/landingForm/LandingFormTextareaInput";
import LandingParallaxImageInput from "@/components/admin/content/publicContent/landingForm/LandingParallaxImageInput";
import LandingStackInput from "@/components/admin/content/publicContent/landingForm/LandingStackInput";
import LandingHighlightInput from "@/components/admin/content/publicContent/landingForm/LandingHighlightInput";
import LandingFormButtons from "@/components/admin/content/publicContent/landingForm/LandingFormButtons";
import AboutImageInput from "@/components/admin/content/publicContent/aboutForm/AboutImageInput";
import AboutImageTitleInput from "@/components/admin/content/publicContent/aboutForm/AboutImageTitleInput";
import AboutFormTextInput from "@/components/admin/content/publicContent/aboutForm/AboutFormTextInput";
import AboutFormTextareaInput from "@/components/admin/content/publicContent/aboutForm/AboutFormTextareaInput";
// types
import {
	AboutContentForm,
	LandingContentForm,
	LandingWithTech,
} from "@/lib/types";
import { About, Images } from "@prisma/client";
import AboutFormButtons from "@/components/admin/content/publicContent/aboutForm/AboutFormButtons";

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

const aboutImageKeys: { target: keyof AboutContentForm }[] = [
	{ target: "image1Url" },
	{ target: "image2Url" },
	{ target: "image3Url" },
	{ target: "image4Url" },
];

const aboutImageTitleKeys: { target: keyof AboutContentForm }[] = [
	{ target: "title1" },
	{ target: "title2" },
	{ target: "title3" },
	{ target: "title4" },
];

export default async function Content() {
	let landingContent: LandingWithTech | null = null;
	let aboutContent: About | null = null;
	let images: Images[] = [];

	try {
		landingContent = await prisma.landing.findFirst({
			include: {
				tech: {
					orderBy: {
						order: "asc",
					},
				},
			},
		});
		aboutContent = await prisma.about.findFirst();
		images = await prisma.images.findMany();
	} catch (error) {
		console.log(error);
	}

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
					<AboutFormProvider
						aboutContent={aboutContent}
						images={images}
					>
						<div className="grid grid-cols-2 gap-0 w-2/3 mx-auto">
							{aboutImageKeys.map((image) => (
								<AboutImageInput
									key={image.target}
									target={image.target}
								/>
							))}
						</div>
						<div>
							<label className="font-bold px-2" htmlFor="title1">
								Image Titles
							</label>
							<div className="grid grid-cols-2 gap-4">
								{aboutImageTitleKeys.map((title) => (
									<AboutImageTitleInput
										key={title.target}
										target={title.target}
									/>
								))}
							</div>
						</div>
						<AboutFormTextInput target="title" label="Title" />
						<div className="flex justify-between gap-8">
							<AboutFormTextInput
								classNames="w-1/2"
								target="text1"
								label="Text 1"
							/>
							<AboutFormTextInput
								classNames="w-1/2"
								target="text2"
								label="Text 2"
							/>
						</div>
						<AboutFormTextareaInput target="copy" label="Copy" />
						<AboutFormButtons />
					</AboutFormProvider>
				</div>
			</div>
		</div>
	);
}
