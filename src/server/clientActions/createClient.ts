"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { ClientForm } from "@/lib/types";

export async function createClient(data: ClientForm) {
	try {
		const created = await prisma.client.create({
			data: {
				name: data.name,
				address: data.address,
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, created);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
