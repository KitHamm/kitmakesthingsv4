"use client";
// packages
import { useEffect, useState } from "react";
// functions
import { getMessages } from "@/server/messageActions/getMessages";
// components
import PageTitle from "@/components/admin/shared/PageTitle";
import MessageCard from "@/components/admin/messages/MessageCard";
// types
import { Messages } from "@prisma/client";

export default function MessagesPage() {
	const [messages, setMessages] = useState<Messages[]>([]);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await getMessages();
				if (res.success) {
					setMessages(res.data as Messages[]);
				} else {
					setMessages([]);
					console.log("Error:", res.error);
				}
			} catch (error) {
				setMessages([]);
				console.log("Unexpected error:", error);
			}
		};
		fetchMessages();
	}, []);

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<PageTitle title="Messages." />
			{messages.length > 0 ? (
				messages.map((message: Messages) => (
					<MessageCard
						key={message.id}
						id={message.id}
						read={message.read}
					>
						<div className="text-xl lg:text-base lg:basis-2/12 font-bold truncate">
							{message.name}
						</div>
						<div className="text-sm flex items-center lg:basis-3/12 truncate italic">
							{message.email}
						</div>
						<div className="lg:basis-5/12 truncate">
							{message.message}
						</div>
						<div className="font-bold lg:basis-2/12 text-end">
							{message.createdAt.toDateString()}
						</div>
					</MessageCard>
				))
			) : (
				<div>No messages.</div>
			)}
		</div>
	);
}
