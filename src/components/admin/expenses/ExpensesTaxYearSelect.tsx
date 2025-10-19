"use client";
// packages
import { useContext } from "react";
import { Button, Divider } from "@nextui-org/react";
// context
import { useExpensesContext } from "./ExpensesContextProvider";

const ExpensesTaxYearSelect = ({ taxYears }: Readonly<{ taxYears: string[] }>) => {
	const { selectedTaxYear, setSelectedTaxYear } = useExpensesContext();

	return (
		<div className="bg-neutral-100 p-4 rounded-xl shadow gap-4 mb-6">
			<div className="font-bold text-2xl text-center">Tax Years</div>
			<Divider className="mb-4" />
			<div className="flex flex-wrap justify-center gap-4">
				{taxYears.map((taxYear: string) => {
					return (
						<Button
							className={`${selectedTaxYear === taxYear ? "bg-green-500" : ""} text-md text-white
							`}
							onPress={() => setSelectedTaxYear(taxYear)}
							key={taxYear}
						>
							{taxYear}
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default ExpensesTaxYearSelect;
