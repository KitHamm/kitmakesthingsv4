// prisma
import prisma from "@/lib/prisma";
// components
import IncomeStatBox from "@/components/admin/stats/incomeStatBox";
import Projection from "@/components/admin/stats/projected";
import InvoicesSent from "@/components/admin/stats/invoiceSent";
import ViewTracker from "@/components/admin/stats/viewTracker";
import PageTitle from "@/components/admin/shared/PageTitle";
// types
import { Expense, Invoice, ServiceRequest, TaxSettings } from "@prisma/client";
import TaxCalculator from "@/components/admin/stats/TaxCalculator";

export default async function Dashboard() {
	let invoices: Invoice[] = [];
	let serviceRequests: ServiceRequest[] = [];
	let taxSettings: TaxSettings | null = null;
	let expenses: Expense[] = [];
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

		expenses = await prisma.expense.findMany({
			orderBy: {
				amount: "desc",
			},
		});

		taxSettings = await prisma.taxSettings.findFirst();

		if (!taxSettings) {
			taxSettings = await prisma.taxSettings.create({
				data: {
					personalAllowance: 12570,
					incomeTaxRate: 0.2,
					class4NiRate: 0.06,
					class4NiThreshold: 12570,
					class2NiThreshold: 6725,
					class2NiAmount: 3.45,
				},
			});
		}
	} catch (error) {
		console.log(error);
	}

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<PageTitle title="Statistics." />
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<IncomeStatBox invoices={invoices} />
				<Projection invoices={invoices} expenses={expenses} />
				<TaxCalculator taxSettings={taxSettings} invoices={invoices} expenses={expenses} />
				<InvoicesSent invoices={invoices} />
				<ViewTracker serviceRequests={serviceRequests} />
			</div>
		</div>
	);
}
