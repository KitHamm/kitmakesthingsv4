"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { LandingContentForm } from "@/lib/types";
import { actionResponse } from "@/lib/utils/miscUtils/actionResponse";

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

		// Update the tech
		await prisma.tech.deleteMany();
		await prisma.tech.createMany({
			data: data.tech,
			skipDuplicates: true,
		});
		revalidatePath("/dashboard/content");
		revalidatePath("/");

		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
