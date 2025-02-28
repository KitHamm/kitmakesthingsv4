"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function deleteMessage(messageId: string) {
	try {
		await prisma.messages.delete({
			where: {
				id: messageId,
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, "deleted");
	} catch (error) {
		return createResponse(false, null, error);
	}
}
