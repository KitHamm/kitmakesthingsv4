import prisma from "@/lib/prisma";
import DashboardMain from "@/components/admin/DashboardMain";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export default async function Dashboard() {
    const session = getServerSession(authOptions);
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
        <div className="xl:py-10 xl:px-10 py-4 px-4">
            <DashboardMain
                invoices={invoices}
                serviceRequest={serviceRequests}
            />
        </div>
    );
}
