"use client";

import { invoiceCount } from "@/lib/functions";
import { Invoice } from "@prisma/client";
import { useEffect, useState } from "react";

export default function InvoicesSent(props: { invoices: Invoice[] }) {
    const [invoiceSent, setInvoiceSent] = useState(0);
    const [invoicePaid, setInvoicePaid] = useState(0);

    useEffect(() => {
        setInvoicePaid(invoiceCount(props.invoices, "paid"));
        setInvoiceSent(invoiceCount(props.invoices, "sent"));
    }, [props.invoices]);

    return (
        <div className="bg-neutral-100 flex rounded-lg shadow p-4">
            <div className="my-auto">
                <div className="flex gap-2">
                    <div className="font-bold text-2xl">Invoices Sent:</div>
                    <div className="font-bold text-2xl">{invoiceSent}</div>
                </div>
                <div className="flex gap-2">
                    <div className="font-bold text-2xl">Invoices Paid:</div>
                    <div className="font-bold text-2xl">{invoicePaid}</div>
                </div>
            </div>
        </div>
    );
}
