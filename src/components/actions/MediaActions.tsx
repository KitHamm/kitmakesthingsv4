"use server";

import fs from "fs";
import prisma from "@/lib/prisma";
import { Landing, About, ContentProject } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteFile(fileName: string) {
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
	const projects: ContentProject[] = await prisma.contentProject.findMany({
		where: {
			images: {
				has: fileName,
			},
		},
	});
	if (landingContent.length > 0) {
		return Promise.reject({ Location: "Landing Content" });
	}
	if (aboutContent1.length > 0) {
		return Promise.reject({ Location: "About Content 1" });
	}
	if (aboutContent2.length > 0) {
		return Promise.reject({ Location: "About Content 2" });
	}
	if (aboutContent3.length > 0) {
		return Promise.reject({ Location: "About Content 3" });
	}
	if (aboutContent4.length > 0) {
		return Promise.reject({ Location: "About Content 4" });
	}
	if (projects.length > 0) {
		return Promise.reject({ Location: projects[0].name });
	}

	try {
		await prisma.images.delete({
			where: { url: fileName },
		});

		// try {
		// 	fs.unlinkSync(
		// 		process.cwd() +
		// 			"/" +
		// 			process.env.NEXT_PUBLIC_DELETE_IMAGE_DIR +
		// 			fileName
		// 	);
		// } catch (fsError) {
		// 	console.log(fsError);
		// }
		return Promise.resolve();
	} catch {
		return Promise.reject(new Error("unable to delete"));
	} finally {
		revalidatePath("/dashboard");
	}
}

export async function revalidateMedia() {
	revalidatePath("/dashboard");
}
