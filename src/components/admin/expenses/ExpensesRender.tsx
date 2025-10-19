"use client";

import { Expense } from "@prisma/client";
import { useExpensesContext } from "./ExpensesContextProvider";
import { deleteExpense } from "@/server/invoiceActions/deleteExpense";

export default function ExpensesRender({ expenses }: Readonly<{ expenses: Expense[] }>) {
	const { selectedTaxYear } = useExpensesContext();

	// Filter by selected tax year
	const filteredExpenses = expenses.filter((e) => e.taxYear === selectedTaxYear);

	const handleDelete = async (id: string) => {
		try {
			const response = await deleteExpense(id);
			if (!response.success) {
				console.error("Error deleting expense:", response.error);
			}
		} catch (error) {
			console.error("Error deleting expense:", error);
		}
	};

	if (filteredExpenses.length === 0) {
		return <div className="bg-neutral-100 p-4 rounded-lg shadow text-neutral-600 text-center">No expenses found for {selectedTaxYear}.</div>;
	}

	return (
		<div className="overflow-x-auto bg-neutral-100 rounded-lg shadow">
			<table className="min-w-full text-left text-sm text-neutral-800">
				<thead className="bg-neutral-200 uppercase text-neutral-700 text-xs font-semibold">
					<tr>
						<th className="px-4 py-3">Title</th>
						<th className="px-4 py-3">Description</th>
						<th className="px-4 py-3">Retailer</th>
						<th className="px-4 py-3 text-right">Amount (£)</th>
						<th className="px-4 py-3 text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredExpenses.map((exp) => (
						<tr key={exp.id} className="border-b last:border-none hover:bg-neutral-50 transition">
							<td className="px-4 py-3 font-medium">{exp.title}</td>
							<td className="px-4 py-3">{exp.description}</td>
							<td className="px-4 py-3">{exp.retailer}</td>
							<td className="px-4 py-3 text-right">
								{exp.amount.toLocaleString("en-GB", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</td>
							<td className="px-4 py-3 text-right">
								<button
									onClick={() => handleDelete(exp.id)}
									className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
