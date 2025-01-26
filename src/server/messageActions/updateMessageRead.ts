"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function updateMessageRead(messageId: string, read: boolean) {
	try {
		const updated = await prisma.messages.update({
			where: {
				id: messageId,
			},
			data: {
				read: read,
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
