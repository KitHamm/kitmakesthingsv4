import ExpensesContextProvider from "@/components/admin/expenses/ExpensesContextProvider";
import ExpensesRender from "@/components/admin/expenses/ExpensesRender";
import ExpensesTaxYearSelect from "@/components/admin/expenses/ExpensesTaxYearSelect";
import NewExpenseModal from "@/components/admin/expenses/NewExpenseModal";
import PageTitle from "@/components/admin/shared/PageTitle";
import prisma from "@/lib/prisma";
import { getAllTaxYears } from "@/lib/utils/invoiceUtils/totalTaxYears";
import { Divider } from "@nextui-org/react";
import { Expense } from "@prisma/client";

export default async function ExpensesPage() {
	let expenses: Expense[] = [];

	try {
		expenses = await prisma.expense.findMany({
			orderBy: { amount: "desc" },
		});
	} catch (error) {
		console.error("Error fetching expenses:", error);
	}

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<ExpensesContextProvider>
				<PageTitle title="Expenses." />
				<div className="bg-neutral-100 lg:w-fit p-4 mb-4 rounded-xl shadow">
					<div className="font-bold text-xl">Invoice Actions</div>
					<Divider className="mb-4" />
					<div className="flex flex-col lg:flex-row gap-4">
						<NewExpenseModal />
					</div>
				</div>
				<ExpensesTaxYearSelect taxYears={getAllTaxYears([], expenses)} />
				<ExpensesRender expenses={expenses} />
			</ExpensesContextProvider>
		</div>
	);
}
