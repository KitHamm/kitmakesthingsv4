"use server";

import prisma from "@/lib/prisma";
import { ContactModalType } from "../ContactModal";

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
