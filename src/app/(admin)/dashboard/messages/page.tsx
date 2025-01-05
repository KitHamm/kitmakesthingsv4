import prisma from "@/lib/prisma";
import MessagesMain from "@/components/admin/messages/MessageMain";

export default async function Messages() {
	const messages = await prisma.messages.findMany({
		orderBy: { createdAt: "desc" },
	});
	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<MessagesMain messages={messages} />
		</div>
	);
}
