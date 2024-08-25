import { invoiceCount } from "@/components/functions/Statistics";
import { Invoice } from "@prisma/client";

export default function InvoicesSent(props: { invoices: Invoice[] }) {
    return (
        <div className="bg-neutral-100 flex rounded-lg shadow p-4">
            <div className="my-auto">
                <div className="flex gap-2">
                    <div className="font-bold text-2xl">Invoices Sent:</div>
                    <div className="font-bold text-2xl">
                        {invoiceCount(props.invoices, "sent")}
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="font-bold text-2xl">Invoices Paid:</div>
                    <div className="font-bold text-2xl">
                        {invoiceCount(props.invoices, "paid")}
                    </div>
                </div>
            </div>
        </div>
    );
}
