"use client";
// Packages
import Link from "next/link";

export default function ErrorButtons() {
    return (
        <div className="flex justify-center">
            <Link
                className="transition-all py-2 w-full text-center text-2xl font-bold bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                href={"/"}>
                Home
            </Link>
        </div>
    );
}
