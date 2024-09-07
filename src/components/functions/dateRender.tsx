const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export function dateRender(date: Date) {
    const dateOnly = date.toISOString().split("T")[0];
    const stringDate = new Date(dateOnly);
    const dayString = stringDate.toString().split(" ")[0];
    const monthString = months[stringDate.getMonth()];
    const yearString = dateOnly.split("-")[0];
    const stringFormattedDate =
        dayString +
        " " +
        stringDate.getDate() +
        dateOrdinal(stringDate.getDate()) +
        " " +
        monthString +
        ", " +
        yearString;

    return stringFormattedDate;
}

function dateOrdinal(date: number) {
    if (date > 3 && date < 21) return "th";
    switch (date % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}
