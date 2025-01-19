"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";
import { InvoiceForm } from "@/lib/types";

export async function updateInvoice(data: InvoiceForm) {
	try {
		await prisma.invoiceItem.deleteMany({
			where: {
				invoiceReference: data.reference,
			},
		});

		await prisma.invoice.update({
			where: {
				reference: data.reference,
			},
			data: {
				reference: data.reference,
				total: data.total,
				date: data.date,
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
		revalidatePath("/dashboard/invoices");
		revalidatePath("dashboard");
		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
