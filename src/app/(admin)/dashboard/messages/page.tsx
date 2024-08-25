import prisma from "@/lib/prisma";
import MessagesMain from "@/components/admin/messages/MessageMain";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export default async function Messages() {
    const session = getServerSession(authOptions);

    const messages = await prisma.messages.findMany({
        orderBy: { createdAt: "desc" },
    });
    return (
        <div className="xl:py-10 xl:px-10 py-4 px-4">
            <MessagesMain messages={messages} />
        </div>
    );
}
