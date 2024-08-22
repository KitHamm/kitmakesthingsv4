"use server";

import prisma from "@/lib/prisma";
import { ContactModalType } from "../ContactModal";
import { revalidatePath } from "next/cache";

export async function SendMessage(data: ContactModalType) {
    try {
        await prisma.messages.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    }
}

export async function UpdateMessageRead(messageId: string, read: boolean) {
    try {
        await prisma.messages.update({
            where: {
                id: messageId,
            },
            data: {
                read: read,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/messages");
    }
}

export async function DeleteMessage(messageId: string) {
    try {
        await prisma.messages.delete({
            where: {
                id: messageId,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/messages");
    }
}
