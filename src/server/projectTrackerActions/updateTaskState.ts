"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { TaskState } from "@prisma/client";

export async function updateTaskState(id: string, state: TaskState) {
	try {
		const updated = await prisma.projectTask.update({
			where: {
				id: id,
			},
			data: {
				status: state,
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
