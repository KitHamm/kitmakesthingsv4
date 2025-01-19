import { ServiceRequest } from "@prisma/client";
import { formatDate } from "../dateUtils/formatDate";
import { Views } from "@/lib/types";

export function countViews(requests: ServiceRequest[]): Views[] {
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);

	// Create an array of the last 7 days
	const views: Views[] = Array.from({ length: 7 }, (_, i) => {
		const date = new Date(today);
		date.setDate(today.getDate() - (6 - i)); // Subtract days
		return {
			date: formatDate(date),
			pages: [],
		};
	});

	// Group requests by date
	const requestsByDate = requests.reduce<
		Record<string, Record<string, number>>
	>((acc, { createdAt, page }) => {
		const formattedDate = formatDate(createdAt);
		if (!acc[formattedDate]) acc[formattedDate] = {};
		acc[formattedDate][page] = (acc[formattedDate][page] || 0) + 1;
		return acc;
	}, {});

	// Map pages and counts to views
	return views.map((view) => ({
		...view,
		pages: Object.entries(requestsByDate[view.date] || {}).map(
			([page, count]) => ({
				page,
				count,
			})
		),
	}));
}
