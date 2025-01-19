export function getCurrentTaxYear(): string {
	const today = new Date();
	const taxDate = new Date(today.getFullYear(), 3, 5); // April 5th of the current year

	const startYear =
		today <= taxDate ? today.getFullYear() - 1 : today.getFullYear();
	const endYear = startYear + 1;

	return `${startYear}-${endYear}`;
}
