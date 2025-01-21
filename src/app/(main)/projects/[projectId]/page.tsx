// Prisma
import prisma from "@/lib/prisma";
// Packages
import Link from "next/link";
import Markdown from "react-markdown";
// Components
import ProjectFadeIn from "@/components/main/projects/ProjectFadeIn";
import EmblaCarousel from "@/components/embla/EmblaCarousel";
import ProjectTechStack from "@/components/main/projects/ProjectTechStack";
import DataError from "@/components/main/shared/DataError";
import AnonVisitLogger from "@/components/main/shared/AnonVisitLogger";
// Types
import { EmblaOptionsType } from "embla-carousel";
import ContactButton from "@/components/main/shared/ContactButton";
// Constants
const OPTIONS: EmblaOptionsType = { loop: true };

type Params = Promise<{ projectId: string }>;

export default async function ProjectPage(props: Readonly<{ params: Params }>) {
	const params = await props.params;

	const project = await prisma.contentProject.findUnique({
		where: {
			slug: params.projectId,
		},
	});

	if (!project) {
		return <DataError />;
	}

	return (
		<main className="z-10 pt-20 grow flex flex-col bg-neutral-300">
			<section className="flex flex-col my-auto">
				<article className="grow lg:w-[75dvw] w-[90dvw] grid lg:grid-cols-2 lg:gap-20 mx-auto py-10">
					<header className="flex">
						<div className="my-auto">
							<ProjectFadeIn index={0}>
								<h1 className="lg:text-6xl text-4xl font-bold ">
									{project.name}
								</h1>
							</ProjectFadeIn>
							<ProjectFadeIn index={1}>
								<div className="font-bold text-xl mt-2">
									{project.role}
								</div>
							</ProjectFadeIn>
							<ProjectTechStack stack={project.stack} />
							<ProjectFadeIn index={2}>
								<Markdown className="mt-6 font-bold text-lg">
									{project.description}
								</Markdown>
							</ProjectFadeIn>
							<ProjectFadeIn index={3}>
								<div className="grid lg:grid-cols-2 grid-cols-1 justify-evenly my-6 gap-4">
									{project.outLink && project.outLinkText && (
										<Link
											target="_blank"
											className="lg:w-full rounded-xl py-2 text-center transition-all font-medium text-xl bg-white border-2 border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white"
											href={project.outLink}
										>
											{project.outLinkText}
										</Link>
									)}
									<ContactButton about={false} />
									<Link
										className="lg:w-full rounded-xl py-2 text-center transition-all font-medium text-xl bg-white border-2 border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white"
										href={"/projects"}
									>
										Back
									</Link>
								</div>
							</ProjectFadeIn>
						</div>
					</header>
					<figure className="slide-in-left flex order-first mb-10 lg:mb-0 lg:order-last">
						<EmblaCarousel
							slides={project.images}
							options={OPTIONS}
						/>
					</figure>
				</article>
			</section>
			<AnonVisitLogger />
		</main>
	);
}
