"use client";

import { InvoiceWithClientAndItems } from "@/lib/types";
import { useContext } from "react";
import { InvoiceStateContext } from "./InvoiceStateProvider";

export default function InvoiceCards(
	props: Readonly<{
		invoices: InvoiceWithClientAndItems[];
	}>
) {
	const { setSelectedInvoice, selectedTaxYear, onOpenViewInvoice } =
		useContext(InvoiceStateContext);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			{props.invoices.map((invoice: InvoiceWithClientAndItems) => {
				if (invoice.taxYear === selectedTaxYear) {
					return (
						<button
							onClick={() => {
								setSelectedInvoice(invoice);
								onOpenViewInvoice();
							}}
							className="lg:hover:bg-green-200 transition-all cursor-pointer bg-neutral-100 shadow rounded-lg p-4"
							key={invoice.reference}
						>
							<div className="flex justify-between ">
								<div className="font-bold">
									{invoice.client.name}
								</div>
								<div className="font-bold">
									#{invoice.reference}
								</div>
							</div>
							<div className="flex justify-between mt-1">
								<div className="">
									£{invoice.total.toLocaleString()}
								</div>
								<div
									className={`${
										invoice.paid
											? "text-green-500"
											: "text-red-500"
									}`}
								>
									{invoice.paid ? "Paid" : "Not Paid"}
								</div>
							</div>
						</button>
					);
				}
			})}
		</div>
	);
}
