"use server";

import prisma from "@/lib/prisma";
import { ClientForm } from "../admin/invoices/InvoicesMain";
import { revalidatePath } from "next/cache";

export async function CreateClient(data: ClientForm) {
    try {
        await prisma.client.create({
            data: {
                name: data.name,
                address: data.address,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/invoices");
    }
}

export async function DeleteClient(id: string) {
    try {
        await prisma.client.delete({
            where: {
                id: id,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/invoices");
    }
}
