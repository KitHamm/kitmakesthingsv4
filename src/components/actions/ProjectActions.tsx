"use server";

import prisma from "@/lib/prisma";
import { ContentProjectFormType } from "../admin/content/ProjectsMain";
import { revalidatePath } from "next/cache";

export async function AddProject(data: ContentProjectFormType) {
    var stack: string[] = [];
    var images: string[] = [];

    for (let i = 0; i < data.stack.length; i++) {
        stack.push(data.stack[i].name);
    }

    for (let i = 0; i < data.images.length; i++) {
        images.push(data.images[i].url);
    }

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
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        console.log(err);
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/content/projects");
    }
}

export async function DeleteProject(slug: string) {
    try {
        await prisma.contentProject.delete({
            where: {
                slug: slug,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 200, message: err });
    } finally {
        revalidatePath("/dashboard/content/projects");
    }
}
