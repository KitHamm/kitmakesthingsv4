// prisma
import prisma from "@/lib/prisma";
// packages
import { redirect } from "next/navigation";
import Link from "next/link";
// components
import PageTitle from "@/components/admin/shared/PageTitle";
import MessageDeleteButton from "@/components/admin/messages/MessageDeleteButton";
// types
import { Messages } from "@prisma/client";
import MessageMarkUnreadButton from "@/components/admin/messages/MessageMarkUnreadButton";

export default async function ViewMessagePage({
	params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;
	let message: Messages | null = null;
	try {
		message = await prisma.messages.findUnique({
			where: {
				id: id,
			},
		});
	} catch {
		redirect("/dashboard/messages");
	}

	if (!message) {
		redirect("/dashboard/messages");
	}

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<PageTitle title="Messages." />
			<div className="flex justify-between">
				<div className="flex flex-col">
					<div className="flex gap-2 text-xl">
						<div className="font-bold">From:</div>
						<div>{message.name}</div>
					</div>
					<Link
						href={`mailto:${message.email}`}
						className="italic underline"
					>
						{message.email}
					</Link>
				</div>
				<div className="flex gap-2">
					<MessageDeleteButton id={message.id} />
					<MessageMarkUnreadButton id={message.id} />
				</div>
			</div>
			<div className="bg-neutral-100 p-4 my-4 rounded-xl shadow">
				{message.message}
			</div>
		</div>
	);
}
