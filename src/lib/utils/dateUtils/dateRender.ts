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
	if (date > 3 && date < 21) return "th"; // Special case for teen numbers
	const lastDigit = date % 10;
	return lastDigit === 1
		? "st"
		: lastDigit === 2
		? "nd"
		: lastDigit === 3
		? "rd"
		: "th";
}
