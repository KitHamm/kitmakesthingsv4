"use client";

import { useState, useEffect } from "react";
import { currentYearProjection } from "@/lib/utils/invoiceUtils/currentYearProjection";
import { Invoice } from "@prisma/client";

export default function Projection(props: Readonly<{ invoices: Invoice[] }>) {
	const [projectedIncome, setProjectedIncome] = useState(0);
	const [projectedAvg, setProjectedAvg] = useState(0);

	useEffect(() => {
		setProjectedIncome(currentYearProjection("", props.invoices));
		setProjectedAvg(currentYearProjection("avg", props.invoices));
	}, [props.invoices]);

	return (
		<div className="bg-neutral-100 rounded-lg shadow p-4">
			<div>
				<div className="font-bold text-4xl">
					£
					{projectedIncome.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</div>
				<div className="">Projected Income</div>
				<div className="">
					£
					{projectedAvg.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</div>
			</div>
		</div>
	);
}
