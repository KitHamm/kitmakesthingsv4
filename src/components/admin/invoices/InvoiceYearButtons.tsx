"use client";

import { useContext } from "react";
import { InvoiceStateContext } from "./InvoiceStateProvider";
import { Button } from "@nextui-org/react";

export default function InvoiceYearButtons(props: { taxYears: string[] }) {
	const { selectedTaxYear, setSelectedTaxYear } =
		useContext(InvoiceStateContext);

	return (
		<div className="grid grid-cols-3 lg:grid-cols-12  gap-4 mb-6">
			{props.taxYears.map((taxYear: string) => {
				return (
					<Button
						className={
							selectedTaxYear === taxYear ? "bg-green-500" : ""
						}
						onPress={() => setSelectedTaxYear(taxYear)}
						key={taxYear}
					>
						{taxYear}
					</Button>
				);
			})}
		</div>
	);
}
