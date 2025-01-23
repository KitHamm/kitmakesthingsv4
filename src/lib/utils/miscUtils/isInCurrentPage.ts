export function isInSelectedPage(
	index: number,
	currentPage: number,
	imagesPerPage: number
) {
	const pageStart = currentPage * imagesPerPage - (imagesPerPage + 1);
	const pageEnd = currentPage * imagesPerPage;
	if (index > pageStart && index < pageEnd) {
		return true;
	}
	return false;
}
