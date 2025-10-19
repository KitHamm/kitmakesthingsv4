"use client";

import { useState, useEffect } from "react";
import { currentYearProjection } from "@/lib/utils/invoiceUtils/currentYearProjection";
import { Expense, Invoice } from "@prisma/client";
import { getCurrentTaxYear } from "@/lib/utils/invoiceUtils/getCurrentTaxYear";

export default function Projection(props: Readonly<{ invoices: Invoice[]; expenses: Expense[] }>) {
	const [projectedIncome, setProjectedIncome] = useState(0);
	const [projectedAvg, setProjectedAvg] = useState(0);

	useEffect(() => {
		setProjectedIncome(currentYearProjection("", props.invoices));
		setProjectedAvg(currentYearProjection("avg", props.invoices));
	}, [props.invoices]);

	const totalExpenses = props.expenses.reduce((acc, exp) => {
		if (exp.taxYear === getCurrentTaxYear()) {
			return acc + exp.amount;
		}
		return acc;
	}, 0.0);

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
				<div className="grid grid-cols-2">
					<div className="flex flex-col">
						<div className="">Projected Income</div>
						<div className="">
							£
							{projectedAvg.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="">Expenses</div>
						<div className="">
							£
							{totalExpenses.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
