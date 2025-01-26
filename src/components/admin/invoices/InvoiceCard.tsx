"use client";
// packages
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import Markdown from "react-markdown";
// context
import { useInvoiceState } from "./InvoiceStateProvider";
// functions
import { generatePDF } from "@/lib/utils/invoiceUtils/generatePDF";
import { formatDate } from "@/lib/utils/dateUtils/formatDate";
import { deleteInvoice } from "@/server/invoiceActions/deleteInvoice";
import { updateInvoicePaid } from "@/server/invoiceActions/updateInvoicePaid";
// types
import { InvoiceWithClientAndItems } from "@/lib/types";
import { InvoiceItem } from "@prisma/client";

const InvoiceCard = ({
	invoice,
}: Readonly<{ invoice: InvoiceWithClientAndItems }>) => {
	const { selectedTaxYear } = useInvoiceState();
	const { isOpen, onOpenChange } = useDisclosure();

	const onDelete = async () => {
		try {
			const res = await deleteInvoice(invoice.reference);
			if (res.success) {
				onOpenChange();
			} else {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	const handleUpdatePaid = async () => {
		try {
			const res = await updateInvoicePaid(
				invoice.reference,
				!invoice.paid
			);
			if (res.success) {
				onOpenChange();
			} else {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	if (invoice.taxYear === selectedTaxYear) {
		return (
			<>
				<button
					onClick={() => {
						onOpenChange();
					}}
					className="lg:hover:bg-green-200 transition-all cursor-pointer bg-neutral-100 shadow rounded-lg p-4"
					key={invoice.reference}
				>
					<div className="flex justify-between ">
						<div className="font-bold">{invoice.client.name}</div>
						<div className="font-bold">#{invoice.reference}</div>
					</div>
					<div className="flex justify-between mt-1">
						<div className="">
							£{invoice.total.toLocaleString()}
						</div>
						<div
							className={`${
								invoice.paid ? "text-green-500" : "text-red-500"
							}`}
						>
							{invoice.paid ? "Paid" : "Not Paid"}
						</div>
					</div>
				</button>
				<Modal
					scrollBehavior="outside"
					size="2xl"
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col">
									<div>{`Invoice #${invoice.reference}`}</div>
									<div
										className={`${
											invoice.paid
												? "text-green-500"
												: "text-red-500"
										}`}
									>
										{invoice.paid ? "Paid" : "Not Paid"}
									</div>
								</ModalHeader>
								<ModalBody>
									<div>
										<div className="font-bold">
											Billed To:
										</div>
										<div className="font-bold">
											{invoice.client.name}
										</div>
										<Markdown>
											{invoice.client.address}
										</Markdown>
									</div>
									<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
										<div>
											<div className="font-bold">
												Date:
											</div>
											<div>
												{formatDate(invoice.date)}
											</div>
										</div>
										<div>
											<div className="font-bold">
												Tax Year:
											</div>
											<div>{invoice.taxYear}</div>
										</div>
									</div>
									<div className="border-t-2 py-4">
										<div className="font-bold">Items:</div>
										<div className="flex flex-col gap-4 mt-4">
											{invoice.invoiceItem.map(
												(item: InvoiceItem) => {
													return (
														<div
															className="bg-neutral-200/75 rounded-lg py-2 px-4 lg:py-4 lg:px-8 flex flex-col"
															key={item.id}
														>
															<div className="flex flex-col">
																<div className="font-bold">
																	Description:
																</div>
																<Markdown className="text-sm lg:text-base">
																	{
																		item.description
																	}
																</Markdown>
															</div>
															<hr className="border-black mb-3" />
															<div className="flex justify-between">
																<div className="flex-col">
																	<div className="font-bold">
																		Quant.
																	</div>
																	<div className="text-end">
																		{
																			item.quantity
																		}
																	</div>
																</div>
																<div className="flex-col">
																	<div className="font-bold">
																		Unit
																		Price
																	</div>
																	<div className="text-end">
																		£
																		{item.unitPrice.toLocaleString()}
																	</div>
																</div>
																<div className="flex-col">
																	<div className="font-bold">
																		Sub
																		Total
																	</div>
																	<div className="text-end">
																		£
																		{item.subTotal.toLocaleString()}
																	</div>
																</div>
															</div>
														</div>
													);
												}
											)}
										</div>
									</div>
									<div
										className={`${
											invoice.paid
												? "justify-end"
												: "justify-between"
										} flex gap-2`}
									>
										<div className="flex gap-2 my-auto">
											<div className="font-bold">
												Total:
											</div>
											<div>
												£
												{invoice.total.toLocaleString()}
											</div>
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
										<Button
											color="danger"
											variant="light"
											onPress={onDelete}
										>
											Delete
										</Button>
										<Button
											className=""
											color="danger"
											onPress={onClose}
										>
											Close
										</Button>

										<Button
											className="bg-green-500"
											onPress={handleUpdatePaid}
										>
											{invoice.paid
												? "Mark Unpaid"
												: "Mark Paid"}
										</Button>
										<Button
											className="bg-green-500"
											onPress={() => generatePDF(invoice)}
										>
											Print
										</Button>
									</div>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
		);
	}

	return null;
};

export default InvoiceCard;
