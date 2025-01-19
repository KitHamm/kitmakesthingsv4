"use client";

import { Badge } from "@nextui-org/react";
import { Messages } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SidePanel(props: Readonly<{ messages: Messages[] }>) {
	const [dropIsOpen, setDropIsOpen] = useState(false);
	const dropContainer = useRef<HTMLDivElement | null>(null);
	const [newMessages, setNewMessages] = useState(0);

	useEffect(() => {
		if (dropContainer.current) {
			const scrollHeight = dropContainer.current?.scrollHeight;

			if (dropIsOpen) {
				dropContainer.current!.style.height = scrollHeight + "px";
			} else {
				dropContainer.current!.style.height = "0px";
			}
		}
	}, [dropIsOpen]);

	useEffect(() => {
		let count = 0;
		for (const message of props.messages) {
			if (!message.read) {
				count = count + 1;
			}
		}
		setNewMessages(count);
	}, [props.messages]);

	const pathName = usePathname();

	useEffect(() => {
		if (!pathName.includes("content")) {
			setDropIsOpen(false);
		}
	}, [pathName]);
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
				<NavLink link="/dashboard" active={pathName === "/dashboard"}>
					Statistics
				</NavLink>
				<button
					onClick={(e) => {
						e.preventDefault();
						setDropIsOpen(!dropIsOpen);
					}}
					className={`text-start cursor-pointer py-2 ps-8 font-bold text-lg me-16 rounded-tr-full rounded-br-full transition-all hover:bg-neutral-400 hover:text-white`}
				>
					Content
				</button>
				<div
					style={{ height: "0px" }}
					className="transition-all overflow-hidden"
					ref={dropContainer}
				>
					<div
						className={`${
							pathName === "/dashboard/content"
								? "border-s-4 border-neutral-600 bg-green-500"
								: ""
						} font-bold ps-12 py-1 me-24 hover:bg-neutral-400 hover:text-white rounded-tr-full rounded-br-full`}
					>
						<Link href={"/dashboard/content"}>Pages</Link>
					</div>
					<div
						className={`${
							pathName.includes("/dashboard/content/projects")
								? "border-s-4 border-neutral-600 bg-green-500"
								: ""
						} font-bold ps-12 py-1 me-24 hover:bg-neutral-400 hover:text-white rounded-tr-full rounded-br-full`}
					>
						<Link href={"/dashboard/content/projects"}>
							Projects
						</Link>
					</div>
				</div>
				<NavLink
					link="/dashboard/messages"
					active={pathName === "/dashboard/messages"}
				>
					<Badge
						classNames={{ badge: "-right-1 top-" }}
						showOutline={false}
						isInvisible={newMessages === 0}
						placement="top-right"
						content={newMessages}
						color="danger"
					>
						Messages
					</Badge>
				</NavLink>

				<NavLink
					link="/dashboard/invoices"
					active={pathName === "/dashboard/invoices"}
				>
					Invoices
				</NavLink>
				<NavLink
					link="/dashboard/projects"
					active={pathName.includes("/dashboard/projects")}
				>
					Projects
				</NavLink>
				<NavLink
					link="/dashboard/media"
					active={pathName === "/dashboard/media"}
				>
					Media
				</NavLink>
				<button
					onClick={() => signOut()}
					className="py-2 ps-8 text-left font-bold text-lg me-16 rounded-tr-full rounded-br-full transition-all hover:bg-red-400 hover:text-white"
				>
					Log Out
				</button>
			</div>
		</div>
	);
}

function NavLink({
	children,
	link,
	active,
}: Readonly<{
	children: React.ReactNode;
	link: string;
	active: boolean;
}>) {
	return (
		<Link
			className={`${
				active ? "bg-green-500 border-s-4 border-neutral-600" : ""
			} py-2 ps-8 font-bold text-lg me-16 rounded-tr-full rounded-br-full transition-all hover:bg-neutral-400 hover:text-white`}
			href={link}
		>
			{children}
		</Link>
	);
}
