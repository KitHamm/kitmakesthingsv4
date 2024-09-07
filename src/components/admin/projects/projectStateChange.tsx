"use client";

import { UpdateProjectState } from "@/components/actions/WorkingProjectActions";
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";
import { ProjectState } from "@prisma/client";
import { useState } from "react";

const StateSelection = [
    { key: "PROPOSED", label: "Proposed" },
    { key: "STARTED", label: "Started" },
    { key: "FINISHED", label: "Finished" },
];

export default function ProjectStateChange(props: {
    state: ProjectState;
    id: string;
}) {
    const [value, setValue] = useState(new Set([props.state]));

    function handleChange(e: SharedSelection) {
        switch (e.anchorKey) {
            case "PROPOSED":
                setValue(new Set([ProjectState.PROPOSED]));
                UpdateProjectState(props.id, ProjectState.PROPOSED);
                return;
            case "STARTED":
                setValue(new Set([ProjectState.STARTED]));
                UpdateProjectState(props.id, ProjectState.STARTED);
                return;
            case "FINISHED":
                setValue(new Set([ProjectState.FINISHED]));
                UpdateProjectState(props.id, ProjectState.FINISHED);
                return;
            default:
                return;
        }
    }

    return (
        <div className="w-52">
            <Select
                aria-label="project state"
                size="lg"
                variant="bordered"
                placeholder="Project State"
                selectedKeys={value}
                defaultSelectedKeys={"PROPOSED"}
                className="max-w-xs"
                onSelectionChange={(e) => handleChange(e)}>
                {StateSelection.map((state) => (
                    <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
            </Select>
        </div>
    );
}
