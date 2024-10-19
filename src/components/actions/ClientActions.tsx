"use server";

import prisma from "@/lib/prisma";
import { ClientForm } from "../admin/invoices/InvoicesMain";
import { revalidatePath } from "next/cache";

export async function CreateClient(data: ClientForm) {
    try {
        const client = await prisma.client.create({
            data: {
                name: data.name,
                address: data.address,
            },
        });

        return { status: 200, message: "success", client };
    } catch (error: any) {
        return { status: 400, message: error.message };
    } finally {
        revalidatePath("/dashboard/invoices");
    }
}

export async function DeleteClient(clientId: string) {
    try {
        await prisma.client.delete({ where: { id: clientId } });
        return { status: 200, message: "success" };
    } catch (error: any) {
        return { status: 400, message: error.message };
    } finally {
        revalidatePath("/dashboard/invoices");
    }
}
