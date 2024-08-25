import { authOptions } from "@/authOptions";
import MediaMain from "@/components/admin/media/MediaMain";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Media() {
    const session = getServerSession(authOptions);

    const images = await prisma.images.findMany();
    return (
        <div className="xl:py-10 xl:px-10 py-4 px-4">
            <MediaMain images={images} />
        </div>
    );
}
