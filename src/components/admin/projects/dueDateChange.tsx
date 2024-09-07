"use client";
import { Button, DatePicker, DateValue } from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useEffect, useState } from "react";
import { UpdateDueDate } from "@/components/actions/WorkingProjectActions";
export default function DueDateChange(props: { dueDate: Date; id: string }) {
    const [dateValue, setDateValue] = useState(
        parseAbsoluteToLocal(props.dueDate.toISOString())
    );

    function updateDueDate() {
        const date = new Date(
            dateValue.year,
            dateValue.month - 1,
            dateValue.day
        );
        date.setUTCHours(0, 0, 0, 0);
        UpdateDueDate(props.id, date)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    }
    return (
        <div className="h-full flex gap-2">
            <DatePicker
                size="lg"
                classNames={{
                    timeInput: "hidden",
                    timeInputLabel: "hidden",
                    base: "my-auto",
                }}
                showMonthAndYearPickers
                hideTimeZone
                value={dateValue}
                onChange={setDateValue}
                aria-label="due date"
            />
            {JSON.stringify(dateValue) !==
                JSON.stringify(
                    parseAbsoluteToLocal(props.dueDate.toISOString())
                ) && (
                <Button
                    onPress={updateDueDate}
                    className="bg-green-500 my-auto">
                    Save
                </Button>
            )}
        </div>
    );
}
