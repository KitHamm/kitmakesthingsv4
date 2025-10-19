"use client";

import { getCurrentTaxYear } from "@/lib/utils/invoiceUtils/getCurrentTaxYear";
import { useDisclosure } from "@nextui-org/react";
import { createContext, useContext, useState, useMemo, Dispatch, SetStateAction } from "react";

export type ExpensesContextType = {
	selectedTaxYear: string;
	setSelectedTaxYear: Dispatch<SetStateAction<string>>;
	isOpenNewExpense: boolean;
	onOpenNewExpense: () => void;
	onCloseNewExpense: () => void;
};

const ExpensesContext = createContext<ExpensesContextType | null>(null);

export default function ExpensesContextProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [selectedTaxYear, setSelectedTaxYear] = useState<string>(getCurrentTaxYear());

	const { isOpen: isOpenNewExpense, onOpen: onOpenNewExpense, onClose: onCloseNewExpense } = useDisclosure();
	const value = useMemo(
		() => ({
			selectedTaxYear,
			setSelectedTaxYear,
			isOpenNewExpense,
			onOpenNewExpense,
			onCloseNewExpense,
		}),
		[selectedTaxYear, setSelectedTaxYear, isOpenNewExpense, onOpenNewExpense, onCloseNewExpense]
	);

	return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpensesContext() {
	const context = useContext(ExpensesContext);
	if (context === null) {
		throw new Error("useExpensesContext must be used within ExpensesContextProvider");
	}
	return context;
}
