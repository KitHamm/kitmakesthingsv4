"use server";

import { authOptions } from "@/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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
		revalidatePath("/dashboard");
	} catch (err: any) {
		console.log(err);
	}
}
