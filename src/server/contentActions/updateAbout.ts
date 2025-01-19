"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionResponse } from "@/lib/functions";
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
		return actionResponse(200, "updated");
	} catch (error: any) {
		return actionResponse(400, error);
	}
}
