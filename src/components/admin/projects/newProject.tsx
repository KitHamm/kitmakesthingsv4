"use client";

import { addNewProject } from "@/components/actions/WorkingProjectActions";
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
	DatePicker,
	DateValue,
} from "@nextui-org/react";
import { Client } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectForm } from "@/lib/types";

export default function NewProject(props: { clients: Client[] }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [formError, setFormError] = useState("");
	const projectForm = useForm<ProjectForm>();
	const {
		register,
		reset,
		formState,
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
	} = projectForm;
	const { errors } = formState;
	function onProjectSubmit(data: ProjectForm) {
		if (data.clientId === undefined || data.dateDue === undefined) {
			setFormError("Please fill out all fields.");
		} else {
			addNewProject(data)
				.then(() => {
					setFormError("");
					reset();
					onOpenChange();
				})
				.catch((err) => console.log(err));
		}
	}
	return (
		<>
			<Button onPress={onOpen} className="bg-green-500">
				New Project
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								New Project
							</ModalHeader>
							<form onSubmit={handleSubmit(onProjectSubmit)}>
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
										{props.clients.map((client: Client) => (
											<SelectItem key={client.id}>
												{client.name}
											</SelectItem>
										))}
									</Select>
									<DatePicker
										className="w-full"
										label="Date"
										onChange={(e) => {
											if (e) {
												const date = new Date(
													e.year,
													e.month - 1,
													e.day
												);
												date.setUTCHours(0, 0, 0, 0);
												setValue("dateDue", date);
											}
										}}
									/>
									{formError !== "" && (
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
										onPress={onClose}
									>
										Close
									</Button>
									<Button
										type="submit"
										className="bg-green-500"
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
}
