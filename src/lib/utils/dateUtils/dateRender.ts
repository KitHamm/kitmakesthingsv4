import { days, months } from "@/lib/constants";

export function dateRender(date: Date): string {
	const dayString = days[date.getDay()];
	const monthString = months[date.getMonth()];
	const dayOfMonth = date.getDate();
	const year = date.getFullYear();

	return `${dayString} ${dayOfMonth}${dateOrdinal(
		dayOfMonth
	)} ${monthString}, ${year}`;
}

function dateOrdinal(date: number): string {
	const ordinals = ["th", "st", "nd", "rd"];
	if (date > 3 && date < 21) return ordinals[0]; // Special case for teen numbers
	const lastDigit = date % 10;
	if (lastDigit < 4 && lastDigit > 0) return ordinals[lastDigit];
	return ordinals[0];
}
