"use client";
// packages
import { Button } from "@nextui-org/react";
// functions
import { deleteMessage } from "@/server/messageActions/deleteMessage";

const MessageDeleteButton = ({ id }: Readonly<{ id: string }>) => {
	const onDelete = async () => {
		try {
			const res = await deleteMessage(id);
			if (!res.success) {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	return (
		<Button
			onPress={onDelete}
			color="danger"
			variant="light"
			type="button"
			className="text-md"
		>
			Delete Message
		</Button>
	);
};

export default MessageDeleteButton;
