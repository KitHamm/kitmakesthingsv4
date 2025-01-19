"use server";

import prisma from "@/lib/prisma";
import { ProjectState } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function updateProjectState(id: string, state: ProjectState) {
	try {
		await prisma.workingProject.update({
			where: {
				id: id,
			},
			data: {
				state: state,
			},
		});
		revalidatePath("/dashboard/projects/" + id);
		revalidatePath("/dashboard/projects");
		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
