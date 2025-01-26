"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

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

		revalidatePath("dashboard/");
		return createResponse(true, "deleted");
	} catch (error) {
		return createResponse(false, null, error);
	}
}
