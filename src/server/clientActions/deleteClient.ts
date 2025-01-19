"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function deleteClient(clientId: string) {
	try {
		await prisma.client.delete({ where: { id: clientId } });
		revalidatePath("/dashboard/invoices");
		return actionResponse(200, "deleted");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
