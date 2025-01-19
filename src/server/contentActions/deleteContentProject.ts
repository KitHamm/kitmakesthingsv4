"use server";

import { actionResponse } from "@/lib/utils/miscUtils/actionResponse";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProject(slug: string) {
	try {
		await prisma.contentProject.delete({
			where: {
				slug: slug,
			},
		});
		revalidatePath("/dashboard/content/projects");
		revalidatePath("/projects");
		return actionResponse(200, "deleted");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
