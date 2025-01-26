"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { AboutContentForm } from "@/lib/types";

export async function updateAbout(data: AboutContentForm) {
	try {
		const updated = await prisma.about.update({
			where: {
				page: "about",
			},
			data,
		});

		revalidatePath("/");
		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
