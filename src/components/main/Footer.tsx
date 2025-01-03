// Packages
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-neutral-100 py-4 px-10 w-full shadow-1up flex flex-col xl:flex-row">
            <div className="text-center xl:text-start xl:w-1/4">
                <div>&copy; KitMakesThings 2024</div>
            </div>
            <div className="text-center mx-auto">
                <div className="font-bold">Made with Next.Js</div>
            </div>
            <div className="justify-center xl:w-1/4 xl:justify-end gap-4 flex">
                <Link href={"/privacy"}>Privacy</Link>
            </div>
        </footer>
    );
}
