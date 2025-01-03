"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { InvoiceForm } from "@/lib/types";
import { InvoiceItem } from "@prisma/client";

export async function createInvoice(data: InvoiceForm) {
    // Create Invoice
    try {
        const invoice = await prisma.invoice.create({
            data: {
                reference: data.reference,
                total: data.total,
                date: data.date,
                taxYear: data.taxYear,
                paid: false,
                clientId: data.clientId,
            },
        });
        for (let i = 0; i < data.items.length; i++) {
            await prisma.invoiceItem.create({
                data: {
                    description: data.items[i].description,
                    quantity: data.items[i].quantity,
                    unitPrice: data.items[i].unitPrice,
                    subTotal: data.items[i].subTotal,
                    invoiceReference: invoice.reference,
                },
            });
        }
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/invoices");
        revalidatePath("dashboard");
    }
}

export async function updateInvoice(data: InvoiceForm) {
    try {
        await prisma.invoiceItem.deleteMany({
            where: {
                invoiceReference: data.reference,
            },
        });

        await prisma.invoice.update({
            where: {
                reference: data.reference,
            },
            data: {
                reference: data.reference,
                total: data.total,
                date: data.date,
                taxYear: data.taxYear,
                clientId: data.clientId,
            },
        });

        for (let i = 0; i < data.items.length; i++) {
            await prisma.invoiceItem.create({
                data: {
                    description: data.items[i].description,
                    quantity: data.items[i].quantity,
                    unitPrice: data.items[i].unitPrice,
                    subTotal: data.items[i].subTotal,
                    invoiceReference: data.reference,
                },
            });
        }

        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/invoices");
        revalidatePath("dashboard");
    }
}

export async function updateInvoicePaid(reference: string, paid: boolean) {
    try {
        await prisma.invoice.update({
            where: {
                reference: reference,
            },
            data: {
                paid: paid,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("/dashboard/invoices");
        revalidatePath("dashboard");
    }
}

export async function deleteInvoice(reference: string) {
    try {
        await prisma.invoiceItem.deleteMany({
            where: {
                invoiceReference: reference,
            },
        });
        await prisma.invoice.delete({
            where: {
                reference: reference,
            },
        });
        return Promise.resolve();
    } catch (error: any) {
        return Promise.reject(new Error(error));
    } finally {
        revalidatePath("dashboard/invoices");
        revalidatePath("dashboard");
    }
}
