"use server";

import prisma from "@/lib/prisma";
import { ProjectForm } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function addNewProject(data: ProjectForm) {
	try {
		await prisma.workingProject.create({
			data: {
				name: data.name,
				dateDue: data.dateDue,
				client: {
					connect: {
						id: data.clientId,
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
