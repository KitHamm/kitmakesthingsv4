"use client";

import { addNewProject } from "@/server/projectTrackerActions/addNewProject";
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
import { Client } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectForm } from "@/lib/types";

export default function NewProject(props: Readonly<{ clients: Client[] }>) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [formError, setFormError] = useState("");
	const projectForm = useForm<ProjectForm>();
	const { register, reset, formState, handleSubmit, setValue, watch } =
		projectForm;
	const { errors } = formState;
	const date = watch("dateDue");
	function onProjectSubmit(data: ProjectForm) {
		if (data.clientId === undefined || data.dateDue === undefined) {
			setFormError("Please fill out all fields.");
		} else {
			addNewProject(data)
				.then((res) => {
					if (res.status === 200) {
						setFormError("");
						reset();
						onOpenChange();
					} else {
						console.log(res.message);
					}
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
