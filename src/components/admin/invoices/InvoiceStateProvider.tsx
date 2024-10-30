"use client";

import { currentTaxYear } from "@/components/functions/Statistics";
import { InvoiceWithClientAndItems } from "@/lib/types";
import { createContext, useState } from "react";
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
    isOpenEditInvoice: boolean;
    onOpenEditInvoice: () => void;
    onOpenChangeEditInvoice: (value: boolean) => void;
};

export const InvoiceStateContext = createContext<InvoiceStateType>(
    {} as InvoiceStateType
);

export default function InvoiceStateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedTaxYear, setSelectedTaxYear] = useState<string>(
        currentTaxYear()
    );
    const [selectedInvoice, setSelectedInvoice] =
        useState<InvoiceWithClientAndItems>({} as InvoiceWithClientAndItems);

    const {
        isOpen: isOpenViewInvoice,
        onOpen: onOpenViewInvoice,
        onOpenChange: onOpenChangeViewInvoice,
    } = useDisclosure();

    const {
        isOpen: isOpenEditInvoice,
        onOpen: onOpenEditInvoice,
        onOpenChange: onOpenChangeEditInvoice,
    } = useDisclosure();

    return (
        <InvoiceStateContext.Provider
            value={{
                selectedTaxYear,
                setSelectedTaxYear,
                selectedInvoice,
                setSelectedInvoice,
                isOpenViewInvoice,
                onOpenViewInvoice,
                onOpenChangeViewInvoice,
                isOpenEditInvoice,
                onOpenEditInvoice,
                onOpenChangeEditInvoice,
            }}>
            {children}
        </InvoiceStateContext.Provider>
    );
}
