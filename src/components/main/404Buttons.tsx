"use client";

import Link from "next/link";

export default function ErrorButtons() {
    return (
        <div className="flex justify-center">
            <Link
                className="transition-all py-4 w-full text-center text-2xl rounded-full font-bold bg-white border-2 border-black hover:bg-green-500 hover:border-white hover:text-white"
                href={"/"}>
                Home
            </Link>
        </div>
    );
}
