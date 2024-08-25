import { authOptions } from "@/authOptions";
import InvoicesMain from "@/components/admin/invoices/InvoicesMain";
import prisma from "@/lib/prisma";
import { Client, Invoice, InvoiceItem } from "@prisma/client";
import { getServerSession } from "next-auth";

export interface ExtendedInvoice extends Invoice {
    invoiceItem: InvoiceItem[];
    client: Client;
}

export default async function Invoices() {
    const session = getServerSession(authOptions);

    const invoices = await prisma.invoice.findMany({
        include: {
            invoiceItem: {},
            client: {},
        },
        orderBy: {
            reference: "desc",
        },
    });

    const clients = await prisma.client.findMany();

    return (
        <div className="xl:py-10 xl:px-10 py-4 px-4">
            <InvoicesMain invoices={invoices} clients={clients} />
        </div>
    );
}
