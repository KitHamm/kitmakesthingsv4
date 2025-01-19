"use server";

import fs from "fs";
import prisma from "@/lib/prisma";
import { Landing, About, ContentProject } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";

export async function deleteMedia(fileName: string) {
	const landingContent: Landing[] = await prisma.landing.findMany({
		where: {
			OR: [
				{ techParallaxImage: fileName },
				{ aboutParallaxImage: fileName },
				{ firstHighlightImage: fileName },
				{ secondHighlightImage: fileName },
				{ thirdHighlightImage: fileName },
			],
		},
	});

	const aboutContent: About[] = await prisma.about.findMany({
		where: {
			OR: [
				{ image1Url: fileName },
				{ image2Url: fileName },
				{ image3Url: fileName },
				{ image4Url: fileName },
			],
		},
	});

	const projects: ContentProject[] = await prisma.contentProject.findMany({
		where: {
			images: {
				has: fileName,
			},
		},
	});
	if (landingContent.length > 0) {
		return { status: 400, message: "Landing Content" };
	}
	if (aboutContent.length > 0) {
		return { status: 400, message: "About Content" };
	}
	if (projects.length > 0) {
		return { status: 400, message: projects[0].name };
	}

	try {
		await prisma.images.delete({
			where: { url: fileName },
		});

		try {
			fs.unlinkSync(
				process.cwd() +
					"/" +
					process.env.NEXT_PUBLIC_DELETE_IMAGE_DIR +
					fileName
			);
		} catch (fsError) {
			console.log(fsError);
		}
		revalidatePath("/dashboard/media");
		revalidatePath("/dashboard/content");
		revalidatePath("/dashboard/content");
		revalidatePath("/dashboard/content/projects");
		return actionResponse(200, "deleted");
	} catch {
		return actionResponse(400, "error");
	}
}
