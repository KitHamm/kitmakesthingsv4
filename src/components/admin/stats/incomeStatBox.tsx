"use client";

import {
    invoicedToDate,
    outStanding,
    paidToDate,
} from "@/components/functions/Statistics";
import { CircularProgress } from "@nextui-org/react";
import { Invoice } from "@prisma/client";

export default function IncomeStatBox(props: { invoices: Invoice[] }) {
    return (
        <div className="bg-neutral-100 rounded-lg shadow p-4">
            <div className="flex justify-between">
                <div>
                    <div className="font-bold text-4xl">
                        £
                        {paidToDate(props.invoices).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </div>
                    <div className="">Income YTD</div>
                    <div
                        className={
                            outStanding(props.invoices) > 0
                                ? "text-red-400"
                                : "text-green-500"
                        }>
                        {outStanding(props.invoices) > 0
                            ? "£" +
                              outStanding(props.invoices).toLocaleString(
                                  undefined,
                                  {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }
                              ) +
                              " Outstanding"
                            : "All Paid"}
                    </div>
                </div>
                <div className="flex justify-end w-full">
                    <CircularProgress
                        aria-label="paid"
                        value={
                            (100 * paidToDate(props.invoices)) /
                            invoicedToDate(props.invoices)
                        }
                        classNames={{
                            svg: "w-20 h-20 drop-shadow-md",
                            indicator: "text-green-500",
                            track: "stroke-white/10",
                            value: "text-xl font-semibold",
                        }}
                        color="success"
                        showValueLabel={true}
                    />
                </div>
            </div>
        </div>
    );
}
