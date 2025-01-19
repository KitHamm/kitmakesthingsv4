"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteClient(clientId: string) {
	try {
		await prisma.client.delete({ where: { id: clientId } });
		revalidatePath("/dashboard/invoices");
		return { status: 200, message: "deleted" };
	} catch (error: any) {
		return { status: 400, message: error };
	}
}
