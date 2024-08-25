import { Invoice, ServiceRequest } from "@prisma/client";
import IncomeStatBox from "./stats/incomeStatBox";
import Projection from "./stats/projected";
import InvoicesSent from "./stats/invoiceSent";
import ViewTracker from "./stats/viewTracker";

export default function DashboardMain(props: {
    invoices: Invoice[];
    serviceRequest: ServiceRequest[];
}) {
    return (
        <div>
            <div className="font-bold text-6xl mb-6 pb-4 text-center xl:text-start border-b-2">
                Statistics.
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <IncomeStatBox invoices={props.invoices} />
                <Projection invoices={props.invoices} />
                <InvoicesSent invoices={props.invoices} />
                <ViewTracker serviceRequests={props.serviceRequest} />
            </div>
        </div>
    );
}
