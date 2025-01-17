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

export default function MobileNav(props: { messages: Messages[] }) {
	const [newMessages, setNewMessages] = useState(0);
	const pathname = usePathname();
	const {
		isOpen: isOpenMenu,
		onClose: onCloseMenu,
		onOpenChange: onOpenChangeMenu,
	} = useDisclosure();

	useEffect(() => {
		var count = 0;
		for (let i = 0; i < props.messages.length; i++) {
			if (!props.messages[i].read) {
				count = count + 1;
			}
		}
		setNewMessages(count);
	}, [props.messages]);

	useEffect(() => {
		onCloseMenu();
	}, [pathname, onCloseMenu]);

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
					<div
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
					</div>
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
								<div
									className="text-2xl"
									onClick={() => onClose()}
								>
									Close
								</div>
							</DrawerHeader>
							<DrawerBody className="px-8 flex flex-col justify-between pb-8">
								<div className="flex flex-col gap-4">
									<MobileNavLink
										href="/"
										active={pathname === "/"}
									>
										Home
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard"
										active={pathname === "/dashboard"}
									>
										Statistics
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/content"
										active={
											pathname === "/dashboard/content"
										}
									>
										Page Content
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/content/projects"
										active={pathname.includes(
											"/dashboard/content/projects"
										)}
									>
										Project Content
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/messages"
										active={
											pathname === "/dashboard/messages"
										}
									>
										<Badge
											classNames={{
												badge: "-right-1 top-",
											}}
											showOutline={false}
											isInvisible={
												newMessages === 0 ? true : false
											}
											placement="top-right"
											content={newMessages}
											color="danger"
										>
											Messages
										</Badge>
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/invoices"
										active={
											pathname === "/dashboard/invoices"
										}
									>
										Invoices
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/projects"
										active={
											pathname === "/dashboard/projects"
										}
									>
										Projects
									</MobileNavLink>
									<MobileNavLink
										href="/dashboard/media"
										active={pathname === "/dashboard/media"}
									>
										Media
									</MobileNavLink>
									<div
										onClick={() => signOut()}
										className="text-red-400 text-2xl transition-colors font-bold"
									>
										Log Out
									</div>
								</div>
								<div className="flex flex-col gap-8">
									<div className="flex flex gap-4">
										<div className="flex items-center">
											<Link
												target="_blank"
												rel="noreferrer"
												href="https://github.com/KitHamm/"
											>
												<i
													aria-hidden
													className="transition-colors text-black hover:text-green-600 fa-brands fa-github fa-2xl"
												/>
											</Link>
										</div>
										<div className="flex items-center">
											<Link
												target="_blank"
												rel="noreferrer"
												href="https://www.instagram.com/kit_makes_things/"
											>
												<i
													aria-hidden
													className="transition-colors text-black hover:text-green-600 fa-brands fa-instagram fa-2xl"
												/>
											</Link>
										</div>
										<div className="flex items-center">
											<Link
												target="_blank"
												rel="noreferrer"
												href="https://www.linkedin.com/in/kit-hamm/"
											>
												<i
													aria-hidden
													className="transition-colors text-black hover:text-green-600 fa-brands fa-linkedin fa-2xl"
												/>
											</Link>
										</div>
									</div>
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
}: {
	children: React.ReactNode;
	href: string;
	active: boolean;
}) {
	return (
		<Link
			className={`${
				active ? "text-green-600" : ""
			} text-2xl transition-colors font-bold hover:text-green-600`}
			color="foreground"
			href={href}
		>
			{children}
		</Link>
	);
}

function LogOutButton() {
	return (
		<div className="text-2xl transition-colors font-bold hover:text-green-600">
			Log Out
		</div>
	);
}
