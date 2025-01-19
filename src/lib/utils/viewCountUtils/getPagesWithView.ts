import { ServiceRequest } from "@prisma/client";

export function getPagesWithViews(requests: ServiceRequest[]): string[] {
	return [...new Set(requests.map((request) => request.page))];
}
