"use client";

import { deleteTask } from "@/components/actions/WorkingProjectActions";
import { Button } from "@nextui-org/react";

export default function DeleteTaskButton(props: { id: string }) {
    return (
        <Button
            onClick={() =>
                deleteTask(props.id).catch((err) => console.log(err))
            }
            className="w-full"
            variant="light"
            color="danger">
            Delete Task
        </Button>
    );
}
