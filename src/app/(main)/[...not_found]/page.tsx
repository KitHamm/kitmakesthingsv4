import ErrorButtons from "@/components/404Buttons";

export default function NotFound() {
    return (
        <main className="z-10">
            <section className="xl:absolute top-0 left-0 min-w-[100dvw]">
                <article className="fade-in flex justify-center min-h-screen xl:w-[75dvw] w-[90dvw] mx-auto">
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
