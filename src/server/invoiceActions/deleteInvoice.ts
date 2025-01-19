"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function deleteInvoice(reference: string) {
	try {
		await prisma.invoiceItem.deleteMany({
			where: {
				invoiceReference: reference,
			},
		});
		await prisma.invoice.delete({
			where: {
				reference: reference,
			},
		});
		revalidatePath("dashboard/invoices");
		revalidatePath("dashboard");
		return actionResponse(200, "deleted");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
