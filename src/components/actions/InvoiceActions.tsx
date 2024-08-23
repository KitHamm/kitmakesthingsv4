"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { InvoiceForm } from "../admin/invoices/InvoicesMain";

export async function CreateInvoice(data: InvoiceForm) {
    // Create Invoice
    try {
        const invoice = await prisma.invoice.create({
            data: {
                reference: data.reference,
                total: data.total,
                date: data.date,
                taxYear: data.taxYear,
                paid: false,
                client: {
                    connect: {
                        id: data.clientId,
                    },
                },
            },
        });
        for (let i = 0; i < data.items.length; i++) {
            await prisma.invoiceItem.create({
                data: {
                    description: data.items[i].description,
                    quantity: data.items[i].quantity,
                    unitPrice: data.items[i].unitPrice,
                    subTotal: data.items[i].subTotal,
                    invoice: {
                        connect: {
                            reference: invoice.reference,
                        },
                    },
                },
            });
        }
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/invoices");
    }
}

export async function UpdateInvoice(reference: string, paid: boolean) {
    try {
        await prisma.invoice.update({
            where: {
                reference: reference,
            },
            data: {
                paid: paid,
            },
        });
        return Promise.resolve({ status: 200, message: "success" });
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("/dashboard/invoices");
    }
}

export async function DeleteInvoice(reference: string) {
    try {
        await prisma.invoiceItem.deleteMany({
            where: {
                invocieReference: reference,
            },
        });
        try {
            await prisma.invoice.delete({
                where: {
                    reference: reference,
                },
            });
            return Promise.resolve({ status: 200, message: "success" });
        } catch (err: any) {
            return Promise.resolve({ status: 201, message: err });
        } finally {
            revalidatePath("dashboard/invoices");
        }
    } catch (err: any) {
        return Promise.resolve({ status: 201, message: err });
    } finally {
        revalidatePath("dashboard/invoices");
    }
}
