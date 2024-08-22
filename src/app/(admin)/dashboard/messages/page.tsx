import prisma from "@/lib/prisma";
import MessagesMain from "@/components/admin/messages/MessageMain";

export default async function Messages() {
    const messages = await prisma.messages.findMany({
        orderBy: { createdAt: "desc" },
    });
    return (
        <div className="p-10">
            <MessagesMain messages={messages} />
        </div>
    );
}
