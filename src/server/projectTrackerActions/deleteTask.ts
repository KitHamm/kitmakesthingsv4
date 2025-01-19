"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function deleteTask(id: string) {
	try {
		await prisma.projectTask.delete({
			where: {
				id: id,
			},
		});
		revalidatePath("/dashboard/projects");
		return actionResponse(200, "deleted");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
