"use client";

import { ExtendedInvoice } from "@/app/(admin)/dashboard/invoices/page";
import { Client, InvoiceItem } from "@prisma/client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
    DeleteInvoice,
    UpdateInvoice,
} from "@/components/actions/InvoiceActions";
import InvoiceTopModals from "./InvoiceTopModals";
import {
    currentTaxYear,
    totalTaxYears,
} from "@/components/functions/Statistics";

export type InvoiceForm = {
    reference: string;
    date: Date;
    taxYear: string;
    paid: boolean;
    total: number;
    clientId: string;
    items: {
        description: string;
        quantity: number;
        unitPrice: number;
        subTotal: number;
    }[];
};

export type ClientForm = {
    name: string;
    address: string;
};

export default function InvoicesMain(props: {
    invoices: ExtendedInvoice[];
    clients: Client[];
}) {
    const [selectedInvoice, setSelectedInvoice] = useState(-1);
    const [selectedTaxYear, setSelectedTaxYear] = useState(currentTaxYear());
    const listTaxYears: string[] = totalTaxYears(props.invoices);
    const {
        isOpen: isOpenViewInvoice,
        onOpen: onOpenViewInvoice,
        onOpenChange: onOpenChangeViewInvoice,
    } = useDisclosure();

    function updatePaid(invoiceIndex: number) {
        UpdateInvoice(
            props.invoices[invoiceIndex].reference,
            !props.invoices[invoiceIndex].paid
        )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    function formatDate(date: Date) {
        var formattedDate = "";
        const dateOnly = date.toISOString().split("T")[0];
        const year = dateOnly.split("-")[0];
        const month = dateOnly.split("-")[1];
        const day = dateOnly.split("-")[2];
        formattedDate = day + "/" + month + "/" + year;
        return formattedDate;
    }

    return (
        <div>
            <div className="font-bold text-6xl mb-6 pb-4 text-center xl:text-start border-b-2">
                Invoices.
            </div>
            <InvoiceTopModals
                invoices={props.invoices}
                clients={props.clients}
            />
            <div className="grid grid-cols-3 xl:grid-cols-12  gap-4 mb-6">
                {listTaxYears.map((taxYear: string) => {
                    return (
                        <Button
                            className={
                                selectedTaxYear === taxYear
                                    ? "bg-green-500"
                                    : ""
                            }
                            onClick={() => setSelectedTaxYear(taxYear)}
                            key={taxYear}>
                            {taxYear}
                        </Button>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {props.invoices.map(
                    (invoice: ExtendedInvoice, index: number) => {
                        if (invoice.taxYear === selectedTaxYear) {
                            return (
                                <div
                                    onClick={() => {
                                        setSelectedInvoice(index);
                                        onOpenChangeViewInvoice();
                                    }}
                                    className="xl:hover:bg-green-200 transition-all cursor-pointer bg-neutral-100 shadow rounded-lg p-4"
                                    key={invoice.reference}>
                                    <div className="flex justify-between ">
                                        <div className="font-bold">
                                            {invoice.client.name}
                                        </div>
                                        <div className="font-bold">
                                            #{invoice.reference}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                        <div className="">
                                            £{invoice.total.toLocaleString()}
                                        </div>
                                        <div
                                            className={`${
                                                invoice.paid
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}>
                                            {invoice.paid ? "Paid" : "Not Paid"}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    }
                )}
            </div>
            <Modal
                scrollBehavior="outside"
                size="2xl"
                isOpen={isOpenViewInvoice}
                onOpenChange={onOpenChangeViewInvoice}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">
                                <div>
                                    Invoice #
                                    {props.invoices[selectedInvoice].reference}
                                </div>
                                <div
                                    className={`${
                                        props.invoices[selectedInvoice].paid
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}>
                                    {props.invoices[selectedInvoice].paid
                                        ? "Paid"
                                        : "Not Paid"}
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="font-bold">Billed To:</div>
                                    <div>
                                        {
                                            props.invoices[selectedInvoice]
                                                .client.name
                                        }
                                    </div>
                                    <div>
                                        {
                                            props.invoices[selectedInvoice]
                                                .client.address
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col xl:flex-row gap-4 xl:gap-8">
                                    <div>
                                        <div className="font-bold">Date:</div>
                                        <div>
                                            {formatDate(
                                                props.invoices[selectedInvoice]
                                                    .date
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">
                                            Tax Year:
                                        </div>
                                        <div>
                                            {
                                                props.invoices[selectedInvoice]
                                                    .taxYear
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t-2 py-4">
                                    <div className="font-bold">Items:</div>
                                    <div className="flex flex-col gap-4 mt-4">
                                        {props.invoices[
                                            selectedInvoice
                                        ].invoiceItem.map(
                                            (
                                                item: InvoiceItem,
                                                index: number
                                            ) => {
                                                return (
                                                    <div
                                                        className="border-b-2 pb-2 flex flex-col gap-4"
                                                        key={item.id}>
                                                        <div className="flex flex-col">
                                                            <div className="font-bold">
                                                                Description:
                                                            </div>
                                                            <div className="text-sm xl:text-base font-bold">
                                                                {
                                                                    item.description
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="flex-col">
                                                                <div className="font-bold">
                                                                    Quant.
                                                                </div>
                                                                <div className="text-end">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex-col">
                                                                <div className="font-bold">
                                                                    Unit Price
                                                                </div>
                                                                <div className="text-end">
                                                                    £
                                                                    {item.unitPrice.toLocaleString()}
                                                                </div>
                                                            </div>
                                                            <div className="flex-col">
                                                                <div className="font-bold">
                                                                    Sub Total
                                                                </div>
                                                                <div className="text-end">
                                                                    £
                                                                    {item.subTotal.toLocaleString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <div className="font-bold">Total:</div>
                                    <div>
                                        £
                                        {props.invoices[
                                            selectedInvoice
                                        ].total.toLocaleString()}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex w-full justify-between">
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={() => {
                                            onClose();
                                            DeleteInvoice(
                                                props.invoices[selectedInvoice]
                                                    .reference
                                            );
                                            setSelectedInvoice(-1);
                                        }}>
                                        Delete
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button
                                            color="danger"
                                            onPress={() => {
                                                onClose();
                                                setSelectedInvoice(-1);
                                            }}>
                                            Close
                                        </Button>
                                        <Button
                                            className="bg-green-500"
                                            onPress={() => {
                                                updatePaid(selectedInvoice);
                                            }}>
                                            {props.invoices[selectedInvoice]
                                                .paid
                                                ? "Mark Unpaid"
                                                : "Mark Paid"}
                                        </Button>
                                    </div>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
