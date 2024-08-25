import { Invoice } from "@prisma/client";

export function invoicedToDate(invoices: Invoice[]) {
    var total = 0.0;
    for (let i = 0; i < invoices.length; i++) {
        total = total + invoices[i].total;
    }
    return total;
}

export function paidToDate(invoices: Invoice[]) {
    var total = 0.0;
    for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].paid) {
            total = total + invoices[i].total;
        }
    }
    total = parseFloat(total + "");
    return total;
}

export function currentTaxYear() {
    const dateObj = new Date();
    const taxDate = new Date();
    const year = dateObj.getFullYear();
    const prevYear = dateObj.getFullYear() - 1;
    const nextYear = dateObj.getFullYear() + 1;
    taxDate.setFullYear(year, 3, 5);
    var taxYear;
    if (dateObj <= taxDate) {
        taxYear = prevYear + "-" + dateObj.getFullYear();
    } else {
        taxYear = dateObj.getFullYear() + "-" + nextYear;
    }
    return taxYear;
}

export function projection(type: string, invoices: Invoice[]) {
    let monthsWorked = 0;
    const d = new Date();
    let month = d.getMonth() + 1;
    if (month < 4) {
        monthsWorked = month + 9;
    } else {
        monthsWorked = month - 3;
    }
    const avgYTD = invoicedToDate(invoices) / monthsWorked;
    const projection = avgYTD * 12;
    if (Number.isNaN(projection)) {
        return 0;
    } else {
        if (type === "avg") {
            return avgYTD;
        } else {
            return projection;
        }
    }
}

export function totalTaxYears(invoices: Invoice[]) {
    var taxYears: string[] = [];
    for (let i = 0; i < invoices.length; i++) {
        if (!taxYears.includes(invoices[i].taxYear)) {
            taxYears.push(invoices[i].taxYear);
        }
    }
    return taxYears;
}
export function outStanding(invoices: Invoice[]) {
    var total = 0;
    total = invoicedToDate(invoices) - paidToDate(invoices);
    return total;
}

export function invoiceCount(invoices: Invoice[], type: string) {
    var count = 0;
    for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].taxYear === currentTaxYear()) {
            if (type === "sent") {
                count = count + 1;
            } else {
                if (invoices[i].paid) {
                    count = count + 1;
                }
            }
        }
    }
    return count;
}
