// prisma
import prisma from "@/lib/prisma";
// components
import PageTitle from "@/components/admin/shared/PageTitle";
import MediaMain from "@/components/admin/media/MediaMain";
import UploadImageModal from "@/components/admin/media/UploadImageModal";
// types
import { Images } from "@prisma/client";

export const revalidate = 0;

export default async function MediaPage() {
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
			<PageTitle title="Media." />
			<UploadImageModal />
			<MediaMain images={images} />
		</div>
	);
}
