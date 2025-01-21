import { ServiceRequest } from "@prisma/client";

export function getPagesWithViews(requests: ServiceRequest[]): string[] {
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
	oneWeekAgo.setUTCHours(0, 0, 0, 0);
	return [
		...new Set(
			requests
				.filter((request) => new Date(request.createdAt) >= oneWeekAgo)
				.map((request) => request.page)
		),
	];
}
