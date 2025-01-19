"use client";

import { getCurrentTaxYear } from "@/lib/utils/invoiceUtils/getCurrentTaxYear";
import { InvoiceWithClientAndItems } from "@/lib/types";
import { createContext, useState, useMemo } from "react";
import { useDisclosure } from "@nextui-org/react";

type InvoiceStateType = {
	selectedTaxYear: string;
	setSelectedTaxYear: React.Dispatch<React.SetStateAction<string>>;
	selectedInvoice: InvoiceWithClientAndItems;
	setSelectedInvoice: React.Dispatch<
		React.SetStateAction<InvoiceWithClientAndItems>
	>;
	isOpenViewInvoice: boolean;
	onOpenViewInvoice: () => void;
	onOpenChangeViewInvoice: (value: boolean) => void;
};

export const InvoiceStateContext = createContext<InvoiceStateType>(
	{} as InvoiceStateType
);

export default function InvoiceStateProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [selectedTaxYear, setSelectedTaxYear] = useState<string>(
		getCurrentTaxYear()
	);
	const [selectedInvoice, setSelectedInvoice] =
		useState<InvoiceWithClientAndItems>({} as InvoiceWithClientAndItems);

	const {
		isOpen: isOpenViewInvoice,
		onOpen: onOpenViewInvoice,
		onOpenChange: onOpenChangeViewInvoice,
	} = useDisclosure();

	const invoiceContextValue = useMemo(
		() => ({
			selectedTaxYear,
			setSelectedTaxYear,
			selectedInvoice,
			setSelectedInvoice,
			isOpenViewInvoice,
			onOpenViewInvoice,
			onOpenChangeViewInvoice,
		}),
		[
			selectedTaxYear,
			setSelectedTaxYear,
			selectedInvoice,
			setSelectedInvoice,
			isOpenViewInvoice,
			onOpenViewInvoice,
			onOpenChangeViewInvoice,
		]
	);

	return (
		<InvoiceStateContext.Provider value={invoiceContextValue}>
			{children}
		</InvoiceStateContext.Provider>
	);
}
