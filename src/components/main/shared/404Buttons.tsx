"use client";
// Packages
import Link from "next/link";

const ErrorButtons = () => {
	return (
		<div className="flex justify-center">
			<Link
				className="w-full text-center transition-all rounded-xl py-3 text-xl font-medium text-charcoal-dark bg-white backdrop-blur-sm border-2 border-neutral-400 hover:bg-green-600 hover:border-white hover:text-white"
				href={"/"}
			>
				Home
			</Link>
		</div>
	);
};

export default ErrorButtons;
