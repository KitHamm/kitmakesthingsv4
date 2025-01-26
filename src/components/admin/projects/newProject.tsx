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
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// functions
import { addNewProject } from "@/server/projectTrackerActions/addNewProject";
// types
import { Client } from "@prisma/client";
import { ProjectForm } from "@/lib/types";

const NewProject = ({ clients }: Readonly<{ clients: Client[] }>) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [formError, setFormError] = useState<string | null>(null);
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
		setValue,
		watch,
	} = useForm<ProjectForm>();

	const date = watch("dateDue");
	const onSubmit = async (data: ProjectForm) => {
		if (data.clientId === undefined || data.dateDue === undefined) {
			setFormError("Please fill out all fields.");
			return;
		}
		try {
			const res = await addNewProject(data);
			if (res.success) {
				setFormError(null);
				reset();
				onOpenChange();
			} else {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	const handleClose = () => {
		reset();
		setFormError(null);
		onClose();
	};

	return (
		<>
			<Button
				onPress={onOpen}
				className="bg-green-500 text-white text-md rounded-lg"
			>
				New Project
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								New Project
							</ModalHeader>
							<form onSubmit={handleSubmit(onSubmit)}>
								<ModalBody>
									<input
										type="text"
										{...register("name", {
											required: {
												value: true,
												message: "Name is required",
											},
										})}
										placeholder={
											errors.name
												? errors.name.message
												: "Project Name"
										}
										className={
											errors.name
												? "placeholder:text-red-400"
												: ""
										}
									/>
									<Select
										onChange={(e) => {
											setValue(
												"clientId",
												e.target.value
											);
										}}
										label="Select a client"
										className="w-full mb-4"
									>
										{clients.map((client: Client) => (
											<SelectItem key={client.id}>
												{client.name}
											</SelectItem>
										))}
									</Select>
									<input
										type="date"
										value={
											date
												? date
														.toISOString()
														.split("T")[0]
												: ""
										}
										onChange={(e) => {
											if (e.target.valueAsDate)
												setValue(
													"dateDue",
													e.target.valueAsDate
												);
										}}
									/>
									{formError && (
										<p className="text-red-400">
											{formError}
										</p>
									)}
								</ModalBody>
								<ModalFooter>
									<Button
										type="button"
										color="danger"
										variant="light"
										className="text-md rounded-lg"
										onPress={handleClose}
									>
										Close
									</Button>
									<Button
										type="submit"
										className="bg-green-500 text-white text-md rounded-lg"
									>
										Submit
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default NewProject;
