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
import { addNewTask } from "@/server/projectTrackerActions/addNewTask";
// types
import { TaskPriority } from "@prisma/client";
import { PriorityType, TaskForm } from "@/lib/types";

const priority: PriorityType[] = [
	{ label: "Low", key: TaskPriority.LOW },
	{ label: "Medium", key: TaskPriority.MEDIUM },
	{ label: "High", key: TaskPriority.HIGH },
];

const NewTask = (props: Readonly<{ projectId: string }>) => {
	const [formError, setFormError] = useState<string | null>(null);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TaskForm>();

	const onSubmit = async (data: TaskForm) => {
		if (!data.priority) {
			setFormError("Please select a priority.");
			return;
		}
		try {
			const res = await addNewTask(data);
			if (res.success) {
				reset();
				onOpenChange();
				setFormError(null);
			} else {
				console.log("Error:", res.error);
				setFormError(res.error);
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
							<form onSubmit={handleSubmit(onSubmit)}>
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

export default NewTask;
