"use client";

import { UpdateTaskPriority } from "@/components/actions/WorkingProjectActions";
import { Select, SelectItem } from "@nextui-org/react";
import { TaskPriority } from "@prisma/client";
import { useState } from "react";

type PriorityType = {
    label: string;
    key: TaskPriority;
};

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
                UpdateTaskPriority(props.id, TaskPriority.LOW);
                return;
            case "MEDIUM":
                UpdateTaskPriority(props.id, TaskPriority.MEDIUM);
                return;
            case "HIGH":
                UpdateTaskPriority(props.id, TaskPriority.HIGH);
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
