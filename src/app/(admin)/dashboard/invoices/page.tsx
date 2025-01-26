// prisma
import prisma from "@/lib/prisma";
// functions
import { getReferencePlaceholder } from "@/lib/utils/invoiceUtils/getReferencePlaceholder";
import { getAllTaxYears } from "@/lib/utils/invoiceUtils/totalTaxYears";
// components
import PageTitle from "@/components/admin/shared/PageTitle";
import NewInvoiceModal from "@/components/admin/invoices/InvoiceModals/NewInvoiceModal";
import InvoiceStateProvider from "@/components/admin/invoices/InvoiceStateProvider";
import InvoiceYearButtons from "@/components/admin/invoices/InvoiceYearButtons";
import ManageClientsModal from "@/components/admin/shared/ManageClients";
// types
import { InvoiceWithClientAndItems } from "@/lib/types";
import { Client } from "@prisma/client";
import { Divider } from "@nextui-org/react";
import InvoiceCard from "@/components/admin/invoices/InvoiceCard";

export default async function InvoicesPage() {
	let invoices: InvoiceWithClientAndItems[] = [];
	let clients: Client[] = [];
	try {
		invoices = await prisma.invoice.findMany({
			include: {
				invoiceItem: true,
				client: true,
			},
			orderBy: {
				reference: "desc",
			},
		});
		clients = await prisma.client.findMany();
	} catch (error) {
		console.log(error);
	}

	return (
		<div className="lg:py-10 lg:px-10 py-4 px-4">
			<InvoiceStateProvider>
				<PageTitle title="Invoices." />
				<div className="bg-neutral-100 lg:w-fit p-4 mb-4 rounded-xl shadow">
					<div className="font-bold text-xl">Invoice Actions</div>
					<Divider className="mb-4" />
					<div className="flex flex-col lg:flex-row gap-4">
						<NewInvoiceModal
							clients={clients}
							referencePlaceholder={
								invoices.length > 0
									? getReferencePlaceholder(
											invoices[0].reference
									  )
									: "Reference"
							}
						/>
						<ManageClientsModal clients={clients} />
					</div>
				</div>
				<InvoiceYearButtons taxYears={getAllTaxYears(invoices)} />
				{invoices.length > 0 ? (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
						{invoices.map((invoice) => (
							<InvoiceCard
								key={invoice.reference}
								invoice={invoice}
							/>
						))}
					</div>
				) : (
					<div className="bg-neutral-100 p-4 rounded-xl shadow">
						<div className="font-bold text-lg">No Invoices</div>
						<div>Use the buttons above to create an invoice.</div>
					</div>
				)}
			</InvoiceStateProvider>
		</div>
	);
}
