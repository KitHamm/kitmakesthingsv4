"use client";
// packages
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@nextui-org/modal";
import { UseFormSetValue } from "react-hook-form";
// types
import { AboutContentForm, LandingContentForm } from "@/lib/types";
import { Images } from "@prisma/client";
import { Button, Pagination, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { itemOrder } from "@/lib/utils/contentUtils/sortUtils";
import Image from "next/image";

type CombinedFormKeys = keyof LandingContentForm | keyof AboutContentForm;

export default function ContentImageModal(
	props: Readonly<{
		images: Images[];
		target: CombinedFormKeys;
		isOpen: boolean;
		onOpenChange: () => void;
		setValue:
			| UseFormSetValue<LandingContentForm>
			| UseFormSetValue<AboutContentForm>;
	}>
) {
	const { images, target, isOpen, onOpenChange, setValue } = props;
	const [title, setTitle] = useState(
		target.split(/(?=[A-Z])/).map((string: string) => {
			return string + " ";
		})
	);
	const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
	const [sortBy, setSortBy] = useState<"date" | "name">("date");
	const [orderedImages, setOrderedImages] = useState(
		itemOrder(images, sortBy, orderBy)
	);
	const [imagesPerPage, setImagesPerPage] = useState<number>(8);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setOrderedImages(itemOrder(images, sortBy, orderBy));
	}, [images, sortBy, orderBy]);

	useEffect(() => {
		setCurrentPage(1);
	}, [imagesPerPage]);

	useEffect(() => {
		setTitle(
			target.split(/(?=[A-Z])/).map((string: string) => {
				return string + " ";
			})
		);
	}, [target]);

	return (
		<Modal
			backdrop="blur"
			scrollBehavior="outside"
			size="4xl"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1 capitalize">
							{title}
						</ModalHeader>
						<ModalBody>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
								<Select
									className="ms-auto me-auto xl:me-0"
									variant="bordered"
									selectedKeys={[imagesPerPage.toString()]}
									labelPlacement="outside"
									label={"Images Per Page"}
									onChange={(e) =>
										setImagesPerPage(
											parseInt(e.target.value)
										)
									}
								>
									<SelectItem
										className="light"
										key={4}
										value={4}
									>
										4
									</SelectItem>
									<SelectItem
										className="light"
										key={8}
										value={8}
									>
										8
									</SelectItem>
									<SelectItem
										className="light"
										key={12}
										value={12}
									>
										12
									</SelectItem>
									<SelectItem
										className="light"
										key={16}
										value={16}
									>
										16
									</SelectItem>
									<SelectItem
										className="light"
										key={20}
										value={20}
									>
										20
									</SelectItem>
									<SelectItem
										className="light"
										key={1000000}
										value={1000000}
									>
										All
									</SelectItem>
								</Select>
								<Select
									className="ms-auto me-auto xl:me-0"
									variant="bordered"
									selectedKeys={[sortBy]}
									labelPlacement="outside"
									label={"Sort by"}
									onChange={(e) => {
										switch (e.target.value) {
											case "date":
												setSortBy("date");
												break;
											case "name":
												setSortBy("name");
												break;
										}
									}}
								>
									<SelectItem
										className="light"
										key={"date"}
										value={"date"}
									>
										Date
									</SelectItem>
									<SelectItem
										className="light"
										key={"name"}
										value={"name"}
									>
										Name
									</SelectItem>
								</Select>
								<Select
									className="ms-auto me-auto xl:me-0"
									variant="bordered"
									selectedKeys={[orderBy]}
									labelPlacement="outside"
									label={"Order"}
									onChange={(e) => {
										switch (e.target.value) {
											case "asc":
												setOrderBy("asc");
												break;
											case "desc":
												setOrderBy("desc");
												break;
										}
									}}
								>
									<SelectItem
										className="light"
										key={"asc"}
										value={"asc"}
									>
										Ascending
									</SelectItem>
									<SelectItem
										className="light"
										key={"desc"}
										value={"desc"}
									>
										Descending
									</SelectItem>
								</Select>
							</div>
							<div className="flex justify-center my-4">
								<div className="flex justify-center">
									<Pagination
										className="light mt-auto"
										classNames={{
											cursor: "bg-green-400",
										}}
										showControls
										total={Math.ceil(
											orderedImages.length / imagesPerPage
										)}
										page={currentPage}
										onChange={setCurrentPage}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
								{orderedImages.map(
									(image: Images, index: number) => {
										if (
											index >
												currentPage * imagesPerPage -
													(imagesPerPage + 1) &&
											index < currentPage * imagesPerPage
										) {
											return (
												<div
													key={image.url}
													className="relative fade-in bg-neutral-200 p-4 max-h-96"
												>
													<Image
														height={500}
														width={500}
														src={
															process.env
																.NEXT_PUBLIC_BASE_IMAGE_URL +
															image.url
														}
														alt={image.url}
														className="object-contain w-full h-full m-auto"
													/>
													<button
														onClick={() => {
															if (
																target ===
																	"imageUrl" ||
																target ===
																	"techParallaxImage" ||
																target ===
																	"aboutParallaxImage" ||
																target ===
																	"firstHighlightImage" ||
																target ===
																	"secondHighlightImage" ||
																target ===
																	"thirdHighlightImage"
															) {
																(
																	setValue as UseFormSetValue<LandingContentForm>
																)(
																	target,
																	image.url,
																	{
																		shouldDirty:
																			true,
																	}
																);
															}
															if (
																target ===
																	"image1Url" ||
																target ===
																	"image2Url" ||
																target ===
																	"image3Url" ||
																target ===
																	"image4Url"
															) {
																(
																	setValue as UseFormSetValue<AboutContentForm>
																)(
																	target,
																	image.url,
																	{
																		shouldDirty:
																			true,
																	}
																);
															}

															onClose();
														}}
														className="opacity-0 hover:opacity-100 transition-all bg-neutral-400 cursor-pointer bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20"
													>
														<div className="text-white text-xl font-bold">
															Select
														</div>
													</button>
												</div>
											);
										}
									}
								)}
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								className="text-md"
								onPress={onClose}
							>
								Close
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
