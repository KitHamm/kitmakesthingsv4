import InvoiceCards from "@/components/admin/invoices/InvoiceCards";
import NewInvoiceModal from "@/components/admin/invoices/InvoiceModals/NewInvoiceModal";
import InvoiceStateProvider from "@/components/admin/invoices/InvoiceStateProvider";
import InvoiceYearButtons from "@/components/admin/invoices/InvoiceYearButtons";
import ViewInvoiceModal from "@/components/admin/invoices/InvoiceModals/ViewInvoiceModal";
import ManageClientsButton from "@/components/admin/shared/ManageClients";
import { getReferencePlaceholder } from "@/lib/utils/invoiceUtils/getReferencePlaceholder";
import { getAllTaxYears } from "@/lib/utils/invoiceUtils/totalTaxYears";
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
				<div className="mb-6 flex flex-col lg:flex-row gap-4">
					<NewInvoiceModal
						clients={clients}
						referencePlaceholder={
							invoices.length > 0
								? getReferencePlaceholder(invoices[0].reference)
								: "Reference"
						}
					/>
					<ManageClientsButton clients={clients} />
				</div>
				<InvoiceYearButtons taxYears={getAllTaxYears(invoices)} />
				<InvoiceCards invoices={invoices} />
				<ViewInvoiceModal />
			</InvoiceStateProvider>
		</div>
	);
}
