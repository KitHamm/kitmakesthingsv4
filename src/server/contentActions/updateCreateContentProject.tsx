"use server";

import prisma from "@/lib/prisma";
import { ContentProjectForm } from "@/lib/types";
import { revalidatePath } from "next/cache";

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

		const stack = data.stack.map((stack) => stack.name);
		const images = data.images.map((image) => image.url);

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
						order: data.order,
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
						order: data.order,
					},
			  });
		await action;
		revalidatePath("projects/");
		revalidatePath("projects/" + data.slug);
		revalidatePath("dashboard/content/projects/");
		return { status: 200, message: "success" };
	} catch (error: any) {
		return { status: 400, message: error };
	}
}
