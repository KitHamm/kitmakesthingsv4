"use server";

import prisma from "@/lib/prisma";
import { TaskState } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function updateTaskState(id: string, state: TaskState) {
	try {
		await prisma.projectTask.update({
			where: {
				id: id,
			},
			data: {
				status: state,
			},
		});
		revalidatePath("/dashboard/projects");
		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
