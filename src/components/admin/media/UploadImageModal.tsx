"use client";
// packages
import {
	Button,
	CircularProgress,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import axios, { AxiosProgressEvent } from "axios";
import { DragEvent, ChangeEvent, useState } from "react";
// functions
import { forceRevalidate } from "@/server/forceRevalidate";
import { isImages } from "@/lib/utils/contentUtils/imageUtils";
// types
import { UploadState } from "@/lib/types";

const UploadImageModal = () => {
	const [uploadState, setUploadState] = useState<UploadState>(
		UploadState.NONE
	);
	const [imagesToUpload, setImagesToUpload] = useState<
		{ file: File; uploadPercent: number }[]
	>([]);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleFileDrop = (e: DragEvent<HTMLLabelElement>) => {
		if (e.dataTransfer?.files && isImages(e.dataTransfer.files)) {
			const tempImages: { file: File; uploadPercent: number }[] = [];
			for (const file of e.dataTransfer.files) {
				tempImages.push({ file: file, uploadPercent: 0 });
			}
			setImagesToUpload(tempImages);
			setUploadState(UploadState.READY);
		}
	};

	const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && isImages(e.target.files)) {
			const tempImages: { file: File; uploadPercent: number }[] = [];
			for (const file of e.target.files) {
				tempImages.push({ file: file, uploadPercent: 0 });
			}
			setImagesToUpload(tempImages);
			setUploadState(UploadState.READY);
		}
	};

	const handleUpload = async () => {
		setUploadState(UploadState.UPLOADING);
		for (const [index, image] of imagesToUpload.entries()) {
			try {
				await uploadImage(image, index);
				await new Promise((resolve) => setTimeout(resolve, 1000));
			} catch (error) {
				setUploadState(UploadState.ERROR);
				console.log(error);
			}
		}
		forceRevalidate("/dashboard/media");
		setUploadState(UploadState.SUCCESS);
	};

	const uploadImage = async (
		image: {
			file: File;
			uploadPercent: number;
		},
		index: number
	) => {
		try {
			const formData = new FormData();
			formData.append("file", image.file);
			axios.post("/api/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
				onUploadProgress: (ProgressEvent) => {
					updateUploadPercent(ProgressEvent, index);
				},
			});
		} catch (error) {
			setUploadState(UploadState.ERROR);
			throw error;
		}
	};

	const updateUploadPercent = (
		ProgressEvent: AxiosProgressEvent,
		index: number
	) => {
		if (ProgressEvent.bytes) {
			let percent = Math.round(
				(ProgressEvent.loaded / ProgressEvent.total!) * 100
			);
			setImagesToUpload((prevImages) =>
				prevImages.map((item, i) =>
					i === index
						? {
								...item,
								uploadPercent: percent,
						  }
						: item
				)
			);
		}
	};

	const handleClose = () => {
		setImagesToUpload([]);
		setUploadState(UploadState.NONE);
		onClose();
	};

	const getModalTitle = () => {
		switch (uploadState) {
			case UploadState.UPLOADING:
				return "Uploading...";
			case UploadState.ERROR:
				return "Upload Error";
			case UploadState.SUCCESS:
				return "Upload Success";
			default:
				return "Upload Image";
		}
	};

	return (
		<div className="w-fit bg-neutral-100 p-4 rounded-lg shadow">
			<Button
				onPress={onOpen}
				className="bg-green-500 text-md text-white"
			>
				Upload New Image
			</Button>
			<Modal
				backdrop="blur"
				size={"xl"}
				isOpen={isOpen}
				onOpenChange={onOpen}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex text-4xl text-center flex-col gap-1">
								{getModalTitle()}
							</ModalHeader>
							<ModalBody>
								{uploadState === UploadState.NONE && (
									<div className="flex items-center justify-center w-full">
										<label
											id="drop_zone"
											onDrop={(
												e: DragEvent<HTMLLabelElement>
											) => {
												e.preventDefault();
												handleFileDrop(e);
											}}
											onDragOver={(e) => {
												e.preventDefault();
											}}
											htmlFor="dropzone-file"
											className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
										>
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<svg
													className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 20 16"
												>
													<path
														stroke="currentColor"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
													/>
												</svg>
												<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
													<span className="font-semibold">
														Click to select
													</span>{" "}
													or drag and drop an image
												</p>
											</div>
											<input
												onChange={(e) => {
													handleFileSelect(e);
												}}
												id="dropzone-file"
												name="dropzone-file"
												type="file"
												className="hidden"
												multiple
											/>
										</label>
									</div>
								)}
								{uploadState === UploadState.ERROR && (
									<div className="flex flex-col items-center justify-center w-full">
										<div>
											There was an error during the
											upload.
										</div>
										<div>Please try again later.</div>
									</div>
								)}
								{uploadState !== UploadState.NONE &&
									uploadState !== UploadState.ERROR && (
										<div className="flex flex-col gap-2">
											{imagesToUpload.map(
												(image: {
													file: File;
													uploadPercent: number;
												}) => (
													<div
														className="grid grid-cols-[1fr_auto] items-center truncate bg-neutral-100 p-2 rounded shadow"
														key={image.file.name}
													>
														<div className="px-4 truncate flex flex-col gap-">
															<div className="font-bold">
																File:
															</div>
															<div className="truncate">
																{
																	image.file
																		.name
																}
															</div>
														</div>
														<CircularProgress
															aria-label="Uploading"
															value={
																image.uploadPercent
															}
															showValueLabel
															classNames={{
																svg: "w-14 h-14",
																indicator:
																	"stroke-green-500",
																track: "stroke-neutral-400/50",
																value: "text-xs",
															}}
														/>
													</div>
												)
											)}
										</div>
									)}
							</ModalBody>
							<ModalFooter>
								{uploadState !== UploadState.UPLOADING && (
									<Button
										color="danger"
										variant="light"
										onPress={handleClose}
									>
										Close
									</Button>
								)}
								{uploadState === UploadState.READY && (
									<Button
										className="bg-green-500 text-white text-md"
										isDisabled={imagesToUpload.length === 0}
										onPress={handleUpload}
									>
										Upload Images
									</Button>
								)}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default UploadImageModal;
