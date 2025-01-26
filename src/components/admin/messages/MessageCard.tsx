"use client";
// packages
import { Button } from "@nextui-org/react";
import Link from "next/link";
// functions
import { updateMessageRead } from "@/server/messageActions/updateMessageRead";

const MessageCard = ({
	id,
	read,
	children,
}: Readonly<{ id: string; read: boolean; children: React.ReactNode }>) => {
	const onMarkUnread = async () => {
		try {
			const res = await updateMessageRead(id, true);
			if (!res.success) {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	return (
		<Button
			onPress={onMarkUnread}
			as={Link}
			href={`/dashboard/messages/${id}`}
			className={`${
				read ? "bg-neutral-100" : "bg-green-500 text-white"
			} rounded-none cursor-pointer hover:bg-green-400 transition-colors py-2 px-4 border-y-1 flex flex-col lg:flex-row lg:gap-2`}
		>
			{children}
		</Button>
	);
};

export default MessageCard;
