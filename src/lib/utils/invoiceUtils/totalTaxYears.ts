import { InvoiceWithClientAndItems } from "@/lib/types";
import { Expense } from "@prisma/client";

export function getAllTaxYears(invoices: InvoiceWithClientAndItems[], expenses: Expense[]): string[] {
	if (invoices.length > 0) {
		return [...new Set(invoices.map((invoice) => invoice.taxYear))];
	}
	if (expenses.length > 0) {
		return [...new Set(expenses.map((expense) => expense.taxYear))];
	}
	return [];
}
