"use client";

import { createExpense } from "@/server/invoiceActions/createExpense";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";

export type NewExpenseFormData = {
	title: string;
	description: string;
	amount: number;
	taxYear: string;
	retailer: string;
};

export default function NewExpenseModal() {
	const { isOpen, onClose, onOpenChange } = useDisclosure();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewExpenseFormData>({
		defaultValues: {
			title: "",
			description: "",
			amount: 0.0,
			taxYear: "",
			retailer: "",
		},
	});

	async function onSubmit(data: NewExpenseFormData) {
		try {
			const response = await createExpense(data);
			if (response.success) {
				onClose();
				reset();
			} else {
				console.log(response.error);
			}
		} catch (error) {
			console.error("Error creating expense:", error);
		}
	}

	return (
		<>
			<Button onPress={onOpenChange} className="bg-green-500 rounded-lg w-full lg:w-auto text-white text-md">
				New Expense
			</Button>
			<Modal size="2xl" backdrop="blur" scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">New Expense</ModalHeader>
							<form onSubmit={handleSubmit(onSubmit)}>
								<ModalBody className="gap-4">
									<div className="flex flex-col gap-4">
										<div className="flex flex-col gap-2">
											<label htmlFor="title" className="text-sm font-medium text-gray-700">
												Title
											</label>
											<input
												id="title"
												type="text"
												placeholder="Enter expense title"
												className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
												{...register("title", { required: "Title is required" })}
											/>
											{errors.title && <span className="text-sm text-red-500">{errors.title.message}</span>}
										</div>
										<div className="flex flex-col gap-2">
											<label htmlFor="description" className="text-sm font-medium text-gray-700">
												Description
											</label>
											<textarea
												id="description"
												placeholder="Enter expense description"
												rows={3}
												className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
												{...register("description", { required: "Description is required" })}
											/>
											{errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
										</div>
										<div className="flex flex-col gap-2">
											<label htmlFor="amount" className="text-sm font-medium text-gray-700">
												Amount
											</label>
											<input
												id="amount"
												type="number"
												step="0.01"
												min="0"
												placeholder="0.00"
												className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
												{...register("amount", {
													required: "Amount is required",
													valueAsNumber: true,
													min: { value: 0.01, message: "Amount must be greater than 0" },
												})}
											/>
											{errors.amount && <span className="text-sm text-red-500">{errors.amount.message}</span>}
										</div>
										<div className="flex flex-col gap-2">
											<label htmlFor="retailer" className="text-sm font-medium text-gray-700">
												Retailer
											</label>
											<input
												id="retailer"
												type="text"
												placeholder="Enter retailer name"
												className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
												{...register("retailer", { required: "Retailer is required" })}
											/>
											{errors.retailer && <span className="text-sm text-red-500">{errors.retailer.message}</span>}
										</div>
										<div className="flex flex-col gap-2">
											<label htmlFor="taxYear" className="text-sm font-medium text-gray-700">
												Tax Year
											</label>
											<input
												id="taxYear"
												type="text"
												placeholder="2025-2026"
												className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
												{...register("taxYear", {
													required: "Tax year is required",
													pattern: {
														value: /^\d{4}-\d{4}$/,
														message: "Please enter a valid tax year range (e.g., 2025-2026)",
													},
												})}
											/>
											{errors.taxYear && <span className="text-sm text-red-500">{errors.taxYear.message}</span>}
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<Button
										type="button"
										color="danger"
										variant="light"
										onPress={() => {
											onClose();
											reset();
										}}
									>
										Close
									</Button>
									<Button type="submit" className="bg-green-500 text-white font-semibold">
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
