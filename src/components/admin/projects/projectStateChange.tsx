"use client";

import { updateProjectState } from "@/components/actions/WorkingProjectActions";
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";
import { ProjectState } from "@prisma/client";
import { useState } from "react";

const StateSelection = [
	{ key: "PROPOSED", label: "Proposed" },
	{ key: "STARTED", label: "Started" },
	{ key: "FINISHED", label: "Finished" },
];

export default function ProjectStateChange(
	props: Readonly<{
		state: ProjectState;
		id: string;
	}>
) {
	const [value, setValue] = useState(new Set([props.state]));

	function handleChange(e: SharedSelection) {
		switch (e.anchorKey) {
			case "PROPOSED":
				setValue(new Set([ProjectState.PROPOSED]));
				updateProjectState(props.id, ProjectState.PROPOSED).catch(
					(err) => console.log(err)
				);
				return;
			case "STARTED":
				setValue(new Set([ProjectState.STARTED]));
				updateProjectState(props.id, ProjectState.STARTED).catch(
					(err) => console.log(err)
				);
				return;
			case "FINISHED":
				setValue(new Set([ProjectState.FINISHED]));
				updateProjectState(props.id, ProjectState.FINISHED).catch(
					(err) => console.log(err)
				);
				return;
			default:
				return;
		}
	}

	return (
		<div className="w-52 my-auto">
			<Select
				aria-label="project state"
				size="lg"
				variant="bordered"
				placeholder="Project State"
				selectedKeys={value}
				defaultSelectedKeys={"PROPOSED"}
				className="max-w-xs"
				onSelectionChange={(e) => handleChange(e)}
			>
				{StateSelection.map((state) => (
					<SelectItem key={state.key}>{state.label}</SelectItem>
				))}
			</Select>
		</div>
	);
}
