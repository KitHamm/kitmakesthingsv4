"use client";

import {
	Button,
	DatePicker,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import { createInvoice } from "@/server/invoiceActions/createInvoice";
import NewItemModal from "./InvoiceItemModal";
import { Client } from "@prisma/client";
import { InvoiceForm } from "@/lib/types";

export default function NewInvoiceModal(
	props: Readonly<{
		clients: Client[];
		referencePlaceholder: string;
	}>
) {
	const [newItemDescription, setNewItemDescription] = useState("");
	const [newItemQuantity, setNewItemQuantity] = useState(0.0);
	const [newItemUnitPrice, setNewItemUnitPrice] = useState(0.0);
	const [newItemSubTotal, setNewItemSubTotal] = useState(0.0);
	const [newInvoiceTotal, setNewInvoiceTotal] = useState(0.0);
	const {
		isOpen: isOpenNewInvoice,
		onOpenChange: onOpenChangeNewInvoice,
		onClose: onCloseNewInvoice,
	} = useDisclosure();
	const { isOpen: isOpenNewItem, onOpenChange: onOpenChangeNewItem } =
		useDisclosure();

	const invoiceForm = useForm<InvoiceForm>({
		defaultValues: {
			total: 0.0,
		},
	});

	const { register, reset, formState, handleSubmit, control, setValue } =
		invoiceForm;
	const { errors } = formState;
	const { fields, append, remove } = useFieldArray({
		name: "items",
		control,
	});

	useEffect(() => {
		if (newItemQuantity > 0 && newItemUnitPrice > 0) {
			setNewItemSubTotal(newItemUnitPrice * newItemQuantity);
		}
	}, [newItemQuantity, newItemUnitPrice]);

	useEffect(() => {
		if (fields.length > 0) {
			let total = 0;
			for (const field of fields) {
				total = total + field.subTotal;
			}
			setValue("total", total);
			setNewInvoiceTotal(total);
		}
	}, [fields, newItemQuantity, newItemUnitPrice, newItemSubTotal, setValue]);

	function resetForm() {
		for (let i = 0; i < fields.length; i++) {
			remove(i);
		}
		reset({
			reference: "",
			date: undefined,
			taxYear: "",
			paid: false,
			total: 0.0,
			clientId: "",
			items: [],
		});
		setNewInvoiceTotal(0.0);
	}

	function submitInvoice(data: InvoiceForm) {
		createInvoice(data)
			.then((res) => {
				if (res.status === 200) {
					onCloseNewInvoice();
					resetForm();
				} else {
					console.log(res.message);
				}
			})
			.catch((err) => console.log(err));
	}
	return (
		<>
			<div className="mb-6 flex flex-col lg:flex-row gap-4">
				<Button
					onPress={() => {
						onOpenChangeNewInvoice();
					}}
					className="bg-green-500 w-full lg:w-auto"
				>
					New Invoice
				</Button>
			</div>
			<Modal
				size="2xl"
				scrollBehavior="outside"
				isOpen={isOpenNewInvoice}
				onOpenChange={onOpenChangeNewInvoice}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								New Invoice
							</ModalHeader>
							<form onSubmit={handleSubmit(submitInvoice)}>
								<ModalBody className="gap-2">
									<div className="flex flex-col lg:flex-row lg:gap-8 gap-4 mb-4 lg:mb-0">
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
											{props.clients.map(
												(client: Client) => (
													<SelectItem key={client.id}>
														{client.name}
													</SelectItem>
												)
											)}
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
													date.setUTCHours(
														0,
														0,
														0,
														0
													);
													setValue("date", date);
												}
											}}
										/>
									</div>

									<div className="flex flex-col lg:flex-row lg:gap-8">
										<div className="lg:w-1/2">
											<label
												className="font-bold"
												htmlFor="reference"
											>
												Reference:
											</label>
											<input
												type="text"
												{...register("reference", {
													required: {
														value: true,
														message:
															"Reference is required.",
													},
												})}
												placeholder={
													errors.reference
														? errors.reference
																.message
														: props.referencePlaceholder
												}
												className={
													errors.reference
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
										<div className="lg:w-1/2">
											<label
												className="font-bold"
												htmlFor="reference"
											>
												Tax Year:
											</label>
											<input
												type="text"
												{...register("taxYear", {
													required: {
														value: true,
														message:
															"Tax Year is required.",
													},
												})}
												placeholder={
													errors.taxYear
														? errors.taxYear.message
														: "Tax Year"
												}
												className={
													errors.taxYear
														? "placeholder:text-red-400"
														: ""
												}
											/>
										</div>
									</div>
									<div className="font-bold border-b-2 pb-2">
										Items:
									</div>
									{fields.length > 0 ? (
										fields.map((field, index) => {
											return (
												<button
													onClick={() =>
														remove(index)
													}
													key={field.id}
													className="text-left border-b-2 pb-4"
												>
													<div>
														<div className="font-bold">
															Description:
														</div>
														<div className="font-normal">
															<Markdown>
																{
																	field.description
																}
															</Markdown>
														</div>
														<div className="flex justify-between">
															<div className="flex flex-col">
																<div className="font-bold">
																	Quant.
																</div>
																<div className="text-end">
																	{
																		field.quantity
																	}
																</div>
															</div>
															<div className="flex flex-col">
																<div className="font-bold">
																	Unit Price
																</div>
																<div className="text-end">
																	£
																	{field.unitPrice.toLocaleString()}
																</div>
															</div>
															<div className="flex flex-col">
																<div className="font-bold">
																	Sub Total
																</div>
																<div className="text-end">
																	£
																	{field.subTotal.toLocaleString()}
																</div>
															</div>
														</div>
													</div>
												</button>
											);
										})
									) : (
										<div>No Items</div>
									)}
									<div className="flex justify-between">
										<NewItemModal append={append} />
										<div className="flex gap-2 my-auto">
											<div className="font-bold">
												Total:
											</div>
											<div>
												£
												{newInvoiceTotal.toLocaleString()}
											</div>
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
											resetForm();
										}}
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
			<Modal isOpen={isOpenNewItem} onOpenChange={onOpenChangeNewItem}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Invoice Item
							</ModalHeader>
							<ModalBody>
								<div>
									<label
										className="font-bold"
										htmlFor="description"
									>
										Description:
									</label>
									<textarea
										name="description"
										value={newItemDescription}
										placeholder="Description..."
										onChange={(e) =>
											setNewItemDescription(
												e.target.value
											)
										}
									/>
								</div>
								<div>
									<label
										className="font-bold"
										htmlFor="description"
									>
										Quantity:
									</label>
									<input
										type="number"
										value={newItemQuantity || ``}
										onChange={(e) =>
											setNewItemQuantity(
												parseFloat(e.target.value)
											)
										}
										placeholder="Quantity"
									/>
								</div>
								<div>
									<label
										className="font-bold"
										htmlFor="description"
									>
										Unit Price:
									</label>
									<input
										type="number"
										value={newItemUnitPrice || ``}
										onChange={(e) =>
											setNewItemUnitPrice(
												parseFloat(e.target.value)
											)
										}
										placeholder="Unit Price"
									/>
								</div>
								<div>
									<label
										className="font-bold"
										htmlFor="description"
									>
										Sub Total:
									</label>
									<input
										type="number"
										value={newItemSubTotal || ``}
										onChange={(e) => {}}
										placeholder="Sub Total (Automatic)"
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										onClose();
										setNewItemDescription("");
										setNewItemQuantity(0.0);
										setNewItemUnitPrice(0.0);
										setNewItemSubTotal(0.0);
									}}
								>
									Close
								</Button>
								<Button
									className="bg-green-500"
									onPress={() => {
										append({
											description: newItemDescription,
											quantity: newItemQuantity,
											unitPrice: newItemUnitPrice,
											subTotal: newItemSubTotal,
										});
										onClose();
										setNewItemDescription("");
										setNewItemQuantity(0.0);
										setNewItemUnitPrice(0.0);
										setNewItemSubTotal(0.0);
									}}
								>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
