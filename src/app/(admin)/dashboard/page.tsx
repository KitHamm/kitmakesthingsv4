// prisma
import prisma from "@/lib/prisma";
// components
import IncomeStatBox from "@/components/admin/stats/incomeStatBox";
import Projection from "@/components/admin/stats/projected";
import InvoicesSent from "@/components/admin/stats/invoiceSent";
import ViewTracker from "@/components/admin/stats/viewTracker";
import PageTitle from "@/components/admin/shared/PageTitle";
// types
import { Invoice, ServiceRequest } from "@prisma/client";

export default async function Dashboard() {
	let invoices: Invoice[] = [];
	let serviceRequests: ServiceRequest[] = [];
	try {
		invoices = await prisma.invoice.findMany({
			orderBy: {
				reference: "desc",
			},
		});
		serviceRequests = await prisma.serviceRequest.findMany({
			orderBy: {
				page: "asc",
			},
		});
	} catch (error) {
		console.log(error);
	}

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<PageTitle title="Statistics." />
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<IncomeStatBox invoices={invoices} />
				<Projection invoices={invoices} />
				<InvoicesSent invoices={invoices} />
				<ViewTracker serviceRequests={serviceRequests} />
			</div>
		</div>
	);
}
