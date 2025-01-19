"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function updateInvoicePaid(reference: string, paid: boolean) {
	try {
		await prisma.invoice.update({
			where: {
				reference: reference,
			},
			data: {
				paid: paid,
			},
		});
		revalidatePath("/dashboard/invoices");
		revalidatePath("dashboard");
		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
