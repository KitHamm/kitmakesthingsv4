"use client";
// packages
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// functions
import getUnreadMessages from "@/server/messageActions/getUnreadMessages";
import { signOut } from "next-auth/react";
// constants
import { navLinks } from "@/lib/constants";
// components
import NavLink from "./NavLink";

const SidePanel = () => {
	const [newMessages, setNewMessages] = useState(0);
	const pathname = usePathname();
	useEffect(() => {
		const fetchUnreadMessages = async () => {
			try {
				const response = await getUnreadMessages();
				if (response.status === 200) {
					setNewMessages(response.message.messageCount);
				} else {
					setNewMessages(0);
				}
			} catch (error) {
				setNewMessages(0);
				console.log(error);
			}
		};
		fetchUnreadMessages();
	}, [pathname]);

	return (
		<div className="hidden lg:block transition-all fixed top-0 left-0 w-auto lg:w-1/6 h-screen bg-neutral-100 border-e-2 z-40">
			<div className="font-bold text-5xl py-6 border-b-2 mx-4">
				<Link
					className="lg:hover:text-green-500 transition-colors"
					href={"/"}
				>
					KH
				</Link>
			</div>
			<div className="flex flex-col my-8 transition-all">
				{navLinks.map((link) => (
					<NavLink
						key={link.href}
						href={link.href}
						label={link.label}
						icon={link.icon}
						newMessages={newMessages}
						classNames="py-2 px-4 text-lg mx-4 rounded-xl transition-all hover:bg-neutral-400 hover:text-white hover:shadow-lg"
						activeClassNames="bg-green-500 text-white shadow-lg"
					/>
				))}
				<button
					onClick={() => signOut()}
					className="flex gap-3 items-center py-2 px-4 text-left font-bold text-lg mx-4 rounded-xl transition-all hover:bg-red-400 hover:text-white hover:shadow-lg"
				>
					<i className="rotate-180 fa-solid fa-arrow-right-to-bracket" />
					<div className="font-bold">Sign Out</div>
				</button>
			</div>
		</div>
	);
};

export default SidePanel;
