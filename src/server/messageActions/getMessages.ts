"use server";

import prisma from "@/lib/prisma";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function getMessages() {
	try {
		const messages = await prisma.messages.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return createResponse(true, messages);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
