import MediaMain from "@/components/admin/media/MediaMain";
import prisma from "@/lib/prisma";

export default async function Media() {
    const images = await prisma.images.findMany();
    return (
        <div className="xl:py-10 xl:px-10 py-4 px-4">
            <MediaMain images={images} />
        </div>
    );
}
