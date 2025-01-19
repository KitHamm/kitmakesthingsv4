"use server";

import { authOptions } from "@/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function serviceRequest(page: string) {
	const session = await getServerSession(authOptions);
	try {
		if (!session) {
			await prisma.serviceRequest.create({
				data: {
					page: page,
				},
			});
		}
	} catch (err: any) {
		console.log(err);
	}
}
