import { Button } from "@nextui-org/react";
import { Client } from "@prisma/client";

const ClientList = ({
	clients,
	onDelete,
}: {
	clients: Client[];
	onDelete: (id: string) => void;
}) => (
	<div className="px-4">
		{clients.map((client) => (
			<div
				className="border-b-2 py-2 flex justify-between"
				key={client.id}
			>
				<div className="font-bold my-auto">{client.name}</div>
				<Button
					onPress={() => onDelete(client.id)}
					color="danger"
					variant="light"
				>
					Delete
				</Button>
			</div>
		))}
	</div>
);

export default ClientList;
