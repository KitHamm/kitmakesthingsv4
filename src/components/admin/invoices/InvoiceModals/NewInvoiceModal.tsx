"use client";
// packages
import {
	Button,
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
// functions
import { createInvoice } from "@/server/invoiceActions/createInvoice";
// components
import NewItemModal from "./InvoiceItemModal";
import InvoiceTextInput from "./InvoiceTextInput";
// types
import { Client } from "@prisma/client";
import { InvoiceForm } from "@/lib/types";

const NewInvoiceModal = ({
	clients,
	referencePlaceholder,
}: Readonly<{
	clients: Client[];
	referencePlaceholder: string;
}>) => {
	const [newInvoiceTotal, setNewInvoiceTotal] = useState(0.0);
	const { isOpen, onOpenChange, onClose } = useDisclosure();

	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
		control,
		setValue,
	} = useForm<InvoiceForm>({
		defaultValues: {
			total: 0.0,
			reference: referencePlaceholder,
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: "items",
		control,
	});

	useEffect(() => {
		const total = fields.reduce((sum, field) => sum + field.subTotal, 0);
		setValue("total", total);
		setNewInvoiceTotal(total);
	}, [fields, setValue]);

	const handleReset = () => {
		for (const field of fields) {
			remove(fields.indexOf(field));
		}
		reset({
			reference: referencePlaceholder,
			date: undefined,
			taxYear: "",
			paid: false,
			total: 0.0,
			clientId: "",
			items: [],
		});
		setNewInvoiceTotal(0.0);
	};

	const onSubmit = async (data: InvoiceForm) => {
		try {
			const res = await createInvoice(data);
			if (res.status === 200) {
				onClose();
				handleReset();
			} else {
				console.log(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button
				onPress={onOpenChange}
				className="bg-green-500 rounded-lg w-full lg:w-auto text-white text-md"
			>
				New Invoice
			</Button>
			<Modal
				size="2xl"
				backdrop="blur"
				scrollBehavior="outside"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								New Invoice
							</ModalHeader>
							<form onSubmit={handleSubmit(onSubmit)}>
								<ModalBody className="gap-2">
									<div className="flex flex-col items-center justify-center lg:flex-row lg:gap-8 gap-4 mb-4 lg:mb-0">
										<div className="w-full">
											<Select
												onChange={(e) => {
													setValue(
														"clientId",
														e.target.value
													);
												}}
												label="Select a client"
											>
												{clients.map(
													(client: Client) => (
														<SelectItem
															key={client.id}
														>
															{client.name}
														</SelectItem>
													)
												)}
											</Select>
										</div>
										<div className="w-full">
											<input
												type="date"
												{...register("date")}
											/>
										</div>
									</div>

									<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
										<InvoiceTextInput
											label="Reference"
											target="reference"
											register={register}
											errors={errors}
										/>
										<InvoiceTextInput
											label="Tax Year"
											target="taxYear"
											register={register}
											errors={errors}
										/>
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
												{`£${newInvoiceTotal.toLocaleString()}`}
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
											handleReset();
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
		</>
	);
};

export default NewInvoiceModal;
