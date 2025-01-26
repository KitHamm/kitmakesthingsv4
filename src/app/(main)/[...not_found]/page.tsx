// Components
import ErrorButtons from "@/components/main/shared/404Buttons";

export default async function NotFound() {
	return (
		<main className="h-full grow flex justify-center bg-neutral-300">
			<section className="m-auto">
				<article className="fade-in flex justify-center lg:w-[33dvw] w-[90dvw] mx-auto">
					<div className="my-auto flex flex-col gap-4">
						<h1 className="lg:text-4xl text-center text-4xl font-bold ">
							Page not found
						</h1>
						<div className="text-center text-xl">
							Uh oh, we cant seem to find the page you are looking
							for. Try going back to the home page or contact me
							for more information.
						</div>
						<ErrorButtons />
					</div>
				</article>
			</section>
		</main>
	);
}
