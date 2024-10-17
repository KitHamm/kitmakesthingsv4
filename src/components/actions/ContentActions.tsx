"use server";

import prisma from "@/lib/prisma";
import { AboutFormType, LandingFormType } from "../admin/content/ContentMain";
import { revalidatePath } from "next/cache";

export async function UpdateLanding(data: LandingFormType) {
    const oldTech = await prisma.tech.findMany();

    for (let i = 0; i < oldTech.length; i++) {
        await prisma.tech.delete({
            where: {
                name: oldTech[i].name,
            },
        });
    }

    try {
        await prisma.landing.upsert({
            where: {
                page: "landing",
            },
            update: {
                title: data.title,
                Copy: data.copy,
                imageUrl: data.imageUrl,
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
            create: {
                page: "landing",
                title: data.title,
                Copy: data.copy,
                imageUrl: data.imageUrl,
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
        try {
            for (let i = 0; i < data.tech.length; i++) {
                await prisma.tech.upsert({
                    where: {
                        name: data.tech[i].name,
                    },
                    update: {
                        order: data.tech[i].order,
                    },
                    create: {
                        name: data.tech[i].name,
                        order: i,
                        landing: {
                            connect: {
                                page: "landing",
                            },
                        },
                    },
                });
            }
            return Promise.resolve({
                status: 201,
                message: "success",
            });
        } catch (err: any) {
            return Promise.resolve({ status: 201, message: err });
        } finally {
            revalidatePath("/dashboard/content");
        }
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    }
}

export async function UpdateAbout(data: AboutFormType) {
    try {
        await prisma.about.upsert({
            where: {
                page: "about",
            },
            update: {
                title: data.title,
                text1: data.text1,
                text2: data.text2,
                Copy: data.copy,
                image1Url: data.image1Url,
                image2Url: data.image2Url,
                image3Url: data.image3Url,
                image4Url: data.image4Url,
                title1: data.title1,
                title2: data.title2,
                title3: data.title3,
                title4: data.title4,
            },
            create: {
                page: "about",
                title: data.title,
                text1: data.text1,
                text2: data.text2,
                Copy: data.copy,
                image1Url: data.image1Url,
                image2Url: data.image2Url,
                image3Url: data.image3Url,
                image4Url: data.image4Url,
                title1: data.title1,
                title2: data.title2,
                title3: data.title3,
                title4: data.title4,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/content");
        revalidatePath("/");
    }
}
