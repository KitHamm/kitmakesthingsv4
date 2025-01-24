"use server";

import { revalidatePath } from "next/cache";

export const forceRevalidate = async (path: string) => {
	revalidatePath(path);
};
