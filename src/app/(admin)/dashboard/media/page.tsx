import MediaMain from "@/components/admin/media/MediaMain";
import prisma from "@/lib/prisma";

export default async function Media() {
    const images = await prisma.images.findMany();
    return (
        <div className="p-10">
            <MediaMain images={images} />
        </div>
    );
}
