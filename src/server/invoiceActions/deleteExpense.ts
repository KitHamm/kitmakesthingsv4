"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";

export async function deleteExpense(id: string) {
	try {
		const deleted = await prisma.expense.delete({
			where: { id },
		});
		revalidatePath("/admin/dashboard/expenses");
		return createResponse(true, deleted);
	} catch (error) {
		console.error("Error deleting expense:", error);
		return createResponse(false, null, error);
	}
}
