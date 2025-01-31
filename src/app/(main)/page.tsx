// Prisma
import prisma from "@/lib/prisma";
// Packages
import Markdown from "react-markdown";
import Link from "next/link";
// Components
import AnonVisitLogger from "@/components/main/shared/AnonVisitLogger";
import ParticlesComponent from "@/components/main/landing/Particles";
import ParallaxSection from "@/components/main/landing/ParallaxSection";
import InViewAnimation from "@/components/main/landing/inViewAnimation";
import TechStackIcons from "@/components/main/landing/TechStackIcons";
import LandingContact from "@/components/main/landing/LandingContact";
import HighlightCard from "@/components/main/landing/HighlightCard";
import DataError from "@/components/main/shared/DataError";
// types
import { Landing } from "@prisma/client";

export default async function Home() {
	let content: Landing | null = null;
	try {
		content = await prisma.landing.findFirst();
	} catch (error) {
		return <DataError />;
	}

	if (!content) {
		return <DataError />;
	}

	const getHighlighImageUrl = (image: string) => {
		if (!image) {
			return "https://placehold.co/500x500.png";
		}
		return process.env.NEXT_PUBLIC_BASE_IMAGE_URL + image;
	};

	const getParallaxImageUrl = (image: string) => {
		if (!image) {
			return "https://placehold.co/1000x500.png";
		}
		return process.env.NEXT_PUBLIC_BASE_IMAGE_URL + image;
	};

	return (
		<main className="w-full bg-neutral-300 min-h-screen flex flex-col">
			<section id="hero" className="fade-in grow h-screen flex relative">
				<div className="lg:w-[75dvw] xl:w-[60dvw] xxl:w-[50dvw] w-[90dvw] max-w-[1920px] flex flex-col gap-10 lg:gap-20 mx-auto z-10">
					<ParticlesComponent>
						<header className="slide-in-right flex flex-col justify-evenly w-fit my-auto">
							<div className="my-auto flex flex-col lg:gap-4 gap-20">
								<div className="pointer-events-none">
									<h2 className="lg:text-4xl text-charcoal-dark text-center lg:text-start text-2xl font-bold">
										KIT HAMM
									</h2>
									<h1 className="uppercase lg:text-8xl text-center lg:text-start text-5xl font-bold text-green-600">
										{content.title}
									</h1>
								</div>
								<div className="flex justify-between lg:gap-10">
									<div className="pointer-events-none hidden my-auto font-medium lg:block text-charcoal-dark text-lg w-1/2">
										<Markdown className="mt-[1rem]">
											{content.copy}
										</Markdown>
									</div>
									<div className="flex lg:w-1/2 w-full flex-col gap-4 my-auto items-center">
										<div className="flex justify-center w-full">
											<Link
												className="w-full text-center transition-all rounded-xl py-3 text-xl font-medium text-charcoal-dark bg-white backdrop-blur-sm border-2 border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white"
												href={"/projects"}
											>
												<i className="fa-solid fa-diagram-project" />{" "}
												View Projects
											</Link>
										</div>
										<div className="flex justify-center w-full">
											<Link
												target="_blank"
												className="w-full text-center transition-all rounded-xl py-3 text-xl font-medium text-charcoal-dark bg-white backdrop-blur-sm border-2 border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white"
												href={"Kit_Hamm_Resume.pdf"}
											>
												<i className="fa-solid fa-file" />{" "}
												View Resum&#233;
											</Link>
										</div>
									</div>
								</div>
							</div>
						</header>
					</ParticlesComponent>
				</div>
			</section>
			<ParallaxSection
				shift
				imageUrl={getParallaxImageUrl(content.techParallaxImage)}
			>
				<div className="lg:w-[80dvw] xl:w-[60dvw] xxl:w-[45dvw] mx-auto flex gap-10 justify-center h-full">
					<InViewAnimation animation={0}>
						<div className="my-auto">
							<div className="lg:text-6xl text-4xl text-center drop-shadow-2xl text-white font-bold">
								Tech Stack.
							</div>
						</div>
						<TechStackIcons />
					</InViewAnimation>
				</div>
			</ParallaxSection>
			<section
				id="triple-threat"
				className="flex fade-in justify-center bg-neutral-300 z-10"
			>
				<div className="text-center w-[90dvw] lg:w-[75dvw] grid grid-cols-1 lg:grid-cols-3 gap-5 py-10 lg:py-20">
					<HighlightCard
						header={content.firstHighlightHeader}
						text={content.firstHighlightText}
						avatar={getHighlighImageUrl(
							content.firstHighlightImage
						)}
						index={0}
					/>
					<HighlightCard
						header={content.secondHighlightHeader}
						text={content.secondHighlightText}
						avatar={getHighlighImageUrl(
							content.secondHighlightImage
						)}
						index={1}
					/>
					<HighlightCard
						header={content.thirdHighlightHeader}
						text={content.thirdHighlightText}
						avatar={getHighlighImageUrl(
							content.thirdHighlightImage
						)}
						index={2}
					/>
				</div>
			</section>
			<ParallaxSection
				shift={false}
				imageUrl={getParallaxImageUrl(content.aboutParallaxImage)}
			>
				<div className="lg:w-[75dvw] mx-auto flex gap-10 h-full">
					<div className="lg:basis-2/3 lg:ms-auto flex">
						<InViewAnimation animation={2}>
							<div className="my-auto flex flex-col gap-2">
								<div className="lg:text-6xl text-3xl text-center lg:text-left drop-shadow-2xl text-white font-bold">
									A little about me.
								</div>
								<Markdown
									className={
										"text-white text-base lg:text-lg"
									}
								>
									{content.shortAbout}
								</Markdown>
								<Link
									className="transition-all rounded-xl lg:w-1/2 py-2 text-base lg:text-xl text-white text-center font-medium bg-black border-2 border-white hover:bg-green-600"
									href={"/about"}
								>
									Learn More
								</Link>
							</div>
						</InViewAnimation>
					</div>
				</div>
			</ParallaxSection>
			<div className="bg-neutral-300 z-10">
				<LandingContact />
			</div>
			<AnonVisitLogger />
		</main>
	);
}
