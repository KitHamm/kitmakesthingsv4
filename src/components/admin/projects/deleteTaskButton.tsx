"use client";

import { DeleteTask } from "@/components/actions/WorkingProjectActions";
import { Button } from "@nextui-org/react";

export default function DeleteTaskButton(props: { id: string }) {
    return (
        <Button
            onClick={() => DeleteTask(props.id)}
            className="w-full"
            variant="light"
            color="danger">
            Delete Task
        </Button>
    );
}
