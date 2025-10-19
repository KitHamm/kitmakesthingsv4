"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createResponse } from "@/lib/utils/miscUtils/actionResponse";
import { NewExpenseFormData } from "@/components/admin/expenses/NewExpenseModal";

export async function createExpense(data: NewExpenseFormData) {
	try {
		const created = await prisma.expense.create({
			data: data,
		});
		revalidatePath("/dashboard/expenses");
		revalidatePath("/dashboard");
		return createResponse(true, created);
	} catch (error) {
		return createResponse(false, null, error);
	}
}
