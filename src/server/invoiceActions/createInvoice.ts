"use server";

import { actionResponse } from "@/lib/functions";
import prisma from "@/lib/prisma";
import { InvoiceForm } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createInvoice(data: InvoiceForm) {
	// Create Invoice
	try {
		const invoice = await prisma.invoice.create({
			data: {
				reference: data.reference,
				total: data.total,
				date: data.date,
				taxYear: data.taxYear,
				paid: false,
				clientId: data.clientId,
			},
		});
		for (const item of data.items) {
			await prisma.invoiceItem.create({
				data: {
					description: item.description,
					quantity: item.quantity,
					unitPrice: item.unitPrice,
					subTotal: item.subTotal,
					invoiceReference: invoice.reference,
				},
			});
		}
		revalidatePath("/dashboard/invoices");
		revalidatePath("dashboard");
		return actionResponse(200, "created");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
