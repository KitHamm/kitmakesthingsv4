"use server";

import { actionResponse } from "@/lib/utils/miscUtils/actionResponse";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMessage(messageId: string) {
	try {
		await prisma.messages.delete({
			where: {
				id: messageId,
			},
		});
		revalidatePath("/dashboard/messages");
		return actionResponse(200, "deleted");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
