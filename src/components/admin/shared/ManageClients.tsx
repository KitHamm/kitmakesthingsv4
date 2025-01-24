"use client";
// packages
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
// functions
import { deleteClient } from "@/server/clientActions/deleteClient";
import { createClient } from "@/server/clientActions/createClient";
// types
import { Client } from "@prisma/client";
import { ClientForm } from "@/lib/types";

const ManageClientsModal = ({ clients }: Readonly<{ clients: Client[] }>) => {
	const {
		isOpen: isOpenManageClients,
		onOpenChange: onOpenChangeManageClients,
		onClose: onCloseManageClients,
	} = useDisclosure();
	const {
		isOpen: isOpenNewClient,
		onOpenChange: onOpenChangeNewClient,
		onClose: onCloseNewClient,
	} = useDisclosure();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ClientForm>({
		defaultValues: {
			name: "",
			address: "",
		},
	});

	const onSubmit = async (data: ClientForm) => {
		try {
			const res = await createClient(data);
			if (res.status === 200) {
				onCloseNewClient();
				reset();
			} else {
				console.log(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onDelete = async (id: string) => {
		try {
			const res = await deleteClient(id);
			if (res.status === 200) {
				onCloseManageClients();
			} else {
				console.log(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button
				onPress={onOpenChangeManageClients}
				className="bg-green-500 rounded-lg w-full lg:w-auto text-white text-md"
			>
				Manage Clients
			</Button>
			<Modal
				isDismissable={false}
				isOpen={isOpenManageClients}
				onOpenChange={onOpenChangeManageClients}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Manage Clients
							</ModalHeader>
							<div className="px-4">
								{clients.map((client: Client) => {
									return (
										<div
											className="border-b-2 py-2 flex justify-between"
											key={client.id}
										>
											<div className="font-bold my-auto">
												{client.name}
											</div>
											<Button
												onPress={() => {
													onDelete(client.id);
												}}
												color="danger"
												variant="light"
											>
												Delete
											</Button>
										</div>
									);
								})}
							</div>
							<ModalBody></ModalBody>
							<ModalFooter>
								<Button
									type="button"
									color="danger"
									variant="light"
									onPress={() => {
										onClose();
										reset();
									}}
								>
									Close
								</Button>
								<Button
									className="bg-green-500"
									onPress={onOpenChangeNewClient}
								>
									New Client
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<Modal
				isDismissable={false}
				isOpen={isOpenNewClient}
				onOpenChange={onOpenChangeNewClient}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								New Client
							</ModalHeader>
							<form onSubmit={handleSubmit(onSubmit)}>
								<ModalBody>
									<div>
										<label
											className="font-bold"
											htmlFor="name"
										>
											Client Name:
										</label>
										<input
											type="text"
											{...register("name", {
												required: {
													value: true,
													message:
														"Client Name is required.",
												},
											})}
											placeholder={
												errors.name
													? errors.name.message
													: "Client Name"
											}
											className={
												errors.name
													? "placeholder:text-red-500"
													: ""
											}
										/>
									</div>
									<div>
										<label
											className="font-bold"
											htmlFor="name"
										>
											Client Address:
										</label>
										<textarea
											{...register("address", {
												required: {
													value: true,
													message:
														"Address is required.",
												},
											})}
											placeholder={
												errors.address
													? errors.address.message
													: "Client address"
											}
											className={
												errors.address
													? "placeholder:text-red-500"
													: ""
											}
										/>
									</div>
								</ModalBody>
								<ModalFooter>
									<Button
										type="button"
										color="danger"
										variant="light"
										onPress={() => {
											onClose();
											reset();
										}}
									>
										Close
									</Button>
									<Button
										className="bg-green-500"
										type="submit"
									>
										Submit
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default ManageClientsModal;
