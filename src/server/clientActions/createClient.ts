"use server";

import prisma from "@/lib/prisma";
import { ClientForm } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createClient(data: ClientForm) {
	try {
		await prisma.client.create({
			data: {
				name: data.name,
				address: data.address,
			},
		});
		revalidatePath("/dashboard/invoices");
		return { status: 200, message: "created" };
	} catch (error: any) {
		return { status: 400, message: error };
	}
}
