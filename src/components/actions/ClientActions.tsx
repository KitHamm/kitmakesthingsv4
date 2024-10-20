"use server";

import prisma from "@/lib/prisma";
import { ClientForm } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createClient(data: ClientForm) {
    try {
        const client = await prisma.client.create({
            data: {
                name: data.name,
                address: data.address,
            },
        });

        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(error);
    } finally {
        revalidatePath("/dashboard/invoices");
    }
}

export async function deleteClient(clientId: string) {
    try {
        await prisma.client.delete({ where: { id: clientId } });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/invoices");
    }
}
