"use server";

import fs from "fs";
import prisma from "@/lib/prisma";
import { Landing, About } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function DeleteFile(fileName: string) {
    const landingContent: Landing[] = await prisma.landing.findMany({
        where: { imageUrl: fileName },
    });
    const aboutContent1: About[] = await prisma.about.findMany({
        where: { image1Url: fileName },
    });
    const aboutContent2: About[] = await prisma.about.findMany({
        where: { image2Url: fileName },
    });
    const aboutContent3: About[] = await prisma.about.findMany({
        where: { image3Url: fileName },
    });
    const aboutContent4: About[] = await prisma.about.findMany({
        where: { image4Url: fileName },
    });
    if (landingContent.length > 0) {
        return Promise.resolve({ status: 201, message: "Landing Content" });
    }
    if (aboutContent1.length > 0) {
        return Promise.resolve({ status: 201, message: "About Content 1" });
    }
    if (aboutContent2.length > 0) {
        return Promise.resolve({ status: 201, message: "About Content 2" });
    }
    if (aboutContent3.length > 0) {
        return Promise.resolve({ status: 201, message: "About Content 3" });
    }
    if (aboutContent4.length > 0) {
        return Promise.resolve({ status: 201, message: "About Content 4" });
    }

    try {
        await prisma.images.delete({
            where: { url: fileName },
        });

        fs.unlinkSync(
            process.cwd() +
                "/" +
                process.env.NEXT_PUBLIC_DELETE_IMAGE_DIR +
                fileName
        );
        return Promise.resolve({ status: 200, message: "deleted" });
    } catch {
        return Promise.resolve({ status: 201, message: "unable to delete" });
    } finally {
        revalidatePath("/account");
    }
}

export async function RevalidateMedia() {
    revalidatePath("/account");
}
