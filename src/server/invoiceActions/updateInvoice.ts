"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { InvoiceForm } from "@/lib/types";

export async function updateInvoice(data: InvoiceForm) {
	try {
		const date = new Date(data.date);
		await prisma.invoiceItem.deleteMany({
			where: {
				invoiceReference: data.reference,
			},
		});

		const updated = await prisma.invoice.update({
			where: {
				reference: data.reference,
			},
			data: {
				reference: data.reference,
				total: data.total,
				date: date,
				taxYear: data.taxYear,
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
					invoiceReference: data.reference,
				},
			});
		}

		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
