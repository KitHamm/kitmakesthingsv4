"use server";

import prisma from "@/lib/prisma";

export async function getMessages() {
	try {
		const messages = await prisma.messages.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
		return {
			status: 200,
			message: {
				data: messages,
			},
		};
	} catch (error) {
		console.log(error);
		return { status: 400, message: { data: [] } };
	}
}
