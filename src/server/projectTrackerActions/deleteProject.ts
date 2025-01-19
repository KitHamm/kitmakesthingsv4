"use server";

import { actionResponse } from "@/lib/functions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: string) {
	try {
		await prisma.projectTask.deleteMany({
			where: {
				projectId: id,
			},
		});

		await prisma.workingProject.delete({
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
