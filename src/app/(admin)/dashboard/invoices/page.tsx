import EditInvoiceModal from "@/components/admin/invoices/EditInvoiceModal";
import InvoiceCards from "@/components/admin/invoices/InvoiceCards";
import InvoiceStateProvider from "@/components/admin/invoices/InvoiceStateProvider";
import InvoiceTopModals from "@/components/admin/invoices/InvoiceTopModals";
import InvoiceYearButtons from "@/components/admin/invoices/InvoiceYearButtons";
import ViewInvoiceModal from "@/components/admin/invoices/ViewInvoiceModal";
import { totalTaxYears, referencePlaceholderCalc } from "@/lib/functions";
import prisma from "@/lib/prisma";

export default async function Invoices() {
	const invoices = await prisma.invoice.findMany({
		include: {
			invoiceItem: true,
			client: true,
		},
		orderBy: {
			reference: "desc",
		},
	});

	const clients = await prisma.client.findMany();

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<InvoiceStateProvider>
				<div className="font-bold text-6xl mb-6 pb-4 text-center lg:text-start border-b-2">
					Invoices.
				</div>
				<InvoiceTopModals
					referencePlaceholder={
						invoices.length > 0
							? referencePlaceholderCalc(invoices[0].reference)
							: "Reference"
					}
					clients={clients}
				/>
				<InvoiceYearButtons taxYears={totalTaxYears(invoices)} />
				<InvoiceCards invoices={invoices} />
				<ViewInvoiceModal />
				<EditInvoiceModal clients={clients} />
			</InvoiceStateProvider>
		</div>
	);
}
