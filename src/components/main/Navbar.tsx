"use client";

// Packages
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
	Link,
	useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// Components
import ContactModal from "./ContactModal";

export default function NavbarComp() {
	const { isOpen, onClose, onOpenChange } = useDisclosure();
	const {
		isOpen: isOpenMenu,
		onClose: onCloseMenu,
		onOpenChange: onOpenChangeMenu,
	} = useDisclosure();
	const [contactFrom, setContactForm] = useState<HTMLDivElement | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		if (pathname === "/") {
			const el: HTMLDivElement | null = document.getElementById(
				"contact"
			) as HTMLDivElement;
			setContactForm(el);
		}
	}, [pathname]);

	return (
		<>
			<nav className="fixed bg-white bg-opacity-50 backdrop-blur-sm top-0 left-0 z-30 w-full">
				<div className="px-4 py-3 lg:py-2 mx-auto flex justify-between grow xxl:max-w-[1920px] lg:max-w-[75vw]">
					<div className="flex gap-4">
						<Link
							color="foreground"
							className="font-bold lg:text-5xl text-3xl hover:text-green-600 transition-colors"
							href="/"
						>
							KH
						</Link>
						<div className="lg:flex hidden flex gap-4 justify-center">
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

						<div
							onClick={() => {
								pathname === "/"
									? contactFrom?.scrollIntoView({
											behavior: "smooth",
									  })
									: onOpenChange();
							}}
							className="cursor-pointer text-xl uppercase hover:text-green-600 transition-colors font-medium"
							color="foreground"
						>
							Contact
						</div>
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
								<div className="text-6xl">KH</div>
								<div
									className="text-2xl"
									onClick={() => onClose()}
								>
									Close
								</div>
							</DrawerHeader>
							<DrawerBody className="px-8 flex flex-col justify-between pb-8">
								<div className="flex flex-col gap-4">
									<div className="font-medium pb-6 text-4xl">
										MENU
									</div>
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
											pathname === "/projects"
												? "text-green-600"
												: ""
										} text-2xl transition-colors font-bold hover:text-green-600`}
										color="foreground"
										href="/projects"
									>
										Projects
									</Link>
									<div
										onClick={() => {
											pathname === "/"
												? contactFrom?.scrollIntoView({
														behavior: "smooth",
												  })
												: onOpenChange();
											onClose();
										}}
										className={` text-2xl transition-colors font-bold hover:text-green-600`}
										color="foreground"
									>
										Contact
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
			{/* {isNavOpen && (
				<div className="fade-in z-20 absolute h-full w-full top-0 left-0 bg-white/30 backdrop-blur-lg pt-20">
					<div
						className={`${
							pathname === "/" ? "bg-green-600" : ""
						} py-2 ps-8`}
					>
						<Link
							className={`${
								pathname === "/" ? "text-white" : ""
							} text-2xl transition-colors font-bold hover:text-green-600`}
							color="foreground"
							href="/"
						>
							Home
						</Link>
					</div>
					<div
						className={`${
							pathname === "/about" ? "bg-green-600" : ""
						} py-2 ps-8`}
					>
						<Link
							className={`${
								pathname === "/about" ? "text-white" : ""
							} text-2xl transition-colors font-bold hover:text-green-600`}
							color="foreground"
							href="/about"
						>
							About
						</Link>
					</div>
					<div
						className={`${
							pathname.includes("projects") ? "bg-green-600" : ""
						} py-2 ps-8`}
					>
						<Link
							className={`${
								pathname === "/projects" ? "text-white" : ""
							} text-2xl transition-colors font-bold hover:text-green-600`}
							color="foreground"
							href="/projects"
						>
							Projects
						</Link>
					</div>
					<div className={`py-2 ps-8`}>
						<div
							onClick={() => {
								pathname === "/"
									? contactFrom?.scrollIntoView({
											behavior: "smooth",
									  })
									: onOpenChange();
								setIsNavOpen(false);
							}}
							className={` text-2xl transition-colors font-bold hover:text-green-600`}
							color="foreground"
						>
							Contact
						</div>
					</div>
				</div>
			)} */}
		</>
	);
}
