"use client";
import { Button } from "@nextui-org/react";
import CustomModal from "./CustomModal";
import ClientList from "./ClientList";
import ClientFormComponent from "./ClientForm";
import { useState } from "react";
import { createClient, deleteClient } from "@/components/actions/ClientActions";
import { Client } from "@prisma/client";
import { ClientForm } from "@/lib/types";

export default function ManageClientsButton(props: { clients: Client[] }) {
	const [currentModal, setCurrentModal] = useState<
		"manageClients" | "newClient" | null
	>(null);

	const openModal = (modal: "manageClients" | "newClient") =>
		setCurrentModal(modal);
	const closeModal = () => setCurrentModal(null);

	const handleCreateClient = (data: ClientForm) => {
		createClient(data).catch(console.error);
	};

	const handleDeleteClient = (id: string) => {
		deleteClient(id).catch(console.error);
	};

	return (
		<>
			<Button
				onPress={() => openModal("manageClients")}
				className="bg-green-500 w-full lg:w-auto"
			>
				Manage Clients
			</Button>

			{/* Manage Clients Modal */}
			<CustomModal
				isOpen={currentModal === "manageClients"}
				onClose={closeModal}
				title="Manage Clients"
				footerButtons={
					<>
						<Button
							type="button"
							color="danger"
							variant="light"
							onPress={closeModal}
						>
							Close
						</Button>
						<Button
							className="bg-green-500"
							onPress={() => openModal("newClient")}
						>
							New Client
						</Button>
					</>
				}
			>
				<ClientList
					clients={props.clients}
					onDelete={handleDeleteClient}
				/>
			</CustomModal>

			{/* New Client Modal */}
			<CustomModal
				isOpen={currentModal === "newClient"}
				onClose={closeModal}
				title="New Client"
				footerButtons={
					<>
						<Button
							type="button"
							color="danger"
							variant="light"
							onPress={closeModal}
						>
							Close
						</Button>
						<Button
							className="bg-green-500"
							type="submit"
							form="newClientForm"
						>
							Submit
						</Button>
					</>
				}
			>
				<ClientFormComponent
					onSubmit={handleCreateClient}
					onClose={closeModal}
				/>
			</CustomModal>
		</>
	);
}
