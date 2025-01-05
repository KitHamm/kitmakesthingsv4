import prisma from "@/lib/prisma";
import IncomeStatBox from "@/components/admin/stats/incomeStatBox";
import Projection from "@/components/admin/stats/projected";
import InvoicesSent from "@/components/admin/stats/invoiceSent";
import ViewTracker from "@/components/admin/stats/viewTracker";

export default async function Dashboard() {
	const invoices = await prisma.invoice.findMany({
		orderBy: {
			reference: "desc",
		},
	});
	const serviceRequests = await prisma.serviceRequest.findMany({
		orderBy: {
			page: "asc",
		},
	});
	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<div className="font-bold text-6xl mb-6 pb-4 text-center lg:text-start border-b-2">
				Statistics.
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<IncomeStatBox invoices={invoices} />
				<Projection invoices={invoices} />
				<InvoicesSent invoices={invoices} />
				<ViewTracker serviceRequests={serviceRequests} />
			</div>
		</div>
	);
}
