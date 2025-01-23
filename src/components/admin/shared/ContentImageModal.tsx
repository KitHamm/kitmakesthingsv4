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
import { Button, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { itemOrder } from "@/lib/utils/contentUtils/sortUtils";
import Image from "next/image";
import ImagesPerPageSelect from "./ImagesPerPageSelect";
import ImageSortBySelect from "./ImageSortBySelect";
import ImageOrderBySelect from "./ImageOrderBySelect";

type PropTypes = {
	images: Images[];
	landingTarget?: keyof LandingContentForm;
	aboutTarget?: keyof AboutContentForm;
	isOpen: boolean;
	onOpenChange: () => void;
	setValueLanding?: UseFormSetValue<LandingContentForm>;
	setValueAbout?: UseFormSetValue<AboutContentForm>;
};

const ContentImageModal = ({
	images,
	landingTarget,
	aboutTarget,
	isOpen,
	onOpenChange,
	setValueLanding,
	setValueAbout,
}: Readonly<PropTypes>) => {
	const [title, setTitle] = useState("");
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
		if (landingTarget) {
			setTitle(
				landingTarget
					.split(/(?=[A-Z])/)
					.map((string: string) => {
						return string + " ";
					})
					.join("")
			);
		} else if (aboutTarget) {
			setTitle(
				aboutTarget
					.split(/(?=[A-Z])/)
					.map((string: string) => {
						return string + " ";
					})
					.join("")
			);
		}
	}, []);

	const handleSetValue = (imageUrl: string) => {
		if (setValueLanding && landingTarget) {
			setValueLanding(landingTarget, imageUrl, { shouldDirty: true });
			onOpenChange();
		} else if (setValueAbout && aboutTarget) {
			setValueAbout(aboutTarget, imageUrl, { shouldDirty: true });
			onOpenChange();
		} else {
			console.log("No setValue and corresponding target set.");
		}
	};

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
								<ImagesPerPageSelect
									imagesPerPage={imagesPerPage}
									setImagesPerPage={setImagesPerPage}
								/>
								<ImageSortBySelect
									sortBy={sortBy}
									setSortBy={setSortBy}
								/>
								<ImageOrderBySelect
									orderBy={orderBy}
									setOrderBy={setOrderBy}
								/>
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
															handleSetValue(
																image.url
															);
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
};

export default ContentImageModal;
