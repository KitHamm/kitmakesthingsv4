"use server";

import prisma from "@/lib/prisma";

export default async function getUnreadMessages() {
	try {
		const messages = await prisma.messages.count({
			where: {
				read: false,
			},
		});

		return { status: 200, message: { messageCount: messages } };
	} catch (error) {
		console.log(error);
		return { status: 400, message: { messageCount: 0 } };
	}
}
