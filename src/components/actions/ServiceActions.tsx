"use server";

import { authOptions } from "@/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function Request(page: string) {
    const session = await getServerSession(authOptions);
    try {
        if (!session) {
            await prisma.serviceRequest.create({
                data: {
                    page: page,
                },
            });
        }
    } catch (err: any) {}
}

export async function RemoveOldPages() {
    try {
        await prisma.serviceRequest.deleteMany({
            where: {
                page: "/projects/tmw-next",
            },
        });
        await prisma.serviceRequest.deleteMany({
            where: {
                page: "/projects/climate-wall",
            },
        });
        await prisma.serviceRequest.deleteMany({
            where: {
                page: "/projects/one-song",
            },
        });
    } catch (err: any) {
    } finally {
        revalidatePath("/dashboard");
    }
}
