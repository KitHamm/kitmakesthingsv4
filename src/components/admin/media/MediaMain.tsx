"use client";
// packages
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Pagination,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
// functions
import { deleteMedia } from "@/server/mediaActions/deleteMedia";
import { itemOrder } from "@/lib/utils/contentUtils/sortUtils";
// components
import ImageSortBySelect from "../shared/ImageSortBySelect";
import ImageOrderBySelect from "../shared/ImageOrderBySelect";
import ImagesPerPageSelect from "../shared/ImagesPerPageSelect";
// types
import { Images } from "@prisma/client";

const MediaMain = ({ images }: Readonly<{ images: Images[] }>) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [selectedImage, setSelectedImage] = useState("");

	const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc");
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
		if (!isOpen) {
			setSelectedImage("");
		}
	}, [onOpenChange, isOpen]);

	const onDelete = async (file: string) => {
		try {
			const res = await deleteMedia(file);
			if (res.success) {
				onClose();
				setSelectedImage("");
			} else {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
				<ImagesPerPageSelect
					imagesPerPage={imagesPerPage}
					setImagesPerPage={setImagesPerPage}
				/>
				<ImageSortBySelect sortBy={sortBy} setSortBy={setSortBy} />
				<ImageOrderBySelect orderBy={orderBy} setOrderBy={setOrderBy} />
			</div>
			<div className="flex justify-center my-4">
				<div className="flex justify-center">
					<Pagination
						className="light mt-auto"
						classNames={{
							cursor: "bg-green-400",
						}}
						showControls
						total={Math.ceil(orderedImages.length / imagesPerPage)}
						page={currentPage}
						onChange={setCurrentPage}
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{orderedImages.map((image: Images, index: number) => {
					if (
						index >
							currentPage * imagesPerPage - (imagesPerPage + 1) &&
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
										process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
										image.url
									}
									alt={image.url}
									className="object-contain w-auto h-full m-auto"
								/>
								<button
									onClick={(e) => {
										setSelectedImage(image.url);
										onOpen();
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
				})}
			</div>
			<Modal
				backdrop="blur"
				size="xl"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1"></ModalHeader>
							<ModalBody>
								<Image
									src={
										process.env.NEXT_PUBLIC_BASE_IMAGE_URL +
										selectedImage
									}
									alt={selectedImage}
									width={400}
									height={400}
									className="w-full h-auto"
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										onDelete(selectedImage);
									}}
								>
									Delete
								</Button>
								<Button
									className="bg-green-500"
									onPress={onClose}
								>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default MediaMain;
