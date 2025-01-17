export function itemOrder(
	items: { url: string; createdAt: Date }[],
	sortBy: "date" | "name",
	orderBy: "asc" | "desc"
) {
	return [...items].sort((a, b) => {
		if (sortBy === "date") {
			return orderBy === "asc"
				? a.createdAt.getTime() - b.createdAt.getTime()
				: b.createdAt.getTime() - a.createdAt.getTime();
		} else {
			return orderBy === "asc"
				? a.url.localeCompare(b.url)
				: b.url.localeCompare(a.url);
		}
	});
}
