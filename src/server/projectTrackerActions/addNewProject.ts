"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { ProjectForm } from "@/lib/types";

export async function addNewProject(data: ProjectForm) {
	try {
		const project = await prisma.workingProject.create({
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

		revalidatePath("/dashboard");
		return createResponse(true, project);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
