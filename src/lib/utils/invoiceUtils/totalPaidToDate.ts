import { Invoice } from "@prisma/client";
import { getCurrentTaxYear } from "./getCurrentTaxYear";

export function totalPaidToDate(invoices: Invoice[]): number {
	return invoices.reduce((total, invoice) => {
		if (invoice.taxYear === getCurrentTaxYear() && invoice.paid) {
			return total + invoice.total;
		}
		return total;
	}, 0.0);
}
