import { InvoiceWithClientAndItems } from "@/lib/types";

export function getAllTaxYears(
	invoices: InvoiceWithClientAndItems[]
): string[] {
	return [...new Set(invoices.map((invoice) => invoice.taxYear))];
}
