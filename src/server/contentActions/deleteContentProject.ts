"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function deleteProject(slug: string) {
	try {
		await prisma.contentProject.delete({
			where: {
				slug: slug,
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/");
		return createResponse(true, "deleted");
	} catch (error) {
		return createResponse(false, null, error);
	}
}
