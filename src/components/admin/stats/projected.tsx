import { projection } from "@/components/functions/Statistics";
import { Invoice } from "@prisma/client";

export default function Projection(props: { invoices: Invoice[] }) {
    return (
        <div className="bg-neutral-100 rounded-lg shadow p-4">
            <div>
                <div className="font-bold text-4xl">
                    £
                    {projection("", props.invoices).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </div>
                <div className="">Projected Income</div>
                <div className="">
                    £
                    {projection("avg", props.invoices).toLocaleString(
                        undefined,
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}
                </div>
            </div>
        </div>
    );
}
