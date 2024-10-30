"use client";

import { InvoiceWithClientAndItems } from "@/lib/types";
import { useContext } from "react";
import { InvoiceStateContext } from "./InvoiceStateProvider";
import { updateInvoicePaid } from "@/components/actions/InvoiceActions";

export default function InvoiceCards(props: {
    invoices: InvoiceWithClientAndItems[];
}) {
    const {
        selectedInvoice,
        setSelectedInvoice,
        selectedTaxYear,
        onOpenViewInvoice,
    } = useContext(InvoiceStateContext);

    function updatePaid(invoiceIndex: number) {
        updateInvoicePaid(
            props.invoices[invoiceIndex].reference,
            !props.invoices[invoiceIndex].paid
        ).catch((err) => console.log(err));
    }

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {props.invoices.map(
                    (invoice: InvoiceWithClientAndItems, index: number) => {
                        if (invoice.taxYear === selectedTaxYear) {
                            return (
                                <div
                                    onClick={() => {
                                        setSelectedInvoice(invoice);
                                        onOpenViewInvoice();
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
            {/* <Modal
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
                                    <div className="font-bold">
                                        {
                                            props.invoices[selectedInvoice]
                                                .client.name
                                        }
                                    </div>
                                    <Markdown>
                                        {
                                            props.invoices[selectedInvoice]
                                                .client.address
                                        }
                                    </Markdown>
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
                                                            <Markdown className="text-sm xl:text-base">
                                                                {
                                                                    item.description
                                                                }
                                                            </Markdown>
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
                                            deleteInvoice(
                                                props.invoices[selectedInvoice]
                                                    .reference
                                            )
                                                .then(() => {
                                                    setSelectedInvoice(-1);
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                });
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
            </Modal> */}
        </>
    );
}
