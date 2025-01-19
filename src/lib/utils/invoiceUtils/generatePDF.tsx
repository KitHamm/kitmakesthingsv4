"use client";

import { InvoiceWithClientAndItems } from "@/lib/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "@/lib/functions";

const START_GUTTER = 15;
const HALF_PAGE_WIDTH = 105;

export function generatePDF(invoice: InvoiceWithClientAndItems) {
	const clientAddress: string[] = invoice.client.address.split(", ");
	const doc = new jsPDF();
	doc.addFont("/fonts/Roboto-Bold.ttf", "Roboto-Bold", "bold");
	doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto-Regular", "regular");
	doc.addFont("/fonts/Roboto-Thin.ttf", "Roboto-Thin", "light");

	// Header Image
	doc.addImage("/logo.png", "PNG", 55, -5, 100, 50);

	// Title
	doc.setFont("Roboto-Bold", "bold");
	doc.setFontSize(60);
	doc.text("INVOICE", START_GUTTER, 60);

	// Invoice Details
	doc.setFontSize(15);

	// Date
	doc.setFont("Roboto-Regular", "regular");
	doc.text("Date:", START_GUTTER, 70);
	doc.setFont("Roboto-Thin", "light");
	doc.text(formatDate(invoice.date), 30, 70);

	// Reference
	doc.setFont("Roboto-Regular", "regular");
	doc.text("Reference:", START_GUTTER, 78);
	doc.setFont("Roboto-Thin", "light");
	doc.text(invoice.reference, 43, 78);

	// Client Name
	doc.setFont("Roboto-Regular", "regular");
	doc.text("Billed To:", START_GUTTER, 86);
	doc.text(invoice.client.name, START_GUTTER, 96);
	doc.setFont("Roboto-Thin", "light");
	for (let i = 0; i < clientAddress.length; i++) {
		doc.text(clientAddress[i], START_GUTTER, 104 + i * 8);
	}

	// From
	doc.setFont("Roboto-Regular", "regular");
	doc.text("From:", HALF_PAGE_WIDTH + START_GUTTER, 86);
	doc.text("Kit Hamm", HALF_PAGE_WIDTH + START_GUTTER, 96);
	doc.setFont("Roboto-Thin", "light");
	doc.text("2 Lancaster Drive", HALF_PAGE_WIDTH + START_GUTTER, 104);
	doc.text("Paignton", HALF_PAGE_WIDTH + START_GUTTER, 112);
	doc.text("TQ4 7RR", HALF_PAGE_WIDTH + START_GUTTER, 120);

	autoTable(doc, {
		startY: 130,
		theme: "grid",
		headStyles: {
			fillColor: [200, 200, 200],
			textColor: [0, 0, 0],
			fontSize: 12,
		},
		bodyStyles: {
			fillColor: [255, 255, 255],
			textColor: [0, 0, 0],
			overflow: "linebreak",
			cellPadding: 3,
		},
		head: [["Item", "Quantity", "Unit Price", "Subtotal"]],
		body: invoice.invoiceItem.map((item) => [
			item.description,
			item.quantity,
			"£" + item.unitPrice.toLocaleString(),
			"£" + item.subTotal.toLocaleString(),
		]),
	});

	// Total
	let finalY = (doc as any).lastAutoTable.finalY;
	doc.line(
		START_GUTTER,
		finalY + 5,
		HALF_PAGE_WIDTH * 2 - START_GUTTER,
		finalY + 5
	);

	doc.setFont("Roboto-Regular", "regular");
	doc.text("Total:", HALF_PAGE_WIDTH + 45, finalY + 12);
	doc.setFont("Roboto-Bold", "bold");
	doc.text(
		"£" + invoice.total.toLocaleString(),
		HALF_PAGE_WIDTH + 65,
		finalY + 12
	);

	doc.line(
		START_GUTTER,
		finalY + 15,
		HALF_PAGE_WIDTH * 2 - START_GUTTER,
		finalY + 15
	);

	// Payment Details
	doc.setFontSize(12);
	doc.setFont("Roboto-Bold", "bold");
	doc.text("Money transfers should be sent to:", START_GUTTER, finalY + 25);

	doc.text("Monzo Bank", START_GUTTER, finalY + 35);
	doc.text("Sort Code:", START_GUTTER, finalY + 41);
	doc.text("Account Number:", START_GUTTER, finalY + 47);
	doc.text("Reference: ", START_GUTTER, finalY + 53);

	doc.setFont("Roboto-Regular", "regular");
	doc.text("04-00-04", START_GUTTER + 22, finalY + 41);
	doc.text("82045708", START_GUTTER + 35, finalY + 47);
	doc.text(invoice.reference, START_GUTTER + 22, finalY + 53);

	doc.text("Thank you for your business!", START_GUTTER, finalY + 63);

	// Save
	doc.save("invoice-" + invoice.reference + ".pdf");
}
