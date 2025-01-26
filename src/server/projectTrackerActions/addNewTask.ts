"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { TaskForm } from "@/lib/types";

export async function addNewTask(data: TaskForm) {
	try {
		const task = await prisma.projectTask.create({
			data: {
				description: data.description,
				priority: data.priority,
				project: {
					connect: {
						id: data.projectId,
					},
				},
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, task);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
