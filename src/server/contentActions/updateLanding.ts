"use server";
// prisma
import prisma from "@/lib/prisma";
// packages
import { revalidatePath } from "next/cache";
// types
import { LandingContentForm } from "@/lib/types";
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

		return { status: 200, message: "updated" };
	} catch (error: any) {
		return { status: 400, message: error };
	}
}
