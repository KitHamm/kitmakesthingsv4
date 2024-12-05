// import { ServiceRequest } from "@prisma/client";
// import { Views } from "@/lib/types";

// export function countViews(requests: ServiceRequest[]) {
//     const views: Views[] = [];
//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);

//     for (let i = 6; i >= 0; i--) {
//         const date = new Date(
//             today.getFullYear(),
//             today.getMonth(),
//             today.getDate() - i
//         );
//         const formattedDate = formatDate(date);
//         views.push({
//             date: formattedDate,
//             pages: [],
//         });
//     }

//     views.forEach((view) => {
//         const pageCounts: Record<string, number> = {};

//         requests.forEach((request) => {
//             if (formatDate(request.createdAt) === view.date) {
//                 pageCounts[request.page] = (pageCounts[request.page] || 0) + 1;
//             }
//         });

//         view.pages = Object.entries(pageCounts).map(([page, count]) => ({
//             page,
//             count,
//         }));
//     });

//     return views;
// }

// function formatDate(date: Date) {
//     const formattedDate =
//         date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
//     return formattedDate;
// }

// export function pagesWithViews(requests: ServiceRequest[]) {
//     var pages: string[] = [];
//     requests.forEach((request) => {
//         if (!pages.includes(request.page)) {
//             pages.push(request.page);
//         }
//     });
//     return pages;
// }

// export function referencePlaceholderCalc(ref: string) {
//     const reference: number = parseInt(ref);
//     return (reference + 1).toString();
// }
