import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import sharp from "sharp";
import { revalidatePath } from "next/cache";

interface ArrayFile extends File {
	arrayBuffer: () => Promise<ArrayBuffer>;
}

export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("file") as ArrayFile;

	const date = new Date();
	if (!file) {
		return new NextResponse(JSON.stringify({ error: "No file received" }), {
			status: 400,
		});
	}
	const preBuffer = Buffer.from(await file.arrayBuffer());
	const buffer = await sharp(preBuffer).webp().toBuffer();
	const fileName = file.name.split(".")[0].replace(" ", "-");
	const formattedDate = date.toISOString().replace(/:|\./g, "-");
	const formattedName =
		fileName.replace(" ", "_") + "-" + formattedDate + ".webp";
	try {
		await writeFile(
			path.join(
				process.cwd(),
				process.env.PUT_STATIC_IMAGES + formattedName
			),
			buffer
		);

		await prisma.images.create({
			data: {
				url: formattedName,
			},
		});
		revalidatePath("dashboard/content");
		revalidatePath("dashboard/media");
		return new NextResponse(JSON.stringify({ message: formattedName }), {
			status: 201,
		});
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ error: "An Error Occurred" }),
			{ status: 500 }
		);
	}
}
