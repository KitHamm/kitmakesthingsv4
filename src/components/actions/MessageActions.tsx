"use server";

import prisma from "@/lib/prisma";
import { ContactForm } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function sendMessage(data: ContactForm) {
    try {
        await prisma.messages.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/messages");
    }
}

export async function updateMessageRead(messageId: string, read: boolean) {
    try {
        await prisma.messages.update({
            where: {
                id: messageId,
            },
            data: {
                read: read,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/messages");
    }
}

export async function deleteMessage(messageId: string) {
    try {
        await prisma.messages.delete({
            where: {
                id: messageId,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/messages");
    }
}
