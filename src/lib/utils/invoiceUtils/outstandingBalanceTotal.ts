import { Invoice } from "@prisma/client";
import { totalInvoicedToDate } from "./totalInvoicedToDate";
import { totalPaidToDate } from "./totalPaidToDate";

export function getOutStandingBalanceTotal(invoices: Invoice[]) {
	return totalInvoicedToDate(invoices) - totalPaidToDate(invoices);
}
