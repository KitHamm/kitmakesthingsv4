"use client";
// packages
import Link from "next/link";
import {
	Badge,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
// types
import { Messages } from "@prisma/client";
import { signOut } from "next-auth/react";
import SocialLinks from "@/components/main/shared/socialLinks";

export default function MobileNav(props: Readonly<{ messages: Messages[] }>) {
	const [newMessages, setNewMessages] = useState(0);
	const pathname = usePathname();
	const {
		isOpen: isOpenMenu,
		onClose: onCloseMenu,
		onOpenChange: onOpenChangeMenu,
	} = useDisclosure();

	useEffect(() => {
		let count = 0;
		for (const message of props.messages) {
			if (!message.read) {
				count = count + 1;
			}
		}
		setNewMessages(count);
	}, [props.messages]);

	useEffect(() => {
		onCloseMenu();
	}, [pathname, onCloseMenu]);

	const badgeIsInvisible = newMessages === 0;

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
							onOpenChangeMenu();
						}}
						className="my-auto py-2 px-4 lg:hidden"
					>
						<i
							className={`${
								isOpenMenu ? "-rotate-90" : "rotate-0"
							} fa-solid fa-bars fa-2xl mt-auto transition-transform`}
						/>
					</button>
				</div>
			</nav>
			<Drawer
				size="full"
				placement="left"
				isOpen={isOpenMenu}
				hideCloseButton
				onOpenChange={onOpenChangeMenu}
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
									<MobileNavLink
										href="/"
										active={pathname === "/"}
									>
										<i className="fa-solid fa-house" />
										<div className="font-bold">Home</div>
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard"
										active={pathname === "/dashboard"}
									>
										<i className="fa-solid fa-chart-simple" />
										<div className="font-bold">
											Statistics
										</div>
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/content"
										active={
											pathname === "/dashboard/content"
										}
									>
										<i className="fa-solid fa-file" />
										<div className="font-bold">
											Pages Content
										</div>
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/content/projects"
										active={pathname.includes(
											"/dashboard/content/projects"
										)}
									>
										<i className="fa-solid fa-diagram-project" />
										<div className="font-bold">
											Project Content
										</div>
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/messages"
										active={
											pathname === "/dashboard/messages"
										}
									>
										<i className="fa-solid fa-message" />
										<Badge
											classNames={{
												badge: "-right-1 top-",
											}}
											showOutline={false}
											isInvisible={badgeIsInvisible}
											placement="top-right"
											content={newMessages}
											color="danger"
										>
											<div className="font-bold">
												Messages
											</div>
										</Badge>
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/invoices"
										active={
											pathname === "/dashboard/invoices"
										}
									>
										<i className="fa-solid fa-money-bill" />
										<div className="font-bold">
											Invoices
										</div>
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/projects"
										active={
											pathname === "/dashboard/projects"
										}
									>
										<i className="fa-solid fa-diagram-project" />
										<div className="font-bold">
											Projects
										</div>
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/media"
										active={pathname === "/dashboard/media"}
									>
										<i className="fa-solid fa-photo-film" />
										<div className="font-bold">Media</div>
									</MobileNavLink>
									<button
										onClick={() => signOut()}
										className="flex gap-3 items-center text-start text-red-400 text-2xl transition-colors"
									>
										<i className="rotate-180 fa-solid fa-arrow-right-to-bracket" />
										<div className="font-bold">Log Out</div>
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
}

function MobileNavLink({
	children,
	href,
	active,
}: Readonly<{
	children: React.ReactNode;
	href: string;
	active: boolean;
}>) {
	return (
		<Link
			className={`${
				active ? "text-green-600" : ""
			} flex gap-3 items-center text-2xl transition-colors hover:text-green-600`}
			color="foreground"
			href={href}
		>
			{children}
		</Link>
	);
}
