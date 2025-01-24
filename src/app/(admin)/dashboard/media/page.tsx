// prisma
import prisma from "@/lib/prisma";
// components
import MediaMain from "@/components/admin/media/MediaMain";
import UploadImageModal from "@/components/admin/media/UploadImageModal";
// types
import { Images } from "@prisma/client";

export const revalidate = 0;

export default async function Media() {
	let images: Images[] = [];
	try {
		images = await prisma.images.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		console.log(error);
	}
	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<div className="font-bold text-6xl mb-6 pb-4 text-center lg:text-start border-b-2">
				Media.
			</div>
			<UploadImageModal />
			<MediaMain images={images} />
		</div>
	);
}
