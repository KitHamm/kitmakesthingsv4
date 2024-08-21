import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-neutral-100 py-4 px-10 absolute bottom-0 left-0 w-[100dvw] shadow-1up flex">
            <div className="w-1/4">
                <div>&copy; KitMakesThings 2024</div>
            </div>
            <div className="text-center mx-auto">
                <div className="font-bold">Made with Next.Js</div>
            </div>
            <div className="w-1/4 justify-end gap-4 flex">
                {/* <Link href={"#"}>Home</Link>
                <Link href={"#"}>About</Link>
                <Link href={"#"}>Projects</Link> */}
                <Link href={"#"}>Privacy</Link>
            </div>
        </footer>
    );
}
