import { ServiceRequest } from "@prisma/client";

export type Views = {
    date: string;
    pages: { page: string; count: number }[];
};

export function countViews(requests: ServiceRequest[]) {
    var sevenDays: Views[] = [];
    for (let i = 6; i > -1; i--) {
        var date = new Date();
        date.setUTCHours(0, 0, 0, 0);

        var formDate = formatDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() - i)
        );
        sevenDays.push({
            date: formDate,
            pages: [{ page: "", count: 0 }],
        });
    }
    sevenDays.forEach((date, index) => {
        var page: { page: string; count: number }[] = [];
        var pageName: string[] = [];
        requests.forEach((request: ServiceRequest) => {
            if (formatDate(request.createdAt) === date.date) {
                if (!pageName.includes(request.page)) {
                    pageName.push(request.page);
                }
            }
        });
        pageName.forEach((pageName) => {
            var count = 0;
            requests.forEach((request: ServiceRequest) => {
                if (
                    pageName === request.page &&
                    formatDate(request.createdAt) === date.date
                ) {
                    count = count + 1;
                }
            });
            page.push({ page: pageName, count: count });
        });
        sevenDays[index] = { date: date.date, pages: page };
    });
    return sevenDays;
}

function formatDate(date: Date) {
    const formattedDate =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    return formattedDate;
}

export function pagesWithViews(requests: ServiceRequest[]) {
    var pages: string[] = [];
    requests.forEach((request) => {
        if (!pages.includes(request.page)) {
            pages.push(request.page);
        }
    });
    return pages;
}
