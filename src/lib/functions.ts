import { ServiceRequest, Invoice } from "@prisma/client";
import { Views, InvoiceWithClientAndItems } from "@/lib/types";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function dateRender(date: Date) {
	const dateOnly = date.toISOString().split("T")[0];
	const stringDate = new Date(dateOnly);
	const dayString = stringDate.toString().split(" ")[0];
	const monthString = months[stringDate.getMonth()];
	const yearString = dateOnly.split("-")[0];
	const stringFormattedDate =
		dayString +
		" " +
		stringDate.getDate() +
		dateOrdinal(stringDate.getDate()) +
		" " +
		monthString +
		", " +
		yearString;

	return stringFormattedDate;
}

export function formatDate(date: Date) {
	const formattedDate =
		date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
	return formattedDate;
}

function dateOrdinal(date: number) {
	if (date > 3 && date < 21) return "th";
	switch (date % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

export const mapNumRange = (
	num: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number
) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export function invoicedToDate(invoices: Invoice[]): number {
	return invoices.reduce(
		(total, invoice) =>
			invoice.taxYear === currentTaxYear()
				? total + invoice.total
				: total,
		0.0
	);
}

export function paidToDate(invoices: Invoice[]): number {
	return invoices.reduce((total, invoice) => {
		if (invoice.taxYear === currentTaxYear() && invoice.paid) {
			return total + invoice.total;
		}
		return total;
	}, 0.0);
}

export function currentTaxYear() {
	const dateObj = new Date();
	const taxDate = new Date();
	const year = dateObj.getFullYear();
	const prevYear = dateObj.getFullYear() - 1;
	const nextYear = dateObj.getFullYear() + 1;
	taxDate.setFullYear(year, 3, 5);
	let taxYear;
	if (dateObj <= taxDate) {
		taxYear = prevYear + "-" + dateObj.getFullYear();
	} else {
		taxYear = dateObj.getFullYear() + "-" + nextYear;
	}
	return taxYear;
}

export function projection(type: string, invoices: Invoice[]) {
	let monthsWorked = 0;
	const d = new Date();
	let month = d.getMonth() + 1;
	if (month < 4) {
		monthsWorked = month + 9;
	} else {
		monthsWorked = month - 3;
	}
	const avgYTD = invoicedToDate(invoices) / monthsWorked;
	const projection = avgYTD * 12;
	if (Number.isNaN(projection)) {
		return 0;
	}

	return type === "avg" ? avgYTD : projection;
}

export function totalTaxYears(invoices: InvoiceWithClientAndItems[]): string[] {
	return [...new Set(invoices.map((invoice) => invoice.taxYear))];
}

export function outStanding(invoices: Invoice[]) {
	let total = 0;
	total = invoicedToDate(invoices) - paidToDate(invoices);
	return total;
}

export function invoiceCount(invoices: Invoice[], type: string): number {
	return invoices.filter(
		(invoice) =>
			invoice.taxYear === currentTaxYear() &&
			(type === "sent" || invoice.paid)
	).length;
}

export function countViews(requests: ServiceRequest[]) {
	const views: Views[] = [];
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);

	for (let i = 6; i >= 0; i--) {
		const date = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - i
		);
		const formattedDate = formatDate(date);
		views.push({
			date: formattedDate,
			pages: [],
		});
	}

	views.forEach((view) => {
		const pageCounts: Record<string, number> = {};

		requests.forEach((request) => {
			if (formatDate(request.createdAt) === view.date) {
				pageCounts[request.page] = (pageCounts[request.page] || 0) + 1;
			}
		});

		view.pages = Object.entries(pageCounts).map(([page, count]) => ({
			page,
			count,
		}));
	});

	return views;
}

export function pagesWithViews(requests: ServiceRequest[]) {
	let pages: string[] = [];
	requests.forEach((request) => {
		if (!pages.includes(request.page)) {
			pages.push(request.page);
		}
	});
	return pages;
}

export function referencePlaceholderCalc(ref: string) {
	const reference: number = parseInt(ref);
	return (reference + 1).toString();
}
export function resizeTextArea(el: HTMLTextAreaElement) {
	el.style.height = "auto";
	el.style.height = `${Math.max(el.scrollHeight, 32)}px`;
}

export function actionResponse(status: number, message: string) {
	return { status: status, message: message };
}
