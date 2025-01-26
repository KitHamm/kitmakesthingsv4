"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { ContactForm } from "@/lib/types";

export async function createMessage(data: ContactForm) {
	try {
		const message = await prisma.messages.create({
			data: {
				name: data.name,
				email: data.email,
				message: data.message,
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, message);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
