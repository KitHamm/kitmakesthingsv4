"use server";

import prisma from "@/lib/prisma";
import { TaskForm } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function addNewTask(data: TaskForm) {
	try {
		await prisma.projectTask.create({
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
		revalidatePath("/dashboard/projects");
		return actionResponse(200, "created");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
