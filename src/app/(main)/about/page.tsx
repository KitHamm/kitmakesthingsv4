// Prisma
import prisma from "@/lib/prisma";
// Components
import ContactButton from "@/components/main/ContactButton";
import DataError from "@/components/main/DataError";
// Packages
import Markdown from "react-markdown";
import Link from "next/link";
// Functions
import AnonVisitLogger from "@/components/main/AnonVisitLogger";
import AboutImageBox from "@/components/main/AboutImageBox";

export default async function AboutPage() {
	const content = await prisma.about.findFirst();

	if (!content) {
		return <DataError />;
	}

	return (
		<main className="h-full grow flex justify-center bg-neutral-300">
			<section className="my-auto">
				<article className="fade-in flex flex-col lg:w-[75dvw] w-[90dvw] m-auto">
					<div className="lg:grid lg:grid-cols-2 lg:gap-20">
						<div className="my-auto">
							<div className="mt-20 lg:mt-0 grid grid-cols-2 gap-0">
								<AboutImageBox
									image={content.image1Url}
									title={content.title1}
									index={0}
								/>
								<AboutImageBox
									image={content.image2Url}
									title={content.title2}
									index={1}
								/>
								<AboutImageBox
									image={content.image3Url}
									title={content.title3}
									index={2}
								/>
								<AboutImageBox
									image={content.image4Url}
									title={content.title4}
									index={3}
								/>
							</div>
						</div>
						<div className="my-auto">
							<h1 className="fade-in-slow my-4 lg:my-0 text-center font-bold text-6xl lg:text-8xl">
								{content.title}
							</h1>
							<div className="flex flex-col lg:flex-row justify-center lg:gap-10">
								<div className="slide-in-right font-bold text-center text-green-500 text-xl">
									{content.text1}
								</div>
								<div className="slide-in-left font-bold text-center text-green-500 text-xl">
									{content.text2}
								</div>
							</div>
							<Markdown className="fade-in-slow mt-10 mx-auto text-lg">
								{content.copy}
							</Markdown>
							<div className="flex flex-col lg:flex-row justify-between my-6 gap-10">
								<Link
									className={`${"slide-in-right"} transition-all rounded-xl lg:w-full flex items-center justify-center gap-2 text-xl text-center font-medium bg-white backdrop-blur-sm border-2 border-black hover:bg-green-400 hover:border-white hover:text-white`}
									href={"/projects"}
								>
									<i className="fa-solid fa-diagram-project"></i>{" "}
									View Projects
								</Link>
								<ContactButton about />
							</div>
						</div>
					</div>
				</article>
			</section>
			<AnonVisitLogger />
		</main>
	);
}
