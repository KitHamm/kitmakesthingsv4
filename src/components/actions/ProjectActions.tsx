"use server";

import prisma from "@/lib/prisma";
import { ContentProjectForm } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function addProject(data: ContentProjectForm) {
	const stack: string[] = data.stack.map((stack) => stack.name);
	const images: string[] = data.images.map((image) => image.url);

	try {
		await prisma.contentProject.upsert({
			where: {
				slug: data.slug,
			},
			update: {
				name: data.name,
				role: data.role,
				stack: stack,
				description: data.description,
				date: data.date,
				where: data.where,
				images: images,
				client: data.client,
				short: data.short,
				outLink: data.outLink,
				outLinkText: data.outLinkText,
				order: data.order,
			},
			create: {
				name: data.name,
				slug: data.slug,
				role: data.role,
				stack: stack,
				description: data.description,
				date: data.date,
				where: data.where,
				images: images,
				client: data.client,
				short: data.short,
				outLink: data.outLink,
				outLinkText: data.outLinkText,
				order: data.order,
			},
		});
		return Promise.resolve();
	} catch (error: any) {
		return Promise.reject(new Error(error));
	} finally {
		revalidatePath("/dashboard/content/projects");
		revalidatePath("/projects");
	}
}

export async function deleteProject(slug: string) {
	try {
		await prisma.contentProject.delete({
			where: {
				slug: slug,
			},
		});
		return Promise.resolve();
	} catch (error: any) {
		return Promise.reject(new Error(error));
	} finally {
		revalidatePath("/dashboard/content/projects");
		revalidatePath("/projects");
	}
}
