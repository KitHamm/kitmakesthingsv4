"use client";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	CircularProgress,
	Chip,
} from "@nextui-org/react";
import { ContentProjectForm } from "@/lib/types";
import { useFieldArray, useForm } from "react-hook-form";
import { ContentProject, Images } from "@prisma/client";
import { addProject, deleteProject } from "@/components/actions/ProjectActions";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function ProjectsMain(props: {
	projects: ContentProject[];
	images: Images[];
}) {
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploading, setUploading] = useState(false);
	const [imageToUpload, setImageToUpload] = useState<File | null>(null);
	const [uploadForm, setUploadForm] = useState(false);
	const [newStackItem, setNewStackItem] = useState("");
	const newProjectTextArea = useRef<HTMLTextAreaElement | null>(null);
	const projectShortTextArea = useRef<HTMLTextAreaElement | null>(null);
	const [newProjectTextAreaValue, setNewProjectTextAreaValue] = useState("");
	const [projectShortTextAreaValue, setProjectShortTextAreaValue] =
		useState("");

	const newProjectForm = useForm<ContentProjectForm>({
		defaultValues: {
			name: "",
		},
	});
	const {
		register: registerAddProject,
		handleSubmit: handleSubmitAddProject,
		reset: resetAddProject,
		formState: formStateAddProject,
		setValue: setValueAddProject,
		getValues: getValuesAddProject,
		control: controlAddProject,
	} = newProjectForm;
	const {
		fields: fieldsStack,
		append: appendStack,
		remove: removeStack,
	} = useFieldArray({
		control: controlAddProject,
		name: "stack",
	});
	const {
		fields: fieldsImages,
		append: appendImages,
		remove: removeImages,
	} = useFieldArray({
		control: controlAddProject,
		name: "images",
	});
	const { errors: errorsAddProject } = formStateAddProject;
	const {
		isOpen: isOpenAddProject,
		onOpen: onOpenAddProject,
		onOpenChange: onOpenChangeAddProject,
		onClose: onCloseAddProject,
	} = useDisclosure();

	const {
		isOpen: isOpenImageSelect,
		onOpen: onOpenImageSelect,
		onOpenChange: onOpenChangeImageSelect,
		onClose: onCloseImageSelect,
	} = useDisclosure();

	const { ref: addProjectRef, ...addProjectRest } = registerAddProject(
		"description",
		{
			required: {
				value: true,
				message: "Description is required.",
			},
			onChange: (e) => {
				setNewProjectTextAreaValue(e);
			},
		}
	);

	const { ref: projectShortRef, ...projectShortRest } = registerAddProject(
		"short",
		{
			required: {
				value: true,
				message: "Short is required.",
			},
			onChange: (e) => {
				setNewProjectTextAreaValue(e);
			},
		}
	);

	// Functions

	function HandleReset() {
		resetAddProject({
			name: "",
			slug: "",
			role: "",
			where: "",
			date: "",
			client: "",
			description: "",
			short: "",
			outLink: "",
			outLinkText: "",
			order: 0,
		});
		for (let i = 0; i < fieldsImages.length; i++) {
			removeImages(i);
		}
		for (let i = 0; i < fieldsStack.length; i++) {
			removeStack(i);
		}
		setNewProjectTextAreaValue("");
		setProjectShortTextAreaValue("");
	}

	function dropHandler(ev: any) {
		if (ev.dataTransfer.items) {
			[...ev.dataTransfer.items].forEach((item, i) => {
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
			return;
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
						onCloseImageSelect();
						appendImages({ url: res.data.message });
					}
				})
				.catch((err) => console.log(err));
		}
	}

	// useEffects
	useEffect(() => {
		if (!isOpenAddProject) {
			setNewProjectTextAreaValue("");
		}
	}, [onOpenChangeAddProject, isOpenAddProject]);

	useEffect(() => {
		if (newProjectTextArea.current !== null) {
			newProjectTextArea.current!.style.height = "inherit";

			newProjectTextArea.current!.style.height = `${Math.max(
				newProjectTextArea.current!.scrollHeight,
				32
			)}px`;
		}
	}, [newProjectTextAreaValue]);

	useEffect(() => {
		if (projectShortTextArea.current !== null) {
			projectShortTextArea.current!.style.height = "inherit";

			projectShortTextArea.current!.style.height = `${Math.max(
				projectShortTextArea.current!.scrollHeight,
				32
			)}px`;
		}
	}, [projectShortTextAreaValue]);

	// Functions

	function OnSubmitAddProject(data: ContentProjectForm) {
		console.log(typeof data.order);
		addProject(data)
			.then(() => {
				onCloseAddProject();
				HandleReset();
			})
			.catch((err) => console.log(err));
	}

	function HandleOpenProject(index: number) {
		resetAddProject({
			name: props.projects[index].name,
			slug: props.projects[index].slug,
			role: props.projects[index].role,
			where: props.projects[index].where,
			date: props.projects[index].date ? props.projects[index].date : "",
			client: props.projects[index].client
				? props.projects[index].client
				: "",
			description: props.projects[index].description,
			short: props.projects[index].short
				? props.projects[index].short
				: "",
			outLink: props.projects[index].outLink
				? props.projects[index].outLink
				: "",
			outLinkText: props.projects[index].outLinkText
				? props.projects[index].outLinkText
				: "",
			order: props.projects[index].order,
		});
		for (let i = 0; i < props.projects[index].images.length; i++) {
			appendImages({ url: props.projects[index].images[i] });
		}
		for (let i = 0; i < props.projects[index].stack.length; i++) {
			appendStack({ name: props.projects[index].stack[i] });
		}
		setNewProjectTextAreaValue(props.projects[index].description);
		onOpenAddProject();
	}

	function handleDelete(slug: string) {
		deleteProject(slug).catch((err) => console.log(err));
	}

	return (
		<div className="mx-4">
			<div className="font-bold text-6xl mb-6 pb-4 text-center xl:text-start border-b-2">
				Projects.
			</div>
			<Button
				onPress={() => {
					onOpenAddProject();
					resetAddProject();
				}}
				className="bg-green-500"
			>
				Add Project
			</Button>
			<div className="mt-8 xl:w-fit">
				{props.projects.map(
					(project: ContentProject, index: number) => {
						return (
							<div
								onClick={() => {
									HandleOpenProject(index);
								}}
								className="mb-4"
								key={index}
							>
								<div className="transition-all cursor-pointer hover:bg-green-500 hover:text-white bg-neutral-100 shadow rounded-lg px-4 py-2 w-full flex flex-col xl:flex-row xl:gap-8">
									<div className="font-bold text-xl my-auto">
										{project.name}
									</div>
									<div className="font-bold my-auto">
										{project.client}
									</div>
									<div className="font-bold grow my-auto">
										Images: {project.images.length}
									</div>
									<div className="flex flex-col xl:flex-row gap-4">
										<Image
											src={
												process.env
													.NEXT_PUBLIC_BASE_IMAGE_URL +
												project.images[0]
											}
											width={200}
											height={200}
											alt={project.images[0]}
											className="mx-auto"
										/>
										<Button
											onPress={() => {
												handleDelete(project.slug);
											}}
											className="my-auto"
											color="danger"
											variant="light"
										>
											Delete
										</Button>
									</div>
								</div>
							</div>
						);
					}
				)}
			</div>
			<Modal
				isDismissable={false}
				scrollBehavior="outside"
				size="5xl"
				isOpen={isOpenAddProject}
				onOpenChange={onOpenChangeAddProject}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Project
							</ModalHeader>
							<form
								onSubmit={handleSubmitAddProject(
									OnSubmitAddProject
								)}
							>
								<ModalBody>
									<div className="flex flex-col xl:flex-row xl:gap-10">
										<div className="xl:w-1/2">
											<label
												className="font-bold"
												htmlFor="name"
											>
												Project Name
											</label>
											<input
												type="text"
												{...registerAddProject("name", {
													required: {
														value: true,
														message:
															"Project Name is required",
													},
												})}
												placeholder={
													errorsAddProject.name
														? errorsAddProject.name
																.message
														: "Project Name"
												}
												className={
													errorsAddProject.name
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
										<div className="xl:w-1/2 flex gap-6">
											<div className="xl:w-1/2">
												<label
													className="font-bold"
													htmlFor="name"
												>
													Slug
												</label>
												<input
													type="text"
													{...registerAddProject(
														"slug",
														{
															required: {
																value: true,
																message:
																	"Slug is required",
															},
														}
													)}
													placeholder={
														errorsAddProject.slug
															? errorsAddProject
																	.slug
																	.message
															: "Slug"
													}
													className={
														errorsAddProject.slug
															? "placeholder:text-red-400"
															: ""
													}
												/>
											</div>
											<div className="xl:w-1/2">
												<label
													className="font-bold"
													htmlFor="name"
												>
													Order
												</label>
												<input
													type="number"
													{...registerAddProject(
														"order",
														{
															required: {
																value: true,
																message:
																	"Order is required",
															},
															valueAsNumber: true,
														}
													)}
													placeholder={
														errorsAddProject.order
															? errorsAddProject
																	.order
																	.message
															: "0"
													}
													className={
														errorsAddProject.order
															? "placeholder:text-red-400"
															: ""
													}
												/>
											</div>
										</div>
									</div>
									<div className="flex flex-col xl:flex-row xl:gap-10">
										<div className="xl:w-1/2">
											<label
												className="font-bold"
												htmlFor="name"
											>
												Role
											</label>
											<input
												type="text"
												{...registerAddProject("role", {
													required: {
														value: true,
														message:
															"Role is required",
													},
												})}
												placeholder={
													errorsAddProject.role
														? errorsAddProject.role
																.message
														: "Role"
												}
												className={
													errorsAddProject.role
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
										<div className="xl:w-1/2">
											<label
												className="font-bold"
												htmlFor="name"
											>
												Where
											</label>
											<input
												type="text"
												{...registerAddProject(
													"where",
													{
														required: {
															value: true,
															message:
																"Where is required",
														},
													}
												)}
												placeholder={
													errorsAddProject.where
														? errorsAddProject.where
																.message
														: "Where"
												}
												className={
													errorsAddProject.where
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
									</div>
									<div className="flex flex-col xl:flex-row xl:gap-10">
										<div className="xl:w-1/2">
											<label
												className="font-bold"
												htmlFor="name"
											>
												Date
											</label>
											<input
												type="text"
												{...registerAddProject("date", {
													required: {
														value: true,
														message:
															"Date is required",
													},
												})}
												placeholder={
													errorsAddProject.date
														? errorsAddProject.date
																.message
														: "Date"
												}
												className={
													errorsAddProject.date
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
										<div className="xl:w-1/2">
											<label
												className="font-bold"
												htmlFor="name"
											>
												Client
											</label>
											<input
												type="text"
												{...registerAddProject(
													"client",
													{
														required: {
															value: true,
															message:
																"Client is required",
														},
													}
												)}
												placeholder={
													errorsAddProject.client
														? errorsAddProject
																.client.message
														: "Client"
												}
												className={
													errorsAddProject.client
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
									</div>

									<div className="flex flex-col xl:flex-row xl:gap-10">
										<div className="xl:w-1/2">
											<label
												className="font-bold"
												htmlFor="outLink"
											>
												Out Link
											</label>
											<input
												type="text"
												{...registerAddProject(
													"outLink"
												)}
												placeholder={"Out Link"}
											/>
										</div>
										<div className="xl:w-1/2">
											<label
												className="font-bold"
												htmlFor="name"
											>
												Out Link Text
											</label>
											<input
												type="text"
												{...registerAddProject(
													"outLinkText"
												)}
												placeholder={"Out Link Text"}
											/>
										</div>
									</div>
									<label className="font-bold" htmlFor="name">
										Short
									</label>
									<textarea
										ref={(e) => {
											projectShortRef(e);
											projectShortTextArea.current = e;
										}}
										placeholder={
											errorsAddProject.short
												? errorsAddProject.short.message
												: "Short"
										}
										className={
											errorsAddProject.short
												? "placeholder:text-red-400"
												: ""
										}
										{...projectShortRest}
									/>
									<label className="font-bold" htmlFor="name">
										Description
									</label>
									<textarea
										ref={(e) => {
											addProjectRef(e);
											newProjectTextArea.current = e;
										}}
										placeholder={
											errorsAddProject.description
												? errorsAddProject.description
														.message
												: "Description"
										}
										className={
											errorsAddProject.description
												? "placeholder:text-red-400"
												: ""
										}
										{...addProjectRest}
									/>
									<label className="font-bold" htmlFor="name">
										Tech Stack
									</label>
									<div className="flex flex-wrap gap-4">
										{fieldsStack.map((field, index) => {
											return (
												<Chip
													key={"stack " + index}
													className="bg-green-500"
												>
													{field.name}
												</Chip>
											);
										})}
									</div>
									<div className="xl:w-1/4 flex gap-4">
										<input
											value={newStackItem}
											onChange={(e) =>
												setNewStackItem(e.target.value)
											}
											type="text"
										/>
										<Button
											onPress={() => {
												appendStack({
													name: newStackItem,
												});
												setNewStackItem("");
											}}
											isDisabled={newStackItem === ""}
											className="my-auto bg-green-500"
										>
											Add
										</Button>
									</div>
									<label className="font-bold" htmlFor="name">
										Images
									</label>
									<div className="grid grid-cols-2 xl:grid-cols-4">
										{fieldsImages.map((field, index) => {
											return (
												<div
													onClick={() =>
														removeImages(index)
													}
													className="cursor-pointer"
													key={index}
												>
													<Image
														src={
															process.env
																.NEXT_PUBLIC_BASE_IMAGE_URL +
															field.url
														}
														width={200}
														height={200}
														alt={"image " + index}
													/>
												</div>
											);
										})}
									</div>
									<Button
										onPress={onOpenImageSelect}
										className="bg-green-500"
									>
										Add Image
									</Button>
								</ModalBody>
								<ModalFooter>
									<Button
										type="button"
										color="danger"
										variant="light"
										onPress={() => {
											onClose();
											HandleReset();
										}}
									>
										Close
									</Button>
									<Button
										type="submit"
										className="bg-green-500"
									>
										Save
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
			<Modal
				scrollBehavior="outside"
				backdrop="blur"
				size={uploadForm ? "xl" : "5xl"}
				isOpen={isOpenImageSelect}
				onOpenChange={onOpenChangeImageSelect}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex text-4xl text-center flex-col gap-1">
								{uploadForm ? "Upload Image" : "Select Image"}
							</ModalHeader>
							<ModalBody>
								{uploadForm ? (
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
														{imageToUpload ===
														null ? (
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
																	or drag and
																	drop
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
															if (
																e.target.files
															) {
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
								) : (
									<div className="grid xl:grid-cols-4 grid-cols-2 gap-4 ">
										{props.images.map(
											(image: Images, index: number) => {
												return (
													<div
														className="relative bg-neutral-200 p-4 shadow"
														key={image.url}
													>
														<Image
															src={
																process.env
																	.NEXT_PUBLIC_BASE_IMAGE_URL +
																image.url
															}
															alt={image.url}
															width={400}
															height={400}
															className="w-full h-auto"
														/>
														<div
															onClick={(e) => {
																appendImages({
																	url: image.url,
																});
																onClose();
															}}
															className="absolute cursor-pointer flex justify-center opacity-0 hover:opacity-100 top-0 left-0 w-full h-full bg-neutral-400 bg-opacity-75 transition-all duration-300"
														>
															<div className="my-auto font-bold text-white text-4xl">
																Select
															</div>
														</div>
													</div>
												);
											}
										)}
									</div>
								)}
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										setImageToUpload(null);
										setUploading(false);

										setUploadForm(
											props.images.length > 0
												? false
												: true
										);
										onClose();
									}}
								>
									Close
								</Button>
								<Button
									className="bg-green-500"
									isDisabled={
										imageToUpload === null && uploadForm
											? true
											: false
									}
									onPress={() => {
										if (uploadForm) {
											if (imageToUpload !== null) {
												uploadImage(imageToUpload);
											}
										} else {
											setUploadForm(true);
										}
									}}
								>
									{uploadForm ? "Upload" : "Switch to Upload"}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
