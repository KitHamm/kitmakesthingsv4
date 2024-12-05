// Components
import ErrorButtons from "@/components/main/404Buttons";

export default function NotFound() {
    return (
        <main className="z-10 grow flex">
            <section className="m-auto">
                <article className="fade-in flex justify-center xl:w-[75dvw] w-[90dvw] mx-auto">
                    <div className="my-auto flex flex-col gap-4">
                        <h1 className="xl:text-6xl text-center text-4xl font-bold ">
                            Oops!
                        </h1>
                        <div className="text-center text-3xl">
                            Looks like you made a wrong turn.
                        </div>
                        <ErrorButtons />
                    </div>
                </article>
            </section>
        </main>
    );
}
