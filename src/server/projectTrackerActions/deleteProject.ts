"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

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

		revalidatePath("/dashboard");
		return createResponse(true, "deleted");
	} catch (error) {
		return createResponse(false, null, error);
	}
}
