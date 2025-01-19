import { Invoice } from "@prisma/client";
import { totalInvoicedToDate } from "./totalInvoicedToDate";

export function currentYearProjection(
	type: string,
	invoices: Invoice[]
): number {
	const today = new Date();
	const month = today.getMonth() + 1;
	const monthsWorked = month < 4 ? month + 9 : month - 3;

	const avgYTD = totalInvoicedToDate(invoices) / monthsWorked || 0;
	const projection = avgYTD * 12;

	return type === "avg" ? avgYTD : projection;
}
