"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function updateMessageRead(messageId: string, read: boolean) {
	try {
		await prisma.messages.update({
			where: {
				id: messageId,
			},
			data: {
				read: read,
			},
		});
		revalidatePath("/dashboard");
		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
