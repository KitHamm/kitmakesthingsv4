"use client";

import { InvoiceForm } from "@/lib/types";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";

export default function NewItemModal(props: {
	append: UseFieldArrayAppend<InvoiceForm, "items">;
}) {
	const { append } = props;
	const [newItemDescription, setNewItemDescription] = useState("");
	const [newItemQuantity, setNewItemQuantity] = useState(0.0);
	const [newItemUnitPrice, setNewItemUnitPrice] = useState(0.0);
	const [newItemSubTotal, setNewItemSubTotal] = useState(0.0);
	const { isOpen: isOpenNewItem, onOpenChange: onOpenChangeNewItem } =
		useDisclosure();

	useEffect(() => {
		if (newItemQuantity > 0 && newItemUnitPrice > 0) {
			setNewItemSubTotal(newItemUnitPrice * newItemQuantity);
		}
	}, [newItemQuantity, newItemUnitPrice]);
	return (
		<>
			<Button
				onPress={() => onOpenChangeNewItem()}
				className="bg-green-500"
			>
				Add Item
			</Button>
			<Modal isOpen={isOpenNewItem} onOpenChange={onOpenChangeNewItem}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Invoice Item
							</ModalHeader>
							<ModalBody>
								<div>
									<label
										className="font-bold"
										htmlFor="description"
									>
										Description:
									</label>
									<textarea
										name="description"
										value={newItemDescription}
										placeholder="Description..."
										onChange={(e) =>
											setNewItemDescription(
												e.target.value
											)
										}
									/>
								</div>
								<div>
									<label
										className="font-bold"
										htmlFor="description"
									>
										Quantity:
									</label>
									<input
										type="number"
										value={newItemQuantity || ``}
										onChange={(e) =>
											setNewItemQuantity(
												parseFloat(e.target.value)
											)
										}
										placeholder="Quantity"
									/>
								</div>
								<div>
									<label
										className="font-bold"
										htmlFor="description"
									>
										Unit Price:
									</label>
									<input
										type="number"
										value={newItemUnitPrice || ``}
										onChange={(e) =>
											setNewItemUnitPrice(
												parseFloat(e.target.value)
											)
										}
										placeholder="Unit Price"
									/>
								</div>
								<div>
									<label
										className="font-bold"
										htmlFor="description"
									>
										Sub Total:
									</label>
									<input
										type="number"
										value={newItemSubTotal || ``}
										onChange={(e) => {}}
										placeholder="Sub Total (Automatic)"
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										onClose();
										setNewItemDescription("");
										setNewItemQuantity(0.0);
										setNewItemUnitPrice(0.0);
										setNewItemSubTotal(0.0);
									}}
								>
									Close
								</Button>
								<Button
									className="bg-green-500"
									onPress={() => {
										append({
											description: newItemDescription,
											quantity: newItemQuantity,
											unitPrice: newItemUnitPrice,
											subTotal: newItemSubTotal,
										});
										onClose();
										setNewItemDescription("");
										setNewItemQuantity(0.0);
										setNewItemUnitPrice(0.0);
										setNewItemSubTotal(0.0);
									}}
								>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
