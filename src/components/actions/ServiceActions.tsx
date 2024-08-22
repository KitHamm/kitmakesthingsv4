"use server";

import prisma from "@/lib/prisma";

export async function Request(page: string) {
    try {
        await prisma.serviceRequest.create({
            data: {
                page: page,
            },
        });
    } catch (err: any) {}
}
