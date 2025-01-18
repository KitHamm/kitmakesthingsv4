import MediaMain from "@/components/admin/media/MediaMain";
import prisma from "@/lib/prisma";

export const revalidate = 0;

export default async function Media() {
	const images = await prisma.images.findMany();
	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<MediaMain images={images} />
		</div>
	);
}
