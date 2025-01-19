"use client";

import { useContext } from "react";
import { InvoiceStateContext } from "./InvoiceStateProvider";
import { Button } from "@nextui-org/react";

export default function InvoiceYearButtons(
	props: Readonly<{ taxYears: string[] }>
) {
	const { selectedTaxYear, setSelectedTaxYear } =
		useContext(InvoiceStateContext);

	return (
		<div className="grid grid-cols-3 lg:grid-cols-12  gap-4 mb-6">
			{props.taxYears.map((taxYear: string) => {
				return (
					<Button
						className={`${
							selectedTaxYear === taxYear ? "bg-green-500" : ""
						} text-md text-white
						`}
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
