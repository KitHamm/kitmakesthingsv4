"use client";

import { revalidateMedia } from "@/components/actions/MediaActions";
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
import axios from "axios";
import { useState } from "react";

export default function UploadImageModal() {
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [imageToUpload, setImageToUpload] = useState<File | null>(null);

	const {
		isOpen: isOpenUpload,
		onOpen: onOpenUpload,
		onOpenChange: onOpenChangeUpload,
		onClose: onCloseUpload,
	} = useDisclosure();

	function dropHandler(ev: any) {
		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			[...ev.dataTransfer.items].forEach((item, i) => {
				// If dropped items aren't files, reject them
				if (
					item.kind === "file" &&
					item.type.split("/")[0] === "image"
				) {
					const file = item.getAsFile();
					setImageToUpload(file);
				}
			});
		}
	}

	async function uploadImage(file: File) {
		setUploading(true);
		setUploadProgress(0);
		if (file.type.split("/")[0] !== "image") {
			setUploading(false);
		} else {
			const formData = new FormData();
			formData.append("file", file);
			axios
				.post("/api/upload", formData, {
					headers: { "Content-Type": "multipart/form-data" },
					onUploadProgress: (ProgressEvent) => {
						if (ProgressEvent.bytes) {
							let percent = Math.round(
								(ProgressEvent.loaded / ProgressEvent.total!) *
									100
							);
							setUploadProgress(percent);
						}
					},
				})
				.then((res) => {
					if (res.data.message) {
						setUploading(false);
						setImageToUpload(null);
						onCloseUpload();
						revalidateMedia();
					}
				})
				.catch((err) => console.log(err));
		}
	}

	return (
		<>
			<Button
				onPress={onOpenUpload}
				className="bg-green-500 text-md text-white"
			>
				Upload New Image
			</Button>
			<Modal
				backdrop="blur"
				size={"xl"}
				isOpen={isOpenUpload}
				onOpenChange={onOpenChangeUpload}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex text-4xl text-center flex-col gap-1">
								Upload Image
							</ModalHeader>
							<ModalBody>
								<div>
									{uploading ? (
										<div className="flex justify-center">
											<CircularProgress
												aria-label="Uploading"
												value={uploadProgress}
												classNames={{
													svg: "w-36 h-36 ",
													indicator:
														"stroke-green-500",
													track: "stroke-neutral-400/50",
													value: "text-3xl font-semibold text-white",
												}}
											/>
										</div>
									) : (
										<div className="flex items-center justify-center w-full">
											<label
												id="drop_zone"
												onDrop={(e) => {
													e.preventDefault();
													dropHandler(e);
												}}
												onDragOver={(e) => {
													e.preventDefault();
												}}
												htmlFor="dropzone-file"
												className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
											>
												<div className="flex flex-col items-center justify-center pt-5 pb-6">
													{imageToUpload === null ? (
														<>
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
																	Click to
																	upload
																</span>{" "}
																or drag and drop
															</p>
														</>
													) : (
														<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
															<span className="font-semibold">
																{
																	imageToUpload?.name
																}
															</span>
														</p>
													)}
												</div>
												<input
													onChange={(e) => {
														if (e.target.files) {
															setImageToUpload(
																e.target
																	.files[0]
															);
														}
													}}
													id="dropzone-file"
													name="dropzone-file"
													type="file"
													className="hidden"
												/>
											</label>
										</div>
									)}
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										setImageToUpload(null);
										setUploading(false);

										onClose();
									}}
								>
									Close
								</Button>
								<Button
									className="bg-green-500"
									isDisabled={imageToUpload === null}
									onPress={() => {
										if (imageToUpload !== null) {
											uploadImage(imageToUpload);
										}
									}}
								>
									Upload
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
