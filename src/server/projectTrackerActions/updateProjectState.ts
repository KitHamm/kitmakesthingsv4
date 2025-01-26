"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { ProjectState } from "@prisma/client";

export async function updateProjectState(id: string, state: ProjectState) {
	try {
		const updated = await prisma.workingProject.update({
			where: {
				id: id,
			},
			data: {
				state: state,
			},
		});

		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
