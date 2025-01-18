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

interface FormInputProps {
	label: string;
	value: string | number;
	onChange: (value: string) => void; // Change to accept only string for this case
	placeholder: string;
	type: "text" | "number";
}

const FormInput = ({
	label,
	value,
	onChange,
	placeholder,
	type,
}: FormInputProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value); // Pass the value as string
	};

	return (
		<div>
			<label className="font-bold">{label}</label>
			<input
				type={type}
				value={value || ""}
				onChange={handleChange} // Use the handler for the onChange
				placeholder={placeholder}
			/>
		</div>
	);
};
export default function NewItemModal(
	props: Readonly<{
		append: UseFieldArrayAppend<InvoiceForm, "items">;
	}>
) {
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

	const handleReset = () => {
		setNewItemDescription("");
		setNewItemQuantity(0.0);
		setNewItemUnitPrice(0.0);
		setNewItemSubTotal(0.0);
	};

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
								<FormInput
									label="Description"
									value={newItemDescription}
									onChange={setNewItemDescription}
									placeholder="Description..."
									type="text"
								/>
								<FormInput
									label="Quantity"
									value={newItemQuantity}
									onChange={(value) =>
										setNewItemQuantity(parseFloat(value))
									}
									placeholder="Quantity"
									type="number"
								/>
								<FormInput
									label="Unit Price"
									value={newItemUnitPrice}
									onChange={(value) =>
										setNewItemUnitPrice(parseFloat(value))
									}
									placeholder="Unit Price"
									type="number"
								/>
								<FormInput
									label="Sub Total"
									value={newItemSubTotal}
									onChange={() => {}}
									placeholder="Sub Total (Automatic)"
									type="number"
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										onClose();
										handleReset();
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
										handleReset();
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
