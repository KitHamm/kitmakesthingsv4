"use client";

// Packages
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Link,
	useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// Components
import ContactModal from "../shared/ContactModal";
import SocialLinks from "../shared/socialLinks";

export default function NavbarComp() {
	const { isOpen, onClose, onOpenChange } = useDisclosure();
	const {
		isOpen: isOpenMenu,
		onClose: onCloseMenu,
		onOpenChange: onOpenChangeMenu,
	} = useDisclosure();
	const [contactForm, setContactForm] = useState<HTMLDivElement | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		if (pathname === "/") {
			const el: HTMLDivElement | null = document.getElementById(
				"contact"
			) as HTMLDivElement;
			setContactForm(el);
		}
		onCloseMenu();
	}, [pathname, onCloseMenu]);

	return (
		<>
			<nav className="fixed bg-white bg-opacity-50 backdrop-blur-sm top-0 left-0 z-30 w-full">
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
						<SocialLinks />
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

					<div className="hidden lg:flex justify-end gap-10 w-1/4 my-auto">
						<div>
							<Link
								className={`${
									pathname === "/about"
										? "text-green-600"
										: ""
								} text-xl uppercase transition-colors font-medium hover:text-green-600`}
								color="foreground"
								href="/about"
							>
								About
							</Link>
						</div>
						<div>
							<a
								className={`${
									pathname.includes("projects")
										? "text-green-600"
										: ""
								} text-xl uppercase transition-colors font-medium hover:text-green-600`}
								color="foreground"
								href="/projects"
							>
								Projects
							</a>
						</div>

						<button
							onClick={() => {
								pathname === "/"
									? contactForm?.scrollIntoView({
											behavior: "smooth",
									  })
									: onOpenChange();
							}}
							className="cursor-pointer text-xl uppercase hover:text-green-600 transition-colors font-medium"
							color="foreground"
						>
							Contact
						</button>
					</div>
					<ContactModal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						onClose={onClose}
					/>
				</div>
			</nav>
			<Drawer
				size="full"
				placement="left"
				isOpen={isOpenMenu}
				hideCloseButton
				classNames={{
					base: "bg-neutral-300",
				}}
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
									<Link
										className={`${
											pathname === "/"
												? "text-green-600"
												: ""
										} text-2xl transition-colors font-bold hover:text-green-600`}
										color="foreground"
										href="/"
									>
										Home
									</Link>
									<Link
										className={`${
											pathname === "/about"
												? "text-green-600"
												: ""
										} text-2xl transition-colors font-bold hover:text-green-600`}
										color="foreground"
										href="/about"
									>
										About
									</Link>
									<Link
										className={`${
											pathname.includes("projects")
												? "text-green-600"
												: ""
										} text-2xl transition-colors font-bold hover:text-green-600`}
										color="foreground"
										href="/projects"
									>
										Projects
									</Link>
									<button
										onClick={() => {
											pathname === "/"
												? contactForm?.scrollIntoView({
														behavior: "smooth",
												  })
												: onOpenChange();
											onClose();
										}}
										className={`text-start text-2xl transition-colors font-bold hover:text-green-600`}
										color="foreground"
									>
										Contact
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
