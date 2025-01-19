"use server";

import prisma from "@/lib/prisma";
import { ClientForm } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function createClient(data: ClientForm) {
	try {
		await prisma.client.create({
			data: {
				name: data.name,
				address: data.address,
			},
		});
		revalidatePath("/dashboard/invoices");
		return actionResponse(200, "created");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
