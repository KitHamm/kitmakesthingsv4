"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { TaxFormData } from "@/components/admin/stats/TaxCalculator";

export async function updateTaxSettings(data: TaxFormData) {
	try {
		const updated = await prisma.taxSettings.upsert({
			where: { id: data.id },
			create: data,
			update: data,
		});

		revalidatePath("/dashboard");
		return createResponse(true, updated);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
