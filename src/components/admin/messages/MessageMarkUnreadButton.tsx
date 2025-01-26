"use client";
// packages
import { Button } from "@nextui-org/react";
import Link from "next/link";
// functions
import { updateMessageRead } from "@/server/messageActions/updateMessageRead";

const MessageMarkUnreadButton = ({ id }: Readonly<{ id: string }>) => {
	const onMarkUnread = async () => {
		try {
			const res = await updateMessageRead(id, false);
			if (!res.success) {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	return (
		<Button
			as={Link}
			href="/dashboard/messages"
			onPress={onMarkUnread}
			color="warning"
			type="button"
			className="text-md text-white"
		>
			Mark Unread
		</Button>
	);
};

export default MessageMarkUnreadButton;
