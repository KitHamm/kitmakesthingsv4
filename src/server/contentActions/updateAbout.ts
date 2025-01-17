"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AboutContentForm } from "@/lib/types";

export async function updateAbout(data: AboutContentForm) {
	try {
		await prisma.about.update({
			where: {
				page: "about",
			},
			data,
		});
		revalidatePath("/about");
		revalidatePath("/dashboard/content");
		return { status: 200, message: "updated" };
	} catch (error: any) {
		return { status: 400, message: error };
	}
}
