"use server";

import prisma from "@/lib/prisma";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

export default async function getUnreadMessages() {
	try {
		const messageCount = await prisma.messages.count({
			where: {
				read: false,
			},
		});

		return createResponse(true, messageCount);
	} catch (error) {
		return createResponse(false, 0, error);
	}
}
