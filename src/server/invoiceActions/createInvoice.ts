"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { InvoiceForm } from "@/lib/types";

export async function createInvoice(data: InvoiceForm) {
	try {
		const date = new Date(data.date);
		const invoice = await prisma.invoice.create({
			data: {
				reference: data.reference,
				total: data.total,
				date: date,
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
		return createResponse(true, invoice);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
