"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { TaskPriority } from "@prisma/client";

export async function updateTaskPriority(id: string, priority: TaskPriority) {
	try {
		const updated = await prisma.projectTask.update({
			where: {
				id: id,
			},
			data: {
				priority: priority,
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
