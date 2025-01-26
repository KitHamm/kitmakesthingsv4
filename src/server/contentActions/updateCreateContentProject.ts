"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { ContentProjectForm } from "@/lib/types";

export async function updateCreateContentProject(
	data: ContentProjectForm,
	oldSlug: string
) {
	try {
		const project = await prisma.contentProject.findUnique({
			where: {
				slug: oldSlug,
			},
		});

		const stack = data.stack?.map((stack) => stack.name) || [];
		const images = data.images?.map((image) => image.url) || [];

		const action = project
			? prisma.contentProject.update({
					where: {
						slug: project.slug,
					},
					data: {
						name: data.name,
						slug: data.slug,
						role: data.role,
						stack,
						description: data.description,
						date: data.date,
						where: data.where,
						images,
						client: data.client,
						short: data.short,
						outLink: data.outLink ?? null,
						outLinkText: data.outLinkText ?? null,
						order: parseInt(data.order.toString()),
					},
			  })
			: prisma.contentProject.create({
					data: {
						name: data.name,
						slug: data.slug,
						role: data.role,
						stack,
						description: data.description,
						date: data.date,
						where: data.where,
						images,
						client: data.client,
						short: data.short,
						outLink: data.outLink ?? null,
						outLinkText: data.outLinkText ?? null,
						order: parseInt(data.order.toString()),
					},
			  });
		const updated = await action;

		revalidatePath("/");
		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
