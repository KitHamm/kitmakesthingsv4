"use client";

import { addNewTask } from "@/components/actions/WorkingProjectActions";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem,
    SharedSelection,
} from "@nextui-org/react";
import { TaskPriority } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
type priorityType = {
    label: string;
    key: TaskPriority;
};
const priority: priorityType[] = [
    { label: "Low", key: TaskPriority.LOW },
    { label: "Medium", key: TaskPriority.MEDIUM },
    { label: "High", key: TaskPriority.HIGH },
];

export type TaskForm = {
    description: string;
    priority: TaskPriority;
    projectId: string;
};

export default function NewTask(props: { projectId: string }) {
    const [formError, setFormError] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const taskForm = useForm<TaskForm>();
    const { register, reset, handleSubmit, setValue, formState } = taskForm;
    const { errors } = formState;

    function submitNewTask(data: TaskForm) {
        if (!data.priority) {
            setFormError("Please select a priority.");
        } else {
            addNewTask(data)
                .then(() => {
                    reset();
                    onOpenChange();
                    setFormError("");
                })
                .catch((err) => {
                    console.log(err);
                    setFormError("Something went wrong.");
                });
        }
    }
    return (
        <>
            <Button onPress={onOpen} className="bg-green-500 text-white">
                New Task
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                New Task
                            </ModalHeader>
                            <form onSubmit={handleSubmit(submitNewTask)}>
                                <ModalBody>
                                    <input
                                        type="hidden"
                                        value={props.projectId}
                                        {...register("projectId")}
                                    />
                                    <textarea
                                        {...register("description", {
                                            required: {
                                                value: true,
                                                message: "Required.",
                                            },
                                        })}
                                        placeholder={
                                            errors.description
                                                ? errors.description.message
                                                : "Details"
                                        }
                                        className={
                                            errors.description
                                                ? "placeholder:text-red-400"
                                                : ""
                                        }
                                    />
                                    <Select
                                        onChange={(e) => {
                                            switch (e.target.value) {
                                                case "LOW":
                                                    setValue(
                                                        "priority",
                                                        TaskPriority.LOW
                                                    );
                                                    return;
                                                case "MEDIUM":
                                                    setValue(
                                                        "priority",
                                                        TaskPriority.MEDIUM
                                                    );
                                                    return;
                                                case "HIGH":
                                                    setValue(
                                                        "priority",
                                                        TaskPriority.HIGH
                                                    );
                                                    return;
                                            }
                                        }}
                                        label="Priority"
                                        className="w-full mb-4">
                                        {priority.map((p: priorityType) => (
                                            <SelectItem key={p.key}>
                                                {p.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    {formError !== "" && (
                                        <p className="text-red-400">
                                            {formError}
                                        </p>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        type="button"
                                        color="danger"
                                        variant="light"
                                        onPress={() => {
                                            reset();
                                            setFormError("");
                                            onClose();
                                        }}>
                                        Close
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-green-500 text-white">
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
