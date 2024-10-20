"use client";

import { updateTaskPriority } from "@/components/actions/WorkingProjectActions";
import { Select, SelectItem } from "@nextui-org/react";
import { PriorityType } from "@/lib/types";
import { TaskPriority } from "@prisma/client";
import { useState } from "react";

const priorities: PriorityType[] = [
    {
        label: "Low",
        key: TaskPriority.LOW,
    },
    {
        label: "Medium",
        key: TaskPriority.MEDIUM,
    },
    {
        label: "High",
        key: TaskPriority.HIGH,
    },
];

export default function TaskCardPriority(props: {
    id: string;
    priority: TaskPriority;
}) {
    const [value, setValue] = useState(new Set([props.priority]));

    function handleChange(value: string) {
        switch (value) {
            case "LOW":
                updateTaskPriority(props.id, TaskPriority.LOW).catch((err) =>
                    console.log(err)
                );
                return;
            case "MEDIUM":
                updateTaskPriority(props.id, TaskPriority.MEDIUM).catch((err) =>
                    console.log(err)
                );
                return;
            case "HIGH":
                updateTaskPriority(props.id, TaskPriority.HIGH).catch((err) =>
                    console.log(err)
                );
                return;
            default:
                return;
        }
    }

    return (
        <>
            <Select
                classNames={{ trigger: "bg-white" }}
                selectedKeys={value}
                onChange={(e) => handleChange(e.target.value)}
                label="Priority"
                placeholder="Select a priority">
                {priorities.map((p: PriorityType) => (
                    <SelectItem key={p.key}>{p.label}</SelectItem>
                ))}
            </Select>
        </>
    );
}
