"use server";

import { actionResponse } from "@/lib/functions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateDueDate(id: string, dueDate: Date) {
	try {
		await prisma.workingProject.update({
			where: {
				id: id,
			},
			data: {
				dateDue: dueDate,
			},
		});
		revalidatePath("/dashboard/projects");
		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
