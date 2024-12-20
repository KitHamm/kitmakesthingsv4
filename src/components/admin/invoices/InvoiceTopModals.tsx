"use client";

import { createClient, deleteClient } from "@/components/actions/ClientActions";
import { createInvoice } from "@/components/actions/InvoiceActions";
import { ClientForm, InvoiceForm } from "@/lib/types";
import {
    Button,
    DatePicker,
    DateValue,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure,
} from "@nextui-org/react";
import { Client } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Markdown from "react-markdown";

export default function InvoiceTopModals(props: {
    clients: Client[];
    referencePlaceholder: string;
}) {
    const [newItemDescription, setNewItemDescription] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState(0.0);
    const [newItemUnitPrice, setNewItemUnitPrice] = useState(0.0);
    const [newItemSubTotal, setNewItemSubTotal] = useState(0.0);
    const [newInvoiceTotal, setNewInvoiceTotal] = useState(0.0);
    const {
        isOpen: isOpenNewInvoice,
        onOpen: onOpenNewInvoice,
        onOpenChange: onOpenChangeNewInvoice,
        onClose: onCloseNewInvoice,
    } = useDisclosure();
    const {
        isOpen: isOpenNewItem,
        onOpen: onOpenNewItem,
        onOpenChange: onOpenChangeNewItem,
        onClose: onCloseNewItem,
    } = useDisclosure();
    const {
        isOpen: isOpenManageClients,
        onOpen: onOpenManageClients,
        onOpenChange: onOpenChangeManageClients,
        onClose: onCloseManageClients,
    } = useDisclosure();
    const {
        isOpen: isOpenNewClient,
        onOpen: onOpenNewClient,
        onOpenChange: onOpenChangeNewClient,
        onClose: onCloseNewClient,
    } = useDisclosure();

    const invoiceForm = useForm<InvoiceForm>({
        defaultValues: {
            total: 0.0,
        },
    });

    const clientForm = useForm<ClientForm>({
        defaultValues: {
            name: "",
            address: "",
        },
    });
    const { register, reset, formState, handleSubmit, control, setValue } =
        invoiceForm;
    const { errors } = formState;
    const { fields, append, remove } = useFieldArray({
        name: "items",
        control,
    });

    const {
        register: registerClient,
        reset: resetClient,
        handleSubmit: handleSubmitClient,
        formState: formStateClient,
    } = clientForm;
    const { errors: errorsClient } = formStateClient;

    useEffect(() => {
        if (newItemQuantity > 0 && newItemUnitPrice > 0) {
            setNewItemSubTotal(newItemUnitPrice * newItemQuantity);
        }
    }, [newItemQuantity, newItemUnitPrice]);

    useEffect(() => {
        if (fields.length > 0) {
            var total = 0;
            for (let i = 0; i < fields.length; i++) {
                total = total + fields[i].subTotal;
            }
            setValue("total", total);
            setNewInvoiceTotal(total);
        }
    }, [fields, newItemQuantity, newItemUnitPrice, newItemSubTotal, setValue]);

    function resetForm() {
        for (let i = 0; i < fields.length; i++) {
            remove(i);
        }
        reset({
            reference: "",
            date: undefined,
            taxYear: "",
            paid: false,
            total: 0.0,
            clientId: "",
            items: [],
        });
        setNewInvoiceTotal(0.0);
    }

    function submitInvoice(data: InvoiceForm) {
        createInvoice(data)
            .then(() => {
                onCloseNewInvoice();
                resetForm();
            })
            .catch((err) => console.log(err));
    }

    function submitClient(data: ClientForm) {
        createClient(data)
            .then(() => {
                onCloseNewClient();
                resetClient();
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <div className="mb-6 flex flex-col xl:flex-row gap-4">
                <Button
                    onClick={() => {
                        onOpenChangeNewInvoice();
                    }}
                    className="bg-green-500 w-full xl:w-auto">
                    New Invoice
                </Button>
                <Button
                    onClick={() => {
                        onOpenChangeManageClients();
                    }}
                    className="bg-green-500 w-full xl:w-auto">
                    Manage Clients
                </Button>
            </div>
            <Modal
                size="2xl"
                scrollBehavior="outside"
                isOpen={isOpenNewInvoice}
                onOpenChange={onOpenChangeNewInvoice}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                New Invoice
                            </ModalHeader>
                            <form onSubmit={handleSubmit(submitInvoice)}>
                                <ModalBody className="gap-2">
                                    <div className="flex flex-col xl:flex-row xl:gap-8 gap-4 mb-4 xl:mb-0">
                                        <Select
                                            onChange={(e) => {
                                                setValue(
                                                    "clientId",
                                                    e.target.value
                                                );
                                            }}
                                            label="Select a client"
                                            className="w-full mb-4">
                                            {props.clients.map(
                                                (client: Client) => (
                                                    <SelectItem key={client.id}>
                                                        {client.name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </Select>

                                        <DatePicker
                                            className="w-full"
                                            label="Date"
                                            onChange={(e: DateValue) => {
                                                if (e) {
                                                    const date = new Date(
                                                        e.year,
                                                        e.month - 1,
                                                        e.day
                                                    );
                                                    date.setUTCHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                    );
                                                    setValue("date", date);
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col xl:flex-row xl:gap-8">
                                        <div className="xl:w-1/2">
                                            <label
                                                className="font-bold"
                                                htmlFor="reference">
                                                Reference:
                                            </label>
                                            <input
                                                type="text"
                                                {...register("reference", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Reference is required.",
                                                    },
                                                })}
                                                placeholder={
                                                    errors.reference
                                                        ? errors.reference
                                                              .message
                                                        : props.referencePlaceholder
                                                }
                                                className={
                                                    errors.reference
                                                        ? "placeholder:text-red-400"
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="xl:w-1/2">
                                            <label
                                                className="font-bold"
                                                htmlFor="reference">
                                                Tax Year:
                                            </label>
                                            <input
                                                type="text"
                                                {...register("taxYear", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Tax Year is required.",
                                                    },
                                                })}
                                                placeholder={
                                                    errors.taxYear
                                                        ? errors.taxYear.message
                                                        : "Tax Year"
                                                }
                                                className={
                                                    errors.taxYear
                                                        ? "placeholder:text-red-400"
                                                        : ""
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="font-bold border-b-2 pb-2">
                                        Items:
                                    </div>
                                    {fields.length > 0 ? (
                                        fields.map((field, index) => {
                                            return (
                                                <div
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    key={field.id}
                                                    className="border-b-2 pb-4">
                                                    <div>
                                                        <div className="font-bold">
                                                            Description:
                                                        </div>
                                                        <div className="font-normal">
                                                            <Markdown>
                                                                {
                                                                    field.description
                                                                }
                                                            </Markdown>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="flex flex-col">
                                                                <div className="font-bold">
                                                                    Quant.
                                                                </div>
                                                                <div className="text-end">
                                                                    {
                                                                        field.quantity
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="font-bold">
                                                                    Unit Price
                                                                </div>
                                                                <div className="text-end">
                                                                    £
                                                                    {field.unitPrice.toLocaleString()}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="font-bold">
                                                                    Sub Total
                                                                </div>
                                                                <div className="text-end">
                                                                    £
                                                                    {field.subTotal.toLocaleString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>No Items</div>
                                    )}
                                    <div className="flex justify-between">
                                        <Button
                                            onClick={() =>
                                                onOpenChangeNewItem()
                                            }
                                            className="bg-green-500">
                                            Add Item
                                        </Button>
                                        <div className="flex gap-2 my-auto">
                                            <div className="font-bold">
                                                Total:
                                            </div>
                                            <div>
                                                £
                                                {newInvoiceTotal.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        type="button"
                                        color="danger"
                                        variant="light"
                                        onPress={() => {
                                            onClose();
                                            resetForm();
                                        }}>
                                        Close
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-green-500">
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
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
                                        htmlFor="description">
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
                                        htmlFor="description">
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
                                        htmlFor="description">
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
                                        htmlFor="description">
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
                                    }}>
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
                                    }}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isDismissable={false}
                isOpen={isOpenNewClient}
                onOpenChange={onOpenChangeNewClient}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                New Client
                            </ModalHeader>
                            <form onSubmit={handleSubmitClient(submitClient)}>
                                <ModalBody>
                                    <div>
                                        <label
                                            className="font-bold"
                                            htmlFor="name">
                                            Client Name:
                                        </label>
                                        <input
                                            type="text"
                                            {...registerClient("name", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Client Name is required.",
                                                },
                                            })}
                                            placeholder={
                                                errorsClient.name
                                                    ? errorsClient.name.message
                                                    : "Client Name"
                                            }
                                            className={
                                                errorsClient.name
                                                    ? "placeholder:text-red-500"
                                                    : ""
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="font-bold"
                                            htmlFor="name">
                                            Client Address:
                                        </label>
                                        <textarea
                                            {...registerClient("address", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Address is required.",
                                                },
                                            })}
                                            placeholder={
                                                errorsClient.address
                                                    ? errorsClient.address
                                                          .message
                                                    : "Client address"
                                            }
                                            className={
                                                errorsClient.address
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
                                            resetClient();
                                        }}>
                                        Close
                                    </Button>
                                    <Button
                                        className="bg-green-500"
                                        type="submit">
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isDismissable={false}
                isOpen={isOpenManageClients}
                onOpenChange={onOpenChangeManageClients}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Manage Clients
                            </ModalHeader>
                            <div className="px-4">
                                {props.clients.map(
                                    (client: Client, index: number) => {
                                        return (
                                            <div
                                                className="border-b-2 py-2 flex justify-between"
                                                key={client.id}>
                                                <div className="font-bold my-auto">
                                                    {client.name}
                                                </div>
                                                <Button
                                                    onClick={() => {
                                                        deleteClient(client.id)
                                                            .then(() => {
                                                                onCloseManageClients();
                                                            })
                                                            .catch((err) => {
                                                                console.log(
                                                                    err
                                                                );
                                                            });
                                                    }}
                                                    color="danger"
                                                    variant="light">
                                                    Delete
                                                </Button>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <ModalBody></ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    color="danger"
                                    variant="light"
                                    onPress={() => {
                                        onClose();
                                        resetClient();
                                    }}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-green-500"
                                    onClick={() => {
                                        onOpenChangeNewClient();
                                    }}>
                                    New Client
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
