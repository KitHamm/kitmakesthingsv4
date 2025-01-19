import { Invoice } from "@prisma/client";
import { getCurrentTaxYear } from "./getCurrentTaxYear";

export function getInvoiceCount(invoices: Invoice[], type: string): number {
	return invoices.filter(
		(invoice) =>
			invoice.taxYear === getCurrentTaxYear() &&
			(type === "sent" || invoice.paid)
	).length;
}
