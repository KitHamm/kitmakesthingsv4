"use client";
// packages
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	useDisclosure,
} from "@nextui-org/react";
// functions
import getUnreadMessages from "@/server/messageActions/getUnreadMessages";
import { signOut } from "next-auth/react";
// constants
import { navLinks } from "@/lib/constants";
// components
import SocialLinks from "@/components/main/shared/socialLinks";
import NavLink from "./NavLink";

const MobileNav = () => {
	const [newMessages, setNewMessages] = useState(0);
	const pathname = usePathname();
	const { isOpen, onClose, onOpenChange } = useDisclosure();

	useEffect(() => {
		const fetchUnreadMessages = async () => {
			try {
				const res = await getUnreadMessages();
				if (res.success) {
					setNewMessages(res.data ?? 0);
				} else {
					console.log("Error:", res.error);
					setNewMessages(0);
				}
			} catch (error) {
				setNewMessages(0);
				console.log("Unexpected error:", error);
			}
		};
		fetchUnreadMessages();
	}, [pathname]);

	useEffect(() => {
		onClose();
	}, [pathname, onClose]);

	return (
		<>
			<nav className="lg:hidden bg-neutral-100 shadow z-30 w-full">
				<div className="px-4 py-3 lg:py-2 mx-auto flex justify-between grow xxl:max-w-[1920px] lg:max-w-[75vw]">
					<div className="flex gap-4">
						<div className="flex">
							<Link
								color="foreground"
								className="h-fit font-bold lg:text-5xl text-3xl hover:text-green-600 transition-colors"
								href="/"
							>
								KH
							</Link>
						</div>
					</div>
					<button
						onClick={() => {
							onOpenChange();
						}}
						className="my-auto py-2 px-4 lg:hidden"
					>
						<i
							className={`${
								isOpen ? "-rotate-90" : "rotate-0"
							} fa-solid fa-bars fa-2xl mt-auto transition-transform`}
						/>
					</button>
				</div>
			</nav>
			<Drawer
				size="full"
				placement="left"
				isOpen={isOpen}
				hideCloseButton
				onOpenChange={onOpenChange}
			>
				<DrawerContent>
					{(onClose) => (
						<>
							<DrawerHeader className="px-8 flex justify-between items-center">
								<div className="text-6xl">MENU</div>
								<button
									className="text-2xl"
									onClick={() => onClose()}
								>
									Close
								</button>
							</DrawerHeader>
							<DrawerBody className="px-8 flex flex-col justify-between pb-8">
								<div className="flex flex-col gap-4">
									{navLinks.map((link) => (
										<NavLink
											key={link.href}
											href={link.href}
											label={link.label}
											icon={link.icon}
											newMessages={newMessages}
											classNames="text-2xl"
											activeClassNames="text-green-500"
										/>
									))}
									<button
										onClick={() => signOut()}
										className="flex gap-3 items-center text-start text-red-400 text-2xl transition-colors"
									>
										<i className="rotate-180 fa-solid fa-arrow-right-to-bracket" />
										<div className="font-bold">
											Sign Out
										</div>
									</button>
								</div>
								<div className="flex flex-col gap-8">
									<SocialLinks />
									<div>&copy; KitMakesThings 2024</div>
								</div>
							</DrawerBody>
						</>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MobileNav;
