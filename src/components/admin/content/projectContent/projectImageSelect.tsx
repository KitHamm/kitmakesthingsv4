"use client";
// packages
import { useFieldArray } from "react-hook-form";
import Image from "next/image";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Pagination,
	useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
// context
import { useFormContext } from "./formProvider";
// functions
import { itemOrder } from "@/lib/utils/contentUtils/sortUtils";
import { isInSelectedPage } from "@/lib/utils/miscUtils/isInCurrentPage";
// types
import { Images } from "@prisma/client";
import ImageSortBySelect from "../../shared/ImageSortBySelect";
import ImageOrderBySelect from "../../shared/ImageOrderBySelect";
import ImagesPerPageSelect from "../../shared/ImagesPerPageSelect";

const ProjectImageSelect = (props: Readonly<{ images: Images[] }>) => {
	const { images } = props;
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "images",
	});
	const { isOpen, onOpenChange } = useDisclosure();

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

	return (
		<div className="block">
			<div className="font-bold px-2 mb-2">
				Images{" "}
				<em className="font-normal text-sm">(click to remove)</em>
			</div>
			<Button
				onPress={onOpenChange}
				className="w-full lg:w-auto mt-2 px-8 bg-green-500 text-md text-white"
			>
				Add Image
			</Button>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-8">
				{fields.map((image: { url: string }, index: number) => {
					return (
						<button
							onClick={() => remove(index)}
							className="cursor-pointer"
							key={image.url}
						>
							<Image
								width={500}
								height={200}
								alt={image.url}
								src={
									process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
									image.url
								}
							/>
						</button>
					);
				})}
			</div>
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
								Select Image
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
												orderedImages.length /
													imagesPerPage
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
												isInSelectedPage(
													index,
													currentPage,
													imagesPerPage
												)
											) {
												return (
													<div
														key={image.url}
														className="relative fade-in bg-neutral-200 p-4"
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
															className="w-full h-auto m-auto"
														/>
														<button
															onClick={() => {
																append({
																	url: image.url,
																});
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
		</div>
	);
};

export default ProjectImageSelect;
