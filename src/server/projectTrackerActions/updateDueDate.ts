"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function updateDueDate(id: string, dueDate: Date) {
	try {
		const updated = await prisma.workingProject.update({
			where: {
				id: id,
			},
			data: {
				dateDue: dueDate,
			},
		});

		revalidatePath("/dashboard/projects");
		revalidatePath("/dashboard/projects/" + id);
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
