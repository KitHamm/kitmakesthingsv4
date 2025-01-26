"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function updateInvoicePaid(reference: string, paid: boolean) {
	try {
		const updated = await prisma.invoice.update({
			where: {
				reference: reference,
			},
			data: {
				paid: paid,
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
