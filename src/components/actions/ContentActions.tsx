"use server";

import prisma from "@/lib/prisma";
import { LandingContentForm, AboutContentForm } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function updateLanding(data: LandingContentForm) {
    try {
        // Update the landing page content
        await prisma.landing.update({
            where: {
                page: "landing",
            },
            data: {
                title: data.title,
                copy: data.copy,
                imageUrl: data.imageUrl,
                shortAbout: data.shortAbout,
                firstHighlightIcon: data.firstHighlightIcon,
                firstHighlightHeader: data.firstHighlightHeader,
                firstHighlightText: data.firstHighlightText,
                secondHighlightIcon: data.secondHighlightIcon,
                secondHighlightHeader: data.secondHighlightHeader,
                secondHighlightText: data.secondHighlightText,
                thirdHighlightIcon: data.thirdHighlightIcon,
                thirdHighlightHeader: data.thirdHighlightHeader,
                thirdHighlightText: data.thirdHighlightText,
            },
        });

        // Update the tech
        await prisma.tech.deleteMany();
        await prisma.tech.createMany({
            data: data.tech,
            skipDuplicates: true,
        });

        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/content");
        revalidatePath("/");
    }
}

export async function updateAbout(data: AboutContentForm) {
    try {
        await prisma.about.update({
            where: {
                page: "about",
            },
            data: data,
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/content");
        revalidatePath("/about");
    }
}
