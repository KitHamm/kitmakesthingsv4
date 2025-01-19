"use server";

import prisma from "@/lib/prisma";
import { TaskPriority } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function updateTaskPriority(id: string, priority: TaskPriority) {
	try {
		await prisma.projectTask.update({
			where: {
				id: id,
			},
			data: {
				priority: priority,
			},
		});
		revalidatePath("/dashboard/projects");
		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
