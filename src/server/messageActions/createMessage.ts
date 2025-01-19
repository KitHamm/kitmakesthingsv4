"use server";

import prisma from "@/lib/prisma";
import { ContactForm } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function createMessage(data: ContactForm) {
	try {
		await prisma.messages.create({
			data: {
				name: data.name,
				email: data.email,
				message: data.message,
			},
		});
		revalidatePath("/dashboard/messages");
		return actionResponse(200, "created");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
