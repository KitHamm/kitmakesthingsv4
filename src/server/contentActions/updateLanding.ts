"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { LandingContentForm } from "@/lib/types";

export async function updateLanding(data: LandingContentForm) {
	try {
		const updated = await prisma.landing.update({
			where: {
				page: "landing",
			},
			data: {
				title: data.title,
				copy: data.copy,
				techParallaxImage: data.techParallaxImage,
				firstHighlightImage: data.firstHighlightImage,
				firstHighlightHeader: data.firstHighlightHeader,
				firstHighlightText: data.firstHighlightText,
				secondHighlightImage: data.secondHighlightImage,
				secondHighlightHeader: data.secondHighlightHeader,
				secondHighlightText: data.secondHighlightText,
				thirdHighlightImage: data.thirdHighlightImage,
				thirdHighlightHeader: data.thirdHighlightHeader,
				thirdHighlightText: data.thirdHighlightText,
				aboutParallaxImage: data.aboutParallaxImage,
				shortAbout: data.shortAbout,
			},
		});

		await prisma.tech.deleteMany();
		await prisma.tech.createMany({
			data: data.tech,
			skipDuplicates: true,
		});

		revalidatePath("/dashboard");
		revalidatePath("/");
		return createResponse(true, updated);
	} catch (error: any) {
		return createResponse(false, null, error.message);
	}
}
