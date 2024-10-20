import InvoicesMain from "@/components/admin/invoices/InvoicesMain";
import prisma from "@/lib/prisma";

export default async function Invoices() {
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
