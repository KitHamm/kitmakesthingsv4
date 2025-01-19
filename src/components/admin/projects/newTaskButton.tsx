"use client";

import { addNewTask } from "@/server/projectTrackerActions/addNewTask";
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
import { TaskPriority } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PriorityType, TaskForm } from "@/lib/types";

const priority: PriorityType[] = [
	{ label: "Low", key: TaskPriority.LOW },
	{ label: "Medium", key: TaskPriority.MEDIUM },
	{ label: "High", key: TaskPriority.HIGH },
];

export default function NewTask(props: Readonly<{ projectId: string }>) {
	const [formError, setFormError] = useState("");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const taskForm = useForm<TaskForm>();
	const { register, reset, handleSubmit, setValue, formState } = taskForm;
	const { errors } = formState;

	function submitNewTask(data: TaskForm) {
		if (!data.priority) {
			setFormError("Please select a priority.");
		} else {
			addNewTask(data)
				.then((res) => {
					if (res.status === 200) {
						reset();
						onOpenChange();
						setFormError("");
					} else {
						console.log(res.message);
						setFormError("Something went wrong.");
					}
				})
				.catch((err) => {
					console.log(err);
					setFormError("Something went wrong.");
				});
		}
	}
	return (
		<>
			<Button
				onPress={onOpen}
				className="bg-green-500 text-white text-md"
			>
				New Task
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								New Task
							</ModalHeader>
							<form onSubmit={handleSubmit(submitNewTask)}>
								<ModalBody>
									<input
										type="hidden"
										value={props.projectId}
										{...register("projectId")}
									/>
									<textarea
										{...register("description", {
											required: {
												value: true,
												message: "Required.",
											},
										})}
										placeholder={
											errors.description
												? errors.description.message
												: "Details"
										}
										className={
											errors.description
												? "placeholder:text-red-400"
												: ""
										}
									/>
									<Select
										onChange={(e) => {
											switch (e.target.value) {
												case "LOW":
													setValue(
														"priority",
														TaskPriority.LOW
													);
													return;
												case "MEDIUM":
													setValue(
														"priority",
														TaskPriority.MEDIUM
													);
													return;
												case "HIGH":
													setValue(
														"priority",
														TaskPriority.HIGH
													);
													return;
											}
										}}
										label="Priority"
										className="w-full mb-4"
									>
										{priority.map((p: PriorityType) => (
											<SelectItem key={p.key}>
												{p.label}
											</SelectItem>
										))}
									</Select>
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
										onPress={() => {
											reset();
											setFormError("");
											onClose();
										}}
									>
										Close
									</Button>
									<Button
										type="submit"
										className="bg-green-500 text-white"
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
