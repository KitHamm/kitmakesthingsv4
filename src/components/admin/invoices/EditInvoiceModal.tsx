"use client";

import {
	Button,
	DatePicker,
	DateValue,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { InvoiceStateContext } from "./InvoiceStateProvider";
import { useFieldArray, useForm } from "react-hook-form";
import { InvoiceForm } from "@/lib/types";
import { Client } from "@prisma/client";
import { parseDate } from "@internationalized/date";
import Markdown from "react-markdown";
import { updateInvoice } from "@/components/actions/InvoiceActions";

export default function EditInvoiceModal(props: { clients: Client[] }) {
	const {
		selectedInvoice,
		setSelectedInvoice,
		isOpenEditInvoice,
		onOpenChangeEditInvoice,
	} = useContext(InvoiceStateContext);

	const {
		isOpen: isOpenInvoiceItem,
		onOpen: onOpenInvoiceItem,
		onOpenChange: onOpenChangeInvoiceItem,
		onClose: onCloseInvoiceItem,
	} = useDisclosure();

	const {
		isOpen: isOpenNewItem,
		onOpen: onOpenNewItem,
		onOpenChange: onOpenChangeNewItem,
		onClose: onCloseNewItem,
	} = useDisclosure();

	const [invoiceItemEdit, setInvoiceItemEdit] = useState({
		description: "",
		quantity: 0,
		unitPrice: 0,
		subTotal: 0,
		index: 0,
	});
	const [invoiceTotal, setInvoiceTotal] = useState(0);

	const invoiceForm = useForm<InvoiceForm>();
	const {
		register,
		reset,
		formState,
		handleSubmit,
		control,
		setValue,
		getValues,
	} = invoiceForm;

	const { errors } = formState;

	const { fields, append, remove, update } = useFieldArray({
		name: "items",
		control,
	});

	useEffect(() => {
		if (selectedInvoice.reference) {
			reset({
				reference: selectedInvoice.reference,
				date: selectedInvoice.date,
				taxYear: selectedInvoice.taxYear,
				paid: selectedInvoice.paid,
				total: selectedInvoice.total,
				clientId: selectedInvoice.clientId,
				items: selectedInvoice.invoiceItem,
			});
			setInvoiceTotal(selectedInvoice.total);
		}
	}, [selectedInvoice, reset]);

	useEffect(() => {
		if (!isOpenEditInvoice) {
			reset();
		}
	}, [onOpenChangeEditInvoice, isOpenEditInvoice, reset]);

	function handleSelectInvoiceItem(index: number) {
		setInvoiceItemEdit({
			description: fields[index].description,
			quantity: fields[index].quantity,
			unitPrice: fields[index].unitPrice,
			subTotal: fields[index].subTotal,
			index: index,
		});
	}

	useEffect(() => {
		if (invoiceItemEdit.quantity > 0 && invoiceItemEdit.unitPrice > 0) {
			setInvoiceItemEdit({
				...invoiceItemEdit,
				subTotal: invoiceItemEdit.quantity * invoiceItemEdit.unitPrice,
			});
		}
	}, [invoiceItemEdit, setInvoiceItemEdit]);

	useEffect(() => {
		if (fields.length > 0) {
			var total = 0;
			for (let i = 0; i < fields.length; i++) {
				total = total + fields[i].subTotal;
			}
			setValue("total", total);
			setInvoiceTotal(total);
		}
	}, [
		fields,
		invoiceItemEdit.quantity,
		invoiceItemEdit.unitPrice,
		invoiceItemEdit.subTotal,
		setValue,
	]);

	function handleUpdateInvoice(data: InvoiceForm) {
		updateInvoice(data)
			.then(() => {
				onOpenChangeEditInvoice(false);
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<Modal
				scrollBehavior="outside"
				size="2xl"
				isOpen={isOpenEditInvoice}
				onOpenChange={onOpenChangeEditInvoice}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col">
								<div>Invoice #{selectedInvoice.reference}</div>
								<div
									className={`${
										selectedInvoice.paid
											? "text-green-500"
											: "text-red-500"
									}`}
								>
									{selectedInvoice.paid ? "Paid" : "Not Paid"}
								</div>
							</ModalHeader>
							<form onSubmit={handleSubmit(handleUpdateInvoice)}>
								<ModalBody>
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
											defaultSelectedKeys={[
												// selectedInvoice.client.id,
												getValues("clientId"),
											]}
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
											defaultValue={parseDate(
												getValues("date")
													.toISOString()
													.split("T")[0]
											)}
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
														: "Reference"
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
												<div
													key={field.id}
													className="border-b-2 pb-4"
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
														<div className="flex gap-4 w-full mt-4 justify-end">
															<Button
																color="danger"
																variant="light"
																onPress={() =>
																	remove(
																		index
																	)
																}
															>
																Remove
															</Button>
															<Button
																onPress={() => {
																	handleSelectInvoiceItem(
																		index
																	);
																	onOpenInvoiceItem();
																}}
																className="bg-green-500"
															>
																Edit
															</Button>
														</div>
													</div>
												</div>
											);
										})
									) : (
										<div>No Items</div>
									)}
									<div className="flex justify-between">
										<Button
											onPress={() =>
												onOpenChangeNewItem()
											}
											className="bg-green-500"
										>
											Add Item
										</Button>
										<div className="flex gap-2 my-auto">
											<div className="font-bold">
												Total:
											</div>
											<div>
												£{invoiceTotal.toLocaleString()}
											</div>
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<Button
										color="danger"
										variant="light"
										onPress={onClose}
									>
										Close
									</Button>
									<Button
										className="bg-green-500"
										type="submit"
									>
										Submit
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
			<Modal
				isOpen={isOpenInvoiceItem}
				onOpenChange={onOpenChangeInvoiceItem}
			>
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
										value={invoiceItemEdit.description}
										placeholder="Description..."
										onChange={(e) =>
											setInvoiceItemEdit({
												...invoiceItemEdit,
												description: e.target.value,
											})
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
										value={invoiceItemEdit.quantity || ``}
										onChange={(e) =>
											setInvoiceItemEdit({
												...invoiceItemEdit,
												quantity: parseFloat(
													e.target.value
												),
											})
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
										value={invoiceItemEdit.unitPrice || ``}
										onChange={(e) =>
											setInvoiceItemEdit({
												...invoiceItemEdit,
												unitPrice: parseFloat(
													e.target.value
												),
											})
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
										value={invoiceItemEdit.subTotal || ``}
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
										setInvoiceItemEdit({
											description: "",
											quantity: 0.0,
											unitPrice: 0.0,
											subTotal: 0.0,
											index: 0,
										});
									}}
								>
									Close
								</Button>
								<Button
									className="bg-green-500"
									onPress={() => {
										update(invoiceItemEdit.index, {
											description:
												invoiceItemEdit.description,
											quantity: invoiceItemEdit.quantity,
											unitPrice:
												invoiceItemEdit.unitPrice,
											subTotal: invoiceItemEdit.subTotal,
										});
										onClose();
										setInvoiceItemEdit({
											description: "",
											quantity: 0.0,
											unitPrice: 0.0,
											subTotal: 0.0,
											index: 0,
										});
									}}
								>
									Submit
								</Button>
							</ModalFooter>
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
										value={
											invoiceItemEdit.description || ``
										}
										placeholder="Description..."
										onChange={(e) =>
											setInvoiceItemEdit({
												...invoiceItemEdit,
												description: e.target.value,
											})
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
										value={invoiceItemEdit.quantity || ``}
										onChange={(e) =>
											setInvoiceItemEdit({
												...invoiceItemEdit,
												quantity: parseFloat(
													e.target.value
												),
											})
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
										value={invoiceItemEdit.unitPrice || ``}
										onChange={(e) =>
											setInvoiceItemEdit({
												...invoiceItemEdit,
												unitPrice: parseFloat(
													e.target.value
												),
											})
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
										value={invoiceItemEdit.subTotal || ``}
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
										setInvoiceItemEdit({
											description: "",
											quantity: 0.0,
											unitPrice: 0.0,
											subTotal: 0.0,
											index: 0,
										});
									}}
								>
									Close
								</Button>
								<Button
									className="bg-green-500"
									onPress={() => {
										append({
											description:
												invoiceItemEdit.description,
											quantity: invoiceItemEdit.quantity,
											unitPrice:
												invoiceItemEdit.unitPrice,
											subTotal: invoiceItemEdit.subTotal,
										});
										onClose();
										setInvoiceItemEdit({
											description: "",
											quantity: 0.0,
											unitPrice: 0.0,
											subTotal: 0.0,
											index: 0,
										});
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
