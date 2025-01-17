"use server";

import prisma from "@/lib/prisma";
import { LandingContentForm, AboutContentForm } from "@/lib/types";
import { revalidatePath } from "next/cache";

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
