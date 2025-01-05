"use client";

import { useContext } from "react";
import { InvoiceStateContext } from "./InvoiceStateProvider";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import Markdown from "react-markdown";
import { formatDate } from "@/lib/functions";
import { InvoiceItem } from "@prisma/client";
import {
	deleteInvoice,
	updateInvoicePaid,
} from "@/components/actions/InvoiceActions";
import { InvoiceWithClientAndItems } from "@/lib/types";
import { generatePDF } from "@/components/actions/InvoicePDF";

export default function ViewInvoiceModal() {
	const {
		selectedInvoice,
		setSelectedInvoice,
		isOpenViewInvoice,
		onOpenChangeViewInvoice,
		onOpenEditInvoice,
	} = useContext(InvoiceStateContext);

	function updatePaid() {
		updateInvoicePaid(
			selectedInvoice.reference,
			!selectedInvoice.paid
		).catch((err) => console.log(err));
	}

	return (
		<Modal
			scrollBehavior="outside"
			size="2xl"
			isOpen={isOpenViewInvoice}
			onOpenChange={onOpenChangeViewInvoice}
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
						<ModalBody>
							<div>
								<div className="font-bold">Billed To:</div>
								<div className="font-bold">
									{selectedInvoice.client.name}
								</div>
								<Markdown>
									{selectedInvoice.client.address}
								</Markdown>
							</div>
							<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
								<div>
									<div className="font-bold">Date:</div>
									<div>
										{formatDate(selectedInvoice.date)}
									</div>
								</div>
								<div>
									<div className="font-bold">Tax Year:</div>
									<div>{selectedInvoice.taxYear}</div>
								</div>
							</div>
							<div className="border-t-2 py-4">
								<div className="font-bold">Items:</div>
								<div className="flex flex-col gap-4 mt-4">
									{selectedInvoice.invoiceItem.map(
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
															{item.description}
														</Markdown>
													</div>
													<hr className="border-black mb-3" />
													<div className="flex justify-between">
														<div className="flex-col">
															<div className="font-bold">
																Quant.
															</div>
															<div className="text-end">
																{item.quantity}
															</div>
														</div>
														<div className="flex-col">
															<div className="font-bold">
																Unit Price
															</div>
															<div className="text-end">
																£
																{item.unitPrice.toLocaleString()}
															</div>
														</div>
														<div className="flex-col">
															<div className="font-bold">
																Sub Total
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
									selectedInvoice.paid
										? "justify-end"
										: "justify-between"
								} flex gap-2`}
							>
								{!selectedInvoice.paid && (
									<div>
										<Button
											className="bg-green-500"
											onPress={() => {
												onOpenEditInvoice();
												onClose();
											}}
										>
											Edit Invoice
										</Button>
									</div>
								)}

								<div className="flex gap-2 my-auto">
									<div className="font-bold">Total:</div>
									<div>
										£
										{selectedInvoice.total.toLocaleString()}
									</div>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										onClose();
										deleteInvoice(selectedInvoice.reference)
											.then(() => {
												setSelectedInvoice(
													{} as InvoiceWithClientAndItems
												);
											})
											.catch((err) => {
												console.log(err);
											});
									}}
								>
									Delete
								</Button>
								<Button
									className=""
									color="danger"
									onPress={() => {
										onClose();
										setSelectedInvoice(
											{} as InvoiceWithClientAndItems
										);
									}}
								>
									Close
								</Button>

								<Button
									className="bg-green-500"
									onPress={() => {
										updatePaid();
									}}
								>
									{selectedInvoice.paid
										? "Mark Unpaid"
										: "Mark Paid"}
								</Button>
								<Button
									className="bg-green-500"
									onPress={() => generatePDF(selectedInvoice)}
								>
									Print
								</Button>
							</div>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
