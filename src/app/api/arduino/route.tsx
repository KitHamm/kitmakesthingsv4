import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const requestData = await request.json();
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const unreadMessages = await prisma.messages.findMany({
        where: {
            read: false,
        },
    });

    const todayServiceRequests = await prisma.serviceRequest.findMany({
        where: {
            createdAt: {
                gte: currentDate,
            },
        },
    });

    if (requestData.identifier !== process.env.ARDUINO_IDENTIFIER) {
        return new NextResponse(
            JSON.stringify({ error: "Unauthorized access." }),
            {
                status: 500,
            }
        );
    } else {
        return new NextResponse(
            JSON.stringify({
                unreadMessagesCount: unreadMessages.length,
                todayServiceRequestsCount: todayServiceRequests.length,
            }),
            { status: 200 }
        );
    }
}
