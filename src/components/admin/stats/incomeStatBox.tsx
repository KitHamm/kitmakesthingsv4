"use client";

import { getOutStandingBalanceTotal } from "@/lib/utils/invoiceUtils/outstandingBalanceTotal";
import { totalInvoicedToDate } from "@/lib/utils/invoiceUtils/totalInvoicedToDate";
import { totalPaidToDate } from "@/lib/utils/invoiceUtils/totalPaidToDate";
import { CircularProgress } from "@nextui-org/react";
import { Invoice } from "@prisma/client";
import { useEffect, useState } from "react";

export default function IncomeStatBox(
	props: Readonly<{ invoices: Invoice[] }>
) {
	const [paidToDateRender, setPaidToDateRender] = useState(0);
	const [outstandingRender, setOutstandingRender] = useState(0);
	const [invoicedToDateRender, setInvoicedToDateRender] = useState(0);

	useEffect(() => {
		setPaidToDateRender(totalPaidToDate(props.invoices));
		setOutstandingRender(getOutStandingBalanceTotal(props.invoices));
		setInvoicedToDateRender(totalInvoicedToDate(props.invoices));
	}, [props.invoices]);

	return (
		<div className="bg-neutral-100 rounded-lg shadow p-4">
			<div className="flex justify-between">
				<div>
					<div className="font-bold text-4xl">
						£
						{paidToDateRender.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</div>
					<div className="">Income YTD</div>
					<div
						className={
							outstandingRender > 0
								? "text-red-400"
								: "text-green-500"
						}
					>
						{outstandingRender > 0
							? "£" +
							  outstandingRender.toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
							  }) +
							  " Outstanding"
							: "All Paid"}
					</div>
				</div>
				<div className="flex justify-end w-full">
					<CircularProgress
						aria-label="paid"
						value={(100 * paidToDateRender) / invoicedToDateRender}
						classNames={{
							svg: "w-20 h-20 drop-shadow-md",
							indicator: "text-green-500",
							track: "stroke-white/10",
							value: "text-xl font-semibold",
						}}
						color="success"
						showValueLabel={true}
					/>
				</div>
			</div>
		</div>
	);
}
