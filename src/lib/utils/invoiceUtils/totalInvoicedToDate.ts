import { Invoice } from "@prisma/client";
import { getCurrentTaxYear } from "./getCurrentTaxYear";

export function totalInvoicedToDate(invoices: Invoice[]): number {
	return invoices.reduce(
		(total, invoice) =>
			invoice.taxYear === getCurrentTaxYear()
				? total + invoice.total
				: total,
		0.0
	);
}
